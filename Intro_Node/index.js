import { planetas } from "./planetas.js";


// Reporte (Recorrer array de planetas)

planetas.forEach(planeta => {
    const { nombre, descripcion, descubiertoEn } = planeta
    console.log(`El planeta ${nombre} se descubrio en ${descubiertoEn}. ${descripcion}`)
});