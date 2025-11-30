import { useState, useRef, useEffect } from "react";
import { languageList } from "../i18n/ui";

export const AnimatedSelect = () => {
  const FLAG_MAP = {
    en: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/300px-Flag_of_the_United_States.svg.png",
    es: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/300px-Bandera_de_Espa%C3%B1a.svg.png",
  };

  const createLanguageOptions = (list) => {
    return Object.keys(list).map((code) => ({
      value: code,
      label: list[code],
      flagUrl: FLAG_MAP[code] || null,
    }));
  };

  const options = createLanguageOptions(languageList);

  const currentLang =
    typeof window !== "undefined"
      ? document.documentElement.lang || "en"
      : "es";

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === currentLang) || options[0]
  );

  const containerRef = useRef(null);
  // Anchos para el cálculo de centrado (en píxeles)
  const DROPDOWN_WIDTH = 200;
  const CLOSED_WIDTH = 56; // Más reducido (antes 60)

  // Cálculo para centrar el dropdown grande sobre el botón pequeño
  const OFFSET_LEFT = (DROPDOWN_WIDTH - CLOSED_WIDTH) / 2;

  // Lógica para cerrar al hacer clic fuera
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Manejador de la selección
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Clases CSS dinámicas para la posición y transición del dropdown
  const dropdownStyle = {
    // Fija el ancho del dropdown
    width: `${DROPDOWN_WIDTH}px`,
    // Fija la posición horizontal para el centrado
    left: `-${OFFSET_LEFT}px`,
    // Control de la animación de apertura (max-height y opacidad)
    opacity: isOpen ? "1" : "0",
    transform: isOpen ? "translateY(0)" : "translateY(-5px)",
    maxHeight: isOpen ? "300px" : "0",
  };

  return (
    <div
      className="relative font-sans"
      style={{ width: `${CLOSED_WIDTH}px` }}
      ref={containerRef}
    >
      {/* 1. Botón de alternancia (Compacto: solo Bandera) */}
      <button
        className={`group
          flex justify-between items-center w-full py-1 px-2 
          border border-gray-600/30
          rounded-md cursor-pointer text-base transition-all duration-200 
          bg-gray-800/40 hover:bg-gray-700/50 
          backdrop-blur-sm shadow-md 
          ${isOpen ? "border-blue-400" : ""} 
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span id="selected-value-display">
          {/* Muestra la Bandera de la opción seleccionada (IMAGEN) */}
          <img
            src={selectedOption.flagUrl}
            alt={`Bandera de ${selectedOption.label}`}
            className={`w-6 h-4.5 rounded-xs object-cover block transition-filter duration-200 group-hover:saturate-100 ${
              isOpen ? "saturate-100" : "saturate-50"
            }`}
          />
        </span>

        {/* Flecha indicadora */}
        <span
          className={`text-xs ml-0.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* 2. Dropdown (Bandera + Idioma) */}
      <ul
        id="select-dropdown"
        className="absolute top-full z-10 list-none p-0 mt-1 m-0 
                   border border-blue-400/50 
                   rounded-md 
                   bg-gray-800/60 
                   text-gray-100 backdrop-blur-md 
                   shadow-xl transition-all duration-300 ease-out overflow-hidden"
        style={dropdownStyle}
      >
        {options.map((option) => (
          <a
            onClick={(e) => {
              if (option.value == selectedOption.value) {
                e.preventDefault();
              }
            }}
            key={option.value}
            href={`/${option.value}`}
          >
            <li
              data-value={option.value}
              className={`${
                option.value == selectedOption.value
                  ? "saturate-85 bg-gray-700/70"
                  : "saturate-20"
              } transition-filter duration-200 hover:saturate-100 select-option flex items-center py-3 px-4 cursor-pointer transition-colors hover:bg-gray-700/90`}
              onClick={() => handleOptionClick(option)}
            >
              {/* Bandera + Palabra */}
              <img
                src={option.flagUrl}
                alt={`Bandera de ${option.label}`}
                className="w-8 h-6 object-cover rounded-xs mr-3"
              />
              <span className="text-sm">{option.label}</span>
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};
