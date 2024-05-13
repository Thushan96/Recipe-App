import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Favourite = () => {
  interface favorites{
    idMeal:string;
    title:string;
    category:string;
    imageUrl:string;
    instructions:string;
  }
  const [data,setData]=useState<favorites[]>([]);

  const router =useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem("userId");
      if (id) {
        const token = localStorage.getItem("token");
        console.log(token, id);
  
        if (!token) {
          console.error("Token is not available");
          return;
        }
          const url = `https://receipt-app-backend-production.up.railway.app/api/recipes/favorites/${id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });
  
        console.log(response);
        const recipe = await response.json();
        setData(recipe);
      }
    };
  
    fetchData();
  }, []);


  return (
    <>
    <Navbar/>
    <div id="fav" className="w-full lg:max-h-full p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  md:mt-18 mb-8 md:mb-12 gap-4 md:gap-6 mt-[7rem] ">
          {data.map((item, index) => (
            <div key={index}>
              <div className="bg-[#d9d9d9] w-[10rem] h-[10rem] p-2 shadow-xl rounded-xl hover:scale-110 ease-in duration-300">
              <Image
                 src={item.imageUrl}
                  width={200}
                  height={200}
                  alt={item.title}
                />
              </div>
              
              <div className="flex items-center  mt-4">
                <p className="mr-2">{item.category}</p>
                <span className="text-pink-600 text-lg ">
                  <CiHeart />
                </span>
              </div>
              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Favourite;
