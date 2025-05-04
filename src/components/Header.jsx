import { useState, useEffect } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Sobre Mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Habilidades", href: "#skills" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <>
      <header className="max-w-4xl mx-auto sticky top-0 z-50">
        <nav className="p-0 py-4">
          {/* bg-[rgba(2,35,89,0.9)] */}
          <ul
            className={`flex justify-around rounded-xl p-3 transition-all duration-300 ${
              isScrolled
                ? "bg-[rgba(0,0,10,0.7)] backdrop-blur"
                : "bg-transparent"
            }`}
          >
            {navLinks.map((navLink, index) => {
              return (
                <li key={index}>
                  <a href={navLink.href}>{navLink.name}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};
