const url = 'https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/clientes.json';

// Carga de los datos iniciales 
document.addEventListener("DOMContentLoaded", function () {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tabla = document.querySelector("table tbody");
      data.forEach(persona => {
        const row = tabla.insertRow();
        const MB = calcularMB(persona.sexo, persona.peso, persona.altura, persona.edad, persona.actividad);
        const get = calcularGet(persona.sexo, persona.peso, persona.altura, persona.edad);

        row.innerHTML = `
          <td>${persona.nombre}</td>
          <td>${persona.apellidos}</td>
          <td><span class="badge bg-primary">${persona.sexo}</span></td>
          <td>${persona.edad}</td>
          <td>${persona.altura}</td>
          <td>${persona.peso}</td>
          <td><span class="badge bg-secondary">${persona.actividad}</span></td>
          <td>${get} kcal/día</td>
          <td>${Math.round(MB)} kcal/día</td>
        `;
      });
    })
    .catch(err => console.error(err));
});


//Función que calcula el GET
function calcularGet(sexo, peso, altura, edad) {
  let get;
  if (sexo === "hombre") {
    get = 66.473 + (13.751 * peso) + (5.0033 * altura) - (6.755 * edad);
  } else {
    get = 655 + (9.463 * peso) + (1.8496 * altura) - (4.6756 * edad);
  }

  return Math.round(get);
}

//Función que calcula el GER
function calcularMB(sexo, peso, altura, edad, actividad) {
  let MB;
  if (sexo === "hombre") {
    MB = 66.473 + (13.751 * peso) + (5.0033 * altura) - (6.755 * edad);
  } else {
    MB = 655 + (9.463 * peso) + (1.8496 * altura) - (4.6756 * edad);
  }

  switch (actividad) {
    case "sedentaria":
      MB *= 1.2;
      break;
    case "moderada":
      MB *= 1.55;
      break;
    case "intensa":
      MB *= 1.725;
      break;
    default:
      break;
  }

  return Math.round(MB);
}

//Inserción de nueva fila.
// Seleccionar el botón "Guardar" y añadir un event listener
document.getElementById('guardar').addEventListener('click', function () {

  // Obtener los valores de los campos del formulario
  const nombre = document.querySelector('input[name="nombre"]').value;
  const apellidos = document.querySelector('input[name="apellidos"]').value;
  const sexo = document.querySelector('#Modal select[name="sexo"]').value;
  const actividad = document.querySelector('#Modal select[name="actividad"]').value;
  const edad = document.querySelector('#Modal input[name="edad"]').value;
  const peso = document.querySelector('#Modal input[name="peso"]').value;
  const altura = document.querySelector('#Modal input[name="altura"]').value;

  // // Si algún campo está vacío, mostrar un mensaje de error en un modal
  if (!nombre || !apellidos || !edad || !peso || !altura) {
    return;
  }

  // Calcular los valores de MB y get
  const MB = calcularMB(sexo, peso, altura, edad, actividad);
  const get = calcularGet(sexo, peso, altura, edad);

  // Crear una nueva fila para la tabla
  const nuevaFila = document.createElement('tr');
  let formulario = document.querySelector('form')
  const inputs = formulario.querySelectorAll('input, select');

  nuevaFila.innerHTML = `
      <td>${nombre}</td>
      <td>${apellidos}</td>
      <td><span class="badge bg-primary">${sexo}</td>
      <td>${edad}</td>
      <td>${altura}</td>
      <td>${peso}</td>
      <td><span class="badge bg-secondary">${actividad}</td>
      <td>${get} kcal/día</td>
      <td>${Math.round(MB)} kcal/día</td>
    `;

  // Agregar la nueva fila a la tabla
  const tabla = document.querySelector('table tbody');
  tabla.appendChild(nuevaFila);
  formulario.reset();

  // Cerrar el modal de guardar
  const modal = document.getElementById('Modal');
  const modalBootstrap = bootstrap.Modal.getInstance(modal);
  modalBootstrap.hide();
});



// Cargar datos externos
const btnCargar = document.querySelector("#btnAdd"); 
 
btnCargar.addEventListener("click", function() { 
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tabla = document.querySelector("table tbody");
      data.forEach(persona => {
        const row = tabla.insertRow();
        const MB = calcularMB(persona.sexo, persona.peso, persona.altura, persona.edad, persona.actividad);
        const get = calcularGet(persona.sexo, persona.peso, persona.altura, persona.edad);

        row.innerHTML = `
          <td>${persona.nombre}</td>
          <td>${persona.apellidos}</td>
          <td><span class="badge bg-primary">${persona.sexo}</span></td>
          <td>${persona.edad}</td>
          <td>${persona.altura}</td>
          <td>${persona.peso}</td>
          <td><span class="badge bg-secondary">${persona.actividad}</span></td>
          <td>${get} kcal/día</td>
          <td>${Math.round(MB)} kcal/día</td>
        `;
      });
    })
    .catch(err => console.error(err));
});