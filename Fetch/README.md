# Callbacks and JSON
El método fetch es una herramienta esencial para cualquier desarrollador JavaScript que desee trabajar con datos externos. Ofrece una forma moderna, limpia y eficiente de realizar solicitudes HTTP. Aunque es importante manejar los errores correctamente y comprender sus limitaciones, fetch es una opción poderosa y flexible para cualquier proyecto web. Axios es una herramienta poderosa y flexible para manejar solicitudes HTTP en JavaScript. Su facilidad de uso y características avanzadas lo hacen ideal para una variedad de aplicaciones, desde consumo de APIs hasta sistemas complejos.
La solución a este ejercicio esta dividida en el archivo `app.js`, `api.js`, `index.html` y `style.css`.

## Objetivo

El objetivo es que desarrolles las habilidades necesarias para realizar solicitudes HTTP y manejar datos obtenidos de APIs, utilizando tanto `fetch` como Axios. Además, practicarás el manejo de errores y la representación de datos en una interfaz gráfica sencilla.

### Problema: Consumo de APIs con Fetch y Axios
En este proyecto, crearás una aplicación web sencilla que permita obtener información de personajes de una API de tu elección (como la de Star Wars o Rick & Morty). La aplicación deberá mostrar los datos obtenidos en la interfaz de usuario y ofrecerá dos botones para realizar las mismas solicitudes, uno utilizando `fetch` y otro utilizando `axios`. Esto te permitirá comparar el uso de ambas herramientas.

### Solución con Axios
Aquí se dejará el código de `app.js` usando la biblioteca Axios, de esta manera se tendran ambas soluciones, es decir, uso de Fetch nativo y Axios.

```
const API_URL = 'https://rickandmortyapi.com/api/character';

// Función genérica interna adaptada para Axios
async function realizarLlamada(endpoint = '') {
    // Axios maneja los errores HTTP (4xx, 5xx) lanzando una excepción automáticamente
    const response = await axios.get(`${API_URL}${endpoint}`);
    
    // Axios guarda la respuesta del servidor ya transformada a objeto JS en '.data'
    return response.data;
}

// 1. Obtener todos (Retorna directamente el array 'results')
async function obtenerPersonajes(pagina = 1) {
    try {
        const { results } = await realizarLlamada(`/?page=${pagina}`);
        return results; 
    } catch (error) {
        // Axios guarda la respuesta de error del servidor en 'error.response'
        const mensaje = error.response ? `Código HTTP: ${error.response.status}` : error.message;
        console.error("Error al obtener personajes:", mensaje);
        throw error; 
    }
}

// 2. Buscar por ID
async function obtenerPersonaje(id = 1) {
    try {
        const personaje = await realizarLlamada(`/${id}`);
        return personaje;
    } catch (error) {
        const mensaje = error.response ? `Código HTTP: ${error.response.status}` : error.message;
        console.error(`Error al obtener el personaje ${id}:`, mensaje);
        throw error;
    }
}

// 3. Filtrar por Status
async function obtenerPersonajePorStatus(status = 'alive', pagina = 1) {
    try {
        const { results } = await realizarLlamada(`/?status=${status}&page=${pagina}`);
        return results;
    } catch (error) {
        const mensaje = error.response ? `Código HTTP: ${error.response.status}` : error.message;
        console.error("Error al filtrar por status en API:", mensaje);
        throw error;
    }
}

export {
    obtenerPersonajes,
    obtenerPersonaje,
    obtenerPersonajePorStatus
};
```
