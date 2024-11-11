import React from 'react';

const Card = ( {image, shadowOn} ) => {
  return (
    <div className=' rounded-md ml-5'>
      <div className='mb-4 flex justify-evenly'>
        <img src={image} alt="Imagen" className={`rounded-md h-[20rem] w-[100%] md:h-[15rem] md:w-[20rem] lg:w-[100%] lg:h-[20rem] `} />
      </div>
    </div>
  );
};

export default Card;
