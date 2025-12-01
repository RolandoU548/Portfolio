import { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react";
import { useTranslations } from "../i18n/utils";
import type { languageList } from "../i18n/ui";
import { AnimatedSelect } from "./AnimatedSelect.jsx";

interface HeaderProps {
  currentLang: keyof typeof languageList;
}

export const Header = ({ currentLang }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const t = useTranslations(currentLang as keyof typeof languageList);

  useEffect(() => {
    // Ver si hay scroll para aumentar la opacidad del navbar
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    // Obtener sections
    const sections = document.querySelectorAll(".project-section");

    // Ver que sección esta observando el usuario
    const observerActiveSessionCallback = (entries: any[]) => {
      entries.forEach((entry: { isIntersecting: any; target: { id: any } }) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observerActiveSessionOptions = {
      rootMargin: "-25% 0px -75% 0px",
    };

    const observerActiveSession = new IntersectionObserver(
      observerActiveSessionCallback,
      observerActiveSessionOptions
    );

    sections.forEach((section) => observerActiveSession.observe(section));

    // Ver que sección se tiene que ejecutar su animación
    const observerScrollAnimationCallback = (
      entries: any[],
      observer: { unobserve: (arg0: any) => void }
    ) => {
      entries.forEach(
        (entry: {
          isIntersecting: any;
          target: {
            classList: { add: (arg0: any) => void };
            dataset: { animation: any };
          };
        }) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
            observer.unobserve(entry.target);
          }
        }
      );
    };

    const observerScrollAnimationOptions = {
      rootMargin: "-90% 0px -10% 0px",
    };

    const observerScrollAnimation = new IntersectionObserver(
      observerScrollAnimationCallback,
      observerScrollAnimationOptions
    );

    sections.forEach((section) => observerScrollAnimation.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerActiveSession.disconnect();
      observerScrollAnimation.disconnect();
    };
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  return (
    <>
      {/* Desktop */}
      <header className="navbar hidden md:block max-w-[95%] w-4xl left-1/2 -translate-x-1/2 fixed top-0 z-50 pointer-events-none">
        <nav className="flex items-center h-24">
          <ul
            className={`w-full font-medium flex justify-around rounded-xl p-3 transition-all duration-300 ${
              isScrolled
                ? "bg-[rgba(0,0,10,0.7)] backdrop-blur"
                : "bg-transparent"
            }`}
          >
            {navLinks.map((navLink, index) => {
              return (
                <li
                  key={index}
                  className={`relative ${
                    activeSection === navLink.href ? "text-blue-400" : ""
                  }`}
                >
                  <a
                    href={navLink.href}
                    className="transition duration-300 hover:text-blue-400"
                  >
                    {navLink.name}
                  </a>
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
            <li>
              <AnimatedSelect currentLang={currentLang} />
            </li>
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
        className={`md:hidden block fixed top-0 left-0 z-50 w-full h-[110vh] bg-[linear-gradient(145deg,#060B5C70,transparent)] backdrop-blur-lg transition duration-500 ease-out ${
          isMenuOpen ? "" : "-translate-y-full"
        }`}
      >
        <button
          className="absolute cursor-pointer top-3 right-3 p-2 rounded-full bg-[linear-gradient(145deg,#5e697b80,#5e698b33)] transition-all duration-300 hover:bg-[linear-gradient(145deg,#5e697bc0,#5e698b73)]"
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
                key={index}
                className={`relative text-xl font-medium ${
                  activeSection === navLink.href ? "text-blue-400" : ""
                }`}
              >
                <a
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  href={navLink.href}
                  className="transition duration-300 hover:text-blue-400"
                >
                  {navLink.name}
                </a>
                <div
                  className={`absolute w-full h-0.5 -bottom-[8%] left-0 bg-blue-400 transition-all duration-300 origin-left ${
                    activeSection === navLink.href ? "scale-x-100" : "scale-x-0"
                  }`}
                ></div>
              </li>
            );
          })}
          <li>
            <AnimatedSelect
              currentLang={currentLang as keyof typeof languageList}
            />
          </li>
        </ul>
      </div>
    </>
  );
};
