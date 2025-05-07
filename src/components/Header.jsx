import { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-25% 0px -75% 0px",
    };

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Habilidades", href: "#skills" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <>
      {/* Desktop */}
      <header className="hidden md:block max-w-4xl mx-auto sticky top-0 z-50">
        <nav className="p-0 pb-8 pt-6">
          <ul
            className={`font-medium flex justify-around rounded-xl p-3 transition-all duration-300 ${
              isScrolled
                ? "bg-[rgba(0,0,10,0.7)] backdrop-blur"
                : "bg-transparent"
            }`}
          >
            {navLinks.map((navLink, index) => {
              return (
                <li
                  key={index}
                  className={`relative transition duration-300 hover:text-blue-400 ${
                    activeSection === navLink.href ? "text-blue-400" : ""
                  }`}
                >
                  <a href={navLink.href}>{navLink.name}</a>
                  <div
                    className={`absolute w-full h-0.5 -bottom-[8%] left-0 bg-blue-400 transition-all duration-300 origin-left ${
                      activeSection === navLink.href
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  ></div>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Mobile */}
      <button
        onClick={() => {
          setIsMenuOpen(true);
        }}
        className="block md:hidden fixed top-3 right-3 z-40 p-2 bg-[linear-gradient(145deg,#5e697b80,#5e698b33)] backdrop-blur-md rounded-full transition-all duration-300 hover:bg-[linear-gradient(145deg,#5e697bc0,#5e698b73)] cursor-pointer"
      >
        <AlignJustify className="w-8 h-8" />
      </button>
      <div
        className={`md:hidden block fixed top-0 left-0 z-50 w-full h-[110vh] bg-[linear-gradient(145deg,#060B5C90,#5e698b93)] backdrop-blur-lg transition duration-500 ease-out ${
          isMenuOpen ? "" : "-translate-y-full"
        }`}
      >
        <button
          className="absolute cursor-pointer top-3 right-3 p-2 rounded-full border border-blue-400"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <X className="w-8 h-8" />
        </button>
        <ul className="absolute top-[50vh] left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 flex flex-col gap-8 justify-center items-center">
          {navLinks.map((navLink, index) => {
            return (
              <li
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                key={index}
                className={`relative text-xl font-medium transition duration-300 hover:text-blue-400 ${
                  activeSection === navLink.href ? "text-blue-400" : ""
                }`}
              >
                <a href={navLink.href}>{navLink.name}</a>
                <div
                  className={`absolute w-full h-0.5 -bottom-[8%] left-0 bg-blue-400 transition-all duration-300 origin-left ${
                    activeSection === navLink.href ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
