import React from 'react'

const PlantModal = ({successMessage,dashBoardKey,content,errors = {}, newValues,handleFileChange,handleSave,handleChange, handleDelete}) => {
  return (
    <>
    {content.category === 'plantas' && (
      <div className='flex flex-col'>
          <div className='flex flex-row justify-center items-center'>
          <img src={content.imageUrl} alt={content.imageUrl} className="w-[9rem] h-auto rounded-md" />
          
          </div>
          <div className='flex'>
            {!dashBoardKey && 
              <label className=''>  Categoria: {newValues.category.charAt(0).toUpperCase() + newValues.category.slice(1)} </label>
              }
            {errors.title && (
              <p className='text-red-600 text-center text-sm ml-12'>{errors.title}</p>
            )}
             
          </div>
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
          <input
          type="file"
          onChange={handleFileChange}
          className="mt-2"
          />
          <div className='w-[90%] flex flex-row gap-2 justify-center items-center'>
            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Guardar
            </button>
            {successMessage && <p className='h-fit text-green-400'>{successMessage}</p>}

            {!dashBoardKey && 
            <button onClick={handleDelete} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Borrar
            </button> 
            }   
          </div>        
        </div>
      )}
    </>
  )
}

export default PlantModal
