
  $(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      items: 4, // Nombre d'images visibles à la fois
      loop: true, // Activer le défilement infini
      autoplay: true, // Activer le défilement automatique
      autoplayTimeout: 2000, // Temps d'affichage de chaque image (en millisecondes)
      nav: true, // Afficher les flèches de navigation
      dots: true // Activer les indicateurs
    });
  });


  // Récupérer le menu et le carousel
const menuItems = document.querySelectorAll(".menu a");
const carousel = document.querySelector("#carousel");
document.addEventListener("DOMContentLoaded", () => {
      const counters = document.querySelectorAll('.counter');
      const speed = 200; // Ajustez la vitesse (plus bas = plus rapide)

      counters.forEach(counter => {
          const updateCount = () => {
              const target = +counter.getAttribute('data-target'); // Valeur cible
              const count = +counter.innerText; // Valeur actuelle
              const increment = target / speed; // Incrémentation

              if (count < target) {
                  counter.innerText = Math.ceil(count + increment);
                  setTimeout(updateCount, 10); // Rappelle la fonction
              } else {
                  counter.innerText = target; // Arrêt exact à la cible
              }
          };

          updateCount();
      });
  });
  
// Dictionnaire contenant les images pour chaque catégorie
const imagesByCategory = {
  "grand-format": [
    { src: "images/drapeaux.jpg", alt: "Grand Format 1" ,link:'grand_format.html'},
    { src: "images/banderole.jpg", alt: "Grand Format 2",link:'grand_format.html' },
    { src: "images/BANNIERE.jpeg", alt: "Petit Format 1",link:'grand_format.html' },
    { src: "images/bienvenue.PNG", alt: "Petit Format 2" ,link:'grand_format.html'},
    { src: "images/PANNEAU.PNG", alt: "Sacs 1" ,link:'grand_format.html'},
    { src: "images/drapeaux.jpg", alt: "Sacs 2",link:'grand_format.html' },
    { src: "images/banderole.jpg", alt: "Bloc Notes 1" ,link:'grand_format.html'},
    { src: "images/PANNEAU.PNG", alt: "Stickers 1",link:'grand_format.html' },
    { src: "images/BANNIERE.jpeg", alt: "Stickers 2",link:'grand_format.html' }
  ],
  "petit-format": [
    { src: "images/invitation.jpg", alt: "Petit Format 1",link:'petit_format.html' },
    { src: "images/cv.png", alt: "Petit Format 2" ,link:'petit_format.html'},
    { src: "images/calendrier.png", alt: "Petit Format 2",link:'petit_format.html' },
    { src: "images/bienvenue.PNG", alt: "Bloc Notes 2",link:'petit_format.html' },
    { src: "images/catalogue.png", alt: "Bloc Notes 2" ,link:'petit_format.html'},
    { src: "images/flyer-eco-2.jpg", alt: "Bloc Notes 2" ,link:'petit_format.html'},





  ],
 
  "bloc-notes": [
    { src: "images/images.jpg", alt: "Bloc Notes 1" ,link:'bloc_note.html'},
    { src: "images/bloc_note.jpg", alt: "Bloc Notes 1",link:'bloc_note.html' },
    { src: "images/bloc_note_bois.jpg", alt: "Bloc Notes 1",link:'bloc_note.html' },
    { src: "images/bloc_note_ecologique-removebg-preview.png", alt: "Bloc Notes 1",link:'bloc_note.html' },
    { src: "images/notepoche.jpg", alt: "Bloc Notes 1",link:'bloc_note.html'},
    { src: "images/notebook.png", alt: "Bloc Notes 1",link:'bloc_note.html' },
    { src: "images/notebookcont.jpg", alt: "Bloc Notes 1",link:'bloc_note.html' },






 
  ],
  "papier": [
    { src: "images/papier.png", alt: "Stickers 1" ,link:'papier.html' },
    { src: "images/bristol250gr.jpg", alt: "Stickers 1",link:'papier.html' },
    { src: "images/couche250gr.png", alt: "Stickers 1",link:'papier.html' },
    { src: "images/chemise-bristol.JPG", alt: "Stickers 1",link:'papier.html' },

  ]
};
// script.js
// Vous pouvez ajouter des fonctionnalités interactives ici, si nécessaire
document.querySelector('.contact-btn').addEventListener('click', () => {
    alert('Merci de nous contacter ! Nous reviendrons vers vous rapidement.');
});

// Fonction pour charger de nouvelles images dans le carousel
function updateCarousel(category) {
  // Vider le contenu existant du carousel
  carousel.innerHTML = "";

  // Ajouter les nouvelles images correspondant à la catégorie
  const images = imagesByCategory[category];
  images.forEach(image => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `<a href="${image.link}"><img src="${image.src}" alt="${image.alt}"></a>`;
    carousel.appendChild(itemDiv);
  });

  // Réinitialiser le carousel (si vous utilisez un plugin OwlCarousel, par exemple)
  if ($(".owl-carousel").data('owl.carousel')) {
    $('.owl-carousel').owlCarousel('destroy'); // Détruire l'instance précédente
    $('.owl-carousel').owlCarousel(); // Réinitialiser
  }
}

// Ajouter des écouteurs d'événements sur chaque élément du menu
menuItems.forEach(menuItem => {
  menuItem.addEventListener("click", (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    const category = menuItem.getAttribute("data-category"); // Récupérer la catégorie
    updateCarousel(category); // Mettre à jour le carousel
  });
});
