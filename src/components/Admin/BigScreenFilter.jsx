import React from 'react'

const BigScreenFilter = ({ searchValues, handleChange }) => {
    return (
    <div className='hidden lg:block h-[20rem] w-fit mt-[6rem] ml-6 font-bold border-green-600/70 sticky top-[12rem] bg-white  text-black border-2 border-b-2 rounded-md'>
        <h2 className='text-xl py-2  border-b-2 border-green-600/70 '>FILTRAR</h2>
        <input className='h-[1rem] mx-2 my-3   text-black text-lg p-5 rounded-lg border-y-2 border-green-600/70'
        name='search'
        type="search"
        placeholder="Buscar Producto"
        value={searchValues.search}
        onChange={handleChange}
        />
        <div className='flex flex-col  border-t-2 border-green-600/70 '>
        <label className='mt-5'>
            <input type="checkbox" name="plantas"  className='mx-2' checked={searchValues.plantas} onChange={handleChange}/> 
            Plantas
        </label>
        <label>
            <input type="checkbox" name="macetas"  className='mx-2' checked={searchValues.macetas} onChange={handleChange}/>
            Macetas
        </label>
        <label>
            <input type="checkbox" name="maceteros" className='mx-2' checked={searchValues.maceteros} onChange={handleChange}/>
            Maceteros
        </label>
        <label className="block  pt-4 border-t-2  border-green-600/70 text-center">
            Selecciona una opción:
        </label>
        <select id='opciones-select' name='filtrado' value={searchValues.filtrado} className="w-[77%] h-full ml-7 pt-7  p-1  rounded-md border-green-600/70 border-y-2" onChange={handleChange}>
            <option className='text-center' value=""   disabled>Selecciona...</option>
            <option className='text-center' value="asc">Ascendente</option>
            <option className='text-center' value="des">Descendente</option>
            <option className='text-center' value="lastMonth">Último Mes</option>
            <option className='text-center' value="lastYear">Último Año</option>
        </select>
        </div>
  </div>
  )
}

export default BigScreenFilter
