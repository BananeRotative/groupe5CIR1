// ------ Grattage de la carte Ayoub Karine ------

function getCardImageContainer(card) {
    if (card.children.length == 0) {
        console.error(`Card ${card} has no children`);
    }
    return card.children[0];
}

// Callback pour chaque instant de grattage de carte
function scratchImage(event) {
    // Add a point
    let scratch_mask = document.getElementById("card-mask-scratch");

    // Get mouse position
    let mouse_x = event.clientX + document.body.scrollLeft - event.target.getBoundingClientRect().left;
    let mouse_y = event.clientY + document.body.scrollTop - event.target.getBoundingClientRect().top;

    scratch_mask.innerHTML += `<circle cx="${mouse_x}" cy="${mouse_y}" r="15" fill="black" class="scratch"></circle>`
}

// Callback pour le début du grattage de carte
function startScratch(event) {
    getCardImageContainer(event.target).addEventListener("mousemove", scratchImage);
}

// Callback pour la fin du grattage de carte
function stopScratch(event) {
    getCardImageContainer(event.target).removeEventListener("mousemove", scratchImage);
    
    // Supprimer tous les cercles (supprimer les points grattés)
    let scratch_mask = document.getElementById("card-mask-scratch");
    Array.from(scratch_mask.children)
        .filter(function (element) {
            return element.classList.contains("scratch");
        })
        .forEach(function (element) {
            element.remove();
        });
}

// Activer le grattage sur la carte Ayoub Karine
function activateCardScratching() {
    // Trouver la carte avec le nom Ayoub Karine
    let card = Array.from(document.getElementsByClassName("card"))
        .filter(function (element) {
            if (element.children.length < 2) {
                return false;
            }
            let corresponding = Array.from(element.children[1].children)
                .filter(function (element) {
                    return element.classList.contains("card-name") && element.innerText == "Ayoub Karine";
                });
            return corresponding.length > 0;
    })[0];

    // Ajout de la texture à gratter et de son masque
    let image_container = getCardImageContainer(card);
    image_container.innerHTML += `
<mask id="card-mask-scratch">
    <circle cx="150" cy="100" r="100" fill="white"></circle>
</mask>
<image href="./../images/members_cards/a_gratter.png" mask="url(#card-mask-scratch)"></image>`;

    // Reagir quand la souris entre ou sort de la carte
    card.addEventListener("mouseenter", startScratch);
    card.addEventListener("mouseleave", stopScratch);
}


function mainMembres() {
    activateCardScratching();
}

mainMembres();