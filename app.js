// const PERSONA = {
    // posicion: 'arriba',
    // estado: 'viva'
// };//ésto es util?


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


//definir una instancia de reconocimiento de voz
const recognition = new SpeechRecognition();
//Establece el idioma del reconocimiento. Esto es una buena práctica y, por lo tanto, recomendable.
recognition.lang = 'es-ES';
//Controla si se capturan los resultados de forma continua (true), o solo un resultado cada vez que se inicia el reconocimiento (false)
recognition.continuous = true;
//esperar un poquito para determinar los resultados, y no al instante. Devolver resultados provisionales o solo resultados finales.
recognition.interimResults = false;
//Establece el número de posibles coincidencias alternativas que se deben devolver por resultado. Esto a veces puede ser útil, por ejemplo, si un resultado no está completamente claro y desea mostrar una lista de alternativas para que el usuario elija la correcta.
recognition.maxAlternatives = 1;

//para registrar/grabar la voz
recognition.start();

//manejar errores al no reconocer la voz
recognition.onerror = function(event) {
    console.log('Error durante el reconocimiento de voz: ' + event.error);
    // recognition.start();
};

//////// EMPEZAMOS A MANEJAR EL RECONOCIMIENTO DE VOZ RESULTANTE ////////
let upContainer = document.getElementById('all-container');
let person = document.getElementById('person');
let scoreboard = document.getElementById('scoreboard');
let points = 0;
scoreboard.innerHTML = `Score: ${points}`;

///// OTRAS FUNCIONES /////
//ANDAR
let topNumero = 55;
//colocar persona al cargar página
person.style.top = `${topNumero}%`;
function walk(){
    // person.classList.toggle('personUp');
    //arriba
    if(topNumero == 55){
        topNumero = 56;
    }
    else if(topNumero == 56){
        topNumero--;
    }
    //abajo
    else{topNumero}
    person.style.top = `${topNumero}%`;
};
let walkInterval = window.setInterval(walk, 200);

function abajo(){
    // PERSONA.posicion = 'abajo';//ésto es util? para hacer recuento de movimientos, tal vez?
    topNumero = 75;
    person.style.top = `${topNumero}%`;
};
function arriba(){
    // PERSONA.posicion = 'arriba'; //ésto es util? para hacer recuento de movimientos, tal vez?
    topNumero = 55;
    person.style.top = `${topNumero}%`;
};

//sumar puntos
function winPoint(){
    points++;
    scoreboard.innerHTML = `Score: ${points}`;
};
//falta asignar funcion cuando objeto sobrepase a persona/pantalla/algo parecido

//trabajar con el resultado obtenido
let i = 0;
recognition.onresult = (e)=>{
    // console.log(e);
    var resultado = e.results[i][0].transcript;
    var confianza = e.results[i][0].confidence;
    i++;
    console.log(resultado);
    if(resultado.includes('derecha') || resultado.includes('derecho')){
        person.className = 'personDown-rigth';
    };
    if(resultado.includes('izquierda') || resultado.includes('izquierdo')){
        person.className = 'personDown-left';
    };
    if(resultado.includes('abajo') || resultado.includes('agáchate')){
        //setInterval para agacharse 1 segundo y volver arriba
        abajo();
        setTimeout(arriba, 1000);
    };
    let tooltip = document.createElement('div');
    upContainer.appendChild(tooltip);
    tooltip.style.display = 'block';
    tooltip.className = 'tooltip';
    tooltip.innerHTML = resultado;
    setTimeout(()=>{
        tooltip.innerHTML = '';
        tooltip.style.display = 'none';
    }, 1000);
};


//eliminar comportamiento click raton en la pagina
document.onmousedown = ()=>{return false};

//mover persona al presionar flechas
window.addEventListener('keydown', keyDown);
function keyDown(e){
    e.preventDefault();
    switch(e.key){
        case 'ArrowRight':
            person.className = 'personDown-rigth';
            break;
        case 'ArrowLeft':
            person.className = 'personDown-left';
            break;
        case 'ArrowDown':
            abajo();
            break;
    };
};
//subir persona al soltar ArrowDown
window.addEventListener('keyup', keyUp);
function keyUp(e){
    e.preventDefault();
    switch(e.key){
        case 'ArrowDown':
            arriba();
            break;
    };
};
//COMPROBAR si cambio el valor del objeto PERSONA
// window.setInterval(()=>console.log(PERSONA.posicion), 120);



//¿ÉSTO ES ÚTIL?
//cuando no reconoce ningun parecido al elemento del array que queremos hacer match
// recognition.onnomatch = function(event) {
//     console.log('Disculpa, no te he entendido.');
// }


//https://www.youtube.com/user/ssuperguz
//mandarle link al artista del fondo loop



//faltan:
//botones para movil mover persona