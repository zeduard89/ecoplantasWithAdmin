const fetchAdmin = async ({ formValues }) => {
  const url = 'https://jsonplaceholder.typicode.com/users/1'; // Cambia esto por la URL de tu API
  const data = {
    username: formValues.username,
    password: formValues.password,
  };

  try {
    const response = await fetch(url, {
      //method: 'POST',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      //console.log('Login successful:', result);
      return { success: true, data: result }; // Devuelve el resultado en caso de éxito
    } else {
      const errorData = await response.json();
      //console.log('Login failed:', errorData);
      return { success: false, ...errorData }; // Devuelve un objeto de error
    }
  } catch (error) {
    //console.error('Error occurred during login:', error);
    return { success: false, error: 'Network error' }; // Devuelve un objeto de error de red
  }
};

export default fetchAdmin;