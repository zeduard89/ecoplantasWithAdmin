const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchFilter = async (filterData, token) => {
  const url = `${VITE_API_BASE_URL}/filterRoute/filter`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(filterData),
    });
    const data = await response.json();
    
    if (data ) {
      return {data};
    } else {
      return { success: false, ...data };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export default fetchFilter;