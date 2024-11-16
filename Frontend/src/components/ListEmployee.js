import React from 'react';
import EmployeeService from '../services/EmployeeService';
import {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import '../styles/EmployeeTable.css';

function ListEmployee() {

   const [employees, setEmployees]= useState([]);
   
    useEffect(() =>{    
        getAllEmployees();
   
    }, [])
   

   const getAllEmployees = ()=>{
        EmployeeService.getEmployees()
        .then((res) =>{
            setEmployees(res.data);
            console.log(res.data)
        })
        .catch(error =>{
            console.log(error);
        })
    }
   
   const deleteEmployee = (employeeId)=>{
        console.log(employeeId);
        EmployeeService.deleteEmployee(employeeId)
        .then((response)=>{
            console.log(response.data)
            getAllEmployees();
        })
        .catch(error =>{
            console.log(error.response.data);
        })
    }

    return (
        <div className="container">
            <h2 className="text-center">Employee List</h2>
            <div className=" rows">
                <table className="table-container" >
                    <thead>
                        <tr>
                            <th>Employee Id </th>
                            <th>First Name </th>
                            <th>Last Name </th>
                            <th>Email</th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                employee =>
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                     <Link className="btn btn-info" to={`/edit-employee/${employee.id}`} >Update</Link>
                                     <button className = "btn btn-danger" onClick = {() => deleteEmployee(employee.id)}
                                        style = {{marginLeft:"10px"}}> 
                                        Delete
                                    </button>
                                     
                                </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
             </div>
        </div>
    );
}

export default ListEmployee;