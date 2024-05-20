// Définitions de plusieurs variables utilisées plusieurs fois dans le code
let largeur = window.innerWidth //hauteur*2.55 
let hauteur = largeur/2.55 //window.innerHeight*0.848
let echelleGenerale = (1/600)*hauteur
let score = 0
let highscore = 0
let curDraggin = null
let positionDeckX = largeur*0.75
let compteurDeCartesDansLaTimeline = 0
let tabAleatoire = []
let tabAleatoire2 = []
let tabAleatoire3 = []
let tabCartesDanslaTimeline = []
let valeurGameOver = false
let compteurDeCartesPiochees = 0

if(hauteur>window.innerHeight){
	alert("Aggrandissez la hauteur de votre fenêtre pour profitez d'une meilleure expérience de jeu, puis rechargez la page.")
}

d3.csv('films.csv',function(d){
    return {
               nom : d.nomDuFilm,
               annee : +d.annee,
               realisateur : d.realisateur,
			   imdb: d.imdb
               
            }
}).then(donnees =>{

kaboom({
    background: [0, 0, 0],
    width: largeur,
    height: hauteur,
    canvas: document.querySelector("#monCanvas"),
	//loadingScreen: false,

})
function chargerLesSprites(){
	//font
	loadFont("VCR","sprites/autres/VCR_OSD_MONO_1.001.ttf")
	//sons
	loadSound("sonGameOver","sounds/sonGameOver.wav")
	loadSound("sonVictoire","sounds/sonVictoire.mp3")
	// autres
	loadSprite("card back", "sprites/autres/card-back.png")
	loadSprite("reset", "sprites/autres/arrow_reset.png")
	loadSprite("twitter","sprites/autres/twitter.png")
	// affiches
	loadSprite("Hiroshima mon amour","sprites/affiches/1959_hiroshima_mon_amour_censure (1).jpg")
	loadSprite("Le mepris","sprites/affiches/1963_Le_mepris.jpg")
	loadSprite("2001 : A Space Odyssey","sprites/affiches/2001_A_Space_Odyssey_(1968) (1).png")
	loadSprite("Primary","sprites/affiches/51918-primary-0-230-0-345-crop (1).jpg")
	loadSprite("A bout de souffle","sprites/affiches/a-bout-de-souffle-godard.jpg")
	loadSprite("Charles mort ou vif","sprites/affiches/affiche-AV-charlesmortouvif-rc (1).jpg")
	loadSprite("Angst essen Seele auf","sprites/affiches/Alifeareats.jpg")
	loadSprite("A nous la liberté !","sprites/affiches/aNousLaLiberte1931.jpg")
	loadSprite("L'arroseur arrosé","sprites/affiches/arroseurArrose1895.jpg")
	loadSprite("Ascenseur pour l'échafaud","sprites/affiches/Ascenseur_echafaud (1).jpg")
	loadSprite("Cendres et diamants","sprites/affiches/Ashes-and-diamonds-polish-poster (1).jpg")
	loadSprite("Au feu les pompiers !","sprites/affiches/au_feu_les_pompiers.jpg")
	loadSprite("La Bête humaine","sprites/affiches/beteHumaine1938.jpg")
	loadSprite("Bluebeard s eighth wife","sprites/affiches/bluebeards (1).jpg")
	loadSprite("Les Aventures extraordinaires de Mister West au pays des bolcheviks","sprites/affiches/bolcheviks1924.jpg")
	loadSprite("Broken Blossoms","sprites/affiches/Broken_blossoms_poster200.png")
	loadSprite("Chronik der Anna Magdalena Bach","sprites/affiches/chronik-der-anna-magdalena-bach-french-movie-poster (1).jpg")
	loadSprite("Chronique d'un été","sprites/affiches/chroniqueDUnEte.jpg")
	loadSprite("Coeur fidèle","sprites/affiches/coeurFidel1923.jpg")
	loadSprite("Les Contes de la lune vague après la pluie","sprites/affiches/contesDeLaLuneVague (1).jpg")
	loadSprite("Les petites marguerites","sprites/affiches/Daisies1966 (1).jpg")
	loadSprite("Dark Passage","sprites/affiches/Dark_Passage_(film)_poster (1).jpg")
	loadSprite("Le Dernier tournant","sprites/affiches/dernierTournant1939.jpg")
	loadSprite("Douce","sprites/affiches/douce1943.jpg")
	loadSprite("Felix mayol","sprites/affiches/felixmayol (1).jpg")
	loadSprite("Foolish Wives","sprites/affiches/foolishWifes1922.jpg")
	loadSprite("Forbidden Planet","sprites/affiches/forbbidenPlanet (1).jpg")
	loadSprite("Gold diggers","sprites/affiches/Gold_Diggers_of_1933_(window_card_-_cropped) (1).jpg")
	loadSprite("Gueule d'amour","sprites/affiches/gueuleDAmour1937 (1) (1).jpg")
	loadSprite("L'Homme à la caméra","sprites/affiches/hommeCamera1929.jpg")
	loadSprite("India Song","sprites/affiches/India_Song.jpg")
	loadSprite("L'Inhumaine","sprites/affiches/inhumaine1924.jpg")
	loadSprite("Intolerance","sprites/affiches/intolerance_1916 (1) (1).jpg")
	loadSprite("L Invitation","sprites/affiches/Invitation-360x470 (1).jpg")
	loadSprite("Jonas qui aura 25 ans en l'an 2000","sprites/affiches/Jonah_Who_Will_Be_25_in_the_Year_2000.jpg")
	loadSprite("Le Jour se lève","sprites/affiches/jourSeLeve1939.jpg")
	loadSprite("L as de pique","sprites/affiches/l as de pique.jpg")
	loadSprite("L'avventura","sprites/affiches/L'avventuraSmall.jpg")
	loadSprite("La Nuit des femmes","sprites/affiches/la_nuit_des_femmes_affiche.jpg")
	loadSprite("La pointe courte","sprites/affiches/La_Pointe_Courte_FilmPoster (1) (2).jpg")
	loadSprite("La Roue","sprites/affiches/laRoue1923.jpg")
	loadSprite("Les parapluies de cherbourg","sprites/affiches/Les_Parapluies_de_Cherbourg (1).jpg")
	loadSprite("Les Raquetteurs","sprites/affiches/Les_raquetteurs (1).jpg")
	loadSprite("Les rendez vous d anna","sprites/affiches/Les_Rendez-vous_d'Anna_poster (1).png")
	loadSprite("Der Letzte Mann","sprites/affiches/letzteMan1924.png")
	loadSprite("The Lonedale Operator","sprites/affiches/lonedaleOperator1911 (1).jpg")
	loadSprite("Le Voyage dans la Lune","sprites/affiches/lune1902.jpg")
	loadSprite("Metropolis","sprites/affiches/metropolis1927.jpg")
	loadSprite("Les Temps modernes","sprites/affiches/modernTimes1936.jpg")
	loadSprite("Moi un noir","sprites/affiches/Moi,_un_noir_(film_poster) (1).jpg")
	loadSprite("Muriel ou le temps d un retour","sprites/affiches/muriel-ou-le-temps-d-un-retour120x160 (1).jpg")
	loadSprite("Le notti di Cabiria","sprites/affiches/Nights_of_Cabiria_Poster (1).jpg")
	loadSprite("Nosferatu","sprites/affiches/nosferatu1922.jpg")
	loadSprite("On connait la chanson","sprites/affiches/On_connait_la_chanson (1).jpg")
	loadSprite("One AM","sprites/affiches/One_A.M._poster (1).jpg")
	loadSprite("Die Ehe der Maria Braun","sprites/affiches/Original-poster-marriage-of-maria-braun.jpg")
	loadSprite("Une si jolie petite plage","sprites/affiches/Petiteplage1949 (1).jpg")
	loadSprite("Les petites fugues","sprites/affiches/petitesfugues.jpg")
	loadSprite("Phantom Lady","sprites/affiches/Phantomlady3 (1).jpg")
	loadSprite("The Postman Always Rings Twice","sprites/affiches/PostmanAlwaysPoster1946 (1).jpg")
	loadSprite("Printemps tardif","sprites/affiches/printempsTardif (1).jpg")
	loadSprite("Les Quatre Cents Coups","sprites/affiches/Quatre_coups.jpg")
	loadSprite("Rio Bravo","sprites/affiches/Rio_Bravo_(1959_poster) (1).jpg")
	loadSprite("Scarface","sprites/affiches/scarface1932.jpg")
	loadSprite("Scène de chasse en Bavière","sprites/affiches/scenesDeChasse (1) (1).jpg")
	loadSprite("Senso","sprites/affiches/Senso_Poster (1).jpg")
	loadSprite("Singin in the rain","sprites/affiches/Singin'_in_the_Rain_(1952_poster) (1).jpg")
	loadSprite("Stagecoach","sprites/affiches/Stagecoach_(1939_poster) (1).jpg")
	loadSprite("Tagebuch einer Verlorenen","sprites/affiches/tagebuch1929.jpg")
	loadSprite("La terra trema","sprites/affiches/Terratremaposter (1).jpg")
	loadSprite("The jazz singer","sprites/affiches/The_Jazz_Singer_1927_Poster (1).jpg")
	loadSprite("The lonely villa","sprites/affiches/the_lonely_villa-272690828-mmed (1).jpg")
	loadSprite("Umberto D.","sprites/affiches/UmbertoD (1).jpg")
	loadSprite("Un debris de l empire","sprites/affiches/Un debris de l empire .jpg")
	loadSprite("La naissance la vie et la mort du christ","sprites/affiches/vieduchrist.jpg")
	loadSprite("Les Enfants du Paradis","sprites/affiches/vignette_les-enfants-du-paradis (1).jpg")
	loadSprite("A Woman of Paris","sprites/affiches/womanOfParis1923.jpg")
	loadSprite("Work","sprites/affiches/work1915 (1).jpg")
	loadSprite("Yojimbo","sprites/affiches/yojimbo.jpg")
	loadSprite("The Blade","sprites/affiches/The_Blade.jpg")
	loadSprite("Touch of zen","sprites/affiches/touchofzen (1).jpg")
	loadSprite("Boat People","sprites/affiches/boatPeople (1).jpg")
	loadSprite("Fallen Angels","sprites/affiches/fallen angels.jpg")
	loadSprite("American Graffiti","sprites/affiches/American_graffiti_ver1.jpg")
	loadSprite("Who's That Knocking at My Door","sprites/affiches/whosThatKnocking.jpg")
	loadSprite("Bonnie & Clyde","sprites/affiches/bonnieClyde.jpg")
	loadSprite("Taxi Driver","sprites/affiches/Taxi_Driver_(1976_film_poster) (1).jpg")

}
chargerLesSprites()

scene("scenePrincipale", () => {


		function idleTimer() {
			var t;
			window.onmousemove = resetTimer;
			window.onmousedown = resetTimer;
			window.onclick = resetTimer;
			window.onscroll = resetTimer;
		
		
		   function retourAcceuil() {
			valeurGameOver = true
				recommencerLeJeu()
				  go("EcranAcceuil")
		   }
		
		   function resetTimer() {
				clearTimeout(t);
				t= setTimeout(retourAcceuil, 45000); 
			}
		}
		idleTimer();

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
			if (curDraggin === this && curDraggin.class !== "set" && valeurGameOver == false) {
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
		if(curDraggin.pos.y > hauteur*0.58333){

console.log("curDraggin", curDraggin)

			if(compteurDeCartesDansLaTimeline == 0){
				curDraggin.pos.y = hauteur*0.78;
				curDraggin.pos.x = largeur/2;
				tabCartesDanslaTimeline.push(curDraggin)
			}
			else{
			if(compteurDeCartesDansLaTimeline == 1){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) +(i*150*echelleGenerale);
					}

				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}

				}
				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 2){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 3){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 4){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 5){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 6){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 7){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.annee<=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 8){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.annee<=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[6].annee && curDraggin.annee<=tabCartesDanslaTimeline[7].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[6].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[7].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[7].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[7].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
				}

				else{gameOver()}
			}
			else if(compteurDeCartesDansLaTimeline == 9){
				if(curDraggin.annee>=tabCartesDanslaTimeline[0].annee && curDraggin.annee<=tabCartesDanslaTimeline[1].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[0].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[1].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[1].annee && curDraggin.annee<=tabCartesDanslaTimeline[2].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[1].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[2].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
					else if(curDraggin.annee>=tabCartesDanslaTimeline[2].annee && curDraggin.annee<=tabCartesDanslaTimeline[3].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[2].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[3].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[3].annee && curDraggin.annee<=tabCartesDanslaTimeline[4].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[3].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[4].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[4].annee && curDraggin.annee<=tabCartesDanslaTimeline[5].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[4].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[5].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[5].annee && curDraggin.annee<=tabCartesDanslaTimeline[6].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[5].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[6].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[6].annee && curDraggin.annee<=tabCartesDanslaTimeline[7].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[6].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[7].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[7].annee && curDraggin.annee<=tabCartesDanslaTimeline[8].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[7].pos.x && curDraggin.pos.x<=tabCartesDanslaTimeline[8].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee<=tabCartesDanslaTimeline[0].annee && curDraggin.pos.x<=tabCartesDanslaTimeline[0].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}
				else if(curDraggin.annee>=tabCartesDanslaTimeline[8].annee && curDraggin.pos.x>=tabCartesDanslaTimeline[8].pos.x){
					tabCartesDanslaTimeline.push(curDraggin)
					tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
					curDraggin.pos.y = hauteur*0.78;
					for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
						tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
					}
					timelinePleine()
				}

				else{gameOver()}
			}
	}
		console.log("tab trié : ",tabCartesDanslaTimeline)
		tirerUneCarte();
		score++;
		compteurDeCartesDansLaTimeline++
		curDraggin.class = "set"
		tutoriel()


}
		else{curDraggin.pos.y = hauteur/3; curDraggin.pos.x = positionDeckX}			

	}
		setCursor("pointer")
		curDraggin = null

})


