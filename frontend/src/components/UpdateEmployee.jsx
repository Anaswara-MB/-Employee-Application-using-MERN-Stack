import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axiosInstance from '../axiosinterceptor';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    designation: '',
    location: '',
    salary: '',
    email: '',
    age: '',
  
  });

  const { id: employeeId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`http://localhost:4000/admin/employees/${employeeId}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, [employeeId]);

  const inputHandler = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const updateData = () => {
    axiosInstance.put(`http://localhost:4000/admin/employees/${employeeId}`, employee)
      .then((res) => {
        alert(res.data.message);
        navigate('/employees');
      })
      .catch(error => {
        console.error('Error updating employee:', error);
      });
  };

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 64px)", 
      backgroundImage: 'radial-gradient( circle farthest-corner at 10% 20%,  purple 0%, orange 90% )',
      padding: "20px",
    }}
  >
    <div
      style={{
        borderRadius: "20px",
        background: "rgba(230, 230, 255, 0.6)",
        padding: "20px",
        textAlign: "center",
        width: "80%",
        maxWidth: "600px",
      }}
    >
        <h1>Employees</h1>
        <div style={{ margin: "5%" }}>
          <TextField
            fullWidth
            variant='outlined'
            label="Name"
            name="name"
            value={employee.name || ''}
            onChange={inputHandler}
          />
          <br /><br />
          <TextField
            fullWidth
            variant='outlined'
            label="Designation"
            name="designation"
            value={employee.designation || ''}
            onChange={inputHandler}
          />
          <br /><br />
          <TextField
            fullWidth
            variant='outlined'
            label="Location"
            name="location"
            value={employee.location || ''}
            onChange={inputHandler}
          />
          <br /><br />
          <TextField
            fullWidth
            variant='outlined'
            label="Salary"
            name="salary"
            value={employee.salary || ''}
            onChange={inputHandler}
          />
          <br /><br />
          <TextField
            fullWidth
            variant='outlined'
            label="Email"
            name="email"
            value={employee.email || ''}
            onChange={inputHandler}
          />
          <br /><br />
          <TextField
            fullWidth
            variant='outlined'
            label="Age"
            name="age"
            value={employee.age || ''}
            onChange={inputHandler}
          />
          <br /><br />
       
        
          <Button
            variant='contained'
            color='primary'
            onClick={updateData}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
