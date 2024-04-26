// --- ZOOM x2 COMPÉTENCES ---

function zoomCompetences(event) {
    event.target.style.width = "100%";
    event.target.addEventListener("mousemove", moveCompetences)
}

function unzoomCompetences(event) {
    event.target.style.width = "50%";
    event.target.removeEventListener("mousemove", moveCompetences);
}

function moveCompetences(event) {
    console.log(event.clientX);
}


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
}

mainAccueil();