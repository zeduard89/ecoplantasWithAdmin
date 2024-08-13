import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantModal from './plantModal';
import MacetaModal from './MacetaModal';
import MaceteroModal from './MaceteroModal';
import fetchUpdate from '../../api/fetchUpdate';
import fetchCatalogo from '../../api/fetchCatalogo';
import fetchDelete from '../../api/fetchDelete';
import { addCatalogo } from '../../../redux/catalogoSlice';

const CardModal = ({ isOpen, onClose, content }) => {

    const token = useSelector((state) => state.admin.token);
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

    const handleDelete = async() =>{
      try {
        const response = fetchDelete(content,token);
        console.log(response)
        
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
          //console.log(file)
          reader.readAsDataURL(file);
        }
      };

      const handleSave = async () => {
        const formData = new FormData();
        formData.append('id', newValues.id);
        formData.append('title', newValues.title);
        formData.append('description', newValues.description);
        formData.append('category', newValues.category);
        formData.append('altura', newValues.altura);
        formData.append('20', newValues.base);
        formData.append('boca', newValues.boca);
        formData.append('capacidad', newValues.capacidad);
        formData.append('peso', newValues.peso);
        formData.append('largo', newValues.largo);
        formData.append('oldImageUrl', newValues.imageUrl)
        if (imageFile) {
          formData.append('image', imageFile);
        }
    
        // console.log('Saving new values:', newValues);
        // console.log('Saving file:', imageFile);
        const fetchCategory = newValues.category
        const data = await fetchUpdate(formData, token, fetchCategory);
         if (data) {
        const datosPosts = await fetchCatalogo();
        dispatch(addCatalogo(datosPosts));

         } else {
             console.error('Error saving data:', data);
         }
        onClose(); 
      };

    if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black w-[20rem] md:w-[80%] h-fit  mx-2 p-4 rounded-lg shadow-lg relative max-w-lg ">
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2 text-black">
          Close
        </button>

        <PlantModal content={content} newValues={newValues} handleDelete={handleDelete} handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>
        <MacetaModal content={content} newValues={newValues} handleDelete={handleDelete} handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>
        <MaceteroModal content={content} newValues={newValues} handleDelete={handleDelete}  handleFileChange={handleFileChange} handleSave={handleSave}  handleChange={handleChange}/>
        


      
      </div>
    </div>
  );
};

export default CardModal;