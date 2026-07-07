const API_URL = 'https://rickandmortyapi.com/api/character';

// Función genérica interna para fetch
async function realizarLlamada(endpoint = '') {
    const response = await fetch(`${API_URL}${endpoint}`);
    
    if (!response.ok) { 
        throw new Error(`Fallo al obtener Recurso. Código HTTP: ${response.status}`);
    }

    return response.json();
}

// 1. Obtener todos 
async function obtenerPersonajes(pagina = 1) {
    try {
        const { results } = await realizarLlamada(`/?page=${pagina}`);
        return results; 
    } catch (error) {
        console.error("Error al obtener personajes:", error.message);
        throw error; 
    }
}

// 2. Buscar por ID
async function obtenerPersonaje(id = 1) {
    try {
        const personaje = await realizarLlamada(`/${id}`);
        return personaje;
    } catch (error) {
        console.error(`Error al obtener el personaje ${id}:`, error.message);
        throw error;
    }
}

// 3. Filtrar por Status
async function obtenerPersonajePorStatus(status = 'alive', pagina = 1) {
    try {
        const { results } = await realizarLlamada(`/?status=${status}&page=${pagina}`);
        return results;
    } catch (error) {
        console.error("Error al filtrar por status en API:", error.message);
        throw error;
    }
}

export {
    obtenerPersonajes,
    obtenerPersonaje,
    obtenerPersonajePorStatus
};