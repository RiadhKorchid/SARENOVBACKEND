import express from "express"
import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export async function signIn(req, res) {
    const { email, password } = req.body;
  
      try {
        // Fetch super admin user from your database (replace with actual code)
        const existe = await Admin.findOne({ email: email });
  
        if (!existe) {
          return res.status(401).json({
            msg: "Super admin not found!",
          });
        }
  
        // Compare the password
        const match = await bcrypt.compare(password, existe.password);
  
        if (match) {
          // Generate an access token
          const accessToken = generateToken({
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

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 60*15 })

}