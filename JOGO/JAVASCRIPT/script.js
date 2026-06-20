const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

let score = 0;
let highScore = localStorage.getItem('marioHighScore') || 0;
let jogoAtivo = true;
let intervaloPontos;
let loop;

const scoreAtualHtml = document.getElementById('score-atual');
const hiScoreHtml = document.getElementById('hi-score');


hiScoreHtml.innerText = String(highScore).padStart(5, '0');

// --- FUNÇÃO PARA INICIAR/REINICIAR O JOGO ---
function iniciarJogo() {
    
    score = 0;
    jogoAtivo = true;
    scoreAtualHtml.innerText = "00000";
    scoreAtualHtml.style.color = '#535353';

   
    mario.src = './IMAGENS/mario.webp';
    mario.style.width = '150px';
    mario.style.marginLeft = '0px';
    mario.style.bottom = '0px';
    mario.style.animation = '';

    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    pipe.style.left = '';

 
    document.removeEventListener('keydown', reiniciarComTecla);
    document.addEventListener('keydown', jump);

   
    intervaloPontos = setInterval(() => {
        if (!jogoAtivo) return;

        score++;
        scoreAtualHtml.innerText = String(score).padStart(5, '0');

        if (score > highScore) {
            highScore = score;
            hiScoreHtml.innerText = String(highScore).padStart(5, '0');
            localStorage.setItem('marioHighScore', highScore);
        }
    }, 100);

    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ' ');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 70) {
     
            jogoAtivo = false;
            clearInterval(intervaloPontos); 
            clearInterval(loop);

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './IMAGENS/game-over.png';
            mario.style.width = '70px';  
            mario.style.marginLeft = '50px';
            
            scoreAtualHtml.style.color = '#ff4040';

           
            document.removeEventListener('keydown', jump);
            setTimeout(() => {
                document.addEventListener('keydown', reiniciarComTecla);
            }, 500);
        }
    }, 10);
}

// PULO MARIO
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}


function reiniciarComTecla() {
    iniciarJogo();
}


iniciarJogo();