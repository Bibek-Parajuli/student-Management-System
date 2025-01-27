import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Register.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Register Data:", data);

    // Backend API request
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>

        {/* Authentication Fields */}
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <select
            {...register("role", { required: "Role is required" })}
            defaultValue="Student"
          >
            {/* <option value="Student" disabled>
              
            </option> */}
            <option value="Student">Student</option>
            {/* <option value="Admin">Admin</option> */}
          </select>
          {errors.role && <span>{errors.role.message}</span>}
        </div>

        {/* Student Details Fields */}
        <div>
          <input
            type="text"
            placeholder="Roll Number"
            {...register("rollNumber", { required: "Roll Number is required" })}
          />
          {errors.rollNumber && <span>{errors.rollNumber.message}</span>}
        </div>
        <div>
          <select
            {...register("class", { required: "class is required" })}
            defaultValue=""
          >
            <option value="" disabled>
              Select Class Room
            </option>
            <option value="CSIT-III">CSIT-III</option>
            <option value="CSIT-V">CSIT-V</option>
          </select>{" "}
          {errors.class && <span>{errors.class.message}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Student Phone Number"
            {...register("studentPhone", {
              required: "Student Phone Number is required",
            })}
          />
          {errors.studentPhone && <span>{errors.studentPhone.message}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Guardian Name"
            {...register("guardianName", {
              required: "Guardian Name is required",
            })}
          />
          {errors.guardianName && <span>{errors.guardianName.message}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Guardian Contact Number"
            {...register("guardianContact", {
              required: "Guardian Contact Number is required",
            })}
          />
          {errors.guardianContact && (
            <span>{errors.guardianContact.message}</span>
          )}
        </div>
        <div>
          <input
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          ></input>
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
