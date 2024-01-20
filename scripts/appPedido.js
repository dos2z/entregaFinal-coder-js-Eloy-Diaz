const hojaPedido = document.querySelector(".hojaPedido")
const btnArrepentimiento = document.querySelector("#btnArrepentimiento")
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
        text: "Se eliminaran todos los datos cargados",
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

btnArrepentimiento.addEventListener("click", borrarTodo);