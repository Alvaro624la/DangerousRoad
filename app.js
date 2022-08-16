const GAME = {
    personState: 'vivo',
    carColor: 'default',
    homeMusic: 'mute',
    points: 0,
    highscore: localStorage.getItem('highscore')
};


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
micImg.className = 'micOff';

function rec(){
    recognition.start();
    micImg.className = 'micRecording';
    ralentizar();
};
function stop(){
    recognition.stop();
    micImg.className = 'micOff';
    acelerar();
}
//manejar errores al no reconocer la voz
recognition.onerror = function(event) {
    console.log('Error durante el reconocimiento de voz: ' + event.error);
    recognition.stop();
    micImg.className = 'micOff';
    acelerar();
};

/// VARIABLES ///
let btnMute = document.getElementById('btnMute');
btnMute.alt = 'mute/unmute main music';

let gameOptionsWindow = document.getElementById('gameOptionsWindow');
let selectCarColor = document.getElementById('MenuHomeCarColor');
let selectClima = document.getElementById('MenuHomeClima');
let btnGameOptionsCancelar = document.getElementById('btnGameOptionsCancelar');
let btnGameOptionsAceptar = document.getElementById('btnGameOptionsAceptar');

let btnCredits = document.getElementById('btnHomeMenuCredits');
let gameCreditsWindow = document.getElementById('gameCreditsWindow');
let gameCreditsContent = document.getElementById('gameCreditsContent');

let upContainer = document.getElementById('all-container');
let homeMenuWindow = document.getElementById('homeMenu');
let btnStart = document.getElementById('btnHomeMenuStart');
let btnOptions = document.getElementById('btnHomeMenuOptions');

let btnLeft = document.getElementById('leftBTN');
let btnRight = document.getElementById('rightBTN');
let btnDown = document.getElementById('downBTN');
let pressIndicatorKeyL = document.getElementById('pressIndicatorKeyL');
let pressIndicatorKeyR = document.getElementById('pressIndicatorKeyR');
let pressIndicatorFinger = document.getElementById('pressIndicatorFinger');

let videoLoop = document.getElementById('road-loop');
let person = document.getElementById('person');
let scoreboard = document.getElementById('scoreboard');
let highscoreboard = document.getElementById('highscoreboard');
//al cargar la pagina
scoreboard.innerHTML = `Score: ${GAME.points}`;
if(GAME.highscore !== null) highscoreboard.innerHTML = `Highscore: ${GAME.highscore}`
else highscoreboard.innerHTML = `Highscore: 0`;



/// AUDIOS ///
//home menu//
const audioHomeMenu = document.createElement('audio');
audioHomeMenu.volume = 0.8;
audioHomeMenu.src = './src/home-menu.mp3';
document.body.appendChild(audioHomeMenu);
//home menu//
const audioCredits = document.createElement('audio');
audioCredits.preload = 'auto';
audioCredits.volume = 0.2;
audioCredits.src = './src/credits.mp3';
document.body.appendChild(audioCredits);
//win points//
const audioPoint = document.createElement('audio');
audioPoint.preload = 'auto';
audioPoint.volume = 0.8;
audioPoint.src = './src/win-point.mp3';
document.body.appendChild(audioPoint);
//start//
const audioStart = document.createElement('audio');
audioStart.preload = 'auto';
audioStart.volume = 0.6;
audioStart.src = './src/start.mp3';
document.body.appendChild(audioStart);
//person-l-r//
const audioPersonLR = document.createElement('audio');
audioPersonLR.preload = 'auto';
audioPersonLR.volume = 0.6;
audioPersonLR.src = './src/person-l-r-short.mp3';
document.body.appendChild(audioPersonLR);
//person-d//
const audioPersonD = document.createElement('audio');
audioPersonD.preload = 'auto';
audioPersonD.volume = 0.8;
audioPersonD.src = './src/person-d.mp3';
document.body.appendChild(audioPersonD);
//game-over//
const audioGameOver = document.createElement('audio');
audioGameOver.preload = 'auto';
audioGameOver.volume = 1;
audioGameOver.src = './src/game-over-epic.mp3';
document.body.appendChild(audioGameOver);
//menu-select//
const audioMenuSelect = document.createElement('audio');
audioMenuSelect.preload = 'auto';
audioMenuSelect.volume = 1;
audioMenuSelect.src = './src/menu-select.mp3';
document.body.appendChild(audioMenuSelect);
//menu-in//
const audioMenuIn = document.createElement('audio');
audioMenuIn.preload = 'auto';
audioMenuIn.volume = 1;
audioMenuIn.src = './src/menu-in.mp3';
document.body.appendChild(audioMenuIn);
//menu-out//
const audioMenuOut = document.createElement('audio');
audioMenuOut.preload = 'auto';
audioMenuOut.volume = 1;
audioMenuOut.src = './src/menu-out.mp3';
document.body.appendChild(audioMenuOut);
//ambient//
const audioAmbient = document.createElement('audio');
audioAmbient.preload = 'auto';
audioAmbient.volume = 0.2;
audioAmbient.src = './src/ambient.mp3';
document.body.appendChild(audioAmbient);
audioAmbient.setAttribute('loop', '');

