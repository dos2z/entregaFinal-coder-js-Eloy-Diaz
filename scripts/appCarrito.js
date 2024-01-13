
const arrCarrito = [];

function seleccionProducto(evt) {
    let producto;
    if (evt.target.classList.contains("btnAgregarCarrito")) {
        evt.preventDefault();
        let productoSelect = evt.target.parentElement;
        producto = datosProducto(productoSelect);
        if(arrCarrito.some((prod) => (prod.nombre === producto.nombre) && (prod.peso === producto.peso))){
            for (prod of arrCarrito){
                if (prod.nombre === producto.nombre){
                    prod.cantidad++
                }
            }
        }else{
            arrCarrito.push(producto)
        }
    }
   

}

function datosProducto(prod){
    let nombre = prod.querySelector(".nombreProducto").textContent;
    let peso;
    let precio;
    if (prod.querySelector(".peso250g").checked){
        peso = "250g";
        precio = prod.querySelector(".precio250g").textContent;
    } else{
        peso = "1Kg";
        precio = prod.querySelector(".precio1Kg").textContent;
    }
    let molienda = prod.querySelector(".molienda").value;
    let cantidad = prod.querySelector("#cantidad").value;
    const producto = {
        nombre: nombre,
        formato: peso,
        molienda: molienda,
        precio: precio,
        cantidad: Number(cantidad),
    }
    return producto;
}


productos.addEventListener("click", seleccionProducto)

