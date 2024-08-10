import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../../redux/catalogoSlice';
import { useLocation } from 'react-router-dom';


const CardPlantas = ({ id, title, description, imageUrl, category ,openModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin'; 

  let element = useSelector((state) => state.catalogo[category]);
  element = element?.find(item => item.title === title)
  
  const handleIncrement = () => {
    dispatch(increment({ title, category}));
  };

  const handleDecrement = () => {
    dispatch(decrement({ title, category }));
  };

  if (!imageUrl) {
    console.error('Image is undefined or null');
    return null;
  }

  return (
    <div onClick={openModal} className='relative text-center rounded-md p-7 h-[25rem] w-[15rem] md:w-[18rem] lg:w-[18rem]'>
      {!isAdminPage && (
        <>
        <div className='absolute top-10 right-10 bg-white text-black border-2 border-gray-500 w-7 h-7 rounded flex items-center justify-center'>
          {element.cuantity}
        </div>
        </>
      )}
      <img src={imageUrl} alt='Imagen de la tarjeta' className='rounded-t-md w-full h-[15rem] object-cover' />
      {!isAdminPage && (
        <>
          <button 
            className='absolute bottom-[6.7rem] left-9 w-6 h-6 rounded text-4xl  text-white'
            onClick={handleIncrement}
            aria-label='Increment'
          >
            +
          </button>
          <button 
            className='absolute bottom-[6.9rem] right-9 w-6 h-6 rounded text-4xl  text-white'
            onClick={handleDecrement}
            aria-label='Decrement'
          >
            -
          </button>
          <h1 className='h-[2.5rem] rounded-b-md text-white flex items-center justify-center bg-green-700 text-sm md:text-lg lg:text-lg xl:text-lg  font-bold'>
                {title}
          </h1>
        </>
      )}
      {isAdminPage && (
        <>
          <h1 className='h-[2.5rem] text-white flex items-center justify-center bg-green-700 text-sm md:text-lg lg:text-lg xl:text-lg  font-bold'>
            {title}
          </h1>
          <h4 className='h-[30%] bg-green-700/20 p-2 rounded-b-md text-[0.79rem] md:text-sm lg:text-sm overflow-hidden text-ellipsis'>
            {description}
          </h4>
        </>
      )}
    </div>
  );
};

export default CardPlantas;



