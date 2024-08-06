import React, { useRef,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import admin from '../Utils/Logos/admin.png';
import validateFormAdmin from './validateFormAdmin';
import fetchAdmin from '../api/fetchAdmin'
import { useSelector } from 'react-redux';

const Admin = ({ onScroll }) => {

  const navigate = useNavigate();
  
  const form = useRef();
  const [sent, setSent] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues ] = useState({
    username:'',
    password:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateAdmin = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormAdmin(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    //Logica
    try {
      const response = await fetchAdmin({ formValues });
      
      if (response.success) {
        setSent(true);
        setIsModalOpen(false);
        form.current.reset();
        setFormValues({
          username: '',
          password: '',
        });
        setErrors({});
        // Navegar o realizar otras acciones después del login exitoso
        //navigate('/dashboard'); // Ejemplo de redirección
      } else {
        setErrors({ general: response.error || 'Login failed..' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Ocurrió un problema. Reintente más tarde.' });
    }

    form.current.reset();
    setFormValues({
      username: '',
      password: '',

    });
    setErrors({});
  }

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className='w-10 h-8 mr-5 relative btnNav text-white text-[1rem] sm:text-lg lg:text-xl sm:hover:text-blue-700'
        onClick={handleButtonClick}
      >
        <img src={admin} alt="adminButton" className='h-[2rem] ml-4 mt-3' />
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'
        onClick={closeModal}>
          <div className='bg-white p-5 rounded-lg shadow-lg'
          onClick={(e)=> e.stopPropagation()}>
            <h2 className='text-center font-bold text-black text-2xl mb-4'>Admin Login</h2>
            <form ref={form} onSubmit={validateAdmin}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Usuario</label>
                <input 
                  type="text" 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="left-8 text-red-600 text-sm">{errors.username}</p>}

              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                <input 
                  type="password" 
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              </div>
              <div className='flex items-center justify-between'>
                <button 
                  type="submit" 
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  Login
                </button>
                <button 
                  type="button" 
                  className='border-2 text-gray-500 hover:text-gray-800 font-bold py-2 px-4 rounded'
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
