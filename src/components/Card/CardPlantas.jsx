import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../../redux/catalogoSlice';
import { useLocation } from 'react-router-dom';
import Modal from './CardModalCatalogo'; //--



const CardPlantas = ({ id, title, description, imageUrl, category ,openModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin'; 
  const [isModalOpen, setIsModalOpen] = useState(false);  //--

  const openModalCatalogo = () => setIsModalOpen(true);  //--
  const closeModal = () => setIsModalOpen(false); //--


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

  const truncatedDescription = description.length > 40
  ? description.slice(0, 50) + ' ...'
  : description;

  return (
    <>
      {!isAdminPage && (
        <div  className='relative text-center rounded-md p-7 h-[25rem] w-[15rem] md:w-[18rem] lg:w-[18rem]'>
          <div className='absolute top-10 right-10 bg-white text-black border-2 border-gray-500 w-7 h-7 rounded flex items-center justify-center'>
            {element.cuantity}
          </div>
          <img src={imageUrl} alt='Imagen de la tarjeta' className='rounded-t-md w-full h-[15rem] object-cover' />
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

          <h1 className='h-[2.5rem] text-white flex items-center justify-center bg-green-700 text-sm md:text-lg lg:text-lg xl:text-lg  font-bold'>
            {title}
          </h1>
          <h4 className='h-12 text-balance overflow-hidden text-ellipsis line-clap-3 bg-green-700/20 p-2  text-[0.79rem] md:text-sm lg:text-sm '>
            {truncatedDescription}
          </h4>
          <button onClick={openModalCatalogo} className='h-10 w-full pb-2 text-balance overflow-hidden font-bold bg-green-700/20  rounded-b-md text-[0.79rem] md:text-sm lg:text-sm '>
            Leer mas
          </button>
        </div>
      )}
      {isAdminPage && (
        <div onClick={openModal} className='relative text-center rounded-md p-7 h-[25rem] w-[15rem] md:w-[18rem] lg:w-[18rem]'>
          <img src={imageUrl} alt='Imagen de la tarjeta' className='rounded-t-md w-full h-[15rem] object-cover' />
          <h1 className='h-[2.5rem] text-white flex items-center justify-center bg-green-700 text-sm md:text-lg lg:text-lg xl:text-lg  font-bold'>
            {title}
          </h1>
          <h4 className='h-12 text-balance overflow-hidden text-ellipsis line-clap-2 bg-green-700/20 p-2  text-[0.79rem] md:text-sm lg:text-sm rounded-b-md'>
            {truncatedDescription}
          </h4>
      </div>
    )}

    {!isAdminPage && (
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={title} 
        description={description} 
      />
      )}
    </>
  );
};

export default CardPlantas;