function gameOver () {
	play("sonGameOver",{ volume : 0.1})
	if (score>highscore){
		highscore = score
		setData("highscore", highscore)
	}
	score--;
	shake(60)
	tabCartesDanslaTimeline.push(curDraggin)
	tabCartesDanslaTimeline.sort((a, b) => a.annee - b.annee)
	curDraggin.pos.y = hauteur*0.78;
	for(let i = 0; i<=compteurDeCartesDansLaTimeline; i++){
		tabCartesDanslaTimeline[i].pos.x = (largeur/2) -(compteurDeCartesDansLaTimeline*75*echelleGenerale) + (i*150*echelleGenerale);
	}
	afficherDates()
	valeurGameOver = true
	const cercleReset = add([
		pos(largeur-(largeur*0.0457),hauteur/9),
		circle(echelleGenerale*50),
		z(5),
		color(255,255,255),
		anchor("center"),
		"cercleReset",
]);
const texteGameOver = add([
	text("Appuyez sur reset pour recommencer", {
		font: "VCR",
		size : echelleGenerale*28,
	}),
	pos(largeur/2, hauteur*0.375),
	anchor("center"),
	z(50),
	color(255, 255, 255),
	"texteGameOver"
]);}

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

function genererTabAleatoire2 (max){	
	while(tabAleatoire2.length<max){
		let unNombreAleatoire = Math.floor(Math.random()*max)
		if(tabAleatoire2.includes(unNombreAleatoire)){}
		else{tabAleatoire2.push(unNombreAleatoire)}
	}
}
genererTabAleatoire2(donnees.length)


