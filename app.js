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
let micImgContainer = document.getElementById('micImgContainer');
let micImg = document.getElementById('micImg');
// recognition.start();
micImg.className = 'micOff';

function rec(){
    recognition.start();
    micImg.className = 'micRecording';
};
function stop(){
    recognition.stop();
    micImg.className = 'micOff';
}
micImgContainer.addEventListener('mousedown', ()=>{
    if(micImg.className == 'micRecording'){
        stop();
    }
    else if(micImg.className == 'micOff'){
        rec(); 
    };
});


//manejar errores al no reconocer la voz
recognition.onerror = function(event) {
    console.log('Error durante el reconocimiento de voz: ' + event.error);
    // recognition.start();
};

//////// EMPEZAMOS A MANEJAR EL RECONOCIMIENTO DE VOZ RESULTANTE ////////
let upContainer = document.getElementById('all-container');
let videoLoop = document.getElementById('road-loop');
let person = document.getElementById('person');
let btnLeft = document.getElementById('leftBTN');
let btnRight = document.getElementById('rightBTN');
let btnDown = document.getElementById('downBTN');
let scoreboard = document.getElementById('scoreboard');
let points = 0;
scoreboard.innerHTML = `Score: ${points}`;

/////////////////////CAR/////////////
let zIndexNum = 1999999993;
let carVelocitySec = 2;
let carVelocityMSec = carVelocitySec*1000;
//el 80% del carVelocitySec en MILISEGUNDOS//
let carVelMSecpercentage = (80*carVelocityMSec)/100;
//el 79% del carVelocitySec en MILISEGUNDOS//
let crashMSecpercentage = (79*carVelocityMSec)/100;

function carLeftAppears(){
    let car = document.createElement("img");
    car.src = './src/car1.png';
    upContainer.appendChild(car);
    ///car CSS///
    car.style.position = 'absolute';
    car.style.zIndex = zIndexNum;
    //Para no superponer nuevos coches y que se vean uno encima de otro (podré sacar 1.999.999.993 coches).
    zIndexNum--;
    car.style.animation = `car-left-animation ${carVelocitySec}s ease-in 1`;

    //cuando la persona está en el mismo carril del coche a su 79% del recorrido --> DEAD
    window.setTimeout(()=>{
        if(person.className == 'person-left'){
            //GAME OVER
            person.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
            car.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
            person.classList.add('person-dying-left');
            car.parentElement.removeChild(car);
            videoLoop.removeAttribute('loop');
            videoLoop.removeAttribute('autoplay');
            // parar todo
            btnDown.removeEventListener('mouseup', ()=>arriba());
            btnDown.removeEventListener('mousedown', ()=>abajo());
            btnRight.removeEventListener('mousedown', ()=>person.className = 'person-right');
            btnLeft.removeEventListener('mousedown', ()=>person.className = 'person-left');
            window.removeEventListener('keyup', keyUp);
            window.removeEventListener('keydown', keyDown);
            micImgContainer.addEventListener('mousedown', ()=>{
                if(micImg.className == 'micRecording'){
                    stop();
                }
                else if(micImg.className == 'micOff'){
                    rec(); 
                };
            });
            clearInterval(randomAppearsInterval);
            // mostrar resultado
            let gameOverModal = document.createElement('div');
            upContainer.appendChild(gameOverModal);
            gameOverModal.className = 'game-over-modal';
            let gameOverModalMessage = document.createElement('p');
            gameOverModal.appendChild(gameOverModalMessage);
            gameOverModalMessage.className = 'game-over-modal-message';
            gameOverModalMessage.innerHTML = 'YOU  DIED';
            // btn restart
            let btnRestart = document.createElement('button');
            gameOverModal.appendChild(btnRestart);
            btnRestart.className = 'btn-restart';
            window.setTimeout(()=>{
                btnRestart.innerHTML = 'Restart game';
            }, 3000);
            btnRestart.addEventListener('click', ()=>{window.location.reload(true)});
        };
    }, crashMSecpercentage);

    //cuando los coches pasen el 80% del recorrido:
    window.setTimeout(()=>{
        //cambiar color coche a verde
        car.style.filter = 'invert(74%) sepia(85%) saturate(347%) hue-rotate(60deg) brightness(95%) contrast(95%)';
        //cambiar z-index para pasar el coche sobre la persona
        car.style.zIndex = 1999999995;
        winPoint();
    }, carVelMSecpercentage);
    //eliminar nodo de coche
    window.setTimeout(()=>{
        //este try catch es provisional hasta que vea como solucionar el --> cuando GAME OVER, eliminar todo lo de despues, incluida ésta función.
        try{
            car.parentElement.removeChild(car);
        }
        catch (err) {console.log(err)};
    }, carVelocityMSec);
};
function carRightAppears(){
    let car = document.createElement("img");
    car.src = './src/car1.png';
    upContainer.appendChild(car);
    ///car CSS///
    car.style.position = 'absolute';
    car.style.zIndex = zIndexNum;
    zIndexNum--;
    car.style.animation = `car-right-animation ${carVelocitySec}s ease-in 1`;

    window.setTimeout(()=>{
        if(person.className == 'person-right'){
            //GAME OVER
            person.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
            car.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
            person.classList.add('person-dying-right');
            car.parentElement.removeChild(car);
            videoLoop.removeAttribute('loop');
            videoLoop.removeAttribute('autoplay');
            // parar todo
            btnDown.removeEventListener('mouseup', ()=>arriba());
            btnDown.removeEventListener('mousedown', ()=>abajo());
            btnRight.removeEventListener('mousedown', ()=>person.className = 'person-right');
            btnLeft.removeEventListener('mousedown', ()=>person.className = 'person-left');
            window.removeEventListener('keyup', keyUp);
            window.removeEventListener('keydown', keyDown);
            micImgContainer.addEventListener('mousedown', ()=>{
                if(micImg.className == 'micRecording'){
                    stop();
                }
                else if(micImg.className == 'micOff'){
                    rec(); 
                };
            });
            clearInterval(randomAppearsInterval);
            // mostrar resultado
            let gameOverModal = document.createElement('div');
            upContainer.appendChild(gameOverModal);
            gameOverModal.className = 'game-over-modal';
            let gameOverModalMessage = document.createElement('p');
            gameOverModal.appendChild(gameOverModalMessage);
            gameOverModalMessage.className = 'game-over-modal-message';
            gameOverModalMessage.innerHTML = 'YOU  DIED';
            // btn restart
            let btnRestart = document.createElement('button');
            gameOverModal.appendChild(btnRestart);
            btnRestart.className = 'btn-restart';
            window.setTimeout(()=>{
                btnRestart.innerHTML = 'Restart game';
            }, 3000);
            btnRestart.addEventListener('click', ()=>{window.location.reload(true)});
        };
    }, crashMSecpercentage);
        window.setTimeout(()=>{
            car.style.filter = 'invert(74%) sepia(85%) saturate(347%) hue-rotate(60deg) brightness(95%) contrast(95%)';
            car.style.zIndex = 1999999995;
            winPoint();
        }, carVelMSecpercentage);
        window.setTimeout(()=>{
            try{
                car.parentElement.removeChild(car);
            }
            catch (err) {console.log(err)};
        }, carVelocityMSec);
};
///CARS APPEARS
function randomAppears(){
    //numero random del 0 al 9
    let randomNum = Math.random()*10;
    if(randomNum < 4.5){carLeftAppears()}
    if(randomNum > 4.5){carRightAppears()}
    console.warn(`Clue: Car L/R appears --> ${randomNum.toFixed(1)}`);
}
let randomAppearsInterval = window.setInterval(randomAppears, carVelocityMSec);
///// OTRAS FUNCIONES /////
//ANDAR
let topNumero = 55;
//colocar persona al cargar página
person.style.top = `${topNumero}%`;
function walk(){
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
let walkInterval = window.setInterval(walk, 160);

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
    //cada vez que se gane un punto, restar numero de velocidad de aparicion de los coches. Un 1%;
    // carVelocitySec = carVelocitySec - (1*carVelocitySec)/100;
    // console.log(`carVelocitySec = ${carVelocitySec.toFixed(3)};`);
    //PROBLEMA CON ASINCRONIA DEL INTERVALO PARA CAMBIAR VARIABLE Y QUE AFECTE
};

