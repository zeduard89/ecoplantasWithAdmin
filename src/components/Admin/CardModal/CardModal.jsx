import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantModal from './PlantModal';
import MacetaModal from './MacetaModal';
import MaceteroModal from './MaceteroModal';
import validateModal from './validateModal';
import fetchUpdate from '../../api/fetchUpdate';
import fetchCatalogo from '../../api/fetchCatalogo';
import fetchDelete from '../../api/fetchDelete';
import { addCatalogo, deleteItem } from '../../../redux/catalogoSlice';
import { deleteItemFiltered } from '../../../redux/filterSilce';

const CardModal = ({ isOpen, onClose, content }) => {

    const token = useSelector((state) => state.admin.token);
    const [responseMessage, setResponseMessage] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);




    const dispatch = useDispatch();

    const [newValues, setNewValues] = useState({
        id:'',
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        altura: '',
        base: '20',
        boca: '',
        capacidad: '',
        peso: '',
        largo: '',
      });
      const [imageFile, setImageFile] = useState(null);
      const [previewUrl, setPreviewUrl] = useState('');
      const [errors, setErrors] = useState({});

    useEffect(() => {
        if (content) {
          setNewValues({
            id:content.id || '',
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

      useEffect(()=>{

      },[fetchDelete])

    const handleDelete = async() =>{
      try {
        await fetchDelete(content,token);
        dispatch(deleteItem({ category: content.category, id: content.id }));
        dispatch(deleteItemFiltered(content.id))
        onClose(); 
        
      } catch (error) {
        
        console.error('Error Borrando:', data);
        onClose(); 
      };
    } 

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
          reader.readAsDataURL(file);
        }
      };

      const handleSave = async () => {
        const validationErrors = validateModal(newValues);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        
        const formData = new FormData();
        formData.append('id', newValues.id);
        formData.append('title', newValues.title);
        formData.append('description', newValues.description);
        formData.append('category', newValues.category);
        formData.append('altura', newValues.altura);
        formData.append('base', newValues.base); // Cambiado '20' por 'base'
        formData.append('boca', newValues.boca);
        formData.append('capacidad', newValues.capacidad);
        formData.append('peso', newValues.peso);
        formData.append('largo', newValues.largo);
        formData.append('oldImageUrl', newValues.imageUrl);
      
        if (imageFile) {
          formData.append('image', imageFile);
        }
      
        const fetchCategory = newValues.category;
        try {
          const data = await fetchUpdate(formData, token, fetchCategory);
          console.log(data)
          // Manejar la respuesta
          if (data.success) {
            const datosPosts = await fetchCatalogo();
            dispatch(addCatalogo(datosPosts));
            setResponseMessage('Datos guardados exitosamente.');
            setIsMessageVisible(true);
            setImageFile(null);
            setTimeout(() => {
              onClose();
            }, 1000);

          } else if(data.errorMessage){
            setResponseMessage(data.errorMessage);
            setIsMessageVisible(true);
          }
          
        } catch (error) {
          setResponseMessage(error.message);
          setIsMessageVisible(true);
        } finally {
          // Ocultar el mensaje después de 3 segundos
          setTimeout(() => {
            setIsMessageVisible(false);
            setResponseMessage(''); // Limpiar el mensaje
          }, 1000);
        }
      
        setErrors({});
      };

      if (!isOpen) return null; 
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black w-[20rem] md:w-[80%] h-fit mx-2 p-4 rounded-lg shadow-lg relative max-w-lg">
            <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-black">
              Close
            </button>
      
            {isMessageVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                <div className="bg-green-500/80 text-white font-bold p-4 rounded shadow-lg text-center max-w-md mx-auto">
                  {responseMessage}
                </div>
              </div>
            )}
      
            <PlantModal errors={errors} content={content} newValues={newValues} handleDelete={handleDelete} handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>
            <MacetaModal errors={errors} content={content} newValues={newValues} handleDelete={handleDelete} handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>
            <MaceteroModal errors={errors} content={content} newValues={newValues} handleDelete={handleDelete} handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>
          </div>
        </div>
  );
};

export default CardModal;