tabAleatoire3.push(tabAleatoire.concat(tabAleatoire2))

function recommencerLeJeu() {
if(valeurGameOver==true){

	for (let i = 0; i<tabCartesDanslaTimeline.length; i++){
		destroy(tabCartesDanslaTimeline[i])
	}
	while (tabCartesDanslaTimeline.length > 0) {
	  tabCartesDanslaTimeline.pop();
	}
	compteurDeCartesDansLaTimeline = 0
	score = 0
	destroyAll("datesOnScreen")
	valeurGameOver = false
	destroyAll("texte0")
	destroyAll("texte1")
	destroyAll("texte2")
	destroyAll("texte3")
	destroyAll("cercleReset")
	destroyAll("texteGameOver")
	tutoriel()
  }
}

  function timelinePleine() {
	play("sonVictoire",{ volume : 0.4})
		for (i = 0; i < tabCartesDanslaTimeline.length; i++) {
			if (i != 4) {
				destroy(tabCartesDanslaTimeline[i])
			}
		}
// garde l'élément tabCartesDanslaTimeline[4]
	tabCartesDanslaTimeline.pop()
	while (tabCartesDanslaTimeline.length > 1) {
	  tabCartesDanslaTimeline.pop();
	  tabCartesDanslaTimeline.shift();
	}
	tabCartesDanslaTimeline[0].pos.y = hauteur*0.78
	tabCartesDanslaTimeline[0].pos.x = largeur/2
	compteurDeCartesDansLaTimeline = 0
}


