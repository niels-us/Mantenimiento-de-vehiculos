import {
	getCategorias,
	getVehiculos,
	postVehiculo,
	deleteVehiculo,
	putVehiculo
} from './servicios.js';
import {
	create,
	gebid
} from './utils.js';

let categoriasGlobal = [];

const loading = document.getElementById('loading');

const selectCategorias1 = gebid('selectCategorias1');
const selectCategorias = gebid('selectCategorias');
const contenedorVehiculos = gebid('contenedorVehiculos');

const formVehiculo = gebid('formVehiculo');
const inputPlaca = gebid('inputPlaca');
const selectColor = gebid('selectColor');
const inputFoto = gebid('inputFoto');

formVehiculo.onsubmit = (e) => {
	e.preventDefault();

	// armar el objVehiculo para mandarlo a los servicios de POST
	let objVehiculo = {
		color: selectColor.value,
		placa: inputPlaca.value,
		foto: inputFoto.value,
		categoria_id: selectCategorias.value
	};
	postVehiculo(objVehiculo).then((rpta) => {
		if (rpta) {
			llamarGetVehiculos();
		} else {
			// TODO: Mostrar una ventana de error de creacións
		}
	});
};

const activarLoading = (mensaje) => {
	loading.style.display = 'flex';
	loading.style.innerText = mensaje
}

const desactivarLoading = () => loading.style.display = 'flex';

const llenarVehiculos = (vehiculos) => {

	contenedorVehiculos.innerHTML = '';

	vehiculos.forEach((objVehiculo) => {
		const colMd4 = create('div');
		colMd4.classList.add('col-md-4');

		const card = create('div');
		card.classList.add('card');

		const imagen = create('img');
		imagen.classList.add('card-img-top');
		imagen.src = objVehiculo.foto;

		const cardBody = create('div');
		cardBody.classList.add('card-body');

		const titulo = create('h4');
		titulo.classList.add('card-title');
		titulo.innerText = objVehiculo.placa;

		const pColor = create('p');
		pColor.classList.add('card-text');
		pColor.innerHTML = `<strong>Color: </strong> ${objVehiculo.color}`;

		const pCategoria = create('p');
		pCategoria.classList.add('card-text');

		// Buscar en el arreglo global de categorías, aquella que cuyo ID coincida
		// con el ID de la categoría actual del vehículo
		let objCategoria = categoriasGlobal.find(
			(objCategoria) => +objCategoria.id === +objVehiculo.categoria_id
		);

		pCategoria.innerHTML = `<strong>Categoria: </strong> ${objCategoria.nombre}`;

		const btnEliminar = create('button');
		btnEliminar.classList.add('btn', 'btn-danger', 'mx-1');
		btnEliminar.setAttribute('id', 'btnEliminar')

		btnEliminar.onclick = () => {
			EliminarVehiculo(objVehiculo.id);
		};

		btnEliminar.innerText = 'Delete';

		const btnAccion = create('button');
		btnAccion.classList.add('btn', 'btn-primary', 'mx-1');
		btnAccion.setAttribute('id', 'btnAccion')
		btnAccion.onclick = () => {
			traerVehiculo(objVehiculo);
		};

		btnAccion.innerText = 'Select';

		colMd4.append(card);
		card.append(imagen);
		card.append(cardBody);
		cardBody.append(titulo);
		cardBody.append(pColor);
		cardBody.append(pCategoria);
		cardBody.append(btnAccion);
		cardBody.append(btnEliminar)

		contenedorVehiculos.appendChild(colMd4);
	});
};

const llenarCategorias = (categorias) => {
	let options = '';
	categorias.forEach((objCategoria) => {
		options += `<option value="${objCategoria.id}">${objCategoria.nombre}</option>`;
	});
	selectCategorias.innerHTML = options;
	selectCategorias1.innerHTML = options;
};

const llamarGetVehiculos = () => {
	getVehiculos().then((vehiculos) => {
		llenarVehiculos(vehiculos);
	});
};

getCategorias().then((categorias) => {
	categoriasGlobal = categorias;
	llenarCategorias(categorias);
	llamarGetVehiculos();
});

// implementando delete
const EliminarVehiculo = (e) => {

	console.log(e);

	let objVehiculo;
	objVehiculo = e;

	deleteVehiculo(objVehiculo).then((rpta) => {

		if (rpta) {
			llamarGetVehiculos();
		} else {
			// TODO: Mostrar una ventana de error de creacións
		}
	});

}

// Implementando Pull

// const abrirModal = (objPelicula) => {
// 	spanNombrePelicula.innerText = objPelicula.title;
// 	modalPelicula.show();
// };

const idVehiculo=gebid('idVehiculo');
const inputPlaca1 = gebid('inputPlaca1');
const selectColor1 = gebid('selectColor1');
const inputFoto1 = gebid('inputFoto1');

const modalVehiculo = new bootstrap.Modal(staticBackdrop);

const traerVehiculo = (e) => {

	// console.log(e);

    idVehiculo.innerText=e.id

	selectCategorias1.value = e.categoria_id
	inputPlaca1.value = e.placa
	selectColor1.value = e.color
	inputFoto1.value = e.foto

	modalVehiculo.show();

}


const formVehiculo1 = gebid('formVehiculo1');

formVehiculo1.onsubmit = (e) => {
	e.preventDefault();
	// console.log(idVehiculo.innerText);

	let idVehiculos = idVehiculo.innerText;

	// armar el objVehiculo para mandarlo a los servicios de POST
	let objVehiculo = {
		color: selectColor1.value,
		placa: inputPlaca1.value,
		foto: inputFoto1.value,
		categoria_id: selectCategorias1.value
	};
	putVehiculo(objVehiculo,idVehiculos).then((rpta) => {
		if (rpta) {
			llamarGetVehiculos();
		} else {
			// TODO: Mostrar una ventana de error de creacións
		}
	});
};