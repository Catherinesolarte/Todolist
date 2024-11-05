// Elementos HTML
const btn = document.getElementById("agregar");
const listaTareas = document.getElementById("listaTareas");
const totalTareas = document.getElementById("totalTareas");
const tareasRealizadas = document.getElementById("tareasRealizadas");

// Inicializar arreglo de tareas con 3 tareas predefinidas
const arregloTareas = [
  { id: 1, nombre: "Tarea 1", realizada: false },
  { id: 2, nombre: "Tarea 2", realizada: true },
  { id: 3, nombre: "Tarea 3", realizada: false },
];
let ultimoId = 4; // Siguiente ID disponible

// Dibuja la lista de tareas en la tabla HTML
const dibujaLista = function () {
  let htmlElementosLista = `
  <thead>
    <tr>
      <th>ID</th>
      <th>Tarea</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>`;

  // Recorre el arreglo de tareas y construye filas para cada tarea
  for (const tarea of arregloTareas) {
    const statusCheck = tarea.realizada ? "checked" : ""; // Verifica si está realizada

    // Crea una fila con los datos de la tarea
    htmlElementosLista += `
    <tr>
      <td>${tarea.id}</td>
      <td>${tarea.nombre}</td>
      <td><input type="checkbox" ${statusCheck} onclick="marcarTareaRealizada(${tarea.id})"></td>
      <td><button class="btn btn-danger" onclick="eliminarTarea(${tarea.id})">Eliminar</button></td>
    </tr>`;
  }

  htmlElementosLista += "</tbody>";
  listaTareas.innerHTML = htmlElementosLista; // Actualiza la tabla en el DOM

  // Actualiza el contador de total de tareas
  totalTareas.innerHTML = arregloTareas.length;

  // Filtra las tareas completadas y actualiza su contador
  const realizadas = arregloTareas.filter((tarea) => tarea.realizada).length;
  tareasRealizadas.innerHTML = realizadas;
};

// Función para agregar una nueva tarea al arreglo
btn.addEventListener("click", function () {
  const nombreTarea = document.getElementById("nombreTarea").value.trim();

  // Verifica que el nombre de la tarea no esté vacío
  if (nombreTarea === "") {
    alert("Por favor ingrese una tarea.");
    return;
  }

  // Crear un nuevo objeto tarea
  const tarea = {
    id: ultimoId,
    nombre: nombreTarea,
    realizada: false, // Todas las tareas nuevas inician como no realizadas
  };

  arregloTareas.push(tarea); // Agrega la tarea al arreglo
  ultimoId++; // Incrementa el ID para la siguiente tarea
  document.getElementById("nombreTarea").value = ""; // Limpia el input
  dibujaLista(); // Actualiza la lista de tareas
});

// Función para marcar una tarea como realizada o no realizada
const marcarTareaRealizada = function (idTarea) {
  const tarea = arregloTareas.find((t) => t.id === idTarea); // Busca la tarea por ID
  if (tarea) {
    tarea.realizada = !tarea.realizada; // Cambia el estado de realizada
    dibujaLista(); // Actualiza la lista de tareas
  }
};

// Función para eliminar una tarea del arreglo
const eliminarTarea = function (idTarea) {
  const index = arregloTareas.findIndex((t) => t.id === idTarea); // Encuentra el índice de la tarea
  if (index >= 0) {
    arregloTareas.splice(index, 1); // Elimina la tarea del arreglo
    dibujaLista(); // Actualiza la lista de tareas
  }
};

// Llama a dibujaLista al cargar la página para mostrar las tareas iniciales
dibujaLista();
