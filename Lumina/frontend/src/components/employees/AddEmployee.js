import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddEmployee.css';
import Loading from './Loading'; // Import the Loading component

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [workDays, setWorkDays] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !department || !position || !hireDate) {
      setError("Please fill in all required fields.");
      return;
    }

    const employeeData = {
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
    };

    axios.post('http://localhost:8070/employees/', employeeData)
            .then(() => {
                alert('Employee added successfully');
                window.location.href = '/ehome'; // navigate to /ehome
            })
            .catch(err => {
                console.error("Error adding employee:", err);
                setError("Error adding employee");
            });
    };




  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timer);
}, []);

if (isLoading) {
    return <Loading />;
}

  return (
    <div className="add-employee-container">
      <h2 className='h2'>ADD EMPLOYEE DETAILS</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-section">
          <h3>Job Information</h3>
          <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
          <input type="date" placeholder="Hire Date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
        </div>
        <div className="form-section">
          <h3>Contact Details</h3>
          <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
          <input type="text" placeholder="Emergency Contact" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
        </div>
        <div className="form-section">
          <h3>Additional Information</h3>

          <h5>Work Days</h5>
          <input type="number" placeholder="Work Days" value={workDays} onChange={(e) => setWorkDays(e.target.value)} />
          <h5>Hourly Rate</h5>
          <input type="number" placeholder="Hourly Rate" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} />
          <textarea placeholder="Additional Notes" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
        </div>
        <button type="submit" class="submit-button">Add Employee</button>

      </form>
    </div>
  );
};

export default AddEmployee;
