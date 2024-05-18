import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUser, FaPhone, FaBriefcase, FaCalendarAlt, FaHome, FaBusinessTime } from 'react-icons/fa';
import './ViewEmployee.css'; 
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

    useEffect(() => {
        axios.get(`http://localhost:8070/employees/get/${id}`)
            .then((res) => {
                setEmployee(res.data.employee);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);


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
        <div className="employee-profile-container">
            <div className="employee-photo">
                <img src="/images/me.png" alt="Employee" />
            </div>
            <div className="employee-details">
                <h2><FaUser /> {employee.name || 'Employee Name'}</h2>
                <p><FaBriefcase /> <strong>Department:</strong> {employee.department || 'N/A'}</p>
                <p><FaBusinessTime /> <strong>Position:</strong> {employee.position || 'N/A'}</p>
                <p><FaCalendarAlt /> <strong>Hire Date:</strong> {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : 'N/A'}</p>
                <p><FaHome /> <strong>Address:</strong> {employee.address || 'N/A'}</p>
                <p><FaPhone /> <strong>Contact Number:</strong> {employee.contactNumber || 'N/A'}</p>
                <p><FaPhone /> <strong>Emergency Contact:</strong> {employee.emergencyContact || 'N/A'}</p>
                <p><FaBusinessTime /> <strong>Work Days:</strong> {employee.workDays || 'N/A'}</p>
                {/* <p><FaUser /> <strong>Hourly Rate:</strong> ${employee.hourlyRate || 'N/A'}</p>
                <p><strong>Additional Notes:</strong> {employee.additionalNotes || 'N/A'}</p> */}
                <button onClick={printPDF} className="print-button">Print Details</button>
            </div>
            
        </div>
        
        
    );
};

export default ViewUpdateEmployee;
