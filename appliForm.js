import React, { useState } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    schoolName: '',
    schoolAddress: '',
    schoolCity: '',
    schoolState: '',
    schoolPincode: '',
    teacherName: '',
    teacherEmail: '',
    modelType: '',
    participationType: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.studentName) formErrors.studentName = 'Student Name is required';
    if (!formData.schoolName) formErrors.schoolName = 'School Name is required';
    if (!formData.schoolAddress) formErrors.schoolAddress = 'School Address is required';
    if (!formData.schoolCity) formErrors.schoolCity = 'City is required';
    if (!formData.schoolState) formErrors.schoolState = 'State is required';
    if (!formData.schoolPincode || !/^\d{6}$/.test(formData.schoolPincode)) {
      formErrors.schoolPincode = 'Pincode must be a 6-digit number';
    }
    if (!formData.teacherName) formErrors.teacherName = 'Teacher Name is required';
    if (!formData.teacherEmail || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.teacherEmail)) {
      formErrors.teacherEmail = 'A valid email is required';
    }
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        // Reset form data
        setFormData({
          studentName: '',
          schoolName: '',
          schoolAddress: '',
          schoolCity: '',
          schoolState: '',
          schoolPincode: '',
          teacherName: '',
          teacherEmail: '',
          modelType: '',
          participationType: ''
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        alert(`Error submitting the application: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error: Unable to submit the application.');
    }
  };

  return (
    <div>
      <h1>Science Day Application Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Student Name:</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
        />
        {errors.studentName && <p>{errors.studentName}</p>}<br />

        <label>School Name:</label>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleChange}
        />
        {errors.schoolName && <p>{errors.schoolName}</p>}<br />

        <label>School Address:</label>
        <input
          type="text"
          name="schoolAddress"
          value={formData.schoolAddress}
          onChange={handleChange}
        />
        {errors.schoolAddress && <p>{errors.schoolAddress}</p>}<br />

        <label>City:</label>
        <input
          type="text"
          name="schoolCity"
          value={formData.schoolCity}
          onChange={handleChange}
        />
        {errors.schoolCity && <p>{errors.schoolCity}</p>}<br />

        <label>State:</label>
        <input
          type="text"
          name="schoolState"
          value={formData.schoolState}
          onChange={handleChange}
        />
        {errors.schoolState && <p>{errors.schoolState}</p>}<br />

        <label>Pincode:</label>
        <input
          type="text"
          name="schoolPincode"
          value={formData.schoolPincode}
          onChange={handleChange}
        />
        {errors.schoolPincode && <p>{errors.schoolPincode}</p>}<br />

        <label>Teacher Name:</label>
        <input
          type="text"
          name="teacherName"
          value={formData.teacherName}
          onChange={handleChange}
        />
        {errors.teacherName && <p>{errors.teacherName}</p>}<br />

        <label>Teacher Email:</label>
        <input
          type="email"
          name="teacherEmail"
          value={formData.teacherEmail}
          onChange={handleChange}
        />
        {errors.teacherEmail && <p>{errors.teacherEmail}</p>}<br />

        <label>Model Type:</label>
        <input
          type="text"
          name="modelType"
          value={formData.modelType}
          onChange={handleChange}
        /><br />

        <label>Participation Type:</label>
        <input
          type="text"
          name="participationType"
          value={formData.participationType}
          onChange={handleChange}
        /><br />

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