// Création d'une fonction "piochant" une carte parmis les donnees
function tirerUneCarte(){
	let indexActuelDansTabAleatoire = tabAleatoire[compteurDeCartesPiochees]
	let derniereCartePiochee = donnees[indexActuelDansTabAleatoire]
	compteurDeCartesPiochees++
	
	let NouvelleCarte = add([
		sprite(`${derniereCartePiochee.nom}`),
		pos(positionDeckX,hauteur/3),
		area(),
		anchor("center"),
		z(2),
		drag(),
		scale(echelleGenerale),
		// les sprite font 200px*137px
		"NouvelleCarte",
	])
	NouvelleCarte.onClick(() => {
		if (valeurGameOver) {
			window.open(`${derniereCartePiochee.imdb}`, '_blank')
		}
	})
	NouvelleCarte.annee = derniereCartePiochee.annee
    return derniereCartePiochee;
}
tirerUneCarte()

function afficherDates(){
	for(let i =0; i<tabCartesDanslaTimeline.length;i++){
	let datesOnScreen = add([
		text(tabCartesDanslaTimeline[i].annee, {
			font: "VCR",
			size : echelleGenerale*28,
		}),
		pos(tabCartesDanslaTimeline[i].pos.x, hauteur*0.55833),
		anchor("center"),
		z(50),
		color(255, 255, 255),
		"datesOnScreen"
	]);
}
}

