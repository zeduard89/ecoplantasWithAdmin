import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../redux/catalogoSlice';
import emailjs from 'emailjs-com';
import validateCatalogo from './validateCatalogo';

// Variables de Entorno
const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_PRESUPUESTO;
const emailJsUserId = import.meta.env.VITE_EMAILJS_USER_ID;



const Carrito = ({onScroll}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plantas, macetas  } = useSelector((state) => state.catalogo);
  const maceteros20 = useSelector((state)=> state.catalogo.maceteros20);
  const maceteros30 = useSelector((state)=>state.catalogo.maceteros30);

  const form = useRef();
  const [sent, setSent] = useState(null);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    user_name: '',
    user_direccion: '',
    user_telefono: '',
    user_email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEmailSend = (e) => {
    e.preventDefault();

    const validationErrors = validateCatalogo(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const filteredPlantas = Object.values(plantas).filter(planta => planta.cuantity > 0);
    const filteredMacetas = Object.values(macetas).filter(maceta => maceta.cuantity > 0);
    const maceteros20Text = maceteros20 > 0 ? `Maceteros 20 x 20 x 1 Mts: ${maceteros20}` : '';
    const maceteros30Text = maceteros30 > 0 ? `Maceteros 20 x 30 x 1 Mts: ${maceteros30}` : '';


    const message = [
      ...filteredPlantas,
      ...filteredMacetas,
      maceteros20Text,
      maceteros30Text
    ].filter(Boolean).join('\n');

    const templateParams = {
      subject: 'Detalles del pedido',
      user_name: formValues.user_name,
      user_direccion: formValues.user_direccion,
      user_telefono: formValues.user_telefono,
      user_email: formValues.user_email,
      message: message,
    };

    emailjs.send(emailJsServiceId, emailJsTemplateId, templateParams, emailJsUserId)
      .then(response => {
        dispatch(reset());
        setSent(true); // Mostrar mensaje de confirmación
        form.current.reset(); // Limpiar el formulario
        setFormValues({
          user_name: '',
          user_direccion: '',
          user_telefono: '',
          user_email: '',
        });
        setErrors({});
      })
      .catch(error => {
        console.error('Error al enviar el correo', error);
        setSent(false); // Mostrar mensaje de error
      });
  };

  //Filtrado de plantas, macetas y varios, antes de usar en JSX
  const filteredPlantas = Object.values(plantas).filter(planta => planta.cuantity > 0);
  const filteredMacetas = Object.values(macetas).filter(maceta => maceta.cuantity > 0);

  return (
    <div className='my-[8rem] xl:h-full'>
      <h1 className='my-10 text-center text-3xl md:text-4xl lg:text-4xl font-bold'>PEDIDO A COTIZAR</h1>
      <div className="mx-auto h-[20rem] w-[60%] text-left pl-2 bg-white text-black mt-4 rounded-md overflow-y-auto">
        {(filteredPlantas.length == 0 && filteredMacetas.length == 0 && maceteros20 == 0 && maceteros30 == 0) ? (
            <button className='flex justify-center items-center	h-full w-full text-lime-500'
            onClick={() => {
                navigate('/catalogo');
                onScroll('inicio')              }}
                >Selecciona tu pedido</button>
        ) : (
          <>
            {filteredPlantas.map((planta, index) => (
              <div key={`${planta.title}-${index}`} className=" border-b">
                <strong className='text-sm'>{(planta.title)}:</strong> {planta.cuantity}
              </div>
            ))}
            {filteredMacetas.map((maceta, index) => (
              <div key={`${maceta.title}-${index}`} className=" border-b">
                <strong className='text-sm'>{(maceta.title)}:</strong> {maceta.cuantity}
              </div>
            ))}
        <div className=" border-b">
          {(maceteros20 != '')?(<div><strong className='text-sm'>Macetero 20x20: </strong>{maceteros20}</div>):('')}
        </div>
        <div >
          {(maceteros30 != '')?(<div><strong className='text-sm'>Macetero 20x30: </strong>{maceteros30}</div>):('')}
        </div>
          </>
        )}

      </div>

      <h1 className='my-8 text-center text-3xl md:text-4xl lg:text-4xl font-bold'>Formulario de envio</h1>
      
      <form ref={form}  onSubmit={handleEmailSend}>
        <div className="m-4 flex flex-col mx-[30%]" >
            <input
              type="text"
              placeholder="Nombre Completo"
              name="user_name"
              value={formValues.user_name}
              onChange={handleChange}
              className="text-center px-2 py-1 bg-white text-gray-800 text-sm border-b border-gray-300 focus:border-green-600 outline-none rounded-md"
            />
            {errors.user_name && <p className="flex justify-center text-red-600 text-sm">{errors.user_name}</p>}
            <input
              type="text"
              placeholder="Dirección"
              name="user_direccion"
              value={formValues.user_direccion}
              onChange={handleChange}
              className="text-center px-2 py-1 bg-white text-gray-800 text-sm border-b border-gray-300 focus:border-green-600 outline-none rounded-md"
            />
            {errors.user_direccion && <p className="flex justify-center text-red-600 text-sm">{errors.user_direccion}</p>}
            <input
              type="phone"
              placeholder="Teléfono"
              name="user_telefono"
              value={formValues.user_telefono}
              onChange={handleChange}
              className="text-center px-2 py-1 bg-white text-gray-800 text-sm border-b border-gray-300 focus:border-green-600 outline-none rounded-md"
            />
            {errors.user_telefono && <p className="flex justify-center text-red-600 text-sm">{errors.user_telefono}</p>}
            <input
              type="email"
              placeholder="Email"
              name="user_email"
              value={formValues.user_email}
              onChange={handleChange}
              className="text-center px-2 py-1 bg-white text-gray-800 text-sm border-b border-gray-300 focus:border-green-600 outline-none rounded-md"
            />
            {errors.user_email && <p className="flex justify-center text-red-600 text-sm">{errors.user_email}</p>}
            <button type="submit" className="mt-5 text-sm rounded-md px-6 py-1 bg-green-700 hover:bg-green-600 text-white">
            A Cotizar
            </button>
        </div>
      </form>

      {sent === true && <p className="mt-4 text-green-600">¡Mensaje enviado con éxito!</p>}
      {sent === false && <p className="mt-4 text-red-600">Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>}
    </div>
  );
};

export default Carrito;


