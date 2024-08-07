const VITE_API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL2;

const fetchAdmin = async ({ formValues }) => {
  const url = `${VITE_API_BASE_URL2}/adminRoute/adminLogin`; // Cambia esto por la URL de tu API
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
      return { success: data.ok, token: data.token }; // Devuelve el resultado en caso de éxito
    } else {
      return { success: false, ...data }; // Devuelve un objeto de error
    }
  } catch (error) {
    //console.error('Error occurred during login:', error);
    return { success: false, error: 'Network error' }; // Devuelve un objeto de error de red
  }
};

export default fetchAdmin;