function tutoriel(){
	if(valeurGameOver == false){
		if(score==0){
		const texte0 = add([
			text("Glissez l'affiche dans la frise chronologique", {
				font: "VCR",
				size : echelleGenerale*28,
			}),
			pos(largeur/2.3, hauteur*0.375),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte0"
		]);
}
	else if(score==1){
		destroyAll("texte0")
		const texte1 = add([
			text("<= Plus vieux ? ou plus récent ? =>", {
				font: "VCR",
				size : echelleGenerale*28,
			}),
			pos(largeur/2, hauteur*0.375),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte1"
		]);
	}
	else if(score==2){
		destroyAll("texte1")
		const texte2 = add([
			text("Bravo ! Et maintenant ?", {
				font: "VCR",
				size : echelleGenerale*28,
			}),
			pos(largeur/2, hauteur*0.375),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte2"
		]);
	}
	else if(score==10){
		const texte3 = add([
			text("Jusqu'où peux-tu aller ?", {
				font: "VCR",
				size : echelleGenerale*28,
			}),
			pos(largeur/2, hauteur*0.375),
			anchor("center"),
			z(50),
			color(255, 255, 255),
			"texte3"
		]);
	}
	else{
		destroyAll("texte2")
		destroyAll("texte3")
	}
}
else{
	destroyAll("texte0")
	destroyAll("texte1")
	destroyAll("texte2")
	destroyAll("texte3")
}
}
tutoriel()




