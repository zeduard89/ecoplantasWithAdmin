import {React, useRef } from 'react'
import {useState, useEffect} from 'react';
import filtrarPNG from '../Utils/admin/filtrado.png'
import FilterMenu from './FilterMenu';

const SmallScreenFilter = ({searchValues,handleChange}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    
      const closeMenu = () => {
        setIsMenuOpen(false);
      };

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
    
        document.addEventListener('mouseout', handleMouseLeave);
        return () => {
          document.removeEventListener('mouseout', handleMouseLeave);
        };
      }, [isMenuOpen]);

  return (
    <>
        <div className='lg:hidden w-full flex flex-col items-center justify-center text-black'>
            <input className='h-[3rem] w-[60%] text-black text-lg p-5 my-8 rounded-lg'
            name='search'
            type="search"
            placeholder="Buscar Producto"
            value={searchValues.search}
            onChange={handleChange}
            />
            <div className='relative w-full mb-10 flex flex-row justify-center items-center border-y-2 mt-2'>
                <button  
                    ref={buttonRef}
                    type="button"
                    className=" inline-flex items-center justify-center border-2 bg-gray-200 border-slate-400 p-2 w-fit h-fit mr-1 mt-2 mb-3 text-sm rounded-lg hover:bg-green-400/20 focus:outline-none  focus:ring-gray-200  "
                    aria-expanded={isMenuOpen}
                    onClick={handleMenuToggle}
                >
                    <img src={filtrarPNG} alt="filtrar" className='h-[2rem] my-1' />
                </button>
                <h2 className='text-2xl font-bold'>FILTRAR</h2>
                <FilterMenu menuRef={menuRef}  isMenuOpen={isMenuOpen} searchValues={searchValues} handleChange={handleChange}/>
            </div>
        </div>
    </>
  )
}

export default SmallScreenFilter