///CAR///
let zIndexNum = 1999999993;
//velocidad en segundos de aparicion de coches
let carVelocitySec = 2; 
let carVelocityMSec = carVelocitySec*1000;
//el 80% del carVelocitySec en MILISEGUNDOS//
let carVelMSecpercentage = (80*carVelocityMSec)/100;
//el 79% del carVelocitySec en MILISEGUNDOS//
let crashMSecpercentage = (79*carVelocityMSec)/100;
function ralentizar(){ 
    if(micImg.className == 'micRecording'){
        carVelocitySec += 3;
        carVelocityMSec = carVelocitySec*1000;
        carVelMSecpercentage = (80*carVelocityMSec)/100;
        crashMSecpercentage = (79*carVelocityMSec)/100;
    }
}
function acelerar(){
    carVelocitySec -= 3;
    carVelocityMSec = carVelocitySec*1000;
    carVelMSecpercentage = (80*carVelocityMSec)/100;
    crashMSecpercentage = (79*carVelocityMSec)/100;
}
//aumentar dificultad a x nivel de puntos
function addDificultyLevels(){
    if(GAME.points >= 10 && GAME.points <= 15){
        carVelocitySec -= 0.2;
        carVelocityMSec = carVelocitySec*1000;
        carVelMSecpercentage = (80*carVelocityMSec)/100;
        crashMSecpercentage = (79*carVelocityMSec)/100;
        console.log(carVelocitySec);
    
    } else if (GAME.points > 15 && GAME.points <= 20){
        carVelocitySec -= 0.3;
        carVelocityMSec = carVelocitySec*1000;
        carVelMSecpercentage = (80*carVelocityMSec)/100;
        crashMSecpercentage = (79*carVelocityMSec)/100;
        console.log(carVelocitySec);
    
    } else if (GAME.points > 20 && GAME.points <= 25){
        carVelocitySec -= 0.4;
        carVelocityMSec = carVelocitySec*1000;
        carVelMSecpercentage = (80*carVelocityMSec)/100;
        crashMSecpercentage = (79*carVelocityMSec)/100;
        console.log(carVelocitySec);
    
    } else if (GAME.points > 25 && GAME.points <= 30){
        carVelocitySec -= 0.3;
        carVelocityMSec = carVelocitySec*1000;
        carVelMSecpercentage = (80*carVelocityMSec)/100;
        crashMSecpercentage = (79*carVelocityMSec)/100;
        console.log(carVelocitySec);
    
    };;
    console.log(carVelocitySec);
};

///WALK///
let topNumero = 55;
//colocar persona al cargar página
person.style.top = `${topNumero}%`;


