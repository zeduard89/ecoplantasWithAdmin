import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantModal from './CardModal/plantModal';
import MacetaModal from './CardModal/MacetaModal';
import MaceteroModal from './CardModal/MaceteroModal';

const DashBoard = () => {
    const token = useSelector((state) => state.admin.token);
    const dispatch = useDispatch();

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

        // Implementar la lógica para guardar los datos
        // const data = await fetchUpdate(formData, token);
        // if (data) {
        //     dispatch(addCatalogo(data));
        //     window.location.reload();
        // } else {
        //     console.error('Error saving data:', data);
        // }
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

    };

    return (
        //<div className='h-[20rem] w-[90%] mb-5 bg-white text-black rounded-md flex justify-center items-center'>
            //<div className='text-xs'>
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

                {newValues.category === 'plantas' && (
                    <PlantModal newValues={newValues} content={{ category: 'plantas' }}
                    handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>    
                )}
                {newValues.category === 'macetas' && (
                    <MacetaModal newValues={newValues} content={{ category: 'macetas' }}
                    handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>    
                )}
                {newValues.category === 'maceteros' && (
                    <MaceteroModal newValues={newValues} content={{ category: 'maceteros' }}
                    handleFileChange={handleFileChange} handleSave={handleSave} handleChange={handleChange}/>    
                )}    
            </div>
            <div className='hidden md:block bg-white h-[20rem] w-full ml-10 rounded-lg '></div>
        </div>
    );
}

export default DashBoard;