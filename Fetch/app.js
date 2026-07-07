import {
    obtenerPersonajes,
    obtenerPersonaje,
    obtenerPersonajePorStatus
} from './api.js';

const container = document.querySelector('.grid__characters');

document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('#select');
    const inputNumber = document.querySelector('#numberCharacter');
    const btn = document.querySelector('#form-btn');
    const btnNext = document.querySelector('#next');
    const btnPrev = document.querySelector('#prev');
    
    let paginaActual = 1; 

    // 1. BOTÓN PRINCIPAL
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        inputNumber.value = '';
        paginaActual = 1; // <- AQUÍ SE HACE EL RESET
        buscar();
    });

    // 2. BOTÓN NEXT: Suma 1 y busca
    btnNext.addEventListener('click', (event) => {
        event.preventDefault();
        inputNumber.value = '';
        paginaActual++; // Avanzamos de página
        buscar();
    });

    // 3. BOTÓN PREV: Resta 1 y busca
    btnPrev.addEventListener('click', (event) => {
        event.preventDefault();
        if (paginaActual > 1) {
            paginaActual--; // Retrocedemos de página
            buscar();
        }
    });

    
    async function buscar() {
        const opcion = select.value;
        const personajePorNumero = parseInt(inputNumber.value);
        
        container.innerHTML = ''; 

        
        if (personajePorNumero > 0 && personajePorNumero <= 826) {
            const personaje = await obtenerPersonaje(personajePorNumero);
            const { name, status, image } = personaje;
            mostrarHTML(name, status, image);
            return; // Detiene la función aquí para no hacer el switch
        } 
        
        
        switch (opcion) {
            case 'all':
                const personajes = await obtenerPersonajes(paginaActual); 
                iterarLista(personajes);
                break;
                
            case 'alive':
            case 'dead':
            case 'unknown':
                const personajesPorStatus = await obtenerPersonajePorStatus(opcion, paginaActual); 
                iterarLista(personajesPorStatus);
                break;    
        
            default:
                break;
        }
    }
});

// Función que crea la tarjeta y la inserta
export function mostrarHTML(name, status, image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${image}" alt="Imagen de ${name}, personaje de Rick & Morty" class="card__image" loading="lazy">
        <h2 class="card__name">${name}</h2>
        <p class="card__status">${status}</p>
    `;

    
    container.appendChild(card);
}

function iterarLista(arreglo) {
    arreglo.forEach( personaje => {
        const { name, status, image } = personaje;
        mostrarHTML(name, status, image);
    });
}