import { useState, useEffect } from "react";

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
      rootMargin: "-30% 0px -70% 0px",
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
      <header className="max-w-4xl mx-auto sticky top-0 z-50">
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
                  className={`transition duration-300 hover:text-[#60a5fa] ${
                    activeSection === navLink.href ? "text-[#60a5fa]" : ""
                  }`}
                >
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
