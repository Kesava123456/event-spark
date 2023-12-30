import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send the form data to the server (backend)
      await axios.post('http://localhost:3001/submit', data);
      alert('Data submitted successfully!');
    } catch (error) {
      alert('Error submitting data. Please try again later.');
      console.error(error);
    }
  };

  // Form validation rules
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const isPasswordMatch = password === confirmPassword;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='signin'>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: true })} />
        {errors.name && <span>Name is required</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register('email', {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email && <span>Invalid email address</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          {...register('password', {
            required: true,
            minLength: 6,
          })}
          type="password"
        />
        {errors.password && <span>Password must be at least 6 characters</span>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          {...register('confirmPassword', {
            required: true,
            minLength: 6,
            validate: (value) => value === password,
          })}
          type="password"
        />
        {errors.confirmPassword?.type === 'minLength' && (
          <span>Password must be at least 6 characters</span>
        )}
        {!isPasswordMatch && <span>Passwords do not match</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
