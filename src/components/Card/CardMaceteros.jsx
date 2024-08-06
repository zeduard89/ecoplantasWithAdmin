import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementMaceterosL, incrementMaceterosL, reset } from '../../redux/catalogoSlice';
import Carrousel from '../Home/Carrousel';

const CardMaceteros = ({maceteros }) => {

    const imgArray = [];
        
    const dispatch = useDispatch();
    let maceteros20Count = useSelector((state) => state.catalogo.maceteros20);
    let maceteros30Count = useSelector((state) => state.catalogo.maceteros30);
    const title = maceteros[0]?.title || "";

    const handleIncrement = () => {
        dispatch(incrementMaceterosL({ title }));
    };

    const handleDecrement = () => {
        dispatch(decrementMaceterosL({ title }));
    };

    maceteros.forEach(element => {
      if (!element.imgUrl) {
        console.error('Image is undefined or null');
        return;
      } else {
        imgArray.push(element.imgUrl);
      }
    });

    return (

    <div className='relative text-center rounded-md p-7 '>
        
        <div className='absolute z-50 top-10 right-10 font-bold bg-green-700/80 border-2 border-gray-500 w-7 h-7 rounded flex items-center justify-center'>
            {title.includes('20')?maceteros20Count:maceteros30Count}
        </div>
        <div className='h-[20rem] rounded-t-md object-cover'>
          <Carrousel image={imgArray} />
        </div>
        
        
        <button 
        className='absolute bottom-[6.3rem] left-9 w-6 h-6 rounded text-4xl  text-white'
        onClick={handleIncrement}
        aria-label='Increment'
      >
        +
      </button>
      <button 
        className='absolute bottom-[6.3rem] right-9 w-6 h-6 rounded text-4xl  text-white'
        onClick={handleDecrement}
        aria-label='Decrement'
      >
        -
      </button>

        <h1 className='h-[2.5rem] text-white place-content-center bg-green-700 text-lg font-bold '>
        {title.includes("20")?('20 x 20 x 1'):('20 x 30 x 1')}
        </h1>
        {/* H3: Limited to 142 chars */}
        <div className=' bg-green-700/20 rounded-b-md text-[0.79rem] md:text-sm lg:text-sm overflow-hidden text-ellipsis text-left p-2'>
            <p>Base: 20 cm</p>
            {title.includes("20")?(<p>altura: 20 cm</p>):(<p>altura: 30 cm</p>)}
        </div>  
      
    </div>

  );
};

export default CardMaceteros;

