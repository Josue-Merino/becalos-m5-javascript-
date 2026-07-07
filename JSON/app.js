// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};

// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        // Aquí simulas leer el JSON con un retraso de 1 segundo
        callback(biblioteca);
    }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}


// SOLUCIÓN 1: Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    
    setTimeout(() => {
        // Empujamos el nuevo objeto libro al array dentro de nuestra biblioteca
        biblioteca.libros.push(nuevoLibro);
        console.log(`\n Libro agregado con éxito: "${titulo}"`);
        
        // Volvemos a mostrar el inventario para ver el cambio reflejado
        mostrarLibros();
    }, 1000);
}

// SOLUCIÓN 2: Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado) {
    setTimeout(() => {
        // Buscamos el libro en el array que coincida con el título recibido
        const libroEncontrado = biblioteca.libros.find(libro => libro.titulo === titulo);
        
        if (libroEncontrado) {
            // Si el libro existe, mutamos su propiedad 'disponible'
            libroEncontrado.disponible = nuevoEstado;
            console.log(`\n Estado de "${titulo}" actualizado a: ${nuevoEstado ? 'Disponible' : 'Prestado'}`);
        } else {
            console.log(`\n [Sistema] El libro "${titulo}" no se encontró.`);
        }
        
        // Volvemos a mostrar el inventario para ver el cambio reflejado
        mostrarLibros();
    }, 1000);
}

// Ejemplo de cómo ejecutar la aplicación
// 1. Mostramos el estado inicial
mostrarLibros();

// 2. Agregamos un libro (Tardará 1 segundo en procesarse)
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);

// 3. Modificamos la disponibilidad de otro (Tardará 1 segundo en procesarse)
actualizarDisponibilidad("1984", false);