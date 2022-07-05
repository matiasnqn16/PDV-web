function verContenido(tipo){
    var despa= document.getElementById("despachos");
    var pedi= document.getElementById("pedidos");
    despa.innerHTML = ""
    pedi.innerHTML = ""
    document.getElementById("desp").style.border= "2px solid #808080"
    document.getElementById("ped").style.border= "2px solid #808080"
    if(tipo == 'desp'){
        pedi.style.zIndex = 1
        despa.style.zIndex = 3
        document.getElementById("desp").style.border= "4px solid #000000"
        tickets.forEach( tkt => {
            if(tkt["tipo"] == "local"){
                var idticket = "Ticket n° " + tkt["idtkt"]
                cosas = armarCartel(tkt["prod"])
                despa.innerHTML += "<div class='cardTicket'>" + idticket+ "<br><br>" + cosas + "</div>"
            }
        });
        
    }if(tipo== 'ped'){
        despa.style.zIndex = 1
        pedi.style.zIndex = 3
        document.getElementById("ped").style.border= "4px solid #000000"
        tickets.forEach( tkt => {
            if(tkt["tipo"] == "reparto"){
                var idticket = "Ticket n° " + tkt["idtkt"]
                cosas = armarCartel(tkt["prod"])
                pedi.innerHTML += "<div class='cardTicket'>" + idticket+ "<br><br>" + cosas + "</div>"
            }
        });
    }
}

function armarCartel(prod){
    console.log(prod)
    var a = 0
    var txt = ""
    
    /* prod.forEach(un => {
        if(un == a){

        }else{
            a = un
        }
    }); */
}