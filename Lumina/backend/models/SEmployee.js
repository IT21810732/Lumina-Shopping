const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shopEmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  department: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  hireDate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    default: '',
  },
  workDays: {
    type: Number,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  totalHoursWorked: {
    type: Number,
    default: 0,
  },
  totalSalary: {
    type: Number,
    required: true,
  },
  additionalNotes: {
    type: String,
    default: '',
  },
});

const ShopEmployee = mongoose.model("SEmployee", shopEmployeeSchema);
module.exports = ShopEmployee;
