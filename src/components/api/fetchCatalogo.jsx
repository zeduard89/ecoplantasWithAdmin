const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchCatalogo = async (token) => {
  
  const url = `${VITE_API_BASE_URL}/filterRoute/getAll`; 

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.json();

    const plantas = data.filter(element => element.category === 'plantas')
    const macetas = data.filter(element => element.category === 'macetas')
    const maceteros = data.filter(element => element.category === 'maceteros')


    if (data) {
      return {plantas,macetas,maceteros};
    } else {
      return { success: false, ...data };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export default fetchCatalogo;