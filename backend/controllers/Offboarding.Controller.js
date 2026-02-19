import Offboarding from '../models/Offboarding.Model.js';
import User from '../models/User.Model.js';

// 1. Initiate Offboarding
export const initiateOffboarding = async (req, res) => {
    try {
        const { employeeId, exitType, reason, resignationDate, lastWorkingDate, noticePeriodDays, remarks } = req.body;
        
        // Ensure user is active before initiating offboarding
        const user = await User.findById(employeeId);
        if (!user || user.status === 'Inactive') return res.status(400).json({ success: false, message: 'Invalid or Inactive User' });

        const newOffboarding = new Offboarding({
            employeeId,
            exitType,
            exitReason: reason,
            resignationDate,
            lastWorkingDate,
            noticePeriodDays,
            remarks,
            status: 'Initiated'
        });

        await newOffboarding.save();
        res.status(201).json({ success: true, message: 'Offboarding Process Initiated', data: newOffboarding });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get All Offboardings (With Filters)
export const getOffboardings = async (req, res) => {
    try {
        const query = {};
        if (req.query.status) query.status = req.query.status;
        if (req.query.exitType) query.exitType = req.query.exitType;
        
        const offboardings = await Offboarding.find(query)
            .populate('employeeId', 'name email department designation')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: offboardings.length, data: offboardings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Get Single Offboarding Details
export const getOffboardingDetails = async (req, res) => {
    try {
        const offboarding = await Offboarding.findById(req.params.id).populate('employeeId', 'name email department designation joiningDate');
        if (!offboarding) return res.status(404).json({ success: false, message: 'Record not found' });
        res.status(200).json({ success: true, data: offboarding });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Update Offboarding Stage/Details
export const updateOffboarding = async (req, res) => {
    try {
        const offboarding = await Offboarding.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!offboarding) return res.status(404).json({ success: false, message: 'Record not found' });
        res.status(200).json({ success: true, message: 'Offboarding updated', data: offboarding });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Finalize Offboarding (Archive)
export const finalizeOffboarding = async (req, res) => {
    try {
        const offboarding = await Offboarding.findById(req.params.id);
        if (!offboarding) return res.status(404).json({ success: false, message: 'Record not found' });

        // Update User Status
        await User.findByIdAndUpdate(offboarding.employeeId, { status: 'Inactive', exitDate: offboarding.lastWorkingDate });

        offboarding.status = 'Archived';
        await offboarding.save();

        res.status(200).json({ success: true, message: 'Offboarding Finalized. User Moved to Ex-Employees.', data: offboarding });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
