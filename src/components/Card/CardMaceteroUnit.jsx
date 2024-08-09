import React from 'react';

const CardMaceteroUnit = ({ title, description, base, altura, largo, imageUrl }) => {
  return (
    <div className='relative text-center rounded-md p-7  w-[23rem]'>
      <div className=' h-[15rem] '>
        <img 
          src={imageUrl} 
          alt="foto" 
          className='w-full h-full object-cover rounded-t-md' 
        />
      </div>

      <h1 className='h-[2.5rem] flex items-center justify-center text-white bg-green-700 text-lg font-bold'>{title}</h1>
      <div className='bg-green-700/20 rounded-b-md text-[0.79rem] md:text-sm lg:text-sm overflow-hidden text-ellipsis text-left p-2'>
        <p>Base: {base} mm</p>
        <p>Altura: {altura} mm</p>
        <p>Largo: {largo} mm</p>
      </div>
    </div>
  );
};

export default CardMaceteroUnit;

