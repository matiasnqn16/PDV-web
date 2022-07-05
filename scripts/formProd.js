var idreutil;

function listarProductos(){
    idActual=document.getElementById("posId")
    idActual=idActual.textContent
    idreutil=idActual
    //cargo los eventos en los enlaces que no tienen redireccion
    document.getElementById("botonCambiante").addEventListener('click',cargarNuevoProducto)
    document.getElementById("botonReset").addEventListener('click',resetForm)
    //
    var posId=document.getElementById("posId")
    var newId=productos.length
    newId++;
    posId.innerHTML=newId

    //limpio la lista para los refresh
    var lista=document.getElementById("lista")
    lista.innerHTML= ""


    //listo los productos
    productos.forEach(prod => {
        lista.innerHTML+=crearDivConId(prod["id"],prod["nombre"])
    });

}

function filtrarProductosPorCoincidencias(){

}

function crearDivConId(id,nombre){
    arr=devolverArrProdPorId(id)
    var crearDiv = "<div class='listado' id="+id+" onclick='showProd("+id+")' > <a >"
    var cerrarDiv = "</a></div>"
    return crearDiv + id + " - "+ nombre +"<span>"+ arr.precio+ "</span>" + cerrarDiv
}

function cargarNuevoProducto(){
    /* genero un id para el nuevo producto a cargar */
    var newId=productos.length
    newId++;
    /* asigno a las variables las rutas para tomar valores */
    var nombre=document.getElementById("txNombre").value
    var categoria=document.getElementById("txCat").value
    var precio=document.getElementById("txPrecio").value
    var imagen=document.getElementById("fileImg").value

    //verifico que los campos no esten vacios
    if(nombre !== "" || categoria !== "" || precio  !== "" || imagen !== ""){
        var nuevoProd={"id":newId,"nombre":nombre,"cat":categoria,"precio":precio,"img":imagen}
        console.log(nuevoProd)    
        productos.push(nuevoProd)
            listarProductos();
    }else{
        alert("no hay datos ingresados")
    }
}

function modificarProducto(){
    idActual=document.getElementById("posId")
    idreutil=idActual.textContent

        b=parseInt(idreutil)
        productos.map(function(linea){
            if(linea.id == b){
                linea.nombre=document.getElementById("txNombre").value
                linea.precio=document.getElementById("txPrecio").value
                linea.cat=document.getElementById("txCat").value
                linea.img=document.getElementById("fileImg").value
                console.log(linea)
            return linea
            }
 
    });

    resetForm()

    document.getElementById("botonCambiante").removeEventListener('click',modificarProducto)
    listarProductos()
}

function resetForm(){
    cambiarBoton = document.getElementById("botonCambiante")
    cambiarBoton.innerHTML = "cargar datos"
    DOMForm = document.querySelector('#formu');
    DOMForm.reset()
    var newId=productos.length
    newId++;
    posId.innerHTML=newId
}

function myFunction() {
    var input, filter, i, txtValue;
    //toma valores del input
    input = document.getElementById("myInput");
    //convierte los valores a mayuscula
    filter = input.value.toUpperCase();

    //limpio la lista para los refresh
    var lista=document.getElementById("lista")
    lista.innerHTML= ""

    
    for (i = 0; i < productos.length; i++) {
        
        txtValue = productos[i].nombre
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            console.log(txtValue)
            //parkour
            lista.innerHTML+=crearDivConId(productos[i].id,txtValue)

        } else {
            console.log("no existe")
        }
    }
}

function devolverArrProdPorId(id){
    var arrShow = []
    
    productos.forEach(producto => {
        if(producto.id == id){
            arrShow = producto
        }
    });
    return arrShow
}

function showProd(id){
    document.getElementById("botonCambiante").removeEventListener('click',cargarNuevoProducto)
    document.getElementById("botonCambiante").addEventListener('click',modificarProducto)
    resetForm()
    
    cambiarBoton = document.getElementById("botonCambiante")
    cambiarBoton.innerHTML = "modificar datos"

    arrShow = devolverArrProdPorId(id)

    var posId=document.getElementById("posId")
    var nombre=document.getElementById("txNombre")
    var categoria=document.getElementById("txCat")
    var precio=document.getElementById("txPrecio")
    var imagen=document.getElementById("fileImg")
    
    console.log(arrShow.nombre)

    posId.innerHTML= arrShow.id
    nombre.value = arrShow.nombre
    categoria.value = arrShow.cat
    precio.value = arrShow.precio
    imagen.value = arrShow.img
}



