import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function CreateEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [errors, setErrors] = useState({}); // For error messages
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmailId(response.data.emailId);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    }, [id]);

    const validateForm = () => {
        const validationErrors = {};
        if (!firstName.trim()) validationErrors.firstName = 'First Name is required';
        if (!lastName.trim()) validationErrors.lastName = 'Last Name is required';
        if (!emailId.trim()) validationErrors.emailId = 'Email ID is required';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0; // True if no errors
    };

    const saveEmployee = (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Stop if validation fails

        const employee = { firstName, lastName, emailId };

        if (id) {
            EmployeeService.updateEmployee(id, employee)
                .then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            EmployeeService.createEmployee(employee)
                .then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    };

    const title = () => {
        return id ? (
            <h2 className="text-center">Update Employee</h2>
        ) : (
            <h2 className="text-center">Add Employee</h2>
        );
    };

    const buttonText = () => {
        return id ? 'Update' : 'Submit';
    };

    return (
        <div>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form>
                                {/* First Name */}
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className={`form-control ${
                                            errors.firstName ? 'is-invalid' : ''
                                        }`}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {errors.firstName && (
                                        <div className="invalid-feedback">{errors.firstName}</div>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="form-group mb-2">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className={`form-control ${
                                            errors.lastName ? 'is-invalid' : ''
                                        }`}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {errors.lastName && (
                                        <div className="invalid-feedback">{errors.lastName}</div>
                                    )}
                                </div>

                                {/* Email ID */}
                                <div className="form-group mb-2">
                                    <label className="form-label">Email ID:</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email ID"
                                        name="emailId"
                                        className={`form-control ${
                                            errors.emailId ? 'is-invalid' : ''
                                        }`}
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                    />
                                    {errors.emailId && (
                                        <div className="invalid-feedback">{errors.emailId}</div>
                                    )}
                                </div>

                                <button
                                    className="btn btn-success"
                                    onClick={(e) => saveEmployee(e)}
                                >
                                    {buttonText()}
                                </button>
                                <Link to="/employees" className="btn btn-danger ml-2">
                                    Cancel
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEmployee;
