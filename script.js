// ============================================================
// Teranga Sneakers - principe de l'application
// L'utilisateur voit un catalogue de sneakers (données statiques
// dans le tableau "sneakers" ci-dessous). Il peut filtrer par
// marque en cliquant sur un bouton, choisir une pointure, puis
// ajouter une paire à son panier. Le panier et le total se
// mettent à jour automatiquement, sans recharger la page.
// ============================================================

// Données statiques : un tableau d'objets, chaque objet = une paire
const sneakers = [
  { id: 1, marque: "Nike", nom: "Air Force 1 Blanche", categorie: "lifestyle", prix: 12000, image: "images/af1-blanche.jpg" },
  { id: 2, marque: "Nike", nom: "Air Force 1 Noire", categorie: "lifestyle", prix: 12500, image: "images/af1-noire.jpg" },
  { id: 3, marque: "Nike", nom: "Dunk Low Panda", categorie: "lifestyle", prix: 14000, image: "images/dunk-panda.jpg" },
  { id: 4, marque: "Nike", nom: "Air Max 90", categorie: "running", prix: 11500, image: "images/airmax-90.jpg" },
  { id: 5, marque: "Jordan", nom: "Air Jordan 1 Mid", categorie: "basketball", prix: 15000, image: "images/jordan1-mid.jpg" },
  { id: 6, marque: "Jordan", nom: "Air Jordan 1 High", categorie: "basketball", prix: 17000, image: "images/jordan1-high.jpg" },
  { id: 7, marque: "Jordan", nom: "Air Jordan 4", categorie: "basketball", prix: 19000, image: "images/jordan4.jpg" },
  { id: 8, marque: "New Balance", nom: "550", categorie: "lifestyle", prix: 11000, image: "images/nb550.jpg" },
  { id: 9, marque: "New Balance", nom: "574", categorie: "retro", prix: 9500, image: "images/nb574.jpg" },
  { id: 10, marque: "Asics", nom: "Gel-Kayano 14", categorie: "retro", prix: 10000, image: "images/gelkayano14.jpg" },
  { id: 11, marque: "Asics", nom: "Gel-1130", categorie: "lifestyle", prix: 9000, image: "images/gel1130.jpg" },
  { id: 12, marque: "Adidas", nom: "Samba OG", categorie: "lifestyle", prix: 8500, image: "images/samba.jpg" },
  { id: 13, marque: "Adidas", nom: "Gazelle", categorie: "retro", prix: 9000, image: "images/gazelle.jpg" },
  { id: 14, marque: "Vans", nom: "Old Skool", categorie: "lifestyle", prix: 7500, image: "images/vans-oldskool.jpg" },
  { id: 15, marque: "Vans", nom: "Sk8-Hi", categorie: "retro", prix: 8000, image: "images/vans-sk8hi.jpg" },
];

// Le panier : un tableau qui va contenir les articles ajoutés
let panier = [];
let marqueChoisie = "toutes";

// On récupère les éléments HTML une fois, au début
const catalogue = document.getElementById("catalogue");
const listePanier = document.getElementById("liste-panier");
const panierVideTexte = document.getElementById("panier-vide");
const totalTexte = document.getElementById("total");
const boutonVider = document.getElementById("vider-panier");
const boutonsFiltre = document.querySelectorAll(".filtre-btn");

// Affiche les cartes du catalogue selon la marque choisie
function afficherCatalogue() {
  catalogue.innerHTML = ""; // on vide le catalogue avant de le redessiner

  // Boucle for classique : on parcourt tout le tableau sneakers
  for (let i = 0; i < sneakers.length; i++) {
    const paire = sneakers[i];

    // Condition : si "toutes" est choisi, on affiche tout,
    // sinon seulement les paires de la marque sélectionnée
    if (marqueChoisie === "toutes" || paire.marque === marqueChoisie) {
      const carte = document.createElement("div");
      carte.className = "carte";
      carte.innerHTML = `
        <img src="${paire.image}" alt="${paire.marque} ${paire.nom}" onerror="this.src='';this.alt='Photo à venir';this.style.backgroundColor='#ccc';">
        <div class="infos">
          <p class="marque">${paire.marque}</p>
          <h3>${paire.nom}</h3>
          <div class="ligne-action">
            <select id="pointure-${paire.id}">
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
              <option value="44">44</option>
              <option value="45">45</option>
            </select>
            <span class="prix">${paire.prix.toLocaleString("fr-FR")} CFA</span>
            <button class="ajouter-btn" data-id="${paire.id}">Ajouter au panier</button>
          </div>
        </div>
      `;
      catalogue.appendChild(carte);
    }
  }

  // On attache un événement clic à chaque bouton "Ajouter au panier"
  const boutonsAjouter = document.querySelectorAll(".ajouter-btn");
  boutonsAjouter.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      const id = Number(bouton.dataset.id);
      const pointureChoisie = document.getElementById("pointure-" + id).value;
      ajouterAuPanier(id, pointureChoisie);
    });
  });
}

// Ajoute une paire (avec sa pointure) au panier
function ajouterAuPanier(id, pointure) {
  const paire = sneakers.find(function (s) {
    return s.id === id;
  });

  panier.push({
    nom: paire.marque + " " + paire.nom,
    prix: paire.prix,
    pointure: pointure,
  });

  afficherPanier();
}

// Retire un article du panier grâce à son index dans le tableau
function retirerDuPanier(index) {
  panier.splice(index, 1);
  afficherPanier();
}

// Réaffiche le panier + recalcule le total
function afficherPanier() {
  listePanier.innerHTML = "";

  if (panier.length === 0) {
    panierVideTexte.style.display = "block";
  } else {
    panierVideTexte.style.display = "none";
  }

  // Boucle forEach pour construire chaque ligne du panier
  panier.forEach(function (article, index) {
    const ligne = document.createElement("li");
    ligne.innerHTML = `
      <span>${article.nom} (P.${article.pointure})</span>
      <span>${article.prix.toLocaleString("fr-FR")} CFA <button data-index="${index}">✕</button></span>
    `;
    listePanier.appendChild(ligne);
  });

  // On attache un événement à chaque bouton de suppression
  const boutonsSupprimer = listePanier.querySelectorAll("button");
  boutonsSupprimer.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      retirerDuPanier(Number(bouton.dataset.index));
    });
  });

  // Calcul du total avec une boucle for
  let total = 0;
  for (let i = 0; i < panier.length; i++) {
    total = total + panier[i].prix;
  }
  totalTexte.textContent = total.toLocaleString("fr-FR") + " CFA";
}

// Gestion des clics sur les boutons de filtre par marque
boutonsFiltre.forEach(function (bouton) {
  bouton.addEventListener("click", function () {
    // On enlève la classe "actif" du bouton précédent
    document.querySelector(".filtre-btn.actif").classList.remove("actif");
    // On l'ajoute au bouton qu'on vient de cliquer
    bouton.classList.add("actif");

    marqueChoisie = bouton.dataset.marque;
    afficherCatalogue();
  });
});

// Bouton pour vider tout le panier
boutonVider.addEventListener("click", function () {
  panier = [];
  afficherPanier();
});

// Affichage initial au chargement de la page
afficherCatalogue();
afficherPanier();