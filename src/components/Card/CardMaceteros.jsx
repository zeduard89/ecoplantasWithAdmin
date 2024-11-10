import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementMaceterosL, incrementMaceterosL} from '../../redux/catalogoSlice';
import Carrousel from '../Home/Carrousel';

const CardMaceteros = ({maceteros , maceteroType }) => {
    const imgArray = [];
        
    const dispatch = useDispatch();
    let countMaceteros20 = useSelector((state) => state.catalogo.countMaceteros20);
    let countMaceteros30 = useSelector((state) => state.catalogo.countMaceteros30);
    // obtengo un array filtrado (todos mismo dato:BASE) de elementos por cada card
    // por eso con que el primero coincida es suficiente
    if (maceteros.length === 0) {
      return <div></div>;
    }
    const base = maceteros[0].base || "";
    const handleIncrement = () => {
        dispatch(incrementMaceterosL({ base }));
    };

    const handleDecrement = () => {
        dispatch(decrementMaceterosL({ base }));
    };

    maceteros.forEach(element => {
      if (!element.imageUrl) {
        console.error('Image is undefined or null');
        return;
      } else if (element.imageUrl){
        imgArray.push(element.imageUrl);
      }
    });

    return (

    <div className='relative text-center rounded-md p-7 md:mx-[6rem] lg:mx-[1rem] '>
        
        <div className='absolute z-50 top-10 right-10 font-bold bg-green-700/80 border-2 border-gray-500 w-7 h-7 rounded flex items-center justify-center'>
            {base.includes('20')?countMaceteros20:countMaceteros30}
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
        {base.includes("20")?('20 x 20 x 1'):('20 x 30 x 1')}
        </h1>
        {/* H3: Limited to 142 chars */}
        <div className=' bg-green-700/20 rounded-b-md text-[0.79rem] md:text-sm lg:text-sm overflow-hidden text-ellipsis text-left p-2'>
            {base.includes("20")?(<p>Base: 20 cm</p>):(<p>Base: 30 cm</p>)}
            <p>Altura: 20 cm</p>
        </div>  
      
    </div>

  );
};

export default CardMaceteros;

