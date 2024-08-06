import React from 'react'
import { useNavigate } from 'react-router-dom';
import carrito from '../Utils/Logos/pngwing.com.png'
import { useSelector } from 'react-redux';


const ButtonCarrito = ({onScroll }) => {
    const navigate = useNavigate();

    const { plantas, macetas  } = useSelector((state) => state.catalogo);
    const maceteros20 = useSelector((state)=> state.catalogo.maceteros20);
    const maceteros30 = useSelector((state)=>state.catalogo.maceteros30);

    let plantsCount = Object.values(plantas).reduce((total, planta) => {
      const quantity = planta.cuantity || 0;
      return total + quantity;
    }, 0);

    let macetasCount = Object.values(macetas).reduce((total, macetas) => {
      const quantity = macetas.cuantity || 0;
      return total + quantity;
    }, 0);
    
    const totalItems = plantsCount + macetasCount + maceteros20 + maceteros30;


  return (
    <button
    className='h-8 relative btnNav text-white text-[1rem] sm:text-lg lg:text-xl  sm:hover:text-blue-700'
    onClick={() => {
      navigate('/Carrito');
      onScroll('servicios'); // Luego, llama a la función onScroll con el parámetro 'projects'
    }}
  >
  <img src={carrito} alt="buttomCarrito" className='h-[2.5rem] ml-5 mt-2' />
  <div className='absolute text-white text-[1rem] h-[0.8rem] w-[0.8rem] lg:right-[2.6rem] left-[2.3rem] lg:top-[0.65rem] md:top-[0.6rem] sm:top-[0.7rem] top-[0.75rem] '>{totalItems}</div>
  </button>
  )
}

export default ButtonCarrito
