
function iniciar() {
    //Creamos la tabla 8x8 al hacer click en el botón iniciar
    var table = document.createElement("table");
    for(let i = 0; i<8;i++){
        var filas = document.createElement("tr");
        for (let j= 0; j<8;j++){
            var celdas = document.createElement("td");
            celdas.innerHTML=".";
            filas.appendChild(celdas);
        }
        table.appendChild(filas);
    }
    
    table.style.border="2px solid green";
    document.body.appendChild(table);
    var boton = document.querySelector("input[type='button']");
    boton.disabled=true;
    var td = document.querySelectorAll("td"); //array de todas las casillas

    for(let i=0;i<td.length;i++){ //este for sobra
        td[i].onclick=function () {
            this.style.backgroundColor="red";

        }
          
    }
    //Las posiciones aleatorias de Jaime y los Exámenes serán entre las casillas de la 10 a la 55.
    var randomExamenes = Math.floor((Math.random()*(55-10+1))+10);
    var randomJaime = Math.floor((Math.random()*(55-10+1))+10);

    //Controlamos que Jaime y los Exámenes no coincidad de manera aleatoria en la misma casilla.
    if (randomExamenes == randomJaime){ 
        randomJaime+=4;
    }
    
    //Posiciones de inicio
    td[0].id="jugador";
    td[0].textContent="X";
    td[63].id="salida";
    td[63].textContent="salida";

    td[randomExamenes].id="examenes";
    td[randomJaime].id="jaime";
    

    crearBotones();

    
}




function crearBotones(){
    var  contenedor_botones = document.createElement("div");
    contenedor_botones.className="contenedor_botones";

    var botonUP = document.createElement("input");
    botonUP.type="button";
    botonUP.value="↑";
    botonUP.setAttribute("onclick","moverArriba()");

    var botonLeft = document.createElement("input");
    botonLeft.type="button";
    botonLeft.value="←";
    botonLeft.setAttribute("onclick","moverIzquierda()");


    var botonRight = document.createElement("input");
    botonRight.type="button";
    botonRight.value="→";
    botonRight.setAttribute("onclick","moverDerecha()");

    var botonDown = document.createElement("input");
    botonDown.type="button";
    botonDown.value="↓";
   
    botonDown.onclick=moverAbajo;

    contenedor_botones.appendChild(botonUP);
    contenedor_botones.appendChild(botonLeft);
    contenedor_botones.appendChild(botonRight);
    contenedor_botones.appendChild(botonDown);

    document.body.appendChild(contenedor_botones);
}
//boton iniciar -> 0
//boton arriba -> 1
//boton izquierda -> 2
//boton derecha -> 3
//boton abajo -> 4

function moverDerecha() {
    var matriz=document.querySelectorAll("tr");
    var player = document.getElementById("jugador");
    var td;
    
    //tengo que encontrar en la matriz el jugador.
    for (let i=0; i<matriz.length; i++) {
        for(let j=0;j<matriz[i].children.length;j++){
            if(matriz[i].children[j].id=="jugador"){
                td=matriz[i].children[j+1]; // <-- td aquí está guardando la posición por donde voy
                
            }
        }   
    }
    
    td.id="jugador"; //es la casilla con el id jugador actual
    player.id=""; //es la casilla que tenía el id jugador pero ya no.
    td.textContent="X"; //la nueva casilla con el id jugador, tendrá la X
    player.textContent=".";   //la antigua casilla con el id jugador, ahora vuelve a su estado normal, .
    // console.log(td.textContent);
    // if (td==matriz[7].children[7].textContent){
    //     alert("Te has colocado en salida");
    // }
}
function moverArriba() {
    var matriz=document.querySelectorAll("tr");
    var player = document.getElementById("jugador");
    var td;
    //tengo que encontrar en la matriz el jugador.
    for (let i=0; i<matriz.length; i++) {
        for(let j=0;j<matriz[i].children.length;j++){
            if(matriz[i].children[j].id=="jugador"){
                td=matriz[i-1].children[j];
            }
        }   
    }
    td.id="jugador";
    player.id="";
    td.textContent="X";
    player.textContent=".";   
}
function moverIzquierda() {
    var matriz=document.querySelectorAll("tr");
    var player = document.getElementById("jugador");
    var td;
    //tengo que encontrar en la matriz el jugador.
    for (let i=0; i<matriz.length; i++) {
        for(let j=0;j<matriz[i].children.length;j++){
            if(matriz[i].children[j].id=="jugador"){
                td=matriz[i].children[j-1];
            }
        }   
    }
    td.id="jugador";
    player.id="";
    td.textContent="X";
    player.textContent=".";   
}
function moverAbajo() {
    var matriz=document.querySelectorAll("tr");
    var player = document.getElementById("jugador");
    var td;
    //tengo que encontrar en la matriz el jugador.
    for (let i=0; i<matriz.length; i++) {
        for(let j=0;j<matriz[i].children.length;j++){
            if(matriz[i].children[j].id=="jugador"){
                td=matriz[i+1].children[j];
            }
        }   
    }
    td.id="jugador";
    player.id="";
    td.textContent="X";
    player.textContent=".";   
}