var posicionjugadorx=0;//VARIABLES GLOBALES
var posicionjugadory=0; 
var salidax=7;
var saliday=7;
var atrapados=false;
var timer;
var timer2;
var pararr=false;//parar juego
var randomExamenesx=Math.floor((Math.random()*(7-2+1))+2);
var randomExamenesy=Math.floor((Math.random()*(7-2+1))+2);
var randomJaimex=Math.floor((Math.random()*(6-2+1))+2);
var randomJaimey=Math.floor((Math.random()*(6-4+1))+4);
var randomobstaculox=Math.floor((Math.random()*(6-2+1))+2);
var randomobstaculoy=Math.floor((Math.random()*(6-2+1))+2);
var randomobstaculo2x=Math.floor((Math.random()*(5-2+1))+2);
var randomobstaculo2y=Math.floor((Math.random()*(5-2+1))+2);
var atrapar=false; 
var comprobar=false;
const musicaInicio = new Audio ('audio/corte1menuInicial.mp3');
const musica = new Audio ('audio/corte3.mp3');
const musicaVictoria = new Audio ('audio/victoria.mp3');
var modo = 300; // variable que controla la velocidad de jaime, 300 es valor por defecto (difícil)





//Controlamos que Jaime y los Exámenes no coincidad de manera aleatoria en la misma casilla.
do {
        randomExamenesy=Math.floor((Math.random()*(7-0+1))+0);
   
}while(randomExamenesy == randomJaimey) ;

do {
    randomExamenesx=Math.floor((Math.random()*(7-0+1))+0);

}while(posicionjugadorx == randomExamenesx || salidax==randomExamenesx) ;

do { //no coincida con el jugador ni con salida
    randomJaimex=Math.floor((Math.random()*(7-0+1))+0);

}while(randomJaimex == posicionjugadorx || randomJaimex==salidax || randomJaimex==randomExamenesx );

do { 
    randomobstaculox=Math.floor((Math.random()*(5-2+1))+2);

}while(randomobstaculox == posicionjugadorx || randomobstaculox==salidax || randomobstaculox==randomExamenesx || randomobstaculox==randomJaimex) ;

do { //no coincida con el jugador ni con salida
    randomobstaculo2x=Math.floor((Math.random()*(5-2+1))+2);

}while(randomobstaculo2x == posicionjugadorx || randomobstaculo2x==salidax || randomobstaculo2x==randomExamenesx || randomobstaculo2x==randomJaimex ||randomobstaculo2x==randomobstaculox) ;

window.onload=()=>{

    musicaInicio.play();
    musicaInicio.loop = true;
    musicaInicio.autoplay = true;
}




function iniciar() {

    musicaInicio.pause();
    musica.play();
    musica.loop = true;
    musica.autoplay = true;



    timer = setInterval("atraparjaimex()", modo);
    timer2 = setInterval("atraparjaimey()", modo);

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
    
    table.style.border="2px solid white";
    document.body.appendChild(table);
    var boton = document.querySelectorAll("input[type='button']");
    for (let i = 0; i < boton.length; i++) {
        boton[i].className="invisible"
    }
    boton.disabled=true;
   // var td = document.querySelectorAll("td"); //array de todas las casillas

  var tr=document.getElementsByTagName("tr");

    //Las posiciones aleatorias de Jaime y los Exámenes serán entre las casillas de la 10 a la 55.
   
    
    //Posiciones de inicio
    
    tr[posicionjugadory].getElementsByTagName("td")[posicionjugadorx].id="jugador";
    tr[saliday].getElementsByTagName("td")[salidax].id="salida";
    tr[randomJaimey].getElementsByTagName("td")[randomJaimex].id="jaime";
    tr[randomExamenesy].getElementsByTagName("td")[randomExamenesx].className="examenes";
    tr[randomobstaculoy].getElementsByTagName("td")[randomobstaculox].id="obstaculo";
    tr[randomobstaculo2y].getElementsByTagName("td")[randomobstaculo2x].id="obstaculo2";

//Este if hace que solo se creen los botones en vista de movil
    if (window.innerWidth < 550){
        console.log("hola");
        crearBotones();
    }
 
}




