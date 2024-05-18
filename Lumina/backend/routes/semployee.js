const express = require('express');
const router = express.Router();
const ShopEmployee = require("../models/SEmployee"); // Update the path as necessary

router.route("/get").get(async (req, res) => {
  try {
    const employees = await ShopEmployee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with fetching employees", error: err.message });
  }
});

router.route("/get/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
      const employee = await ShopEmployee.findById(id);
      if (!employee) {
          return res.status(404).json({ status: "Employee not found" });
      }
      res.status(200).json({ status: "Employee fetched", employee });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ status: "Error with getting employee", error: error.message });
  }
});

router.route("/").post(async (req, res) => {
  const {
    name,
    age,
    department,
    position,
    hireDate,
    address,
    contactNumber,
    emergencyContact,
    workDays,
    hourlyRate,
    additionalNotes
  } = req.body;

  try {
    const newEmployee = new ShopEmployee({
      name,
      age,
      department,
      position,
      hireDate,
      address,
      contactNumber,
      emergencyContact,
      workDays,
      hourlyRate,
      totalHoursWorked: workDays * 8, // Assuming 8 hours per workday
      totalSalary: workDays * 8 * hourlyRate, // Simplified salary calculation
      additionalNotes
    });

    await newEmployee.save();
    res.json({ status: "Employee Added", employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error with adding employee", error: error.message });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const employeeId = req.params.id;
  try {
    await ShopEmployee.findByIdAndDelete(employeeId);
    res.status(200).json({ status: "Employee deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with deleting employee", error: err.message });
  }
});

router.route("/update/:id").put(async (req, res) => {
  const employeeId = req.params.id;
  const {
    name,
    age,
    department,
    position,
    hireDate,
    address,
    contactNumber,
    emergencyContact,
    workDays,
    hourlyRate,
    additionalNotes
  } = req.body;

  try {
    const updateEmployee = {
      name,
      age,
      department,
      position,
      hireDate,
      address,
      contactNumber,
      emergencyContact,
      workDays,
      hourlyRate,
      totalHoursWorked: workDays * 8, // Assuming 8 hours per workday
      totalSalary: workDays * 8 * hourlyRate, // Simplified salary calculation
      additionalNotes
    };

    const updatedEmployee = await ShopEmployee.findByIdAndUpdate(employeeId, updateEmployee, {
      new: true
    });
    res.status(200).json({ status: "Employee updated", employee: updatedEmployee });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "Error with updating employee", error: err.message });
  }
});

// Note: Removed the salary calculation functions since the model does not include them.

module.exports = router;
