const carritoHTML = document.querySelector(".carrito")
const btnConfirmarCarrito = document.querySelector("#btnConfirmar")
const btnEliminarCarrito = document.querySelector("#btnEliminarCarrito")


let arrCarrito;

//Sincronización de storage y comprobación si hay datos guardados
function sincroCarritoStorage() {
    localStorage.setItem("carrito", JSON.stringify(arrCarrito));
}
let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
carritoStorage ? arrCarrito = carritoStorage : arrCarrito = [];
actualizarCarrito();

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
            <div class="prodNombre">
                <p>${prod.nombre}</p><span class="btnEliminarProducto">X</span>
            </div>
            <div class="datos">
            <p>Peso: ${prod.formato}</p>
            <p>Molienda: ${prod.molienda}</p>
            <p>Precio: $ ${prod.precio}</p>
            <p> x ${prod.cantidad}</p>
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
                let incremento = Number(productoSelect.querySelector(".cantidad").value);
                prod.nombre === producto.nombre && (prod.cantidad += incremento);
            }
        } else {
            arrCarrito.push(producto)
        }
        notifier.show(`se añadio ${producto.nombre} al carrito`, '', 'success', './assets/iconos/ok-48.png', 1000);
        sincroCarritoStorage();
        actualizarCarrito();
    } else if (evt.target.classList.contains("imgProducto")) {
        evt.preventDefault();
        let elementoPadre = evt.target.parentElement.parentElement;
        let nombre = elementoPadre.querySelector(".nombreProducto").textContent;
        let img;
        let notasCata;
        let variedad;
        let procesamiento;
        let altura;
        let region;
        for (let prod of arrInfoProductos) {
            if (prod.nombre === nombre) {
                img = prod.img;
                notasCata = prod.notas;
                variedad = prod.variedad;
                procesamiento = prod.procesamiento;
                altura = prod.altura;
                region = prod.region;
            }
        }
        Swal.fire({
            showClass: {
                popup: `none`
            },
            title: `${nombre}`,
            width: 500,
            padding: "3em",
            color: "#716add",
            html: `<div class="fichaTecnica">
            <img src="./assets/productos/bolsas_cafe/${img}">
            <p>${notasCata}</p>
            <p>Variedad: ${variedad}</p>
            <p>Procesamiento: ${procesamiento}</p>
            <p>Altura: ${altura}</p>
            <p>${region}</p>
            </div>
            `
        });
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
// funcion que elimina un producto individual del carrito
function eliminarProducto(evt) {
    if (evt.target.classList.contains("btnEliminarProducto")) {
        evt.preventDefault();
        let producto = evt.target.parentElement.querySelector("p").textContent;
        let index;
        for (let prod of arrCarrito) {
            if (prod.nombre === producto) {
                Swal.fire({
                    title: `¿Desea eliminar ${producto}? `,
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: "Si",
                    cancelButtonText: `No`
                }).then((result) => {
                    if (result.isConfirmed) {
                        index = arrCarrito.indexOf(prod);
                        arrCarrito.splice(index, 1);
                        actualizarCarrito();
                        sincroCarritoStorage();
                    }
                })
                    .catch((err) => Swal.fire({
                        title: 'Error!',
                        text: 'No se pudo eliminar el producto',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    }));
            }
        }
    }
}
//funcion que elimina los productos cargados en el carrito
function eliminarCarrito(evt) {
    evt.preventDefault();
    if (arrCarrito.length != 0) {
        Swal.fire({
            title: "¿Desea eliminar los produtos?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                arrCarrito = [];
                sincroCarritoStorage();
                actualizarCarrito()
                Swal.fire("Carrito vacío", "", "success");
            }
        })
            .catch((err) => Swal.fire({
                title: 'Error!',
                text: 'No se pudieron eliminar los productos',
                icon: 'error',
                confirmButtonText: 'Ok'
            }));
    }
}
//funcion para obtener la cantidad de productos del carrito
function cantidadProductos() {
    let cantProductos = 0;
    arrCarrito.forEach((prod) => {
        cantProductos += prod.cantidad;
    })
    document.querySelector("#contadorCarrito").textContent = cantProductos;
}
//funcion para calcular el monto total del carrito
function precioFinal() {
    let total = 0;
    arrCarrito.forEach((prod) => {
        let valor = prod.precio * prod.cantidad;
        total += valor;
    })
    document.querySelector("#valorTotal").textContent = total;
}
//funcion que carga todo en el carrito del html
function actualizarCarrito() {
    llenarCarritoHTML();
    cantidadProductos();
    precioFinal();
}

function verPedido(evt) {
    evt.preventDefault();
    if (arrCarrito.length != 0) {
        window.location.href = "./pedido.html";
    } else {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Por favor ingrese productos al carrito antes de confirmar',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

productos.addEventListener("click", seleccionProducto)
btnConfirmarCarrito.addEventListener("click", verPedido)
btnEliminarCarrito.addEventListener("click", eliminarCarrito)
carritoHTML.addEventListener("click", eliminarProducto)

