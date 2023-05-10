// Travail avec Loris => (longueur à det. = nb cartes -1)*40

// let hauteur = window.innerHeight/1.2 ou 600 ?
let hauteur = 600
let largeur = hauteur*1.37
// élargir avec easter egg des formats => 1.37 puis 
// en 1.66, 1,85 , et enfin 2,35 voir 2,55
let score = 0
let hauteurTimeline = 220
let largeurTimeline = largeur-100
let curDraggin = null
let positionDeckX = largeur*0.8
let compteurDeCartesDansLaTimeline = 0
let tabAleatoire = []
let tabCartes = []
// Création d'une variable conservant le nombre de carte piochée, autrement
//dit, la position actuelle dans "tabAleatoire".
let compteurDeCartesPiochees = 0

d3.csv('films.csv',function(d){
    return {
               nom : d.nomDuFilm,
               annee : +d.annee,
               realisateur : d.realisateur,
               
            }
}).then(donnees =>{

kaboom({
    background: [114, 75, 21],
    width: largeur,
    height: hauteur,
    canvas: document.querySelector("#monCanvas"),
})
function chargerLesSprites(){
	loadSprite("Broken Blossoms", "/sprites/affiches/Broken_blossoms_poster200.png")
	loadSprite("Les Quatre Cents Coups", "/sprites/affiches/Quatre_coups.jpg")
	loadSprite("card back", "/sprites/card-back.png")
	//loadSprite("wood", "/sprites/wood.jpg")
	loadSprite("A bout de souffle", "/sprites/affiches/a-bout-de-souffle-godard.jpg")
}
chargerLesSprites()


function drag() {
	// The displacement between object pos and mouse pos
	let offset = vec2(0)
	return {
		// Name of the component
		id: "drag",
		// This component requires the "pos" and "area" component to work
		require: [ "pos", "area", ],
		// "add" is a lifecycle method gets called when the obj is added to scene
		add() {
			// TODO: these need to be checked in reverse order
			// "this" in all methods refer to the obj
			this.onClick(() => {
				if (curDraggin) {
					return}
				curDraggin = this
				offset = mousePos().sub(this.pos)
				
		})
		},
		// "update" is a lifecycle method gets called every frame the obj is in scene
		update() {
			if (curDraggin === this && curDraggin.class !== "set") {
				setCursor("grabbing")
				this.pos = mousePos().sub(offset)
			}
		},
	}

}

// drop
onMouseRelease(() => {
	// si quelque chose est en train d'être déplacé, la classe set est données aux cartes posées dans la timeline
	if(curDraggin && curDraggin.class !== "set"){
// et si la pos en Y est dans la timeline
		if(curDraggin.pos.y > 350){
			//if(curDraggin.pos.x < largeur/2 && curDraggin){
			curDraggin.pos.y = 468;
			curDraggin.pos.x = (largeurTimeline+curDraggin.width)/2;
			tirerUneCarte();
			score++;
			curDraggin.class = "set"
			console.log(curDraggin)
		}
		//else(){score-=10}

		else{curDraggin.pos.y = 200; curDraggin.pos.x = positionDeckX}			
	
	}
		setCursor("pointer")
		curDraggin = null
		console.log(tabCartes)
		console.log("lachée")
	//tabCartes[0].pos.y =100
})




// Création d'un tableau de longueur "donnee.length" qui contient 
// un arrangement (donc sans répétition) des nombres allant de 0 à donnee.length.
function genererTabAleatoire (max){	
	while(tabAleatoire.length<max){
		let unNombreAleatoire = Math.floor(Math.random()*max)
		if(tabAleatoire.includes(unNombreAleatoire)){}
		else{tabAleatoire.push(unNombreAleatoire)}
	}
}
genererTabAleatoire(donnees.length)




// Création d'une fonction "piochant" une carte parmis les donnees
function tirerUneCarte(){
	let indexActuelDansTabAleatoire = tabAleatoire[compteurDeCartesPiochees]
	let derniereCartePiochee = donnees[indexActuelDansTabAleatoire]
	compteurDeCartesPiochees++
	
	let NouvelleCarte = add([
		sprite(`${derniereCartePiochee.nom}`),
		pos(positionDeckX,200),
		area(),
		anchor("center"),
		z(2),
		drag()
	])
	tabCartes.push(NouvelleCarte)
    return derniereCartePiochee;
}
tirerUneCarte()
//const result = getRandomItem();
//console.log(result);



const timeline = add([
    pos(largeur*0.5, hauteur*0.78),
    rect(largeurTimeline, hauteurTimeline),
    outline(4),
	z(0),
    color(0, 0, 255),
    anchor("center"),
    "timeline"
]);
const scoreTexte = add([
    text("SCORE", {
        font: "arial",
    }),
    pos(20, hauteur/10),
    anchor("left"),
    z(50),
    color(255, 255, 255),
]);
const scoreNombre = add([
text(score, {
    font: "arial",
}),
pos(170, hauteur/10),
anchor("left"),
z(50),
color(77, 255, 0),
{
    update() {
        this.text = score
    }
}
]);
const deck = add([
	sprite("card back"),
	pos(positionDeckX,200),
	anchor("center"),
	scale(1.5),
	area(),
	z(1),
	"deck",
])





//fermeture de d3
})
