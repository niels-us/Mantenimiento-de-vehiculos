/**
 * Función que retorna un elemento con document.getElementById
 * recibe como parametro el id del elemento
 *
 * @param {*} id
 * @returns
 */
export const gebid = (id) => {
	let elemento = document.getElementById(id);
	return elemento;
};

export const create = (etiqueta) => {
	let elemento = document.createElement(etiqueta);
	return elemento;
};
