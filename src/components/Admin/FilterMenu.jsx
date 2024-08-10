import React, { useEffect, useRef } from 'react';

const FilterMenu = ({ menuRef, isMenuOpen, searchValues, handleChange }) => {


  return (
    <div 
      ref={menuRef}
      className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-9 right-[39%] md:right-[45%] z-50  h-[12rem] w-[8.5rem] border-2 rounded-md border-green-600/70 bg-white`} 
      
    >
      <div className='flex flex-col'>
      <label className="my-2  border-green-600/70 text-center">
        Filtrar Por:
      </label>
      <select id='opciones-select' name='filtrado' value={searchValues.filtrado} className=" h-fit w-[80%] ml-3  pt-7  p-1  rounded-md border-green-600/70 border-y-2" onChange={handleChange}>
        <option className='text-center  ' value=""   disabled>Selecciona...</option>
          <option className='text-center' value="asc">Reciente</option>
          <option className='text-center' value="des">Antiguo</option>
          <option className='text-center' value="lastMonth">Último Mes</option>
          <option className='text-center' value="lastYear">Último Año</option>
      </select> 
      <label className='mt-5'>
        <input type="checkbox" name="plantas" value="opcion1" className='mx-2' checked={searchValues.plantas}  onChange={handleChange}/> 
        Plantas
      </label>
      <label>
        <input type="checkbox" name="macetas" value="opcion2" className='mx-2' checked={searchValues.macetas} onChange={handleChange}/>
        Macetas
      </label>
      <label>
        <input type="checkbox" name="maceteros" value="opcion3" className='mx-2' checked={searchValues.maceteros} onChange={handleChange}/>
        Maceteros
      </label>
      </div>    
    </div>
  );
}

export default FilterMenu;