const timeline = add([
    pos(largeur*0.5, hauteur*0.78),
    rect(1500, 220),
    outline(echelleGenerale*4, WHITE),
	z(0),
    color(214,23,23),
    anchor("center"),
	scale(echelleGenerale),
    "timeline",
]);
const scoreTexte = add([
    text("SCORE", {
        font: "VCR",
		size : echelleGenerale*36
    }),
    pos(largeur*0.01307, hauteur/10),
    anchor("left"),
    z(50),
    color(255, 255, 255),
]);
const scoreNombre = add([
text(score, {
    font: "VCR",
	size : echelleGenerale*36
}),
pos(largeur*0.09804, hauteur/10),
anchor("left"),
z(50),
color(255,215,0),
{
    update() {
        this.text = score
    }
}
]);
const highscoreTexte = add([
    text("HIGHSCORE", {
        font: "VCR",
		size : echelleGenerale*20
    }),
    pos(largeur*0.01307, hauteur/10 + hauteur*0.05),
    anchor("left"),
    z(50),
    color(255, 255, 255),
]);
const highscoreNombre = add([
text(highscore, {
    font: "VCR",
	size : echelleGenerale*20
}),
pos(largeur*0.09804, hauteur/10 + hauteur*0.05),
anchor("left"),
z(50),
color(255,215,0),
{
    update() {
        this.text = getData("highscore")
    }
}
]);
const deck = add([
	sprite("card back"),
	pos(positionDeckX,hauteur/3),
	anchor("center"),
	scale(echelleGenerale*1.5),
	area(),
	z(1),
	"deck",
])
const reset = add([
	sprite("reset"),
	color(0, 65, 255),
	pos(largeur-(largeur*0.0457),hauteur/9),
	anchor("center"),
	scale(echelleGenerale*0.15),
	area(),
	z(10),
	"reset",
])
onClick("reset", (reset) => recommencerLeJeu())
})

scene("EcranAcceuil", () => {

	let texteAcceuil = add([
		text("Commencer le jeu", {
			font: "VCR",
			size : echelleGenerale*40
		}),
		pos(largeur/2, hauteur*0.65),
		anchor("center"),
		z(50),
		area(),
		color(255, 255, 255),
		"texteAcceuil"
	]);
	let titreJeu = add([
		text("Chronociné", {
			font: "VCR",
			size : echelleGenerale*100
		}),
		pos(largeur/2, hauteur*0.3),
		anchor("center"),
		z(50),
		area(),
		color(255, 255, 255),
		"titreJeu"
	]);
	let texteVersion = add([
		text("Version : Année 2023 - 2024", {
			font: "VCR",
			size : echelleGenerale*20
		}),
		pos(largeur*0.1176, hauteur - hauteur*0.05),
		anchor("center"),
		z(50),
		area(),
		color(255, 255, 255),
		"texteVersion"
	]);
	let texteAuteur = add([
		text("Créé par Théo Rochat", {
			font: "VCR",
			size : echelleGenerale*20
		}),
		pos(largeur - largeur*0.1111, hauteur - hauteur*0.05),
		anchor("center"),
		z(50),
		area(),
		color(255, 255, 255),
		"texteAuteur"
	]);
	onClick("texteAuteur", () => window.open("https://twitter.com/RochatTheo", '_blank'))
	onClick("texteAcceuil", () => go("scenePrincipale"))
	let rectTexteAcceuil = add([
		pos(largeur/2, hauteur*0.65),
		rect(largeur*0.26144, hauteur*0.21666),
		outline(echelleGenerale*4, WHITE),
		z(0),
		area(),
		color(214,23,23),
		anchor("center"),
		"rectTexteAcceuil",
	]);
	onClick("rectTexteAcceuil", () => go("scenePrincipale"))

	let twitterButton = add([
		sprite("twitter"),
		scale(echelleGenerale*0.2),
		pos(largeur-(largeur*0.0196), hauteur - hauteur*0.04666),
		area(),
		anchor("center"),
		z(2),
		"twitterButton",
	])
	onClick("twitterButton", () => window.open("https://twitter.com/RochatTheo", '_blank'))
	let texteAdditionel = add([
		text("Testez vos connaissances en Histoire du Cinéma !", {
			font: "VCR",
			size : echelleGenerale*17
		}),
		pos(largeur/2, hauteur*0.3 + hauteur*0.11666),
		anchor("center"),
		z(51),
		
		area(),
		color(255, 215, 0),
		"texteAuteur"
	]);
})

go("EcranAcceuil");




//fermeture de d3
})

