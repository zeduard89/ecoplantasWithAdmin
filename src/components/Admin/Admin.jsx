import React, { useRef, useState } from 'react';
import CardPlantas from '../Card/CardPlantas';
import filtrarPNG from '../Utils/admin/filtrado.png'
import orderPNG from '../Utils/admin/orderBy.png'
import { useSelector } from 'react-redux';


const Admin = () => {

  const catalogo = useSelector((state) => state.catalogo);
  const [searchValues, setSearchValues] = useState({
    product: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  return (
    <div className='mt-20 flex flex-col items-center	'>
      <input className='h-[3rem] w-[90%] text-black text-lg p-5 rounded-lg'
      name='product'
      type="text"
      placeholder="Busca Producto"
      onChange={handleChange}
      />
      <div className='md:hidden h-[3rem] w-full mt-6 flex items-center justify-center  text-black border-t-4 border-b-2'>
        <img src={filtrarPNG} alt="filtrar" className='h-[75%]  mr-2 mt-1' />
        <button className='text-2xl font-bold'>FILTRAR</button>
      </div>
      <div className='flex cols-2'>
        <div className='hidden md:block basis-[20%] lg:basis-[15%] h-[20rem] w-full mt-6  text-black border-4 border-b-2'>
          <div className='flex flex-row'>
            <img src={filtrarPNG} alt="filtrar" className='h-[2rem]  mx-2 my-1' />
            <button className='text-2xl font-bold'>FILTRAR</button>
          </div>
        </div>
        <div className="basis-[80%] lg:basis-[85%] flex flex-row justify-center flex-wrap">
          {catalogo.plantas.map((planta, index) => (
          <div key={index}>
            <CardPlantas {...planta} />
          </div>
                ))}
        </div>    
      </div>

          
      

      
    </div>
  )
}

export default Admin
