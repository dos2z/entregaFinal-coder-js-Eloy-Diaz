const hojaPedido = document.querySelector(".hojaPedido")
const btnArrepentimiento = document.querySelector("#btnArrepentimiento")
const form = document.querySelector(".datosCliente")
const resetForm = document.querySelector(".reset")
let arrCarrito;



//Rescata datos de storage
let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
carritoStorage ? arrCarrito = carritoStorage : arrCarrito = [];
llenarPedido()

function llenarPedido() {
    precioFinal();
    arrCarrito.forEach((prod) => {
        let subtotal = Number(prod.cantidad * prod.precio);
        const productoEnCarrito = document.createElement("div");
        productoEnCarrito.innerHTML = `
            <p class="prodNombre">${prod.nombre}</p>
            <div class="datos">
            <p>Peso: ${prod.formato}</p>
            <p>Molienda: ${prod.molienda}</p>
            <p>Precio: $ ${prod.precio}</p>
            <p> x ${prod.cantidad}</p>
            <p>$ ${subtotal}</p>
            </div>
            `;
        hojaPedido.appendChild(productoEnCarrito);
    })
}

function precioFinal() {
    let total = 0;
    arrCarrito.forEach((prod) => {
        let valor = prod.precio * prod.cantidad;
        total += valor;
    })
    document.querySelector("#valorTotal").textContent = total;
}

function borrarTodo(evt) {
    evt.preventDefault();
    Swal.fire({
        title: "Estas seguro?",
        text: "Se eliminaran todos los productos del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "No, era broma!",
        confirmButtonText: "Si, borrar todo!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito")
            Swal.fire({
                title: "Listo!",
                text: "Los datos han sido borrados.",
                icon: "success"
            });
            window.location.href = "./index.html";
        }
    });
}

const cliente = {
    nombre: nombre,
    email: email,
    telefono: telefono,
    direccion: {
        calle: calle,
        numeroCalle: "",
        ciudad: ciudad,
        provincia: provincia,
        CP: Number(CP),
    }
}

//funcion que rescata los datos del cliente del localStorage y los carga en el form
function rescataCliente() {
    const clienteGuardado = JSON.parse(localStorage.getItem("Cliente"))
    if (clienteGuardado != null) {
        form.querySelector("#nombre").value = clienteGuardado.nombre;
        form.querySelector("#email").value = clienteGuardado.email;
        form.querySelector("#telefono").value = clienteGuardado.telefono;
        form.querySelector("#calle").value = clienteGuardado.direccion.calle;
        form.querySelector("#callenumero").value = clienteGuardado.direccion.numeroCalle;
        form.querySelector("#ciudad").value = clienteGuardado.direccion.ciudad;
        form.querySelector("#provincia").value = clienteGuardado.direccion.provincia;
        form.querySelector("#CP").value = clienteGuardado.direccion.CP;
    }
}
//Rescatar los datos del cliente
rescataCliente();


//Funcion que guarda los datos del cliente en localStorage
function datosCliente(evt) {
    let a = false;
    let b = false;
    if (evt.target.classList.contains("confirmar")) {
        evt.preventDefault();
        cliente.nombre = form.querySelector("#nombre").value;
        cliente.email = form.querySelector("#email").value;
        cliente.telefono = form.querySelector("#telefono").value;
        cliente.direccion.calle = form.querySelector("#calle").value;
        cliente.direccion.numeroCalle = form.querySelector("#callenumero").value;
        cliente.direccion.ciudad = form.querySelector("#ciudad").value;
        cliente.direccion.provincia = form.querySelector("#provincia").value;
        cliente.direccion.CP = form.querySelector("#CP").value;
        //código que detecta si falta rellenar un campo del formulario
        for (let dato in cliente) {
            let direccion = cliente.direccion
            if (cliente[dato] === "") {
                b = false
                break
            } else {
                b = true;
            }
            for (let dato in direccion) {
                if (direccion[dato] === "") {
                    a = false
                    break
                } else {
                    a = true;
                }
            }
        }
        (a && b) ? localStorage.setItem("Cliente", JSON.stringify(cliente)) : Swal.fire("Por favor completar todos los datos");
    }
}




//Funcion que elimina al cliente de localStorage
function borrarCliente(evt) {
    localStorage.removeItem("Cliente")
}

btnArrepentimiento.addEventListener("click", borrarTodo);
form.addEventListener("click", datosCliente)
resetForm.addEventListener("click", borrarCliente)