//trabajar con el resultado obtenido
let i = 0;
recognition.onresult = (e)=>{
    // console.log(e);
    var resultado = e.results[i][0].transcript;
    var confianza = e.results[i][0].confidence;
    i++;
    console.log(resultado);
    if(resultado.includes('derecha') || resultado.includes('derecho')){
        person.className = 'person-right';
    };
    if(resultado.includes('izquierda') || resultado.includes('izquierdo')){
        person.className = 'person-left';
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

//mover persona al presionar flechas KEYBOARD
window.addEventListener('keydown', keyDown);
function keyDown(e){
    e.preventDefault();
    switch(e.key){
        case 'ArrowRight':
            person.className = 'person-right';
            break;
        case 'ArrowLeft':
            person.className = 'person-left';
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
//mover persona al presionar flechas RATON/BTNs pantalla
btnLeft.addEventListener('mousedown', ()=>person.className = 'person-left');
btnRight.addEventListener('mousedown', ()=>person.className = 'person-right');
// btnDown.addEventListener('mousedown', ()=>{abajo();setTimeout(arriba, 1000);});
btnDown.addEventListener('mousedown', ()=>abajo());
btnDown.addEventListener('mouseup', ()=>arriba());



///PENDIENTE///
//Aparicion de coches aleatoriamente, sin llegar a aparecer simultaneamente.

//mandarle link al artista del fondo loop
//https://www.youtube.com/user/ssuperguz


///CONCLUSION o APRENDER MÁS///
//Crear un objeto PERSONA.estado == 'viva' y cambiarlo a 'muerta' cuando GAME OVER, no funciona de nada (si que cambia el valor de esa parte del objeto, pero no parece que pueda hacer nada. También probé con una variable global en lugar de objeto, llamada personaEstado, pero nada). Finalmente tuve que usar removeEventListener manualmente en todos los eventos creados.