function crearBotones(){
    var  contenedor_botones = document.createElement("div");
    contenedor_botones.className="contenedor_botones";
    
    var botonLeft = document.createElement("input");
    botonLeft.type="button";
    botonLeft.value="←";
    botonLeft.setAttribute("onclick","moverIzquierda()");

    var botonUP = document.createElement("input");
    botonUP.type="button";
    botonUP.value="↑";
    botonUP.setAttribute("onclick","moverArriba()");

    
    var botonDown = document.createElement("input");
    botonDown.type="button";
    botonDown.value="↓";
    botonDown.onclick=moverAbajo;

    var botonRight = document.createElement("input");
    botonRight.type="button";
    botonRight.value="→";
    botonRight.setAttribute("onclick","moverDerecha()");

    contenedor_botones.appendChild(botonLeft);
    contenedor_botones.appendChild(botonUP);
    contenedor_botones.appendChild(botonDown);
    contenedor_botones.appendChild(botonRight);

    document.body.appendChild(contenedor_botones);
}
//boton iniciar -> 0
//boton arriba -> 1
//boton izquierda -> 2
//boton derecha -> 3
//boton abajo -> 4

function moverDerecha() {
    console.log(posicionjugadorx+1)
    console.log(randomobstaculox)
    
    if (posicionjugadorx <7 &&(!pararr)){
        
        if(posicionjugadory==randomJaimey&&posicionjugadorx==randomJaimex){
            var fondo=document.querySelector("table");
            fondo.className="perder";
            clearInterval(timer);
            clearInterval(timer2);
            parar();
    
        }
        else if(posicionjugadory!=randomJaimey||posicionjugadorx!=randomJaimex){

            if(posicionjugadorx+1!=randomobstaculox||posicionjugadory!=randomobstaculoy){//controlando el obstaculo 1(Juntos los if dan fallo)
                if(posicionjugadorx+1!=randomobstaculo2x||posicionjugadory!=randomobstaculo2y){ //controlando el obstaculo 2

            var matriz=document.querySelectorAll("tr");
            var player = document.getElementById("jugador");
            var td;
                
                //tengo que encontrar en la matriz el jugador.
                for (let i=0; i<matriz.length; i++) {
                    for(let j=0;j<matriz[i].children.length;j++){
                        if(matriz[i].children[j].id=="jugador"){
                            td=matriz[i].children[j+1]; // <-- td aquí está guardando la posición por donde voy
                            posicionjugadorx++;
                            
                            
                        }
                    }   
                }
                
                td.id="jugador";
                td.className="jugadorder" //es la casilla con el id jugador actual
                player.id="";
                player.className=""; //es la casilla que tenía el id jugador pero ya no.
                player.textContent=".";   //la antigua casilla con el id jugador, ahora vuelve a su estado normal, .
                // console.log(td.textContent);
                // if (td==matriz[7].children[7].textContent){
                //     alert("Te has colocado en salida");
                    }
                }
            }
        atraparexamenes();
        salir();
   
    }

}
function moverArriba() {
    if (posicionjugadory >0  &&(!pararr)){
 
    if(posicionjugadory==randomJaimey&&posicionjugadorx==randomJaimex) {
        var fondo=document.querySelector("table");
        fondo.className="perder";
        parar();
        clearInterval(timer);
        clearInterval(timer2);

    }

    else if(posicionjugadory!=randomJaimey||posicionjugadorx!=randomJaimex){

        if(posicionjugadorx!=randomobstaculox||posicionjugadory-1!=randomobstaculoy){ //controla el obstaculo
            if(posicionjugadorx!=randomobstaculo2x||posicionjugadory-1!=randomobstaculo2y){ //controla obstaculo2
                var matriz=document.querySelectorAll("tr");
                var player = document.getElementById("jugador");
                var td;
                //tengo que encontrar en la matriz el jugador.
                for (let i=0; i<matriz.length; i++) {
                    for(let j=0;j<matriz[i].children.length;j++){
                        if(matriz[i].children[j].id=="jugador"){
                            td=matriz[i-1].children[j];
                            posicionjugadory--;
                            
                            
                        }
                    }   
                }
                td.id="jugador";
                player.id="";
                player.className="";
                player.textContent="."; 
            }
        }
    }  
    atraparexamenes();
    salir();
}
  
   
}
function moverIzquierda() {
    
    if (posicionjugadorx >0 &&(!pararr)){

    if(posicionjugadory==randomJaimey&&posicionjugadorx==randomJaimex){
        var fondo=document.querySelector("table");
        fondo.className="perder";
        parar();
        clearInterval(timer);
        clearInterval(timer2);

    }
        else if(posicionjugadory!=randomJaimey||posicionjugadorx!=randomJaimex){

            if(posicionjugadorx-1!=randomobstaculox||posicionjugadory!=randomobstaculoy){ //controla el obstaculo
                if(posicionjugadorx-1!=randomobstaculo2x||posicionjugadory!=randomobstaculo2y){ //controla el obstaculo2
                var matriz=document.querySelectorAll("tr");
                var player = document.getElementById("jugador");
                var td;
                //tengo que encontrar en la matriz el jugador.
                for (let i=0; i<matriz.length; i++) {
                    for(let j=0;j<matriz[i].children.length;j++){
                        if(matriz[i].children[j].id=="jugador"){
                            td=matriz[i].children[j-1];
                        posicionjugadorx--;
                        
                        
                        }
                    }   
                }
                td.id="jugador";
                td.className="jugadorizq"
                player.id="";
                player.className="";
                player.textContent=".";   
                }
                atraparexamenes();
                salir();
            }
        }   
    }

}
function moverAbajo() {

    if (posicionjugadory <7 &&(!pararr) ){

        if(posicionjugadory!=randomJaimey||posicionjugadorx!=randomJaimex){
            if(posicionjugadorx!=randomobstaculox||posicionjugadory+1!=randomobstaculoy){ //controla el obstaculo
                if(posicionjugadorx!=randomobstaculo2x||posicionjugadory+1!=randomobstaculo2y){ //controla el obstaculo2
                

                    var matriz=document.querySelectorAll("tr");
                    var player = document.getElementById("jugador");
                    var td;
                    //tengo que encontrar en la matriz el jugador.
                    for (let i=0; i<matriz.length; i++) {
                        for(let j=0;j<matriz[i].children.length;j++){
                            if(matriz[i].children[j].id=="jugador"){
                                td=matriz[i+1].children[j];
                                posicionjugadory++;
                            }
                        }
                    }
                    td.id="jugador";
                    player.id="";

                    player.textContent=".";
                    player.className="";
                    atraparexamenes();
                    salir();
                    }
            }
            
        }
        else if(posicionjugadory==randomJaimey&&posicionjugadorx==randomJaimex){
            var fondo=document.querySelector("table");
            fondo.className="perder";
            parar();

            clearInterval(timer);
            clearInterval(timer2);

        }
    }

}
var contador=0;//para que el alert solo salga la primera vez que te pones en esa casilla
function atraparexamenes(){
   
    if(randomExamenesx==posicionjugadorx&&randomExamenesy==posicionjugadory&&contador==0){
        
        //alert("TIENES LOS EXAMENES")
        atrapados=true;
        var tr=document.querySelectorAll("tr")[7].querySelectorAll("td")[7].style.setProperty("background-image","url(imagenes/puertaabierta.PNG)")

       contador++; 

    }

    else if(randomExamenesy==randomJaimey&&randomExamenesx==randomJaimex&&!atrapados){
        var tr=document.querySelectorAll("tr")[randomJaimey].querySelectorAll("td")[randomJaimex].className="examenes";
        
        
        
    }
    




}



