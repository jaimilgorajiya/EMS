
import jwt from "jsonwebtoken";
import User from "../models/User.Model.js";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }
        
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in verifyToken middleware", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied - Admin only" });
        }
        
        next();
    } catch (error) {
       console.log("Error in isAdmin middleware", error.message);
       return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { verifyToken, isAdmin };
