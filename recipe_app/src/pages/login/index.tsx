import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  interface FormData {
    email: string;
    password: string;
  }

  interface FormErrors {
    email?: string;
    password?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPasswordCorrect(true);

    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {

      try {
        const response = await fetch("https://receipt-app-backend-production.up.railway.app/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();
        localStorage.setItem("token",data.token);
        localStorage.setItem("userId",data.userId);                
        if (!response.ok) {
          setIsPasswordCorrect(false);
        }
        if(response.ok){
          login();
          router.push('/dashboard');
        }

      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center items-center">
            <Image src={logo} width={200} height={200} alt="/" />
          </div>

          <h2 className="text-lg font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
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
            <div className="mt-4">
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
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="bg-[#eb6686] text-white px-4 py-2 rounded-md hover:bg-[#e898a9] w-full"
              >
                Sign In
              </button>
            </div>
          </form>
          { isPasswordCorrect === false && (
            <p className="text-red-500 text-center text-sm mt-1">{"Invalid username or password"}</p>
          )}

          <div className="flex justify-center items-center">
            <p className="text-sm font-normal mt-4">
            Don&apos;t have an account?{" "}
              <Link className="link text-[#eb6686]" href="signup">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
