// ------- CLOCK -------

let digitIDs = [
    "clock-current-hours-tens",
    "clock-current-hours-units",
    "clock-current-minutes-tens",
    "clock-current-minutes-units",
    "clock-time-on-page-minutes-tens",
    "clock-time-on-page-minutes-units",
    "clock-time-on-page-seconds-tens",
    "clock-time-on-page-seconds-units"
];

// Date on page loading
let initialDate;

function addSegments(digitId){
    // Get digit html element
    let digit = document.getElementById(digitId);

    // Add the 7 segments
    for (let i=0; i<7; i++) {
        let segment = document.createElement("div");
        segment.className = `segment off segment${i}`;
        digit.appendChild(segment);
    }
}

function updateDigit(digitId, value){

    let segmentStates = [
        [1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1]
    ];

    // Get digit HTML element
    let digit = document.getElementById(digitId);

    // Check if 
    if (digit.children.length < 7) {    // Check if digit has enough segments
        console.log("digit element has too few digits");
    }

    // Update each digit
    for (let i=0; i<7; i++) {
        let segment = digit.children[i];    // Get segment number i
        if (segmentStates[value][i]) {
            segment.classList.remove("segmentOff");    // Remove off state
        }
        else {
            segment.classList.add("segmentOff");       // Set off state
        }
    }
}

function updateTime() {
    let date = new Date();

    // Update hours tens
    let hours = date.getHours();
    if (hours >= 10) {
        updateDigit(digitIDs[0], (hours - hours%10)/10);
    }
    else {
        updateDigit(digitIDs[0], 0);
    }

    // Update hours units
    updateDigit(digitIDs[1], hours%10);

    // Update minutes tens
    let minutes = date.getMinutes();
    if (minutes >= 10) {
        updateDigit(digitIDs[2], (minutes - minutes%10)/10);        // Current time
    }
    else {
        updateDigit(digitIDs[2], 0);    // Current time
    }

    // Update minutes units
    updateDigit(digitIDs[3], minutes%10);
}

function updateTimeOnPage() {
    let currentDate = new Date();
    let timeOnPage = currentDate-initialDate;
    // Update minutes tens
    let minutes = Math.floor(timeOnPage/60000);
    if (minutes >= 10) {
        updateDigit(digitIDs[4], (minutes - minutes%10)/10);
    }
    else {
        updateDigit(digitIDs[4], 0);
    }
    // Update minutes units
    updateDigit(digitIDs[5], minutes%10);

    // Update seconds tens
    let seconds = Math.floor(timeOnPage/1000) - 60*minutes;
    if (seconds >= 10) {
        updateDigit(digitIDs[6], (seconds - seconds%10)/10);
    }
    else {
        updateDigit(digitIDs[6], 0);
    }
    // Update seconds units
    updateDigit(digitIDs[7], seconds%10);
}

function updateTimeInit() {
    // We need to init time update differently because we want to garantee precision
    // in time update without updating every second
    updateTime();
    setInterval(updateTime, 60000);     // every minute
}

function setColonOn() {
    let colonsHTML = document.getElementsByClassName("colon");
    Array.from(colonsHTML)
        .forEach(function (element) {
            element.classList.remove("segmentOff");  // Remove off state
        });
}

function setColonOff() {
    let colonsHTML = document.getElementsByClassName("colon");
    Array.from(colonsHTML)
        .forEach( function (element) {
            element.classList.add("segmentOff");     // Set off state
        });
}

function initRoutineColonOff() {
    setColonOff();
    setInterval(setColonOff, 2000); // Set colon off every 2 seconds
}

function initRoutineColonOn() {
    setColonOn();
    setInterval(setColonOn, 2000);  // Set colon on every 2 seconds
}

function updateSecondsInit() {
    // Call this function to init colon animation
    initRoutineColonOn();
    setTimeout(initRoutineColonOff, 1000);  // Delay colon off animation by 1 second

    // Init time on page actualisations for seconds
    initialDate = new Date();
    updateTimeOnPage();
    setInterval(updateTimeOnPage, 1000);
}


