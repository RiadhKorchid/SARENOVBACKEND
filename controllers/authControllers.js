import express from "express"
import Client from "../models/client.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import Admin from "../models/Admin.js"
export async function logInAdmin(req, res) {
  const { email, password } = req.body;
  
console.log("hello")
  try {
    // Fetch super admin user from your database (replace with actual code)
        const existe = await Admin.findOne({ email: email });
        console.log(existe)
    if (!existe) {
      return res.status(401).json({
        msg: "Super admin not found!",
      });
    }

    // Compare the password
    const match = await bcrypt.compare(password, existe.password);

    if (match) {
      // Generate an access token
      const accessToken = generateAdminToken({
        name: existe.name,
        email: existe.email,
      });

      return res.status(200).json({
        msg: "Super admin connecté avec succès",
        token: accessToken,
        user: {
          name: existe.name,
          email: existe.email,
        },
      });
    } else {
      return res.status(401).json({
        msg: "Mot de passe incorrect !",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      msg: "Erreur de serveur",
    });
  }
};
export async function addAdmin(req, res) {


}
export async function lougout(req,res){
  
}
export async function signIn(req, res) {
    
    const { email, password } = req.body;
    const existe = await Client.findOne({ email: email })
    if (!existe) {
        return res.status(404).json({ msg: 'Utilisateur introuvable !' });
    } else {
        const match = await bcrypt.compare(password, existe.password)
        if (match) {
            const accessToken = generateAccessToken({ name: existe.name, email: existe.email, phone: existe.phone, adresse: existe.adresse })
            const refreshToken = generateRefreshToken({ name: existe.name, email: existe.email, phone: existe.phone, adresse: existe.adresse })
            res.status(200).cookie("refreshToken", refreshToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expiry time (7 days in this example)
            }).json({
                msg: "Utilisateur connecté avec succées",
                token: accessToken
            })

        } else {
            return res.status(401).json({
                msg: "Mot de passe incorrect !"
            })
        }
    }


}
export async function signUp(req, res) {
    try {
        const { name, email, phone, password, adresse } = req.body;
        const existe = await Client.findOne({ email: email })
        if (existe) {
            return res.status(401).json({ msg: "l'utilisateur avec l'email donné existe déjà ! " })
        } else {
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newClient = await Client.create({ name, email, phone, password: hashedPassword, adresse })
            return res.status(200).json({
                msg: "User registered successfully!"
            })

        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error registering user.' });

    }
}
export async function forgetPassword(req, res) {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
        service: "gmail", // e.g., "Gmail"
        auth: {
            user: "sarenovyacine@gmail.com",
            pass: "nhmgopiquubkzylk",
        },
    });
    const existe = await Client.findOne({ email: email })
    if (existe) {

        // Generate a reset token
        const resetToken = jwt.sign({ id: existe._id }, process.env.SECRET_RESET_TOKEN, { expiresIn: "1h" });
        // Send reset email
        const mailOptions = {
            from: "sarenovyacine@gmail.com",
            to: email,
            subject: "Password Reset",
            text: `Click the following link to reset your password: http://localhost:4000/reset?token=${resetToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                res.status(500).send("Error sending email");
            } else {
                console.log("Email sent:", info.response);
                res.status(200).send("Email sent successfully");
            }
        });
    } else {
        return res.status(404).json({ msg: "this email doesnt have an account !" })
    }
}

export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken
    console.log("helloo")
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token not provided' });
    }
    // If the refresh token is valid, extract the user ID or other necessary data
    try {// from the token to generate a new access token
        const decodedToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
        const userEmail = decodedToken.email
        const Exist = await Client.findOne({ email: userEmail })
        if (Exist) {
            const user = { name: Exist.name, email: Exist.email, phone: Exist.phone, adresse: Exist.adresse }
            const newAccessToken = generateAccessToken(user)
            return res.status(200).json({ msg: "refreshing with success ", accessToken: newAccessToken })
        }
    } catch (err) {
        console.log(err)
    }
    // Generate a new access token for the user

}
function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, { expiresIn: 60 * 60 * 24 * 7 })

}
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: 60*15 })

}
function generateAdminToken(payload) {
  return jwt.sign(payload, process.env.SECRET_ADMIN_TOKEN, { expiresIn: 60 * 15 })

}