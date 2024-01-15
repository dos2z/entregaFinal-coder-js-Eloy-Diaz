const carritoHTML = document.querySelector(".carrito")
const btnEliminarCarrito = document.querySelector("#btnEliminarCarrito")

let arrCarrito;

//Sincronización de storage y comprobación si hay datos guardados
function sincroCarritoStorage() {
    localStorage.setItem("carrito", JSON.stringify(arrCarrito));
}
let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
carritoStorage ? arrCarrito = carritoStorage : arrCarrito = [];
llenarCarritoHTML();
cantidadProductos();
precioFinal();

//funcion para que no se duplique el arrCarrito en el carrito HTML
function limpiarCarrito() {
    while (carritoHTML.firstChild) {
        carritoHTML.removeChild(carritoHTML.firstChild);
    }
}
//funcion que llena el carrito en el HTML
function llenarCarritoHTML() {
    limpiarCarrito();
    if (arrCarrito.length != 0) {
        arrCarrito.forEach((prod) => {
            const productoEnCarrito = document.createElement("div");
            productoEnCarrito.innerHTML = `
            <div class="datos">
            <p class="prodNombre">${prod.nombre}</p>
            <p>Peso: ${prod.formato}</p>
            <p>Molienda: ${prod.molienda}</p>
            <p>$ ${prod.precio}</p>
            <p>Cantidad: ${prod.cantidad}</p>
            </div>`;
            carritoHTML.appendChild(productoEnCarrito);
        })
    } else {
        const carritoVacio = document.createElement("div");
        carritoVacio.innerHTML = `<p>Carrito Vacío</p>`;
        carritoHTML.appendChild(carritoVacio);
    }
}


//Funcion que mete el producto seleccionado en el array del carrito y en el HTML
function seleccionProducto(evt) {
    let producto;
    if (evt.target.classList.contains("btnAgregarCarrito")) {
        evt.preventDefault();
        let productoSelect = evt.target.parentElement;
        producto = datosProducto(productoSelect);
        if (arrCarrito.some((prod) => (prod.nombre === producto.nombre) && (prod.peso === producto.peso) && (prod.molienda === producto.molienda))) {
            for (prod of arrCarrito) {
                if (prod.nombre === producto.nombre) {
                    prod.cantidad++
                }
            }
        } else {
            arrCarrito.push(producto)
        }
        sincroCarritoStorage();
        llenarCarritoHTML();
        cantidadProductos();
        precioFinal();
        
    }
}
//funcion que rescata los datos necesarios para el carrito
function datosProducto(prod) {
    let nombre = prod.querySelector(".nombreProducto").textContent;
    let peso;
    let precio;
    if (prod.querySelector(".peso250g").checked) {
        peso = "250g";
        precio = prod.querySelector(".precio250g").textContent;
    } else {
        peso = "1Kg";
        precio = prod.querySelector(".precio1Kg").textContent;
    }
    let molienda = prod.querySelector(".molienda").value;
    let cantidad = prod.querySelector(".cantidad").value;
    const producto = {
        nombre: nombre,
        formato: peso,
        molienda: molienda,
        precio: Number(precio),
        cantidad: Number(cantidad),
    }
    return producto;
}
//funcion que elimina los productos cargados en el carrito
function eliminarCarrito(evt) {
    evt.preventDefault();
    if (arrCarrito.length != 0) {

        Swal.fire({
            title: "Desea eliminar los produtos?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                arrCarrito = [];
                llenarCarritoHTML();
                sincroCarritoStorage();
                cantidadProductos();
                precioFinal();
                Swal.fire("Carrito vacío", "", "success");
            } 
        });
    }
}
//funcion para obtener la cantidad de productos del carrito
function cantidadProductos(){
    let cantProductos = 0;
    arrCarrito.forEach((prod) => {
        cantProductos += prod.cantidad;
    })
    document.querySelector("#contadorCarrito").textContent = cantProductos;
}
//funcion para calcular el monto total del carrito
function precioFinal(){
    let total = 0;
    arrCarrito.forEach((prod) => {
        let valor = prod.precio * prod.cantidad;
        total += valor;
    })
    document.querySelector("#valorTotal").textContent = total;
}

productos.addEventListener("click", seleccionProducto)
btnEliminarCarrito.addEventListener("click", eliminarCarrito)

