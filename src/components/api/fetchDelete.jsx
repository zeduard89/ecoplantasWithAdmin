const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchDelete = async (content,token) => {
  
    let url;

    if (content.category === 'plantas') {
        url = `${VITE_API_BASE_URL}/plantsRoute/deletePlantaById/${content.id}}`;
    } else if (content.category === 'macetas') {
        url = `${VITE_API_BASE_URL}/macetasRoute/deleteMacetaById/${content.id}`;
    } else if (content.category === 'maceteros') {
        url = `${VITE_API_BASE_URL}/maceterosRoute/deleteMaceteroById/${content.id}`;
    }
    console.log(url)
    if (!url) {
        return { success: false, error: 'Categoria invalida' };
    }

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data)

        if (data.token && data.message) {
            return { data };
        } else {
            return { success: false, ...data };
        }
    } catch (error) {
        return { success: false, error: 'Network error' };
    }
};

export default fetchDelete;