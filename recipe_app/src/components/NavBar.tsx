import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [shadow, setShadow] = useState<boolean>(false);
  const [navBg, setNavBg] = useState<string>("#ffffff");
  const [linkColor, setLinkColor] = useState<string>("#000000");
  const [activeLink, setActiveLink] = useState<string>("");

  const router = useRouter();

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const navigateTo = (route: string) => {
    router.push(route);
  };

  return (
    <div
      style={{ backgroundColor: `${navBg}` }}
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl z-[100]"
          : "fixed w-full h-20  z-[100]"
      }
    >
      <div className="flex justify-center items-center w-full h-full px-2 2xl:px-16">
        <div className="relative right-[25rem] top-1" onClick={() => navigateTo("/")}>
          <Image src={logo} width={200} height={200} alt="/" />
        </div>

        <div className="relative right-28">
          <ul style={{ color: `${linkColor}` }} className="hidden md:flex">
            <li
              className={`ml-10 text-sm   ${
                activeLink === "/dashboard" ? "font-bold" : ""
              }`}
              onClick={() => navigateTo("/dashboard")}
            >
              Home
            </li>
            <li
              className={`ml-10 text-sm   ${
                activeLink === "/favourite" ? "font-bold" : ""
              }`}
              onClick={() => navigateTo("/favourite")}
            >
              Favourite
            </li>
          </ul>

          <div onClick={handleNav} className="md:hidden">
            <AiOutlineMenu className="ml-[25rem]" size={25} />
          </div>
        </div>
      </div>
      <div
        className={
          nav ? "md:hidden fixed left-6 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#fdf8f9] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0  p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-[80%] items-center justify-between">
              <div onClick={() => navigateTo("/")}>
                <Image src={logo} width={100} height={100} alt="/" />
              </div>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg   shadow-gray-400 p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <li onClick={() => navigateTo("/dashboard")} className="py-4 test-sm">
                Home
              </li>
              <li onClick={() => navigateTo("/favourite")} className="py-4 test-sm">
                Favourite
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