function atraparjaimex(){
   
    var matriz=document.querySelectorAll("tr");
    var profe = document.getElementById("jaime");
    var td;


    if(posicionjugadorx<randomJaimex||posicionjugadorx>randomJaimex){

        

    
  
    
        if(posicionjugadorx<randomJaimex){//izq
            if(randomJaimex-1!=randomobstaculox||randomJaimey!=randomobstaculoy){//controlar obstaculo
                if(randomJaimex-1!=randomobstaculo2x||randomJaimey!=randomobstaculo2y){//controlar obstaculo2
                    for (let i=0; i<matriz.length; i++) {
                        for(let j=0;j<matriz[i].children.length;j++){
                            if(matriz[i].children[j].id=="jaime"){
                                td=matriz[i].children[j-1];
                            randomJaimex--;
                    
                        
                        
                        }
                    }   
                }
            }
        }

           
        

        }
       
        
       
    
        
        else if(posicionjugadorx>randomJaimex){
            if(randomJaimex+1!=randomobstaculox||randomJaimey!=randomobstaculoy){//derecha
                if(randomJaimex+1!=randomobstaculo2x||randomJaimey!=randomobstaculo2y){//derecha
                for (let i=0; i<matriz.length; i++) {
                    for(let j=0;j<matriz[i].children.length;j++){
                        if(matriz[i].children[j].id=="jaime"){
                            td=matriz[i].children[j+1];
                        randomJaimex++;
                    
                        
                        
                        }
                    }   
                }
            }
        }

               
         
        }

    perder();
    td.id="jaime";
    profe.id="";
    }
    else{
        randomJaimex;
    }
    
           
        
}

