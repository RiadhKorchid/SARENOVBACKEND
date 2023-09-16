import expres from "express"
import User from "../models/client.js"
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
export async function changeProfilInformations(req, res) {
    const { name, phone, adresse } = req.body;
    const email = req.decodedToken.email;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            // Update the user's profile information
            user.name = name || user.name; // Update if provided, else keep the same
            user.phone = phone || user.phone;
            user.adresse = adresse || user.adresse;

            await user.save(); // Save the updated user

            res.status(200).json({ message: "Profile information updated successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error updating profile information:", error);
        res.status(500).json({ error: "An error occurred while updating profile information" });
    }
}
export async function changeProfilPassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const email = req.decodedToken.email;
    try {
        const user = await User.findOne({ email: email });

        if (user) {
            // Check if the current password matches the stored hashed password
            const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

            if (isPasswordMatch) {
                // Hash the new password before storing it
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                

                // Update the user's password
                user.password = hashedNewPassword;
                await user.save();

                res.status(200).json({ message: "Password updated successfully" });
            } else {
                res.status(401).json({ error: "Current password is incorrect" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "An error occurred while updating password" });
    }
}