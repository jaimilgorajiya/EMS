import Designation from "../models/Designation.Model.js";

const getDesignations = async (req, res) => {
    try {
        const designations = await Designation.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, designations });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error in fetching designations" });
    }
};

const addDesignation = async (req, res) => {
    try {
        const { name, description, department } = req.body;
        const addedBy = req.user.name || req.user.email; // Assuming user is extracted from token middleware

        const newDesignation = new Designation({
            name,
            description,
            department,
            addedBy
        });

        await newDesignation.save();
        return res.status(200).json({ success: true, designation: newDesignation });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error in adding designation" });
    }
};

const updateDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, department } = req.body;

        const updateDesignation = await Designation.findByIdAndUpdate({ _id: id }, {
            name, description, department
        }, { new: true });

        if (!updateDesignation) {
            return res.status(404).json({ success: false, error: "Designation not found" });
        }

        return res.status(200).json({ success: true, designation: updateDesignation });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error in updating designation" });
    }
};

const deleteDesignation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDesignation = await Designation.findByIdAndDelete({ _id: id });

        if (!deletedDesignation) {
            return res.status(404).json({ success: false, error: "Designation not found" });
        }

        return res.status(200).json({ success: true, designation: deletedDesignation });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error in deleting designation" });
    }
};

export { addDesignation, getDesignations, updateDesignation, deleteDesignation };
