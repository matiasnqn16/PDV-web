var a, b, c, d, e, fechaa, valorFecha

function resetForm() {
    DOMform = document.querySelector('#formulario')
    DOMform.reset()
    const allwhite=document.querySelectorAll('input')
    allwhite.forEach(e => {
        e.style="background-color: white"
    });
    a,b,c,d,e,fechaa = false
    valorFecha = ""
}

const expresiones = {
    nomYap: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    dir: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/,
	correo: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

function validar(tipo){
    var input
    //tomarValores
    input = document.getElementById(tipo).value;
    
    if(tipo == "txNom"){
        if(expresiones.nomYap.test(input)){
            document.getElementById(tipo).style="background: #CEFF25;";
             a = true;
        }else{
            document.getElementById(tipo).style="background: red;";
             a = false;
        }
    }if(tipo == "txAp"){
        if(expresiones.nomYap.test(input)){
            document.getElementById(tipo).style="background: #CEFF25;";
             b = true;
        }else{
            document.getElementById(tipo).style="background: red;";
            b = false;
        }
    }if(tipo == "txDir"){
        if(expresiones.dir.test(input)){
            document.getElementById(tipo).style="background: #CEFF25;";
             c = true;
        }else{
            document.getElementById(tipo).style="background: red;";
         c = false;
        }
    }if(tipo == "txTel"){
        if(expresiones.telefono.test(input)){
            document.getElementById(tipo).style="background: #CEFF25;";
             d = true;
        }else{
            document.getElementById(tipo).style="background: red;";
             d = false;
        }
    }if(tipo == "txEmail"){
        if(expresiones.correo.test(input)){
            document.getElementById(tipo).style="background: #CEFF25;";
             e = true;
        }else{
            document.getElementById(tipo).style="background: red;";
             e = false;
        }
    }

}




function anyadirRegistro(){
    var nombre = document.getElementById('txNom').value
    var apellido= document.getElementById('txAp').value
    var direccion= document.getElementById('txDir').value
/*     var fechaNac= document.getElementById('fechaNac').value
 */    var fechaNac= valorFecha
    var telefono= document.getElementById('txTel').value
    var email= document.getElementById('txEmail').value

    if(a && b && c && d && e && fechaa){
        if(nombre,apellido,direccion,fechaNac,telefono,email == ""){
            alert("hay campos vacios")
        }else{
            var id = clientes.length
            id++;
            valorFecha
            console.log("hoalaaaaaaaaaaaaaaaaaa" + valorFecha)
            clientes.push({id,nombre,apellido,direccion,fechaNac,telefono,email})
            resetForm()
            resetearTabla()
            iniciarTabla();
        }
        
        

    }else{
        alert("Verifique los datos")
    }

}

function resetearTabla(){
	var myTable=document.getElementById("myTable");
    var cant=clientes.length
    while(myTable.rows.length > 1) {
        myTable.deleteRow(1);
    }
}


function iniciarTabla(){


    document.getElementById('cargarDatos').addEventListener('click',anyadirRegistro)
    document.getElementById('reset').addEventListener('click',resetForm)

	var myTable=document.getElementById('myTable');
	for(i in clientes){
		insertarRow(clientes[i].id,clientes[i].nombre,clientes[i].apellido,clientes[i].direccion,clientes[i].fechaNac,clientes[i].telefono,clientes[i].email);
	}

}

function insertarRow(id,nombre,apellido,direccion,valorFecha,telefono,email){
    var myTable=document.getElementById("myTable");
    var row=myTable.insertRow(myTable.rows.length);
    var cel0=row.insertCell(0);
    var cel1=row.insertCell(1);
    var cel2=row.insertCell(2);
    var cel3=row.insertCell(3);
    var cel4=row.insertCell(4);
    var cel5=row.insertCell(5);
    var cel6=row.insertCell(6);
    cel0.innerHTML=id;
    cel1.innerHTML=nombre;
    cel2.innerHTML=apellido;
    cel3.innerHTML=direccion;
    cel4.innerHTML=valorFecha;
    cel5.innerHTML=telefono;
    cel6.innerHTML=email;
}

// Función para permitir sólo números, retroceso y enter
function SoloNumeros(evt){
    if(window.event){ //asignamos el valor de la tecla a keynum
     keynum = evt.keyCode; //IE
    }
    else{
     keynum = evt.which; //FF
    }
    //comprobamos si se encuentra en el rango numérico
    if((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13){
     return true;
    }
    else{
     return false;
    }
}
   
   // Función para verificar que la fecha escrita sea correcta según el formato YYYYMMDD
function ValidarFecha(){
    // Almacenamos el valor digitado en TxtFecha
    var Fecha = document.getElementById('fechaNac').value
    
    // Si la fecha está completa comenzamos la validación
    if(Fecha.length == 8){
        var Anio = Fecha.substr(0, 4); // Extraemos en año
        var Mes = parseFloat(Fecha.substr(4, 2)) - 1; // Extraemos el mes
        var Dia = Fecha.substr(6, 2); // Extraemos el día
        
        // Con la función Date() de javascript evaluamos si la fecha existe
        var VFecha = new Date(Anio, Mes, Dia);
        
        // Si las partes de la fecha concuerdan con las que digitamos, es correcta
        if((VFecha.getFullYear() == Anio) && (VFecha.getMonth() == Mes) && (VFecha.getDate() == Dia)){
            document.getElementById('fechaNac').style = "background: #CEFF25;"
            fechaa = true;
            nMes = Mes + 1;
            valorFecha = Anio + "-" + nMes + "-" + Dia;
            console.log(valorFecha)
        }
        else{
        document.getElementById('fechaNac').style = "background: red;"
            fechaa = false;

        }
    }
   
}