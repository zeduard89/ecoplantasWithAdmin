import React from 'react'

const MaceteroModal = ({content, newValues,handleFileChange,handleSave,handleChange}) => {
  return (
    <>
    {content.category === 'maceteros' && (
          <div className='flex flex-col text-xs'>
          <img src={content.imageUrl} alt={content.imageUrl} className="w-[10rem] rounded-md" />
          <label className='flex items-center pt-2'>Titulo:
              <input
              type="text"
              name="title"
              value={newValues.title}
              onChange={handleChange}
              placeholder={newValues.title}
              className="w-[75%] md:w-[80%] h-7 mt-2 p-2 ml-12 border border-gray-300 rounded"
              /> 
          </label>
          <label className='flex items-center pt-2'>Descripcion:
              <textarea
              name="description"
              value={newValues.description}
              onChange={handleChange}
              placeholder="Description"
              className="h-[4rem]  w-[83%] mt-2 md:mt-0 p-2 ml-1 border border-gray-300 rounded"
              rows="4"
              />
          </label>
            <label>  Categoria: {newValues.category.charAt(0).toUpperCase() + newValues.category.slice(1)} </label>
          <div className='grid grid-cols-2'>
            <label>Base: 
                <input
                type="text"
                name="base"
                value={newValues.base}
                onChange={handleChange}
                placeholder={newValues.base}
                className="w-[30%] md:w-[36%] h-7 mt-2 p-2 ml-3 md:ml-3 border border-gray-300 rounded"
                />
            </label>
            <label>Altura: 
                <input
                type="text"
                name="altura"
                value={newValues.altura}
                onChange={handleChange}
                placeholder={newValues.altura}
                className="w-[30%] h-7 mt-2 p-2 ml-2 md:ml-2 border border-gray-300 rounded"
                />
            </label>
            <label>Largo: 
                <input
                type="text"
                name="largo"
                value={newValues.largo}
                onChange={handleChange}
                placeholder={newValues.largo}
                className="w-[30%] h-7 mt-2 p-2 ml-2 lg:ml-6 border border-gray-300 rounded"
                />
            </label>
          </div>
          <input
          type="file"
          onChange={handleFileChange}
          className="mt-2"
          />
          <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Guardar
          </button>         
        </div>
        )}
    </>
  )
}

export default MaceteroModal
