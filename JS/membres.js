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
    });
    if (card.length == 0) {
        return;
    }
    card = card[0];

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



// --------- MODE ÉDITION ---------


// Prompts pour demander le username et pwd de l'administrateur
function promptAdmin() {
    let admin_username = "admin";
    let admin_password = "admin_pwd";

    let user_input = prompt("Entrez le nom du profil administrateur. (spoiler c'est admin)");
    if (user_input == admin_username) {
        user_input = prompt("Entrez le mot de passe du profil administrateur. (spoiler c'est admin_pwd)");
        if (user_input == admin_password) {
            activateEditMode();
        }
        else {
            console.error("Le mot de passe administrateur est incorrect");
        }
    }
    else {
        console.error("Le nom du profil administrateur est incorrect.");
    }
}


// Message pour confirmer la sortie du mode édition
function alertQuitEditMode() {
    let user_input = confirm("Souhaitez-vous quitter le mode édition ?");
    if (user_input) {
        unactivateEditMode();
    }
}

// Supprimer la carte spécifiée
function deleteCard(event) {
    let user_input = confirm("Voulez-vous supprimer cette carte ?");
    if (user_input) {
        event.target.parentNode.remove();
    }
}

// Définir la permission de changer les noms sur les cartes. allow est un bool
function setNamesModificationPermission(allow) {
    Array.from(document.getElementsByClassName("card-name"))
            .forEach(function (element) {
                element.contentEditable = allow;
            });
}

// Ajouter un bouton pour supprimer une carte
function addCardDeleteButton(cardElement) {
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "./../images/delete-icon.svg";
    deleteIcon.classList.add("filter-red", "card-deletor");
    deleteIcon.style.alignSelf = "last baseline";
    deleteIcon.style.margin = "3px";
    deleteIcon.addEventListener("click", deleteCard);
    cardElement.appendChild(deleteIcon);
}

// Retirer les boutons de suppression de cartes
function removeCardDeleteButtons() {
    Array.from(document.getElementsByClassName("card-deletor"))
            .forEach(function(element) {
                element.remove();
            });
}

// Ajouter un bouton d'ajout de cartes
function addNewCardButton(cardListElement) {
    let addIcon = document.createElement("img");
    addIcon.src = "./../images/add-icon.svg";
    addIcon.classList.add("filter-red", "card-creator");
    addIcon.addEventListener("click", addCard);
    cardListElement.appendChild(addIcon);
}


// Supprimer les bouyton d'ajout de cartes
function removeNewCardButtons() {
    Array.from(document.getElementsByClassName("card-creator"))
            .forEach(function(element) {
                element.remove();
            });
}

// Ajouter une nouvelle carte
function addCard(event) {
    let card_list = event.target.parentNode;
    fetch("http://" + window.location.host + "/html/default_card.html")
        .then(response => response.text())
        .then((data) => {
            event.target.remove();
            card_list.innerHTML += data;
            card_list.lastChild.classList.add("created-card");
            addCardDeleteButton(card_list.lastChild);
            setCardModificationPermission(card_list.lastChild, true);
            addNewCardButton(card_list);
        });
}

// Ajouter le bouton de création de tag
function addTagCreator(tag_list) {
    let addIcon = document.createElement("img");
    addIcon.src = "./../images/add-icon.svg";
    addIcon.classList.add("filter-red", "tag-creator");
    addIcon.addEventListener("click", addTag);
    tag_list.appendChild(addIcon);
}

// Supprimer le bouton de création de tag
function removeTagCreator(tag_list) {
    if (tag_list.lastChild.classList.contains("tag-creator")) {
        tag_list.lastChild.remove();
    }
}

// Callback pour le bouton d'ajout de tag
function addTag(event) {
    let tag_list = event.target.parentNode
    removeTagCreator(tag_list);

    tag_list.innerHTML += `<div class="card-tag"><p>tag</p></div>`;

    addTagCreator(tag_list);
}

// Définit la permission pour modifier l'entièreté d'une carte
function setCardModificationPermission(card, allow) {
    card.contentEditable = allow;

    // Obtenir le conteneur pour les tags
    let card_tags = Array.from(card.children)
                            .filter(function (element) {
                                return element.classList.contains("card-desc");
                            })
                            .reduce(function (acc, element) {
                                return acc.concat(Array.from(element.children));
                            }, [])
                            .filter(function (element) {
                                return element.classList.contains("card-tags");
                            });
    if (card_tags.length == 0) {
        return;
    }
    card_tags = card_tags[0];


    if (allow) {
        addTagCreator(card_tags);
    }
    else {
        removeTagCreator(card_tags);
    }
}

// Activer le mode édition
function activateEditMode() {
    let button = document.getElementById("edit-mode-button");

    button.classList.add("filter-red");     // Change color to red
    button.removeEventListener("click", promptAdmin);       // remove old button event

    setNamesModificationPermission(true);
    Array.from(document.getElementsByClassName("card"))
            .forEach(function(cardElement) {
                addCardDeleteButton(cardElement);
            });

    Array.from(document.getElementsByClassName("card-list"))
            .forEach(function(cardListElement) {
                addNewCardButton(cardListElement);
            });

    Array.from(document.getElementsByClassName("created-card"))
            .forEach(function (cardElement) {
                setCardModificationPermission(cardElement, true);
            });

    button.addEventListener("click", alertQuitEditMode);    // Set new button event
}

// Désactiver le mode édition
function unactivateEditMode() {
    let button = document.getElementById("edit-mode-button");

    button.classList.remove("filter-red");      // Reset color
    button.removeEventListener("click", alertQuitEditMode);     // remove old button event

    setNamesModificationPermission(false);
    removeCardDeleteButtons();
    removeNewCardButtons();

    Array.from(document.getElementsByClassName("created-card"))
            .forEach(function(cardElement) {
                setCardModificationPermission(cardElement, false);
            });

    button.addEventListener("click", promptAdmin);          // set new button event
}


function setupEditModeButton() {
    let button = document.getElementById("edit-mode-button");
    button.addEventListener("click", promptAdmin);
}


function mainMembres() {
    activateCardScratching();
    setupEditModeButton();
}

mainMembres();