const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const fetchUpload = async (formData, token, fetchCategory) => {
    let url;

    if (fetchCategory === 'plantas') {
        url = `${VITE_API_BASE_URL}/plantsRoute/uploadPlant`;
    } else if (fetchCategory === 'macetas') {
        url = `${VITE_API_BASE_URL}/macetasRoute/uploadMaceta`;
    } else if (fetchCategory === 'maceteros') {
        url = `${VITE_API_BASE_URL}/maceterosRoute/uploadMacetero`;
    }

    if (!url) {
        return { success: false, error: 'Invalid category' };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });
        const data = await response.json();
        if (data) {
            return data;
        } else {
            return { success: false, ...data };
        }
    } catch (error) {
        return { success: false, error: 'Network error' };
    }
}

export default fetchUpload
