import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantModal from './CardModal/plantModal';
import MacetaModal from './CardModal/MacetaModal';
import MaceteroModal from './CardModal/MaceteroModal';
import fetchUpload from '../api/fetchUpload';

const DashBoard = ({token, setSearchValues}) => {
    const dispatch = useDispatch();
    const dashBoardKey = true

    const [newValues, setNewValues] = useState({
        title: 'Title',
        description: 'Description',
        imageUrl: '',
        category: 'plantas',
        altura: 'Altura',
        base: 'Base',
        boca: 'Boca',
        capacidad: 'Capacidad',
        peso: 'Peso',
        largo: 'Largo',
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
        formData.append('image', imageFile);

        try {
            const fetchCategory = newValues.category;
            const response = await fetchUpload(formData, token, fetchCategory);
            if (response.data?.error) {
                setErrorMessage('Tu sesión ha expirado o ha habido un error. Por favor, inicia sesión nuevamente.');
                dispatch(adminToken('')); // Asegúrate de que esta acción esté importada
                setSuccessMessage('');
                return;
            }
            if (response.errorMessage) {
                setErrorMessage(response.errorMessage);
                setSuccessMessage('');
                return;
            }

            setSuccessMessage('Creación exitosa');
            setErrorMessage('');
            setNewValues({
                title: '',
                description: '',
                imageUrl: '',
                category: 'plantas',
                altura: '',
                base: '',
                boca: '',
                capacidad: '',
                peso: '',
                largo: '',
            });
            setImageFile(null);
            setPreviewUrl('');
            document.querySelector('input[type="file"]').value = '';
            setSearchValues({
                search: '',
                plantas: false,
                macetas: false,
                maceteros: false,
                filtrado:'',});
            // window.location.reload();
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Hubo un error al guardar los datos. Por favor, inténtalo de nuevo.');
        }
    };


    return (
        <div className="flex items-center justify-center md:justify-between w-[90%]  rounded-md">
            <div className="bg-white text-black w-[20rem] h-fit  mx-2 p-4 rounded-lg shadow-lg relative max-w-lg ">  
                <select
                    name="category"
                    id="category"
                    value={newValues.category}
                    onChange={handleChange}
                    className="w-[64%] mt-2 p-2 ml-6 border border-gray-300 rounded"
                >
                    <option value="" disabled hidden>
                        Select a category
                    </option>
                    <option value="plantas">Plantas</option>
                    <option value="macetas">Macetas</option>
                    <option value="maceteros">Maceteros</option>
                </select>
                {setErrorMessage && (<p className='h-fit text-rose-400'>{errorMessage}</p>)}
                {successMessage && <p className='h-fit text-green-400'>{successMessage}</p>}

                {newValues.category === 'plantas' && (
                    <PlantModal key="plantas" dashBoardKey={dashBoardKey} newValues={newValues} content={{ category: 'plantas' }}
                    handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>    
                )}
                {newValues.category === 'macetas' && (
                    <MacetaModal key="macetas" dashBoardKey={dashBoardKey} newValues={newValues} content={{ category: 'macetas' }}
                    handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>    
                )}
                {newValues.category === 'maceteros' && (
                    <MaceteroModal key="maceteros" dashBoardKey={dashBoardKey} newValues={newValues} content={{ category: 'maceteros' }}
                    handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>    
                )}    
            </div>

            <div className='hidden md:block h-[20rem] w-[60%] ml-10 text-center  bg-white text-green-600 font-bold text-3xl  rounded-lg '>
                 <h1 className='h-[100%] flex justify-center items-center'>DASHBOARD <br/> FROM ECOPLANTAS TEAM</h1>
            </div>
        </div>
    );
}

export default DashBoard;