// Travail avec Loris => (longueur à det. = nb cartes -1)*40
//	console.log("dans la TL",tabCartesDanslaTimeline)

// let hauteur = window.innerHeight/1.2 ou 600 ?
let hauteur = 600
let largeur = hauteur*1.85
// élargir avec easter egg des formats => 1.37 puis 
// en 1.66, 1,85 , et enfin 2,35 voir 2,55
let score = 0
let hauteurTimeline = 220
let largeurTimeline = largeur-60
let curDraggin = null
let positionDeckX = largeur*0.8
let compteurDeCartesDansLaTimeline = 0
let tabAleatoire = []
let tabCartes = []
let tabCartesDanslaTimeline = []
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
	// autres
	loadSprite("card back", "/sprites/autres/card-back.png")
	// affiches
	loadSprite("Broken Blossoms", "/sprites/affiches/Broken_blossoms_poster200.png")
	loadSprite("Les Quatre Cents Coups", "/sprites/affiches/Quatre_coups.jpg")
	loadSprite("A bout de souffle", "/sprites/affiches/a-bout-de-souffle-godard.jpg")
	loadSprite("L'arroseur arrosé", "sprites/affiches/arroseurArrose1895.jpg")
	loadSprite("Le Voyage dans la Lune","sprites/affiches/lune1902.jpg")
	loadSprite("The Great Train Robbery","sprites/affiches/robbery1903.jpg")
	loadSprite("L'Assassinat du Duc de Guise", "sprites/affiches/ducDeGuise1908.jpg")
	loadSprite("The Lonedale Operator","sprites/affiches/lonedaleOperator1911 (1).jpg")
	loadSprite("The Birth of a Nation","sprites/affiches/birthOfANation1915 (1).jpg")
	loadSprite("Work","sprites/affiches/work1915 (1).jpg")
	loadSprite("Intolerance","sprites/affiches/intolerance_1916 (1) (1).jpg")
	loadSprite("Shoulder Arms","sprites/affiches/shoulderArms1918.png")
	loadSprite("Foolish Wives","sprites/affiches/foolishWifes1922.jpg")
	loadSprite("Nosferatu","sprites/affiches/nosferatu1922.jpg")
	loadSprite("A Woman of Paris","sprites/affiches/womanOfParis1923.jpg")
	loadSprite("Coeur fidèle","sprites/affiches/coeurFidel1923.jpg")
	loadSprite("La Roue","sprites/affiches/laRoue1923.jpg")
	loadSprite("Der Letzte Mann","sprites/affiches/letzteMan1924.png")
	loadSprite("Les Aventures extraordinaires de Mister West au pays des bolcheviks","sprites/affiches/bolcheviks1924.jpg")
	loadSprite("L'Inhumaine","sprites/affiches/inhumaine1924.jpg")
	loadSprite("Sherlock Jr.","sprites/affiches/sherlockJr1924.jpg")
	loadSprite("La Grève","sprites/affiches/greve1925.jpg")
	loadSprite("La Glace à trois faces","sprites/affiches/glaceTroisFaces1927.jpg")
	loadSprite("Metropolis","sprites/affiches/metropolis1927.jpg")
	loadSprite("Blackmail","sprites/affiches/blackmail1929.jpg")
	loadSprite("L'Homme à la caméra","sprites/affiches/hommeCamera1929.jpg")
	loadSprite("Tagebuch einer Verlorenen","sprites/affiches/tagebuch1929.jpg")
	loadSprite("Sous les toits de Paris","sprites/affiches/toitsDeParis1930.jpg")
	loadSprite("A nous la liberté !","sprites/affiches/aNousLaLiberte1931.jpg")
	loadSprite("Scarface","sprites/affiches/scarface1932.jpg")
	loadSprite("Les Temps modernes","sprites/affiches/modernTimes1936.jpg")
	loadSprite("Gueule d'amour","sprites/affiches/gueuleDAmour1937 (1) (1).jpg")
	loadSprite("La Bête humaine","sprites/affiches/beteHumaine1938.jpg")
	loadSprite("Le Dernier tournant","sprites/affiches/dernierTournant1939.jpg")
	loadSprite("Le Jour se lève","sprites/affiches/jourSeLeve1939.jpg")
	loadSprite("Douce","sprites/affiches/douce1943.jpg")
	loadSprite("Double Indemnity","sprites/affiches/doubleIndemnity1944.jpg")
	loadSprite("Spellbound","sprites/affiches/Spellbound_original (1).jpg")
	loadSprite("Les Enfants du Paradis","sprites/affiches/vignette_les-enfants-du-paradis (1).jpg")
	loadSprite("The Postman Always Rings Twice","sprites/affiches/PostmanAlwaysPoster1946 (1).jpg")
	loadSprite("Dark Passage","sprites/affiches/Dark_Passage_(film)_poster (1).jpg")
	loadSprite("La terra trema","sprites/affiches/Terratremaposter (1).jpg")
	loadSprite("Printemps tardif","sprites/affiches/printempsTardif (1).jpg")
	loadSprite("Une si jolie petite plage","sprites/affiches/Petiteplage1949 (1).jpg")
	loadSprite("Umberto D.","sprites/affiches/UmbertoD (1).jpg")
	loadSprite("Les Contes de la lune vague après la pluie","sprites/affiches/contesDeLaLuneVague (1).jpg")
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

console.log("curDraggin", curDraggin)

			if(compteurDeCartesDansLaTimeline == 0){
				curDraggin.pos.y = 468;
				curDraggin.pos.x = largeur/2;
				tabCartesDanslaTimeline.push(curDraggin)
			}
			else{
			if(compteurDeCartesDansLaTimeline == 1){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) +(i*150);
					}

				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}

				}
				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 2){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 3){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 4){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 5){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 6){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = 468;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
					}
				}

				else{gameOver()}
			}
		}
		console.log("tab trié : ",tabCartesDanslaTimeline)
		tirerUneCarte();
		score++;
		compteurDeCartesDansLaTimeline++
		curDraggin.class = "set"

}
		else{curDraggin.pos.y = 200; curDraggin.pos.x = positionDeckX}			

	}
		setCursor("pointer")
		curDraggin = null

})


function gameOver () {
	console.log("gameOVer")
	score-=11;
	shake(60)
	tabCartesDanslaTimeline.push(curDraggin)
	tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
	curDraggin.pos.y = 468;
	for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
		tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75) + (i*150);
	}
}

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
	NouvelleCarte.annee = derniereCartePiochee.annee
	tabCartes.push(NouvelleCarte)
    return derniereCartePiochee;
}
tirerUneCarte()



const timeline = add([
    pos(largeur*0.5, hauteur*0.78),
    rect(largeurTimeline, hauteurTimeline),
    outline(4),
	z(0),
    color(255,140,0),
    anchor("center"),
    "timeline",
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
