

let productosFiltrados = []



function filtraAca(){
    const DOMfiltrar = document.querySelector('#filtrar');
    filtro = DOMfiltrar.value.toUpperCase()

    console.log(filtro)

    var x = document.getElementsByClassName("card-body");
    console.log(x)

    for(var i = 0; i < x.length; i++){
        x[i].style.display = "none";
   }

    for (i = 0; i < productos.length; i++) {
        txtValue = productos[i].nombre
        if (txtValue.toUpperCase().indexOf(filtro) > -1) {
                    
                x[i].style.display = "table";

        }
    }
}






document.addEventListener('DOMContentLoaded', () => {


let carrito = [];
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonImprimir = document.querySelector('#boton-imprimir');
const DOMfinalizarCompra =document.querySelector('#finalizar-compra')


// Funciones

/**
* Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
*/
function renderizarProductos() {
    productos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card');
        miNodo.addEventListener('click', anyadirProductoAlCarrito);
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        miNodoCardBody.setAttribute('marcador', info.id);
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        
        
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('marcador', info.id);
        miNodoImagen.setAttribute('src', info.img);


        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `$ ${info.precio}`;
        
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
* Evento para añadir un producto al carrito de la compra
*/
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
* Dibuja todos los productos guardados en el carrito
*/
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = productos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Subtotal
        const subtot = numeroUnidadesItem * miItem[0].precio

        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('listaDeItems');
        miNodo.innerHTML = `${numeroUnidadesItem} x ${miItem[0].nombre} ($ ${miItem[0].precio})` + "<b>"+` $ ${subtot}`+ "</b>";
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn-quit');
        miBoton.textContent = 'X';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
   // Renderizamos el precio total en el HTML
   DOMtotal.textContent = calcularTotal();
}

/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        console.log(total)
        return total + miItem[0].precio;
    }, 0);
}

/**
* Varia el carrito y vuelve a dibujarlo
*/
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

function imprimirCarrito() {
    alert("imprimiendo");
}

function finalizarCompra() {
    alert("Total a pagar: $" + calcularTotal() )
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonImprimir.addEventListener('click', imprimirCarrito);
DOMfinalizarCompra.addEventListener('click', finalizarCompra)






// Inicio
renderizarProductos();
renderizarCarrito();
})