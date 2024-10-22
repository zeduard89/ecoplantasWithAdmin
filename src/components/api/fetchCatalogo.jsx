const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchCatalogo = async () => {
  
  const url = `${VITE_API_BASE_URL}/filterRoute/getAll`; 

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      },
    });
    const data = await response.json();

    const plantas = data.filterArray.filter(element => element.category === 'plantas')
    const macetas = data.filterArray.filter(element => element.category === 'macetas')
    const maceteros = data.filterArray.filter(element => element.category === 'maceteros')
    const emptyCatalogo = data.emptyCatalogo
    if (data) {
      return {plantas,macetas,maceteros, emptyCatalogo};
    } else {
      return { success: false, ...data };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export default fetchCatalogo;