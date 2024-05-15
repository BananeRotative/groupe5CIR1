function fleche(){
    document.addEventListener('DOMContentLoaded', function() {
        // Sélectionner le bouton "Remonter"
        var btnRemonter = document.getElementById('fleche');
    
        // Ajouter un gestionnaire d'événements de clic au bouton "Remonter"
        btnRemonter.addEventListener('click', function() {
            // Faire défiler la page vers le haut en douceur
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

function changement_image(){
    document.addEventListener('DOMContentLoaded', function() {
        // Sélectionne toutes les images de projet
        var imagesProjets = document.querySelectorAll('.project-image');
    
        // Parcourir toutes les images de projet et ajouter un gestionnaire d'événements de clic à chacune
        imagesProjets.forEach(function(image) {
            image.addEventListener('click', function() {
                // Récupére l'image actuel 
                var currentSrc = image.getAttribute('src');
    
                // changement de l'image
                var newSrc = currentSrc.endsWith('../Images/image projet/drone.png');
    
                // Change l'image pour basculer entre les deux images
                image.setAttribute('src', newSrc);
            });
        });
    });
}

function main(){
    fleche();
    changement_image();
}

main();