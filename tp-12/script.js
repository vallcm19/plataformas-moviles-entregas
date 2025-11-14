let listaProductos = [];

function guardarLista() {
  localStorage.setItem('productos', JSON.stringify(listaProductos));
}

function cargarLista() {
  const almacenados = localStorage.getItem('productos');
  if (almacenados) {
    listaProductos = JSON.parse(almacenados);
    renderizarLista();
  }
}

function renderizarLista() {
  const ul = document.getElementById('lista-productos');
  ul.innerHTML = '';
  listaProductos.forEach((producto, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = producto.nombre;
    if (producto.comprado) span.classList.add('comprado');
    span.addEventListener('click', () => marcarComoComprado(index));

    li.appendChild(span);

    const btnEditar = document.createElement('button');
    btnEditar.textContent = '✏️';
    btnEditar.className = 'btn btn-sm btn-outline-secondary';
    btnEditar.onclick = () => editarProducto(index);
    li.appendChild(btnEditar);

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '🗑️';
    btnEliminar.className = 'btn btn-sm btn-outline-danger';
    btnEliminar.onclick = () => eliminarProducto(index);
    li.appendChild(btnEliminar);

    ul.appendChild(li);
  });
}

function agregarProducto(nombreProducto) {
  if (nombreProducto.trim() === '') return;
  listaProductos.push({ nombre: nombreProducto, comprado: false });
  guardarLista();
  renderizarLista();
}

function eliminarProducto(index) {
  listaProductos.splice(index, 1);
  guardarLista();
  renderizarLista();
}

function editarProducto(index) {
  const nuevoNombre = prompt("Editar nombre del producto:", listaProductos[index].nombre);
  if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
    listaProductos[index].nombre = nuevoNombre.trim();
    guardarLista();
    renderizarLista();
  }
}

function marcarComoComprado(index) {
  listaProductos[index].comprado = !listaProductos[index].comprado;
  guardarLista();
  renderizarLista();
}

function ordenarProductos() {
  listaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  guardarLista();
  renderizarLista();
}

function limpiarLista() {
  if (confirm("¿Estás segura de que querés borrar toda la lista?")) {
    listaProductos = [];
    guardarLista();
    renderizarLista();
  }
}

function handlerFormulario(evento) {
  evento.preventDefault();
  const input = evento.target.querySelector('input');
  agregarProducto(input.value);
  input.value = '';
}

document.getElementById('form-producto').addEventListener('submit', handlerFormulario);
document.getElementById('ordenar').addEventListener('click', ordenarProductos);
document.getElementById('limpiar').addEventListener('click', limpiarLista);

// Al cargar la página
cargarLista();
