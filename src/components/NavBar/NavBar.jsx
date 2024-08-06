import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../Utils/imges/logo.png";
import ButtonCarrito from './ButtonCarrito';
import ButtonAdmin from './AdminButton'

function NavBar({ onScroll }) {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth >= 640) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Agregar el listener de resize cuando el componente se monta
    window.addEventListener('resize', handleResize);
    return () => {
      // Remover el listener de resize cuando el componente se desmonta
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseLeave = (event) => {
      // Cierra el menú si el mouse sale del área del menú y no está sobre el botón
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.relatedTarget) &&
        !buttonRef.current.contains(event.relatedTarget)
      ) {
        closeMenu();
      }
    };

    // Agregar el listener de mouseleave cuando el componente se monta
    document.addEventListener('mouseout', handleMouseLeave);
    return () => {
      // Remover el listener de mouseleave cuando el componente se desmonta
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isMenuOpen]);

  return (

    <nav id="inicio" className='animate-slideDown bg-navBarColor/[.5] w-full fixed   h-[3.3rem] flex flex-row justify-between '>
      <button
        ref={buttonRef}
        data-collapse-toggle="navbar-hamburger"
        type="button"
        className="sm:hidden inline-flex items-center justify-center p-2 w-10 h-10 ml-3 mt-2 mb-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
        aria-controls="navbar-hamburger"
        aria-expanded={isMenuOpen}
        onClick={handleMenuToggle}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
        
      </button>
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } flex items-center justify-between ml-[-1.5rem] mt-[7.5rem] sm:ml-0 sm:mt-0 sm:flex w-full`}
        id="navbar-hamburger"
      >
        <a className='hidden sm:flex items-center' href="https://www.ecoplantas.com.ar/">
          <img className="h-[2.2rem] w-[2.2rem] m-[1rem] rounded-lg" src={logo} alt="cv" />
          <h2 className='hidden md:block text-2xl'>Eco Plantas</h2>
        </a>

        <ul className="bg-slate-800 divide-gray-100 sm:bg-transparent flex flex-col sm:flex-row text-center justify-center rounded-md border-2 sm:border-none border-slate-300">
          <li className='hover:bg-gray-500 sm:hover:bg-transparent w-full rounded-md'>
            <button
              className='btnNav text-[1rem] sm:text-lg lg:text-xl sm:w-30 w-24 h-8 sm:hover:text-blue-700'
              onClick={() => {
                closeMenu(); // Primero, llama a la función closeMenu
                navigate('/');
                onScroll('inicio'); // Luego, llama a la función onScroll con el parámetro 'about-me'
              }}
            >
              Inicio
            </button>
          </li>
          <li className='hover:bg-gray-500 sm:hover:bg-transparent w-full rounded-md'>
            <button
              className='btnNav text-white text-[1rem] sm:text-lg lg:text-xl sm:w-40 w-24 h-8 sm:hover:text-blue-700'
              onClick={() => {
                closeMenu(); // Primero, llama a la función closeMenu
                navigate('/historia'); 
                onScroll('inicio')
              }}
            >
              Quiénes Somos
            </button>
          </li>
          <li className='hover:bg-gray-500 sm:hover:bg-transparent w-full rounded-md'>
            <button
              className='btnNav text-white text-[1rem] sm:text-lg lg:text-xl sm:w-30 w-24 h-8 sm:hover:text-blue-700 mr-1'
              onClick={() => {
                closeMenu(); // Primero, llama a la función closeMenu
                navigate('/contacto');
                onScroll('inicio')              }}
            >
              Contacto
            </button>
          </li>
          <li className='hover:bg-gray-500 sm:hover:bg-transparent w-full rounded-md'>
            <button
              className='btnNav text-white text-[1rem] sm:text-lg lg:text-xl sm:w-30 w-24 h-8 sm:hover:text-blue-700'
              onClick={() => {
                closeMenu(); // Primero, llama a la función closeMenu
                navigate('/catalogo');
                onScroll('inicio')              }}
            >
              Catálogo
            </button>
          </li>
        </ul>
      </div>

      {isMenuOpen?"":
      <div className='flex flex-row'>
        <ButtonCarrito onScroll={onScroll} />
        <ButtonAdmin onScroll={onScroll} />
      </div>}

    </nav>
  );
}

export default NavBar;