function atraparjaimey(){

    var matriz=document.querySelectorAll("tr");
    var profe = document.getElementById("jaime");
    var tddd;

    if(posicionjugadory<randomJaimey||posicionjugadory>randomJaimey){

        if(posicionjugadory<randomJaimey||posicionjugadory>randomJaimey||randomJaimex!=randomobstaculox||randomJaimey!=randomobstaculoy){
            if(posicionjugadory>randomJaimey){
                if(randomJaimex!=randomobstaculox||randomJaimey+1!=randomobstaculoy){//abajo
                    if(randomJaimex!=randomobstaculo2x||randomJaimey+1!=randomobstaculo2y){//abajo
                        for (let i=0; i<matriz.length; i++) {
                            for(let j=0;j<matriz[i].children.length;j++){
                                if(matriz[i].children[j].id=="jaime"){
                                tddd=matriz[i+1].children[j];
                                randomJaimey++;
                                
                                }
                            }   
                        }
                    }
                }
        
                
            }
            
            


            
            

            else if(posicionjugadory<randomJaimey){
                if(randomJaimex!=randomobstaculox||randomJaimey-1!=randomobstaculoy){//arriba
                    if(randomJaimex!=randomobstaculo2x||randomJaimey-1!=randomobstaculo2y){//arriba
                        for (let i=0; i<matriz.length; i++) {
                            for(let j=0;j<matriz[i].children.length;j++){
                                if(matriz[i].children[j].id=="jaime"){
                                    tddd=matriz[i-1].children[j];
                                randomJaimey--;
                                
                            
                                
                                }
                            }   
                        }
                    }
                }

                
                
            }
    
                perder();
                tddd.id="jaime";
                profe.id="";
        }

    
            
    }
    else{
        randomJaimey;
    }
}




document.onkeyup = teclas;
function teclas(e) {

    
    if(!pararr&&(atrapar==false)){
    
            e = e || window.event;
            if(e.keyCode == '38'){
                moverArriba();
            }
            else if (e.keyCode == '40') {
                moverAbajo();
            }
            else if (e.keyCode == '39') {
            moverDerecha();
            }
            else if (e.keyCode == '37') {
            moverIzquierda();
            }
    }


}
function perder(){
   
    
    
    
    if(posicionjugadorx==randomJaimex&&posicionjugadory==randomJaimey){
        atrapar=true; //para que dejen de ir las teclas
        parar();
        var fondo=document.querySelector("table");
        fondo.className="perder";
        clearInterval(timer);
        clearInterval(timer2);
    
        comprobar=true;
        botonReset();
        
    }

    
    else{
        comprobar=false;
    }

    

}



function salir(){
    if(salidax==posicionjugadorx&&saliday==posicionjugadory&&atrapados==true){
        //alert("HAS GANADO")
        var fondo=document.querySelector("table");
        fondo.className="ganar";
        clearInterval(timer);
        clearInterval(timer2);
        parar(); //para quitar  personajes, puertas y examenes
        musica.pause();
        musicaVictoria.play();
        musicaVictoria.autoplay = true;
        botonReset();
 
    }
    else if(salidax==posicionjugadorx&&saliday==posicionjugadory&&atrapados==false&&pararr==false){
        alert("Atrapa los examenes!!!")
  
    }
    else{
        var tr=document.querySelectorAll("tr")[7].querySelectorAll("td")[7].id="salida";
   
    }
}

function parar(){  //para quitar  personajes, puertas y examenes cuando se gane o pierda
    var tablita= document.querySelectorAll("td")
    for (let i = 0; i < tablita.length; i++) {
        tablita[i].style.setProperty("background-image","none");  //recorre todos los td y les quita los estilos
        pararr=true;
        }
    
}

//Función que crea el botón reset para volver al menú inicial, solamente aparece al ganar o perder partida.
function botonReset() {
    var botonReset = document.createElement("input");
    botonReset.type="button";
    botonReset.value="Volver";
    var padre = document.querySelector(".contenedor_botones");
    document.body.appendChild(botonReset);
    botonReset.addEventListener("click",()=>{
        location.reload();

    })
}

//Función que pausa la música
function pausar() {
    musicaInicio.pause();
}

//Función Dificultad que medirá la velocidad de Jaime
function dificultad() {
    //Primero creo las opciones de dificultad que serán botones (fácil dificil god)
    var opciones;
    for (let i = 0; i<3;i++){
        opciones=document.createElement("input");
        opciones.type="button";

        document.body.appendChild(opciones);
    }
    var arrayOpciones = document.querySelectorAll("input[type='button']");
    //Deshabilito el botón de dificultad para que no pueda volver a ser clickado
    arrayOpciones[2].disabled=true;

    arrayOpciones[3].value="Fasil";
    arrayOpciones[4].value="Dificil"
    arrayOpciones[5].value="God";

    arrayOpciones[3].addEventListener("click",()=>{
        //alert ("Has dado click en Fasil");
        modo = 600;
        iniciar().click;



    })
    arrayOpciones[4].addEventListener("click",()=>{
        //alert ("Has dado click en Dificil");
        modo = 300;
        iniciar().click;


    });
    arrayOpciones[5].addEventListener("click",()=>{
        //alert ("Has dado click en God");
        modo = 280;
        iniciar().click;

    });
    console.log(arrayOpciones[5].value);

}

