import { useState, useEffect, useRef } from 'react';
import CardPlantas from '../Card/CardPlantas';
import filtrarPNG from '../Utils/admin/filtrado.png'
import orderPNG from '../Utils/admin/orderBy.png'
import { useDispatch, useSelector } from 'react-redux';
import FilterMenu from './FilterMenu';


const Admin = () => {

  const catalogo = useSelector((state) => state.catalogo);
  const [searchValues, setSearchValues] = useState({
    search: '',
    plantas: false,
    macetas: false,
    maceteros: false,
    filtrado:'',
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // useEffect(() => {
  //   // Función para obtener los datos filtrados desde el backend
  //   const fetchFilteredData = async () => {
  //     try {
    //const response = await fetchCatalogo({ searchValues });
    //       dispatch({ type: 'UPDATE_CATALOGO', payload: response.data });
  //     } catch (error) {
  //       console.error('Error al obtener los datos filtrados:', error);
  //     }
  //   };

  //   fetchFilteredData();
  // }, [searchValues, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  useEffect(() => {
    const handleMouseLeave = (event) => {
      // Cierra el menú si el mouse sale del área del menú y no está sobre el botón
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.relatedTarget) &&
        !buttonRef.current.contains(event.relatedTarget)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mouseout', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isMenuOpen]);

  return (
    <div className='mt-20 flex flex-col items-center	'>
      <div className='md:hidden w-full mt-6 flex flex-col items-center justify-center text-black'>
        <input className='h-[3rem] w-[90%] text-black text-lg p-5 rounded-lg'
        name='search'
        type="search"
        placeholder="Buscar Producto"
        onChange={handleChange}
        />
        <div className='relative w-full flex flex-row justify-center items-center border-y-2 mt-2'>
          <button  
            ref={buttonRef}
            type="button"
            className=" inline-flex items-center justify-center p-2 w-fit h-fit mr-1 mt-2 mb-3 text-sm rounded-lg hover:bg-green-400/20 focus:outline-none  focus:ring-gray-200  "
            aria-expanded={isMenuOpen}
            onClick={handleMenuToggle}
          >
            <img src={filtrarPNG} alt="filtrar" className='h-[2rem] my-1' />
          </button>
          <h2 className='text-2xl font-bold'>FILTRAR</h2>
          <FilterMenu menuRef={menuRef}  isMenuOpen={isMenuOpen} searchValues={searchValues} handleChange={handleChange}/>
        </div>
      </div>


      
      <div className='flex '>
        <div className='hidden md:block md:basis-[20%] lg:basis-[15%] h-[20rem] w-full mt-[6rem] ml-6 font-bold border-green-600/70 sticky top-[12rem] bg-white  text-black border-2 border-b-2 rounded-md'>
        <h2 className='text-xl py-2 text-center border-b-2 border-green-600/70 '>FILTRAR</h2>
          <input className='h-[1rem] mx-2 my-3 text-center  text-black text-lg p-5 rounded-lg border-y-2 border-green-600/70'
          name='search'
          type="search"
          placeholder="Buscar Producto"
          onChange={handleChange}
          />
          <div className='flex flex-row justify-center items-center border-b-2 border-green-600/70'>
          </div>
          <div className='flex flex-col '>
            <label className='mt-5'>
              <input type="checkbox" name="plantas" value="opcion1" className='mx-2' onChange={handleChange}/> 
              Plantas
            </label>
            <label>
              <input type="checkbox" name="macetas" value="opcion2" className='mx-2' onChange={handleChange}/>
              Macetas
            </label>
            <label>
              <input type="checkbox" name="maceteros" value="opcion3" className='mx-2' onChange={handleChange}/>
              Maceteros
            </label>
            <label className="block  pt-4 border-t-2  border-green-600/70 text-center">
              Selecciona una opción:
            </label>
            <select id='opciones-select' name='filtrado' value={searchValues.filtrado} className="w-[77%] h-full ml-7 pt-7  p-1  rounded-md border-green-600/70 border-y-2" onChange={handleChange}>
              <option className='text-center' value=""   disabled>Selecciona...</option>
                <option className='text-center' value="asc">Más Reciente Primero</option>
                <option className='text-center' value="des">Más Antiguo Primero</option>
                <option className='text-center' value="lastMonth">Último Mes</option>
                <option className='text-center' value="lastYear">Último Año</option>
            </select>
          </div>
        </div>
        <div className="md:basis-[80%] lg:basis-[85%] flex flex-row justify-center flex-wrap">
          {catalogo.plantas.map((planta, index) => (
          <div key={index}>
            <CardPlantas {...planta} />
          </div>
                ))}
        </div>    
      </div>
    </div>
  )
}

export default Admin
