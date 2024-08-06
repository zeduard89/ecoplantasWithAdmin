const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default async function obtenerDatosPosts() {
    // Inicializa un array para almacenar los datos de los posts
    let resultados = [];
    let macetas = [];
    let plantas = [];
    let maceteros = [];
    let varios = [];

    // Función para obtener datos de todas las páginas
    const fetchAllPages = async (baseURL, maxPages = 3) => {
      let allData = [];
      let index = 1; // Comienza en la página 1
      let pagesFetched = 0;
  
      while (pagesFetched < maxPages) {
          const response = await fetch(`${baseURL}?page=${index}`);
          const data = await response.json();
          
          if (data.posts && data.posts.length > 0) {
              allData.push(...data.posts);
              pagesFetched++;
              index++;
          } else {
              console.log('No hay más publicaciones o la página actual está vacía.');
              break; // Sale del bucle si no hay más datos
          }
      }
  
      return allData;
  };
    // Obtiene todos los datos
    const allPosts = await fetchAllPages(VITE_API_BASE_URL);

    // Expresión regular para extraer contenido entre <p> y </p>
    const regex = /<p>(.*?)<\/p>/;

    allPosts.forEach(post => {
        // Inicializa variables para cada post
        let id = post.ID;
        let title = post.title;
        let content = '';
        let list = { boca: '', base: '', altura: '', peso: '', capacidad: '' };
        let category = '';
        let imgUrl = '';

        // Extrae datos de la lista si la categoría es "macetas"
        const categoriesArray = Object.values(post.categories).map(cat => cat.name);

        if (categoriesArray.includes("macetas")) {
            const listItemMatches = post.content.match(/<li>([^<]*)<\/li>/g);
            if (listItemMatches) {
                listItemMatches.forEach(item => {
                    const [key, value] = item.replace(/<\/?li>/g, '').split(':');
                    if (key && value) {
                        const cleanedValue = value.trim();
                        if (key === 'Boca') list.boca = cleanedValue;
                        if (key === 'Base') list.base = cleanedValue;
                        if (key === 'Altura') list.altura = cleanedValue;
                        if (key === 'Peso') list.peso = cleanedValue;
                        if (key === 'Capacidad') list.capacidad = cleanedValue;
                    }
                });
            }
            content = list;
        } else {
            // Extrae content si no es una maceta
            const contentMatch = post.content.match(regex);
            if (contentMatch) {
                content = contentMatch[1];
            }
        }

        // Obtiene la categoría
        category = Object.keys(post.categories).length > 0 
            ? post.categories[Object.keys(post.categories).pop()].name
            : '';

        // Obtiene la URL de la imagen
        const idUrl = Object.keys(post.attachments);
        if (idUrl.length > 0) {
            imgUrl = post.attachments[idUrl.pop()].URL; // Usa el primer attachment ID
        }

        // Almacena los resultados
        resultados.push({
            id,
            title,
            content,
            imgUrl,
            category
        });
    });

    // Clasifica los resultados
    resultados.forEach(element => {
        switch (element.category) {
            case "macetas":
                macetas.push(element);
                break;
            case "plantas":
                plantas.push(element);
                break;
            case "maceteros":
                maceteros.push(element);
                break;
            default:
                console.log("Categoría no reconocida", element);
                break;
        }
    });

    return { macetas, plantas, maceteros };
}
