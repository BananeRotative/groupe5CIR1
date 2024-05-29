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

function activerChangementImage() {
    let projectImages = document.querySelectorAll('.project-image');

    projectImages.forEach(image => {
        // Définir les images alternatives
        image.alternativeImage = image.src.slice(0, -5) + "2" + image.src.slice(-4);
        
        // Ajouter un événement de clic pour alterner les images
        image.addEventListener('click', () => {
            // Echanger alternative et src
            let temp = image.src;
            image.src = image.alternativeImage;
            image.alternativeImage = temp;
        });
    });
}

function main(){
    fleche();
    activerChangementImage();
}

main();