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
function main(){
    fleche();
    changement_image();
}

main();