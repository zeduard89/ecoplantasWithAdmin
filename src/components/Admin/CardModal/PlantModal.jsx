import React from 'react'

const PlantModal = ({content, newValues,handleFileChange,handleSave,handleChange}) => {
  return (
    <>
    {content.category === 'plantas' && (
        <div className='flex flex-col'>
          <img src={content.imageUrl} alt={content.imageUrl} className="w-[9rem] h-auto rounded-md" />
          <label className='flex items-center pt-2'>Titulo:
              <input
              type="text"
              name="title"
              value={newValues.title}
              onChange={handleChange}
              placeholder={newValues.title}
              className="w-[64%] mt-2 p-2 ml-12 border border-gray-300 rounded"
              /> 
          </label>
          <label className='flex items-center pt-2'>Descripcion:
              <textarea
              name="description"
              value={newValues.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-[64%] mt-2 p-2 ml-1 border border-gray-300 rounded"
              rows="4"
              />
          </label> 
          <label>  Categoria: {newValues.category.charAt(0).toUpperCase() + newValues.category.slice(1)} </label>
          <input
          type="file"
          onChange={handleFileChange}
          className="mt-2"
          />
          <button onClick={handleSave} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
              Guardar
          </button>         
        </div>
      )}
    </>
  )
}

export default PlantModal
