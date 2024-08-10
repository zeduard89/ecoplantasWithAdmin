import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CardModal = ({ isOpen, onClose, content }) => {

    const filterData = useSelector((state) => state.filter.filterArray);
    const token = useSelector((state) => state.admin.token);
    const dispatch = useDispatch();

    const [newValues, setNewValues] = useState({
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        altura: '',
        base: '',
        boca: '',
        capacidad: '',
        peso: '',
        largo: '',
      });
      const [imageFile, setImageFile] = useState(null);
      const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (content) {
          setNewValues({
            title: content.title || '',
            description: content.description || '',
            imageUrl: content.imageUrl || '',
            category: content.category || '',
            altura: content.altura || '',
            base: content.base || '',
            boca: content.boca || '',
            capacidad: content.capacidad || '',
            peso: content.peso || '',
            largo: content.largo || '',
          });
          setPreviewUrl(content.imageUrl || '');
        }
      }, [content]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImageFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result);
          };
          console.log(file)
          reader.readAsDataURL(file);
        }
      };

      const handleSave = () => {
        const formData = new FormData();
        formData.append('title', newValues.title);
        formData.append('description', newValues.description);
        formData.append('category', newValues.category);
        formData.append('altura', newValues.altura);
        formData.append('base', newValues.base);
        formData.append('boca', newValues.boca);
        formData.append('capacidad', newValues.capacidad);
        formData.append('peso', newValues.peso);
        formData.append('largo', newValues.largo);
        if (imageFile) {
          formData.append('image', imageFile);
        }
    
        // Aquí debes hacer la llamada al backend para guardar los datos, incluyendo la imagen
        console.log('Saving new values:', newValues);
        console.log('Saving file:', imageFile);
    
        // Ejemplo de llamada a la API (ajusta la URL y el método según tu API)
        // fetch('https://your-backend-api.com/update', {
        //   method: 'POST',
        //   body: formData,
        // }).then(response => response.json())
        //   .then(data => {
        //     console.log('Success:', data);
        //     onClose();
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //   });
    
        onClose(); // Cierra el modal después de guardar
      };

    if (!isOpen) return null; // Si el modal no está abierto, no se renderiza
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black w-[20rem] md:w-[80%] h-fit md:h-[80%] p-4 rounded-lg shadow-lg relative max-w-lg w-full">
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-black">
          Close
        </button>

        {/* Renderiza el contenido basado en la categoría */}
        {content.category === 'plantas' && (
          <div className='flex flex-col'>
            <img src={content.imageUrl} alt={content.imageUrl} className="w-[10rem] h-auto rounded-md" />
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
            <label>Category: 
            <input
            type="text"
            name="category"
            value={newValues.category}
            onChange={handleChange}
            placeholder={newValues.category}
            className="w-[64%] mt-2 p-2 ml-6 border border-gray-300 rounded"
            />
            </label>
            <input
            type="file"
            onChange={handleFileChange}
            className="mt-2"
            />
            <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Save
            </button>         
          </div>
        )}

        {content.category === 'macetas' && (
          <div className='flex flex-col text-xs'>
          <img src={content.imageUrl} alt={content.imageUrl} className="md:w-[10rem] w-[6rem] h-auto rounded-md" />
          <label className='h-[0.5rem] mt-3  flex items-center pt-2'>Titulo:
              <input
              type="text"
              name="title"
              value={newValues.title}
              onChange={handleChange}
              placeholder={newValues.title}
              className="h-[1.5rem] md:h-[1.2rem] md:w-[43%] p-2 md:ml-9 ml-2 border border-gray-300 rounded"
              /> 
          </label>
          <label className='h-[5rem] md:h-[12rem] flex items-center pt-2'>Descripcion:
              <textarea
              name="description"
              value={newValues.description}
              onChange={handleChange}
              placeholder="Description"
              className="h-[4rem] md:h-[10rem] w-[43%] mt-2 p-2 ml-1 border border-gray-300 rounded"
              rows="4"
              />
          </label> 
          <div className='grid grid-cols-2'>
            <label>Category: 
                <input
                type="text"
                name="category"
                value={newValues.category}
                onChange={handleChange}
                placeholder={newValues.category}
                className="md:w-[40%] w-[50%] mt-2 p-2 ml-1 md:ml-6 border border-gray-300 rounded text-center"
                />
            </label>
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
          <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Save
          </button>         
          {/* Agrega aquí cualquier detalle adicional que quieras mostrar para "plantas" */}
        </div>
        )}

        {content.category === 'maceteros' && (
          <div className='flex flex-col'>
          <img src={content.imageUrl} alt={content.imageUrl} className="w-[10rem] h-auto rounded-md" />
          <label className='flex items-center pt-2'>Titulo:
              <input
              type="text"
              name="title"
              value={newValues.title}
              onChange={handleChange}
              placeholder={newValues.title}
              className="md:w-[80%] mt-2 p-2 ml-12 border border-gray-300 rounded"
              /> 
          </label>
          <label className='flex items-center pt-2'>Descripcion:
              <textarea
              name="description"
              value={newValues.description}
              onChange={handleChange}
              placeholder="Description"
              className="h-[5rem] w-[80%] mt-2 p-2 ml-1 border border-gray-300 rounded"
              rows="4"
              />
          </label>
            <label>Category: 
                <input
                type="text"
                name="category"
                value={newValues.category}
                onChange={handleChange}
                placeholder={newValues.category}
                className="w-[67%] md:w-[80%] mt-2 p-2 ml-6 border border-gray-300 rounded"
                />
            </label>
          <div className='grid grid-cols-2'>
            <label>Base: 
                <input
                type="text"
                name="base"
                value={newValues.base}
                onChange={handleChange}
                placeholder={newValues.base}
                className="w-[30%] mt-2 p-2 ml-3 md:ml-3 border border-gray-300 rounded"
                />
            </label>
            <label>Altura: 
                <input
                type="text"
                name="altura"
                value={newValues.altura}
                onChange={handleChange}
                placeholder={newValues.altura}
                className="w-[30%] mt-2 p-2 ml-2 md:ml-2 border border-gray-300 rounded"
                />
            </label>
            <label>Largo: 
                <input
                type="text"
                name="largo"
                value={newValues.largo}
                onChange={handleChange}
                placeholder={newValues.largo}
                className="w-[30%] mt-2 p-2 ml-2 lg:ml-6 border border-gray-300 rounded"
                />
            </label>
          </div>
          <input
          type="file"
          onChange={handleFileChange}
          className="mt-2"
          />
          <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Save
          </button>         
          {/* Agrega aquí cualquier detalle adicional que quieras mostrar para "plantas" */}
        </div>
        )}

      
      </div>
    </div>
  );
};

export default CardModal;