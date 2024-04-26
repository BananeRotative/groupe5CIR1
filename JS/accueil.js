// ------ ANIMATION "QUI SOMMES-NOUS ?" ------

function textAnimation() {
    let text = document.getElementById("text-animation");

    // Apparition de "qui"
    setTimeout(function () {
        text.innerText = "Qui";
    }, 1000);

    // Apparition de "sommes"
    setTimeout(function () {
        text.innerText = "Qui sommes";
    }, 2000);

    // Apparition de "nous"
    setTimeout(function () {
        text.innerText = "Qui sommes-nous ?";
    }, 3000);

    moveTextToRight(text);
}

function moveTextToRight(text) {
    // Move to right
    let movementSpeed = 40;
    let position = 0;
    let move_right_interval;
    setTimeout(function () {
            move_right_interval = setInterval(function () {
                if (window.innerWidth - text.getBoundingClientRect().right > window.innerWidth/20) {
                    text.style.left = position + "%";
                    position += 1;
                }
                else {
                    position -= 1;
                    clearInterval(move_right_interval);
                    moveTextToLeft(text, position);     // Then move text to left
                }
            }, 1000/movementSpeed);
        }, 4000);
}

function moveTextToLeft(text, initial_position) {
    let movementSpeed = 40;
    let position = initial_position;
    let move_left_interval;
    move_left_interval = setInterval(function () {
            if (position >= 0) {
                text.style.left = position + "%";
                position -= 1;
            }
            else {
                position += 1;
                clearInterval(move_left_interval);
                clearAnimatedText(text);
            }
        }, 1000/movementSpeed);
}

function clearAnimatedText(text) {
    setTimeout(function () {
        text.innerText = "";
    }, 1000);

    setTimeout(textAnimation, 1000);    // Restart animation
}

function startTextAnimation() {
    let text_container = document.getElementById("text-animation-container");
    let text = document.createElement("p");
    text.id = "text-animation";
    text_container.appendChild(text);

    textAnimation();
}



// --- ZOOM x2 COMPÉTENCES ---

function zoomCompetences(event) {
    event.target.style.width = "100%";

    // Utile pour déplacer l'image avec la position de la souris
    // event.target.addEventListener("mousemove", moveCompetences)
}

function unzoomCompetences(event) {
    event.target.style.width = "50%";
    
    // Utile pour déplacer l'image avec la position de la souris
    // event.target.removeEventListener("mousemove", moveCompetences);
}

// Utile pour déplacer l'image avec la position de la souris
// function moveCompetences(event) {
//     
// }


function addCompetencesZoom() {
    let comp = document.getElementById("accueil-competences");

    // Utile pour déplacer l'image avec la position de la souris
    // let sect_comp = document.getElementById("accueil-section-competences");
    // sect_comp.style.height = sect_comp.clientHeight + "px";

    comp.addEventListener("click", zoomCompetences);
    comp.addEventListener("mouseover", zoomCompetences);

    comp.addEventListener("mouseout", unzoomCompetences);
}



function mainAccueil() {
    addCompetencesZoom();
    startTextAnimation();
}

mainAccueil();