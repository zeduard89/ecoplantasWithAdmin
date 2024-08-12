const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchUpdate = async (formData, token, fetchCategory) => {
    
    let url;

    if (fetchCategory === 'plantas') {
        url = `${VITE_API_BASE_URL}/plantsRoute/updatePlant`;
    } else if (fetchCategory === 'macetas') {
        url = `${VITE_API_BASE_URL}/macetasRoute/updateMaceta`;
    } else if (fetchCategory === 'maceteros') {
        url = `${VITE_API_BASE_URL}/maceterosRoute/updateMacetero`;
    }

    if (!url) {
        return { success: false, error: 'Invalid category' };
    }

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
        const data = await response.json();

        if (data.token) {
            return { success: data.ok, token: data.token };
        } else {
            return { success: false, ...data };
        }
    } catch (error) {
        return { success: false, error: 'Network error' };
    }
};

export default fetchUpdate;
