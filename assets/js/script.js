// Création du dictionnaire
let dicoMot = [ "circle", "noise", "cool", "puddle", "biceps", "glider", "fish", "gladiator", "work", "family", "falsify", "massage", "plant", "draw", "spaghetti", "devices", "affair", "leaf", "aluminium", "battery", "atrocity", "caterpillar", "pen", "sauna", "leaf", "unexpected", "venice", "sandwich", "magazines", "sawing", "ornament", "kit", "spoon", "macaroni", "denmark", "passage", "tomato"
]

// Initialisation des variables
let reponse = '';
let erreurMax = 8;
let erreur = 0;
let arr = [];
let mot = null;

// Fonction permettant de choisir un mot aléatoire dans le dictionnaire
let motAlea = () => {
  reponse = dicoMot[Math.round(Math.random() * dicoMot.length)];
}


// Fonction permettant de générer les touches du claviers virtuel
let clavier = () => {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn"
        id='` + letter + `'
        onClick="jeu('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('clavier').innerHTML = buttonsHTML;
}

// Fonction adaptant le jeu dans le cas où la lettre choisie est correcte ou non
let jeu = (lettreJouee) => {
  arr.indexOf(lettreJouee) === -1 ? arr.push(lettreJouee) : null;
  document.getElementById(lettreJouee).setAttribute('disabled', true); //empâche de recliquer sur la lettre
  if (reponse.indexOf(lettreJouee) >= 0) {
    //ajout de la lettre + message si le joueur gagne
    tiretMot();
    jeuGagne();
  } else if (reponse.indexOf(lettreJouee) === -1) {
    erreur++;
    //enlève une vie, ajoute un élément au dessin et affiche un message si le joueur perd 
    erreurs();
    jeuPerdu();
    pendu();
  }
}

/////// INITIALISATION DU JEU APRES CHOIX ALEATOIRE DU MOT
// Fonction permettant d'afficher les tirets en fonction du nombre de lettre dans le mot choisi
let tiretMot = () => {
  mot = reponse.split('').map(letter => (arr.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('messageInfo').innerHTML = mot;
}

document.getElementById('erreurMax').innerHTML = erreurMax;

motAlea();
clavier();
tiretMot();

//////CODE DANS LE CAS OU ON GAGNE
// Fonction générant un message dans le cas où on gagne
let jeuGagne = () => {
  if (mot === reponse) {
    alert("Well done!")
  }
}

//////CODE DANS LE CAS OU ON PERD
// Fonction permettant de changer l'image du pendu si on se trompe
let pendu = () => {
  document.getElementById('pendu').src = 'assets/img/' + erreur + '.png';
}

// Fonction mettant à jour le nombre d'erreur
let erreurs = () => {
  document.getElementById('erreur').innerHTML = erreur;
}

// Fonction générant un message dans le cas où on perd
let jeuPerdu = () => {
  if (erreur === erreurMax) {
    alert("Oops, it's lose!")
    document.getElementById('messageInfo').innerHTML = 'The answer was : ' + reponse;
  }
}

///// CAS OU LE JOUEUR VEUT REJOUER
// Fonction permettant de recommencer le jeu 
let reset = () => {
  erreur = 0;
  arr = [];
  document.getElementById('pendu').src = 'assets/img/0.png';

  motAlea();
  tiretMot();
  erreurs();
  clavier();
}