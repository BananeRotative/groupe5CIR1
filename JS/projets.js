function fleche(){
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
        var scrollToTopBtn = document.getElementById("scrollToTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    
    // Lorsque l'utilisateur clique sur le bouton, faire défiler la page vers le haut
    document.getElementById("scrollToTopBtn").onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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