import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../Utils/imges/logo.png";
import email from '../Utils/Logos/gmail.png'
import instagram from '../Utils/Logos/instagram.png'
import whatsapp from '../Utils/Logos/whatsapp.png'
import './footer.css'

const VITE_USER_NUMBER1 = import.meta.env.VITE_USER_NUMBER1;
const VITE_USER_NUMBER2 = import.meta.env.VITE_VITE_USER_NUMBER2;
const VITE_USER_INSTAGRAM = import.meta.env.VITE_USER_INSTAGRAM;
const VITE_USER_EMAIL = import.meta.env.VITE_USER_EMAIL;
const VITE_SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL;

const Footer = () => {
  
  const navigate = useNavigate();
  
  return (
    
  <footer className="w-full bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
      
    <div className="md:h-[2rem] h-[3rem] flex items-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 justify-between">
      <a className='flex items-center' href="https://www.ecoplantas.com.ar/">
          <img className="mr-3 h-4 w-4" src={logo} alt="logo" />
          <h1 className='flex items-center font-semibold uppercase'>Eco Plantas</h1>
        </a>
      <div className='flex flew-row items-center'>
          <span className='mr-2 hidden md:block'>Mantengamos contacto por medio de nuestras Redes:</span>
          <a href={VITE_USER_INSTAGRAM} target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="instagram" className='h-[1.5rem] mr-2 hover:bg-red-300 border-1 rounded '/> 
          </a>
          <a href={`https://wa.me/${VITE_USER_NUMBER1}`} target="_blank" rel="noopener noreferrer">
            <img src={whatsapp} alt="whatsapp ico" className='h-[1.5rem] mr-2 hover:bg-lime-500 border-1 rounded-md' />
          </a>
          <a href={`mailto:${VITE_USER_EMAIL}`}>
            <img src={email} alt="email icon" className='h-[1.5rem] mr-2 hover:bg-rose-500 border-1 rounded' />
          </a>
      </div>
    </div>

    {/* <!--Copyright section--> */}
    <div className="bg-neutral-200 p-1 text-center dark:bg-neutral-700">
      <span>© 2024 Copyright:</span>
      <a
        className="font-semibold text-neutral-600 dark:text-neutral-400"
        href={`mailto:${VITE_SUPPORT_EMAIL}`}
      > zEduard89</a>
    </div>
  </footer>

  )
}

export default Footer
