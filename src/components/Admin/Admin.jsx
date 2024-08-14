import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFilterData } from '../../redux/filterSilce'
import { adminToken } from '../../redux/adminSlice'
import fetchFilter from '../api/fetchFilter'
import CardPlantas from '../Card/CardPlantas';
import CardMacetas from '../Card/CardMacetas'
import CardMaceteroUnit from '../Card/CardMaceteroUnit'
import BigScreenFilter from './bigScreenFilter';
import SmallScreenFilter from './SmallScreenFilter';
import CardModal from './CardModal/CardModal';
import DashBoard from './DashBoard';
 
const Admin = () => {

  const filterData = useSelector((state) => state.filter.filterArray);
  const token = useSelector((state) => state.admin.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValues, setSearchValues] = useState({
    search: '',
    plantas: false,
    macetas: false,
    maceteros: false,
    filtrado:'',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState('');


  const handleOnClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    // Función para obtener los datos filtrados desde el backend
    const fetchFilteredData = async () => {
      try {
        const response = await fetchFilter(searchValues, token );
        if(response.data.error){
          setLogoutMessage('Tu sesión ha expirado o ha habido un error. Por favor, inicia sesión nuevamente.');
          dispatch(adminToken(''));
        }
        dispatch(addFilterData(response.data));
      } catch (error) {
        console.error('Error al obtener los datos filtrados:', error);
      }
  };
    fetchFilteredData();
  }, [searchValues,isModalOpen, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className='mt-[8rem] flex flex-col items-center h-fit'>
      {logoutMessage && (
        <>
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        <div className="fixed sm:w-[50%] w-[90%] top-[30%] z-50 flex flex-col justify-center items-center text-center rounded-lg p-4  bg-green-600 text-white border-2">
          {logoutMessage}
          <button
            onClick={() => navigate('/')} // Redirige al hacer clic
            className="ml-4 p-2 bg-white text-sm text-black font-bold border border-red-600 rounded w-[50%] "
          >
            Volver a Iniciar Sesión
          </button>
        </div>
        </>
      )}
      <DashBoard setSearchValues={setSearchValues} token={token} searchValues={searchValues}/>
      <SmallScreenFilter  searchValues={searchValues} handleChange={handleChange}/>
      {/* CARDS small-Screen*/}
      <div className="lg:hidden flex flex-row justify-center flex-wrap">
      {Array.isArray(filterData) ? (
              filterData.map((element, index) => {
                  if (element.category === 'plantas') {
                    return <CardPlantas key={`plantas-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
                  } else if (element.category === 'macetas') {
                    return <CardMacetas key={`macetas-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
                  } else if (element.category === 'maceteros') {
                    return <CardMaceteroUnit key={`maceteros-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
                  } else {
                    return null; // Devuelve null si no coincide ninguna categoría
                  }
                })):(<p>No hay datos disponibles</p>)
            }
      </div>  
      
      <div className='w-full flex flex-row text-center'>

        <BigScreenFilter searchValues={searchValues} handleChange={handleChange}/>
          
        {/* CARDS big-screen*/}
        <div className="hidden lg:block">
          <div className='flex flex-wrap justify-center gap-5'>
            {Array.isArray(filterData) ? (
              filterData.map((element, index) => {
                  if (element.category === 'plantas') {
                    return <CardPlantas key={`plantas-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
                  } else if (element.category === 'macetas') {
                    return <CardMacetas key={`macetas-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
                  } else if (element.category === 'maceteros') {
                    return <CardMaceteroUnit key={`maceteros-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
                  } else {
                    return null; // Devuelve null si no coincide ninguna categoría
                  }
                })):(<p>No hay datos disponibles</p>)
            }
          </div>
        </div>   
      </div>

      <CardModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        content={selectedItem }
      />

    </div>
  )
}

export default Admin
