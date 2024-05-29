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
/*
function changement_image(){


document.addEventListener('DOMContentLoaded', ()=> {
    // Selectionne toutes les images de projet
        const projectImages = document.querySelectorAll('.project-image');

        projectImages.forEach(image => {
            // Définir les images alternatives
            const image1 = image.src;
            const image2 = image.src.includes('./../Images//image projet/xp.jpg');
            const image3 = image.src.includes('./..Images/image projet/seas.png');
            // Ajouter un événement de clic pour alterner les images
            image.addEventListener('click', () => {
                if (image.src === image1) {
                    image.src = image2;
                } else {
                    image.src = image1;
                }
            });
        });
    });

}
*/

function main(){
    fleche();
    //changement_image();
}

main();