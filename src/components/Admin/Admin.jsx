import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilterData } from '../../redux/filterSilce'
import fetchFilter from '../api/fetchFilter'
import CardPlantas from '../Card/CardPlantas';
import CardMacetas from '../Card/CardMacetas'
import CardMaceteroUnit from '../Card/CardMaceteroUnit'
import BigScreenFilter from './bigScreenFilter';
import SmallScreenFilter from './SmallScreenFilter';
import CardModal from './CardModal';
 
const Admin = () => {

  const filterData = useSelector((state) => state.filter.filterArray);
  const token = useSelector((state) => state.admin.token);

  const dispatch = useDispatch();
  const [searchValues, setSearchValues] = useState({
    search: '',
    plantas: false,
    macetas: false,
    maceteros: false,
    filtrado:'',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
        dispatch(addFilterData(response.data));
      } catch (error) {
        console.error('Error al obtener los datos filtrados:', error);
      }
  };
    fetchFilteredData();
  }, [searchValues, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className='mt-[8rem] flex flex-col items-center h-fit'>
      <div className='h-[20rem] w-[90%] mb-5 bg-white rounded-md flex justify-center items-center'>
        <h1>ADMIN DASHBOARD</h1>
      </div>

      <SmallScreenFilter  searchValues={searchValues} handleChange={handleChange}/>
      {/* CARDS small-Screen*/}
      <div className="lg:hidden flex flex-row justify-center flex-wrap">
        {filterData.length === 0 ? <h1 className='my-2 font-bold text-black text-2xl'>Realize una busqueda</h1> : (
          filterData.map((element, index) => {
          if (element.category === 'plantas') {
              return <CardPlantas key={`plantas-${index}`} {...element} openModal={() => handleOnClick(element)} />;
              } else if (element.category === 'macetas') {
              return <CardMacetas key={`macetas-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
              } else if (element.category === 'maceteros') {
              return <CardMaceteroUnit key={`maceteros-${index}`} {...element} openModal={() => handleOnClick(element)}/>;
              } else {
              return null; 
              }
            })
          )}
      </div>  
      
      <div className='w-full flex flex-row text-center'>

        <BigScreenFilter searchValues={searchValues} handleChange={handleChange}/>
          
        {/* CARDS big-screen*/}
        <div className="hidden lg:block">
          <div className='flex flex-wrap justify-center gap-5'>
            {filterData.length === 0 ? <h1 className='h-full font-bold text-black text-2xl'>Realize una busqueda</h1> : (
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
                })
            )}
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
