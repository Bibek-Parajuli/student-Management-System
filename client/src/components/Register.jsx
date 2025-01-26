import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/Register.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Register Data:', data);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
