import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';
import Loading from './Loading';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8070/employees/get');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Error fetching employees');
        }
    };

    const handleDelete = (id) => {
        const confirmDeletion = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDeletion) {
            axios.delete(`http://localhost:8070/employees/delete/${id}`)
                .then(() => {
                    const updatedEmployees = employees.filter((employee) => employee._id !== id);
                    setEmployees(updatedEmployees);
                })
                .catch((error) => {
                    console.error('Error deleting employee:', error);
                });
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredEmployees = employees.filter(
        (employee) => 
            employee.name.toLowerCase().includes(searchQuery) || 
            employee.department.toLowerCase().includes(searchQuery)
    );

    if (isLoading) return <Loading />;

    return (
        <div className="employee-list-container">
            <h2>Employee List</h2>
            {error && <div className="error-message">{error}</div>}
            <input
                type="text"
                placeholder="Search by Name or Department"
                onChange={handleSearch}
                className="search-bar"
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>{employee.contactNumber}</td>
                            <td>
                                <button type="button" className="delete" onClick={() => handleDelete(employee._id)}>
                                    Delete
                                </button>
                                <button type="button" className="update">
                                    <Link to={`/empupdate/${employee._id}`} className="text-white">
                                        UPDATE
                                    </Link>
                                </button>
                                <button type="button" className="update">
                                    <Link to={`/viewemp/${employee._id}`} className="text-white">
                                        View
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
