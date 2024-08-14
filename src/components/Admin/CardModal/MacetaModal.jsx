import React from 'react'

const MacetaModal = ({successMessage,dashBoardKey, errors = {} ,content, newValues,handleFileChange,handleSave,handleDelete,handleChange}) => {
    return (
    <>
            {content.category === 'macetas' && (
          <div className='flex flex-col text-xs'>
            <div className='flex flex-row justify-center items-center'>
                <img src={content.imageUrl} alt={content.imageUrl} className="md:w-[10rem] w-[6rem] h-auto rounded-md" />
                {errors.title && (
                    <p className='text-red-600 text-sm ml-12'>{errors.title}</p>
                 )} 
            </div>
          <label className='h-[0.5rem] mt-3  flex items-center pt-2'>Titulo:
              <input
              type="text"
              name="title"
              value={newValues.title}
              onChange={handleChange}
              placeholder={newValues.title}
              className="h-[1.5rem] md:h-[1.2rem] md:w-[43%] w-[49%] p-2 md:ml-9 ml-2 border border-gray-300 rounded"
              /> 
          </label>
          <label className='h-[5rem] md:h-[7rem] flex items-center pt-2'>Descripcion:
              <textarea
              name="description"
              value={newValues.description}
              onChange={handleChange}
              placeholder="Description"
              className="h-[4rem] md:h-[5rem] w-[43%]  mt-2 p-2 ml-1 border border-gray-300 rounded"
              rows="4"
              />
          </label> 
          <div className='grid grid-cols-2'>
            <label>  Categoria: {newValues.category.charAt(0).toUpperCase() + newValues.category.slice(1)} </label>
            <label>Base: 
                <input
                type="text"
                name="base"
                value={newValues.mase}
                onChange={handleChange}
                placeholder={newValues.mase}
                className="md:w-[52%] w-[50%] mt-2 p-2 ml-2 md:ml-6 border border-gray-300 rounded text-center"
                />
            </label>
            <label>Boca: 
                <input
                type="text"
                name="boca"
                value={newValues.boca}
                onChange={handleChange}
                placeholder={newValues.boca}
                className="md:w-[50%] w-[60%] mt-2 p-2 ml-2 md:ml-6 border border-gray-300 rounded text-center"
                />
            </label>
            <label>Altura: 
                <input
                type="text"
                name="altura"
                value={newValues.altura}
                onChange={handleChange}
                placeholder={newValues.altura}
                className="md:w-[50%] w-[50%] mt-2 p-2 ml-1 md:ml-6 border border-gray-300 rounded text-center"
                />
            </label>
            <label>Peso: 
                <input
                type="text"
                name="peso"
                value={newValues.peso}
                onChange={handleChange}
                placeholder={newValues.peso}
                className="md:w-[50%] w-[60%] mt-2 p-2 ml-2 md:ml-6 border border-gray-300 rounded text-center"
                />
            </label>
            <label>Capacidad: 
                <input
                type="text"
                name="capacidad"
                value={newValues.capacidad}
                onChange={handleChange}
                placeholder={newValues.capacidad}
                className="md:w-[45%] w-[30%] mt-2 p-2 ml-2 md:ml-2 border border-gray-300 rounded text-center"
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

export default MacetaModal
