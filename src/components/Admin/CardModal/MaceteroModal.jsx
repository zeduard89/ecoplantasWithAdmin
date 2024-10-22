import React from 'react'

const MaceteroModal = ({successMessage,dashBoardKey, errors = {}, content, newValues,handleFileChange,handleSave,handleChange,handleDelete}) => {
  return (
    <>
    {content.category === 'maceteros' && (
          <div className='flex flex-col text-xs'>
          <div className='flex flex-row justify-center items-center'>
            <img src={content.imageUrl} alt={content.imageUrl} className="w-[10rem] rounded-md" />
            {errors.title && (
              <p className='text-red-600 text-sm ml-12'>{errors.title}</p>
            )} 
          </div>
            {!dashBoardKey &&
              <label>  Categoria: {newValues.category.charAt(0).toUpperCase() + newValues.category.slice(1)} </label>
            } 
          <label className='flex items-center pt-2'>Titulo:
              <input
              type="text"
              name="title"
              value={newValues.title}
              onChange={handleChange}
              placeholder={newValues.title}
              className="w-[50%] md:w-[80%] h-7 mt-2 p-2 ml-2 border border-gray-300 rounded"
              /> 
          </label>
          {/* <label className='flex items-center pt-2'>Descripcion:
              <textarea
              name="description"
              value={newValues.description}
              onChange={handleChange}
              placeholder="Description"
              className="h-[4rem]  w-[83%] mt-2 md:mt-0 p-2 ml-1 border border-gray-300 rounded"
              rows="4"
              />
          </label> */}
          <div className='grid grid-cols-2'>
            <label>
                Base:
                <select
                    name="base"
                    onChange={handleChange}
                    className="w-[60%] md:w-[60%] h-8 mt-2 p-2 ml-3 md:ml-3 border border-gray-300 rounded"
                >
                    <option value="" disabled hidden>
                        Selecciona una base
                    </option>
                    <option value="20">20 cm</option>
                    <option value="30">30 cm</option>
                </select>
            </label>
            <label>Altura: 
                <input
                type="text"
                name="altura"
                value={newValues.altura}
                onChange={handleChange}
                placeholder={newValues.altura}
                className="w-[60%] h-8 mt-2 p-2 ml-2 md:ml-2 border border-gray-300 rounded"
                />
            </label>
            <label>Largo: 
                <input
                type="text"
                name="largo"
                value={newValues.largo}
                onChange={handleChange}
                placeholder={newValues.largo}
                className="w-[60%] h-8 mt-2 p-2 ml-2 lg:ml-6 border border-gray-300 rounded"
                />
            </label>
          </div>
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

export default MaceteroModal
