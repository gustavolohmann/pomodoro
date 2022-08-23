const button = document.querySelector(".button-contador");
const contador = document.querySelector(".contatador");
const body = document.querySelector(".body");
const title = document.querySelector(".title");
const music = document.querySelector(".alarme");
// inicia o som de alarme
playAlarme = {
    start: function (verify) {
        if (verify == true) {
            music.play();
        }
    }
}
// defime os estilos da pagina
ContadorStyle = {
    style: function (color, backgroundColor) {
        contador.style.color = color;
        body.style.backgroundColor = backgroundColor;
    }
}

function IniciaContador(e) {
    e.preventDefault();
    ContadorStyle.style("#5E74DA", "#D4AEFB"); //chame o estilo da pagina

    let min = 25;
    let seg = 59;

    const TimePomodoro = setInterval(() => {

        contador.innerHTML = min + ":" + seg--;

        if (seg < 10) {
            contador.innerHTML = min + ":" + "0" + seg;
        }
        if (min < 10) {
            contador.innerHTML = "0" + min + ":" + seg;
        }
        if (seg < 10 && min < 10) {
            contador.innerHTML = "0" + min + ":" + "0" + seg;
        }
        if (seg <= 0) {
            seg = 59;
            --min;
        }
        if (min <= 0) {
            contador.innerHTML = "00" + ":" + "00";
            clearInterval(TimePomodoro);
            playAlarme.start(true);
        }
    }, 1000);
}

button.addEventListener("click", IniciaContador);
const descanso = document.querySelector(".break");

function ToStop() {

    let minBreak = 5;

    let segBreak = 59;

    ContadorStyle.style("#ffff", "#3E53B7"); //chame o estilo da pagina

    const stopPomodoro = setInterval(() => {

        contador.innerHTML = minBreak + ":" + segBreak--;

        if (segBreak < 10) {
            contador.innerHTML = minBreak + ":" + "0" + segBreak;
        }
        if (minBreak < 10) {
            contador.innerHTML = "0" + minBreak + ":" + segBreak;
        }
        if (segBreak < 10 && minBreak < 10) {
            contador.innerHTML = "0" + minBreak + ":" + "0" + segBreak;
        }
        if (segBreak <= 0) {
            segBreak = 59;
            --minBreak;
        }
        if (minBreak <= 0) {
            contador.innerHTML = "00" + ":" + "00";
            clearInterval(stopPomodoro);
            playAlarme.start(true);
        }

    }, 1000);
}

descanso.addEventListener("click", ToStop);


/*modal*/
const container = document.querySelector(".container-modal");
const add = document.getElementById("add");

function openModal() {

    container.classList.add("openModal");

}
add.addEventListener("click", openModal);

const button_hidden_modal = document.getElementById("button_hidden_modal");

function hidden_modal() {

    container.classList.remove("openModal");

}
button_hidden_modal.addEventListener("click", hidden_modal);

/*fim modal*/

const FildsOfInputs = document.querySelector(".filds-of-inputs"); // campos de input

const gravar = document.getElementById("gravar");

const tafera = document.getElementById("tarefa");

function lista() {

    const p = document.createElement("p")

    const text = document.createTextNode(tarefa.value);

    insertInTheDiv(p, text);
}

gravar.addEventListener("click", lista);

function insertInTheDiv(p, text) {
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    p.appendChild(text);
    p.appendChild(buttonDelete);
    FildsOfInputs.appendChild(p);
    buttnonDeleteTarefa(p, buttonDelete);
}

function buttnonDeleteTarefa(p, buttonDelete) {
    buttonDelete.addEventListener("click", () => {
        p.remove();
    })
}


