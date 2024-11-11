import React from 'react';
import { useLocation } from 'react-router-dom';

const Card = ({ image }) => {
  const location = useLocation();

  return (
    <div className='rounded-md'>

        {location.pathname !== '/historia' ? (
          <div className='mb-4 ml-2 flex justify-evenly'>
            <img src={image} alt="Imagen" className='rounded-md h-[20rem] w-[20rem]  md:h-[15rem] md:w-[20rem]  lg:h-[20rem]' />
          </div>
        ) : (
          <div className='mb-4 flex justify-evenly'>
            <img src={image} alt="Imagen" className='rounded-md h-[20rem] w-[100%] md:h-[15rem] md:w-[20rem] lg:h-[20rem] lg:w-[80%]' />
          </div>
        )}
      
    </div>
  );
};

export default Card;
