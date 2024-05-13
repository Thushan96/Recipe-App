import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const router = useRouter();
  const { login } = useAuth();

  const signup=async (username:string,password:string) =>{
    if(username && password){      
      const response = await fetch(`https://receipt-app-backend-production.up.railway.app/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
    }else{
      toast.error("failed to register user");
    }
  }

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }

  interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      signup(formData.firstName, formData.password);
      login();
      router.push("/dashboard")
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center items-center">
            <Image src={logo} width={200} height={200} alt="/" />
          </div>

          <h2 className="text-lg font-semibold mb-4 ">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: 'small' }
                  }}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: 'small' } 
                  }}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
              <div>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: 'small' }
                  }}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: 'small' } 
                  }}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div>
                <TextField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: 'small' }
                  }}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  type="password"
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: 'small' }
                  }}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#eb6686] text-white px-4 py-2 rounded-md hover:bg-[#e898a9] mt-4"
            >
              Create Account
            </button>
          </form>

          <div className="flex justify-center items-center">
            <p className="text-sm font-normal mb-4 ">
              Already have an account?{" "}
              <Link className="link text-[#eb6686]" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default Register;
