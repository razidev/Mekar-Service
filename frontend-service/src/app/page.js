'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    identity_number: '',
    email: '',
    date_of_birth: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.identity_number) formErrors.identity_number = 'Identity Number is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    }
    if (!formData.date_of_birth) formErrors.date_of_birth = 'Date of Birth is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:8080/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          Swal.fire({
            title: 'Success!',
            text: 'Form submitted successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } else {
          const errorResult = await response.json();
          Swal.fire({
            title: 'Error!',
            text: `Failed to submit the form: ${errorResult.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred during submission',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div>
      <h1>Submit the Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Identity Number:</label>
          <input
            type="text"
            name="identity_number"
            value={formData.identity_number}
            onChange={handleChange}
          />
          {errors.identity_number && <p>{errors.identity_number}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
          {errors.date_of_birth && <p>{errors.date_of_birth}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