function startGame(){
/// clima ///
// if(selectClima.value == 'clima-fog'){
//     upContainer.style.filter = 'invert(80%) sepia(0%) saturate(9%) hue-rotate(187deg) brightness(89%) contrast(82%)';
// } else {upContainer.style.filter = ''}
//////////// FUNCTIONS ////////////
/// HOME MENU DISAPPEARS ///
homeMenuWindow.style.display = 'none';

///VIDEO LOOP (no funciona bien, nose porque, y lo he puesto manual al poner el homeMenu en display: none;)
// videoLoop.setAttribute('loop', '');
// videoLoop.setAttribute('autoplay', "");

/// MIC EVENTLISTENER ///
micImgContainer.addEventListener('mousedown', ()=>{
    if(micImg.className == 'micRecording'){
        stop();
    }
    else if(micImg.className == 'micOff'){
        rec(); 
    };
});

//resaltar btn L R & keyboard L R & finger tapping
btnLeft.style.animation = 'resaltarL 1s linear';
btnRight.style.animation = 'resaltarR 1s linear';
pressIndicatorKeyL.style.animation = 'resaltarKeyL 1s linear';
pressIndicatorKeyR.style.animation = 'resaltarKeyR 1s linear';
pressIndicatorFinger.style.animation = 'resaltarFinger 1s linear';


audioStart.play();
audioAmbient.play();

function carLeftAppears(){
    let car = document.createElement("img");
    car.src = './src/car1.png';
    upContainer.appendChild(car);
    /// set car color ///
    if(GAME.carColor == 'default'){
        car.style.filter = '';
    };
    if(GAME.carColor == 'green'){
        car.style.filter = 'invert(80%) sepia(84%) saturate(3735%) hue-rotate(54deg) brightness(128%) contrast(86%)'; // #5e5
    };
    if(GAME.carColor == 'blue'){
        car.style.filter = 'invert(35%) sepia(48%) saturate(2148%) hue-rotate(217deg) brightness(102%) contrast(104%)'; // #56f
    };
    if(GAME.carColor == 'ugly-1'){
        car.style.filter = 'invert(82%) sepia(19%) saturate(2423%) hue-rotate(212deg) brightness(103%) contrast(105%)'; // #faf
    };
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
            person.classList.add('person-dying-left');

            audioAmbient.pause();
            audioGameOver.play();
            person.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
            car.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
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
            //guardar highscore
            localStorage.setItem('highscore', GAME.points);
            GAME.highscore = localStorage.getItem('highscore');
            highscoreboard.innerHTML = `Highscore: ${GAME.highscore}`;
            // mostrar resultado
            GAME.points--;
            scoreboard.innerHTML = `Score: ${GAME.points}`;
            //mostrar pantalla final
            let gameOverModal = document.createElement('div');
            upContainer.appendChild(gameOverModal);
            gameOverModal.className = 'game-over-modal';
            let gameOverModalMessage = document.createElement('p');
            gameOverModal.appendChild(gameOverModalMessage);
            gameOverModalMessage.className = 'game-over-modal-message';
            // gameOverModalMessage.innerHTML = 'YOU  DIED';
            gameOverModalMessage.innerHTML = 'GAME OVER';
            // btn restart
            let btnRestart = document.createElement('button');
            gameOverModal.appendChild(btnRestart);
            btnRestart.className = 'btn-restart';
            window.setTimeout(()=>{
                btnRestart.innerHTML = 'Restart game';
            }, 3000);
            btnRestart.addEventListener('mouseover', ()=>{
                audioMenuSelect.play();                            
            });
            btnRestart.addEventListener('click', ()=>{
                audioMenuIn.play();
                window.setTimeout(()=>{
                    window.location.reload(true);  
                }, 300);                             
            });
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
    /// set car color ///
    if(GAME.carColor == 'default'){
        car.style.filter = '';
    };
    if(GAME.carColor == 'green'){
        car.style.filter = 'invert(80%) sepia(84%) saturate(3735%) hue-rotate(54deg) brightness(128%) contrast(86%)'; // #5e5
    };
    if(GAME.carColor == 'blue'){
        car.style.filter = 'invert(35%) sepia(48%) saturate(2148%) hue-rotate(217deg) brightness(102%) contrast(104%)'; // #56f
    };
    if(GAME.carColor == 'ugly-1'){
        car.style.filter = 'invert(82%) sepia(19%) saturate(2423%) hue-rotate(212deg) brightness(103%) contrast(105%)'; // #faf
    };
    ///car CSS///
    car.style.position = 'absolute';
    car.style.zIndex = zIndexNum;
    zIndexNum--;
    car.style.animation = `car-right-animation ${carVelocitySec}s ease-in 1`;

    window.setTimeout(()=>{
        if(person.className == 'person-right'){
            //GAME OVER
            person.classList.add('person-dying-right');

            audioAmbient.pause();
            audioGameOver.play();
            person.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
            car.style.filter = 'invert(34%) sepia(53%) saturate(1904%) hue-rotate(334deg) brightness(96%) contrast(84%)';
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
            //guardar highscore
            localStorage.setItem('highscore', GAME.points);
            GAME.highscore = localStorage.getItem('highscore');
            highscoreboard.innerHTML = `Highscore: ${GAME.highscore}`;
            // mostrar resultado
            GAME.points--;
            scoreboard.innerHTML = `Score: ${GAME.points}`;
            //mostrar pantalla final
            let gameOverModal = document.createElement('div');
            upContainer.appendChild(gameOverModal);
            gameOverModal.className = 'game-over-modal';
            let gameOverModalMessage = document.createElement('p');
            gameOverModal.appendChild(gameOverModalMessage);
            gameOverModalMessage.className = 'game-over-modal-message';
            gameOverModalMessage.innerHTML = 'GAME OVER';
            // btn restart
            let btnRestart = document.createElement('button');
            gameOverModal.appendChild(btnRestart);
            btnRestart.className = 'btn-restart';
            window.setTimeout(()=>{
                btnRestart.innerHTML = 'Restart game';
            }, 3000);
            btnRestart.addEventListener('mouseover', ()=>{
                audioMenuSelect.play();                            
            });
            btnRestart.addEventListener('click', ()=>{
                audioMenuIn.play();
                window.setTimeout(()=>{
                    window.location.reload(true);  
                }, 300);                             
            });
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

/// WALK ///
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
    audioPersonD.play();
};
function arriba(){
    // PERSONA.posicion = 'arriba'; //ésto es util? para hacer recuento de movimientos, tal vez?
    topNumero = 55;
    person.style.top = `${topNumero}%`;
};

/// WIN POINTS ///
function winPoint(){
    addDificultyLevels();
    audioPoint.play();
    GAME.points++;
    scoreboard.innerHTML = `Score: ${GAME.points}`;
    //cada vez que se gane un punto, restar numero de velocidad de aparicion de los coches. Un 1%;
    // carVelocitySec = carVelocitySec - (1*carVelocitySec)/100;
    // console.log(`carVelocitySec = ${carVelocitySec.toFixed(3)};`);
    //PROBLEMA CON ASINCRONIA DEL INTERVALO PARA CAMBIAR VARIABLE Y QUE AFECTE
};

/// MOVER PERSONA - AUDIO ///
let i = 0;
recognition.onresult = (e)=>{
    // console.log(e);
    var resultado = e.results[i][0].transcript;
    var confianza = e.results[i][0].confidence;
    i++;
    console.log(resultado);
    if(resultado.includes('derecha') || resultado.includes('derecho')){
        audioPersonLR.play();
        person.className = 'person-right';
    };
    if(resultado.includes('izquierda') || resultado.includes('izquierdo')){
        audioPersonLR.play();
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

/// MOVER PERSONA - KEYBOARD ///
window.addEventListener('keydown', keyDown);
function keyDown(e){
    e.preventDefault();
    switch(e.key){
        case 'ArrowRight':
            audioPersonLR.play();
            person.className = 'person-right';
            break;
        case 'ArrowLeft':
            audioPersonLR.play();
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
/// MOVER PERSONA - PHONE ///
btnLeft.addEventListener('mousedown', ()=>{
    person.className = 'person-left';
    audioPersonLR.play();
});
btnRight.addEventListener('mousedown', ()=>{
    person.className = 'person-right';
    audioPersonLR.play();
});
// btnDown.addEventListener('mousedown', ()=>{abajo();setTimeout(arriba, 1000);});
btnDown.addEventListener('mousedown', ()=>abajo());
btnDown.addEventListener('mouseup', ()=>arriba());

}; // startGame();

/// HOME MENU ///
// mute audioHomeMenu music //
function homeMusicMute(){
    if(GAME.homeMusic == 'mute'){
        GAME.homeMusic = 'unmute';
        btnMute.src = 'http://127.0.0.1:5500/src/unmute.png';
        audioHomeMenu.play();
    } else if(GAME.homeMusic == 'unmute'){
        GAME.homeMusic = 'mute';
        btnMute.src = 'http://127.0.0.1:5500/src/mute.png';
        audioHomeMenu.pause();
    };
};
btnMute.addEventListener('click', homeMusicMute);


//Autoplay policy in Chrome (Chrome's autoplay policies)
//Al menos interactuar una vez en el documento (click, tap, etc.) para autoreproducir algun sonido:
window.addEventListener('click', ()=>{
    autoplayHomeBtnsAllowed(); 
});
function autoplayHomeBtnsAllowed(){
    btnStart.addEventListener('mouseover', ()=>{
        audioMenuSelect.play();
    });
    btnOptions.addEventListener('mouseover', ()=>audioMenuSelect.play());
    btnCredits.addEventListener('mouseover', ()=>{audioMenuSelect.play()});
};
btnStart.addEventListener('mouseup', ()=>{
    audioMenuIn.play();
    audioHomeMenu.pause();
    btnMute.src = 'http://127.0.0.1:5500/src/mute.png';
    startGame();
});
btnOptions.addEventListener('mouseup', ()=>{
    gameOptionsWindow.style.display = 'block';
});
    btnGameOptionsCancelar.addEventListener('mouseover', ()=>audioMenuSelect.play());
    btnGameOptionsCancelar.addEventListener('mousedown', ()=>audioMenuOut.play());
    btnGameOptionsCancelar.addEventListener('mouseup', ()=>{
        selectCarColor.value = GAME.carColor;
        gameOptionsWindow.style.display = 'none';
    });
    btnGameOptionsAceptar.addEventListener('mouseover', ()=>audioMenuSelect.play());
    btnGameOptionsAceptar.addEventListener('mousedown', ()=>audioMenuOut.play());
    btnGameOptionsAceptar.addEventListener('mouseup', ()=>{
        GAME.carColor = selectCarColor.value;
        gameOptionsWindow.style.display = 'none';
    });
btnCredits.addEventListener('mouseup', ()=>{
    audioHomeMenu.pause();
    btnMute.src = 'http://127.0.0.1:5500/src/mute.png';
    audioCredits.play();
    gameCreditsContent.style.animationDuration = '17s';
    gameCreditsWindow.style.display = 'block';
    // por si no le das a cerrar, se cierra solo 2 seg despues que acabe la animacion CSS
    window.setTimeout(()=>{
        gameCreditsWindow.style.display = 'none';
        gameCreditsContent.style.animationDuration = '0s';
        audioCredits.pause();
    }, 19000);
});
    gameCreditsWindow.addEventListener('click', ()=>{
        gameCreditsWindow.style.display = 'none';
        gameCreditsContent.style.animationDuration = '0s';
        audioCredits.pause();
    });


///PENDIENTE///
//cuando se quita el micro, aparecen 2 coches a la vez (el realentizado + el nuevo normal). Arreglarlo para que, por ejemplo, el realentizado se vuelva rapido a mitad de la calzada por ejemplo, eso seria ideal.
//cambiar coches por otra cosa (zombies, motos...) tip: utilizar objeto: GAME.enemy: car/zombie/moto...etc

//mandarle link al artista del fondo loop
//https://www.youtube.com/user/ssuperguz