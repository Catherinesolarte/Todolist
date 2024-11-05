// Elementos HTML

const btn = document.getElementById("agregar");
const arregloTareas = [];
let ultimoId = 1;

const elimnarTarea = function (idTarea) {
  const posicion = arregloTareas.findIndex((e) => e.id == idTarea);

  if (posicion >= 0) {
    arregloTareas.splice(posicion, 1);
    dibujaLista();
  }
};

const marcarTareaRealizada = function (idTarea) {
  const posicion = arregloTareas.findIndex((e) => e.id == idTarea);

  arregloTareas[posicion].realizada = !arregloTareas[posicion].realizada;
  dibujaLista();
};

const dibujaLista = function () {
  const listaTareas = document.getElementById("listaTareas");

  let htmlElementosLista = `
  <thead>
    <tr>
      <th>ID</th>
      <th>Tarea</th>
      <th>Botones</th>
    </tr>
  </thead>
  <tbody> `;

  for (const tarea of arregloTareas) {
    if (tarea.realizada) {
      statusCheck = "checked";
    } else {
      statusCheck = "";
    }
    htmlElementosLista += `
    <tr>
      <td>${tarea.id}</td>
      <td>${tarea.nombre}</td>
      <td> <input type="checkbox" class="checkbox" ${statusCheck} onclick="marcarTareaRealizada(${tarea.id})"> </td>
      <td> <button class="btn btn-danger" onclick="elimnarTarea(${tarea.id})">Eliminar</button> </td>
    </tr>`;
  }

  htmlElementosLista += "</tbody>";

  listaTareas.innerHTML = htmlElementosLista;
  document.getElementById("totalTareas").innerHTML = arregloTareas.length;

  const arregloTareasRealizadas = arregloTareas.filter(
    (e) => e.realizada == true
  );
  document.getElementById("tareasRealizadas").innerHTML =
    arregloTareasRealizadas.length;
};

btn.addEventListener("click", function () {
  const nombreTarea = document.getElementById("nombreTarea").value;
  const id = ultimoId;
  const realizada = false;

  const tarea = {
    id: id,
    nombre: nombreTarea,
    realizada: realizada,
  };

  arregloTareas.push(tarea);

  ultimoId++;

  dibujaLista();
});
