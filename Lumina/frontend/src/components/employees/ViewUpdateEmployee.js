import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../src/lumina.png'; // Make sure the logo path is correct

const ViewUpdateEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        age: 18,
        department: '',
        position: '',
        hireDate: '',
        address: '',
        contactNumber: '',
        emergencyContact: '',
        workDays: 5,
        hourlyRate: 0,
        additionalNotes: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch the employee details using the ID from the URL
        axios
          .get(`http://localhost:8070/employees/get/${id}`)
          .then((res) => {
            const employeeData = res.data.employee;
            setEmployee(employeeData);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [id]);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
          ...employee,
          [name]: value,
        });
      };

    const updateEmployeeDetails = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/employees/update/${id}`, employee);
            alert('Employee updated successfully');
        } catch (error) {
            console.error('Error updating employee:', error);
            setError('Error updating employee');
        }
    };

    const printPDF = () => {
        const doc = new jsPDF();
        
        // Add logo to PDF
        if (logo) {
            doc.addImage(logo, 'JPEG', 60, 25, 80, 35);
        }

        doc.setFontSize(15);
        doc.setTextColor(150, 0, 0);
        doc.text("Employee Details", 105, 70, null, null, 'center');

        // Define the table columns and rows
        const tableColumn = ["Field", "Information"];
        const tableRows = [];

        // Each field in the employee details
        Object.keys(employee).forEach(key => {
            const fieldName = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            tableRows.push([fieldName, employee[key]]);
        });

        // Add the table to PDF
        doc.autoTable(tableColumn, tableRows, { startY: 80 });

        // Save the PDF
        doc.save(`employee-${employee.name}.pdf`);
    };


    return (
        <div className="add-employee-container">
            <h2>View / Update Employee</h2>
            {error && <div className="error-message">{error}</div>}
            {/* <button onClick={printPDF} className="print-button">Print Details</button> */}
            <form onSubmit={updateEmployeeDetails} className="form">
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleInputChange} />
                    <input type="number" name="age" placeholder="Age" value={employee.age} onChange={handleInputChange} />
                    <input type="text" name="address" placeholder="Address" value={employee.address} onChange={handleInputChange} />
                </div>
                <div className="form-section">
                    <h3>Job Information</h3>
                    <input type="text" name="department" placeholder="Department" value={employee.department} onChange={handleInputChange} />
                    <input type="text" name="position" placeholder="Position" value={employee.position} onChange={handleInputChange} />
                    <input type="date" name="hireDate" placeholder="Hire Date" value={employee.hireDate} onChange={handleInputChange} />
                </div>
                <div className="form-section">
                    <h3>Contact Details</h3>
                    <input type="text" name="contactNumber" placeholder="Contact Number" value={employee.contactNumber} onChange={handleInputChange} />
                    <input type="text" name="emergencyContact" placeholder="Emergency Contact" value={employee.emergencyContact} onChange={handleInputChange} />
                </div>
                <div className="form-section">
                    <h3>Additional Information</h3>
                    <input type="number" name="workDays" placeholder="Work Days" value={employee.workDays} onChange={handleInputChange} />
                    <input type="number" name="hourlyRate" placeholder="Hourly Rate" value={employee.hourlyRate} onChange={handleInputChange} />
                    <textarea name="additionalNotes" placeholder="Additional Notes" value={employee.additionalNotes} onChange={handleInputChange} />
                </div>
                <button type="submit" className="submit-button">Update Employee</button>
                
            </form>
            
        </div>
    );
};

export default ViewUpdateEmployee;
