window.addEventListener("DOMContentLoaded", cargaProductos)
const productos = document.querySelector("#productos")


function cargaProductos() {
    
    fetch("../datos/productos.json")
        .then((res) => res.json())

        .then((prods) => {
            prods.forEach(producto => {
                const tarjetaProducto = document.createElement("div");

                tarjetaProducto.innerHTML = `
           <div class="tarjetaProducto">
        <div class="caratulaProducto"></div>
        <div class="especificacionesProducto">
            <h3 class="nombreProducto">${producto.nombre}</h3>
            <div class="formatoProducto">
                <h4>Selecciona el peso:</h4>
                <input type="radio" name="${producto.nombre}peso" id="${producto.id}peso250g"  class="selecPeso peso250g" checked><label for="${producto.id}peso250g">250 g</label>
                <div class="precioProducto precio250g">$ ${producto.precio250g}</div>
                <input type="radio" name="${producto.nombre}peso" id="${producto.id}peso1Kg" class="selecPeso peso1Kg" ><label for="${producto.id}peso1Kg">1 Kg</label>
                <div class="precioProducto precio1Kg">$ ${producto.precio1Kg}</div>
            </div>
            <div class="moliendaProducto">
                <label for="molienda">Selecciona la molienda</label>
                <select name="" id="molienda" class="molienda">
                    <option value="En Grano">En Grano</option>
                    <option value="Espresso">Espresso</option>
                    <option value="Volturno/Italiana/Moka">Volturno/Italiana/Moka</option>
                    <option value="Aeropress">Aeropress</option>
                    <option value="Filtro">Filtro</option>
                    <option value="Prensa Francesa">Prensa Francesa</option>
                </select>
            </div>
            <div class="cantidad">
                <label for="cantidad">Cantidad</label>
                <input type="number" name="cantidad" id="cantidad" min="1" max="5" value="1">
            </div>
        </div>
        <a href="#" class="btnAgregarCarrito">Añadir al carrito</a>

    </div>
           `;


                productos.appendChild(tarjetaProducto)
            });
        }

        )
        .catch((err) => Swal.fire({
            title: 'Error!',
            text: 'No se pudieron cargar los productos',
            icon: 'error',
            confirmButtonText: 'Ok'
        }))
       
}



/* if(productos.querySelector(`#${producto.id}peso250g`).checked){
    productos.querySelector(".precioProducto").textContent = `$ ${producto.precio250g}`
    
} else{
    productos.querySelector(".precioProducto").textContent = `$ ${producto.precio1Kg}`
    
} */





