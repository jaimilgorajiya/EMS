import mongoose from "mongoose";

const designationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        department: { // Optional: Link to a department
            type: String, 
        },
        addedBy: {
            type: String,
            required: true // We'll store user name/email here
        }
    },
    {
        timestamps: true
    }
);

const Designation = mongoose.model("Designation", designationSchema);

export default Designation;
