function startTime(){
    hoy=new Date();
    h=hoy.getHours();
    m=hoy.getMinutes();
    s=hoy.getSeconds();
    m=checkTime(m);
    s=checkTime(s);
    document.getElementById('laHora').innerHTML=h+":"+m+":"+s;
    t=setTimeout('startTime()',500);
}
function checkTime(i){
    if (i<10){
        i="0" + i;
    }
    return i;
}
window.onload=function(){
    startTime();
}