function initClock(){
    for (digitID of digitIDs) {
        // Add segments for the 4 digits
        addSegments(digitID);
    }

    // Prepare for time updates
    updateTime();
    let date = new Date();
    // Wait for the next minute update to call initialization
    setTimeout(updateTimeInit, 60000 -date.getSeconds()*1000 -date.getMilliseconds());

    // Prepare for colon updates
    setTimeout(updateSecondsInit, 1000 -date.getMilliseconds());
}

/*
function printInputError(event){
    let inputId = event.target;
    console.error("La saisie de l'id" + inputId + "est erronée.");
}

function verif_input(inputId){
    let input = document.getElementById("inputId");
    input.addEventListener("load",printInputError);
}
*/
function redirectToHomepage(event){
    document.location = "./../html/accueil.html";
}
function clickedOnLogo(){
    let logo = document.images[0];
    logo.addEventListener("click", redirectToHomepage);
}
//plagiat
function antiplagiat(){
    console.log("Le plagiat est tout simplement l'appropriation illégitime de travaux ou d'idées attribués à d'autres personnes");
 }
 
 function addeventplagiat(){
    //selectionne tous les elements 
      let all=document.querySelectorAll('p');
        // fais apparaitre un message quand on copie un element
      Array.from(all).forEach(function(element){
         element.addEventListener("copy",antiplagiat);
      });
      
      //image marche pas 
      let image=document.querySelectorAll('img');

      Array.from(image).forEach(function(element) {
        element.addEventListener("copy",antiplagiat);
      });
}

    
    //retard de 2 secondes 
    function Delay() {
        // Sélection de tous les liens sur la page
        var tousLesLiens = document.querySelectorAll('a');
        var loaderContainer = document.getElementById('loader-container');
    
        // Parcourir tous les liens et ajoute un gestionnaire d'événements de clic
        tousLesLiens.forEach(function(lien) { 
            lien.addEventListener('click', function(event) {
                event.preventDefault();
                // Attendre 2 secondes 
                loaderContainer.style.display = 'block';
    
                setTimeout(function() {
                    loaderContainer.style.display = 'none';
                    var url = lien.getAttribute('href');
                    // Vérifier si le lien pointe vers la page "Membres"
                    if (url.includes('membres.html')) {
                        // Afficher la popup de confirmation uniquement pour la page "Membres"
                        popup();
                    } else {
                        // Rediriger vers l'URL du lien
                        window.location.href = url;
                    }
                }, 2000); // 2000 millisecondes = 2 secondes
            });
        });
    }
    
    function popup(){
        // Demande a l'utilisateur de confirmer son choix
        var confirmation = confirm("Êtes-vous sûr de vouloir naviguer vers la page des membres ?");
    
        if (confirmation) {
            // redirige vers membres
            window.location.href = "membres.html";
        } else {
            // Si l'utilisateur clique sur "Annuler"ne rien faire
            return false;
        }
}

