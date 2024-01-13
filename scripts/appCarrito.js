


function seleccionProducto(evt) {
    if (evt.target.classList.contains("btnAgregarCarrito")) {
        evt.preventDefault();
        let productoSelect = evt.target.parentElement;
    }

}

function datosProducto(prod){
    let nombre = prod.querySelector(".nombreProducto").textContent;
    let peso;
    let precio;
    let cantidad = prod.querySelector(".cantidad").value;
    const producto = {
        nombre: nombre,
        formato: peso,
        molienda: molienda,
        precio: precio,
        cantidad: cantidad,
    }
}


productos.addEventListener("click", seleccionProducto)

