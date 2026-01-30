import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = "admin@heer.com";
        const adminPassword = "admin123";

        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log("Admin user already exists");
            process.exit();
        }

        const user = await User.create({
            name: "Admin User",
            email: adminEmail,
            password: adminPassword,
        });

        console.log("Admin user created successfully");
        console.log("Email: " + adminEmail);
        console.log("Password: " + adminPassword);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