function telephone(){
        //prend tous les numeros de telephones
        var numerosTelephone = document.getElementsByClassName("footer-phone");
    
        Array.from(numerosTelephone).forEach(function(numero) {
            numero.addEventListener('copy', function(event) {
                // Empeche le comportement par défaut de la copie
                event.preventDefault();
    
                // recupere le numéro de téléphone copié
                var numeroCopie = window.getSelection().toString();
    
                // afficher le message avec le numéro copié
                var confirmation = prompt("Si vous voulez appeler ce numéro : " + numeroCopie + ", entrez-le de nouveau dans le champ puis validez :");
                
                // vérifier si l'utilisateur a entré le numéro correctement
                if (confirmation === numeroCopie) {
                    // affiche le message dans la console
                    console.log("Vous appelez ce numéro : " + numeroCopie);
    
                    // jouer la sonnerie pendant 5 secondes
                    jouerSonnerie();
                } else {
                    alert("Le numéro saisi ne correspond pas au numéro copié");
                }
            });

        
    
        function jouerSonnerie() {
            // créer un contexte audio
            var sonnerie = new Audio('../sonnerie.mp3');
            
            // demarre sonnerie
            sonnerie.play();
    
            // arrete le bruit apres 5 secondes
            setTimeout(function() {
                sonnerie.pause();
                sonnerie.currentTime=0; // on remet le temps a zero
            }, 5000); // 5000 millisecondes = 5 secondes
        }
    });
}
function couleur_item() {
    console.log('Ancienne couleur : Rouge');
    console.log('Nouvelle couleur : Rouge-foncé');

    let navbarItems = document.querySelectorAll('.navbar-menu-item, .navbar-submenu-item');
    let submenuContainers = document.querySelectorAll('.submenu-container');

    // Vérifiez si un élément actif est stocké dans le localStorage
    let activeItemId = localStorage.getItem('activeNavbarItem');
    if (activeItemId) {
        const activeItem = document.getElementById(activeItemId);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    navbarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Supprimer la classe active de tous les items
            navbarItems.forEach(navItem => navItem.classList.remove('active'));

            // Ajouter la classe active à l'item cliqué
            item.classList.add('active');

            // Stocker l'ID de l'item cliqué dans le localStorage
            localStorage.setItem('activeNavbarItem', item.id);
        });
    });

    // ajoute des gestionnaires d'événements pour les items de menu
    submenuContainers.forEach(container => {
        const parentItem = container.querySelector('.navbar-menu-item');
        const submenuItems = container.querySelectorAll('.navbar-submenu-item');

        parentItem.addEventListener('mouseenter', () => {
            parentItem.style.backgroundColor = '#B22222'; // Rouge plus foncé
        });

        parentItem.addEventListener('mouseleave', () => {
            parentItem.style.backgroundColor = ''; // Réinitialise la couleur
        });

        submenuItems.forEach(subItem => {
            subItem.addEventListener('mouseenter', () => {
                parentItem.style.backgroundColor = '#B22222'; // Rouge plus foncé
            });

            subItem.addEventListener('mouseleave', () => {
                parentItem.style.backgroundColor = ''; // Réinitialise la couleur
            });
        });
    });

    // Détecter la page actuelle et appliquer la classe active
    const currentPage = window.location.pathname.split('/').pop();
    const pageMap = {
        'thematique.html': 'navbar-recherche',
        'plateforme.html': 'navbar-recherche',
        'contact.html': 'navbar-infos-contact',
        'plan.html': 'navbar-infos-contact',
        'offres.html': 'navbar-infos-contact'
    };

    if (pageMap[currentPage]) {
        const parentItem = document.getElementById(pageMap[currentPage]);
        if (parentItem) {
            parentItem.classList.add('active');
        }
    }
}



function insertNavbar() {
    // Define a variable, accessible on any js script.
    document.body.navbarInserted = false;
    let current_url_folder = location.href.substring(0, location.href.lastIndexOf('/')+1);
    fetch(current_url_folder + "navbar.txt")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            document.body.navbarInserted = true;
        });
}

function insertFooter() {
    // Define a new variable, accessible on any js script
    document.body.footerInserted = false;
    let current_url_folder = location.href.substring(0, location.href.lastIndexOf('/')+1);
    fetch(current_url_folder + "footer.txt")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
            document.body.footerInserted = true;
        });
}


// https://stackoverflow.com/questions/22125865/how-to-wait-until-a-predicate-condition-becomes-true-in-javascript
function until(conditionFunction) {
    const poll = resolve => {
        if(conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}

async function main() {
    insertNavbar();
    insertFooter();
    await until(_ => document.body.navbarInserted == true);
    await until(_ => document.body.footerInserted == true);

    //verif_input();
    initClock();
    addeventplagiat();
    Delay();
    telephone();
    couleur_item();
}

main();