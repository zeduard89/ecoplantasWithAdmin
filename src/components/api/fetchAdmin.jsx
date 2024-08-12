const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchAdmin = async ({ formValues }) => {
  const url = `${VITE_API_BASE_URL}/adminRoute/adminLogin`;
  const adminData = {
    email: formValues.email,
    password: formValues.password,
  };

  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
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

export default fetchAdmin;