import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import Image from "next/image";
import Data from "@/Data/Data";
import Navbar from "@/components/NavBar";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


interface FoodItem {
  name: string
  image: string;
  description: string;
}

const Main: React.FC = () => {
  const router =useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  interface Reciept{
    idMeal: string,
    title: string,
    imageUrl : string
  }

  const [currentCategory, setCurrentCategory] = useState("Beef");
  const [selectedButton, setSelectedButton] = useState("Beef");
  const [dessertData,setDessertData] = useState<Reciept[]>([]);

  const addtoFavorite=async (id:string) =>{
    if(id){
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(token , userId);
      
      if (!token) {
        console.error("Token is not available");
        return;
      }
      const response = await fetch(`https://receipt-app-backend-production.up.railway.app/api/recipes/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          userId: userId,
          recipeId: id
        })
      });
      console.log(response);
      toast.success("Added to favorites");

    }
  }

  const categoryData= [
    "Beef",
    "Chicken",
    "Dessert",
    "Lamb",
    "Pasta"
  ];

  useEffect(() => {
    const login = async () => {
      try {
        const response = await fetch(`https://receipt-app-backend-production.up.railway.app/api/recipes?category=${currentCategory}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error("Failed to login");
        }

        const data = await response.json();
        setDessertData(data);     
      } catch (err) {
        console.error(err);
      }
    };

    login();
  }, [currentCategory]);




  return (
   
    <>
      <Navbar/>
    <div id="dashboard" className="w-full lg:max-h-full p-2 ">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  md:mt-18 md:mb-12 gap-4 md:gap-6 mt-24 mb-12">
        {categoryData.map((category, index) => (
        <button
          key={index}
          className={`menu-btn py-2 px-4 w-[8rem] ${
            selectedButton === category
              ? "text-white bg-[#eb6686]"
              : "text-[#eb6686]"
          }`}
          onClick={() => {
            setCurrentCategory(category);
            setSelectedButton(category);
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-8 md:mt-16 mb-8 md:mb-12 gap-4 md:gap-6">
          {dessertData.map((item, index) => (
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
                <p className="mr-2">{currentCategory}</p>
                <span className="text-pink-600 text-lg hover:cursor-pointer" onClick={()=>{addtoFavorite(item.idMeal)}}>
                  <CiHeart />
                </span>
              </div>
              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Toaster />
    </>

  );
};

export default Main;
