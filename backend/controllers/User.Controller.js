import User from "../models/User.Model.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.log("Error in createUser controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.log("Error in getUsers controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in getUser controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, role, status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            role,
            status
        }, { new: true }).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.log("Error in updateUser controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.log("Error in deleteUser controller", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
