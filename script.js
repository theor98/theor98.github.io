d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  }; 

d3.csv('51_csv_final.csv',function(d){
    return {
               nom : d.nom,
               genre : d.genre,
               canton : d.canton,
               groupe_parlementaire : d.groupe_parlementaire,
               vote : +d.vote,
               parti : d.parti,
               multiplicateur : +d.multiplicateur,

            }
}).then(donnees =>{
console.log(donnees)

// création d'un espace SVG
const canevas1 = d3.select("body")
    .append("svg")
    .attr("width", 1510)
    .attr("height", 699)

canevas1.selectAll('line')
    .data([1,1,1,1,1,1,46,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91])
    .enter()
    .append('line')
        .attr('x1', 160)
        .attr('y1', (d,i) => d + 24 + i * 20)
        .attr('x2', 1480)
        .attr('y2', (d,i) => d + 24 + i * 20)
        .attr('stroke', 'grey')
        .style("stroke-dasharray", ("5, 3"))
       

// attribution d'une couleur de remplissage en fonction du groupe parlementaire
function couleurGroupe(d){
    if(d.groupe_parlementaire === 'G'){return '#01DF01'}
    else if(d.groupe_parlementaire === 'RL'){return '#10F3E2'}
    else if(d.groupe_parlementaire === 'S'){return '#FF0000'}
    else if(d.groupe_parlementaire === 'M-E'){return '#FE9A2E'}
    else if(d.groupe_parlementaire === 'GL'){return "#004EFF"} 
    else if(d.groupe_parlementaire === 'V'){return "#088A4B"}
}    
// attribution d'une couleur de pourtour en fonction du genre
function couleurGenre(d){
    if(d.genre === 'Femme'){return '#df00cf'}
    else if(d.genre === 'Homme'){return '#531002'}
}
// bouton pour réinitialiser les l'affichage

// construction d'une échelle sur l'axe X, Y étant pour le classement par canton
const echelleDesX = d3.scaleLinear()
    .domain([0,700])
    .range([160,1490])

// enlève le rectangle sous le texte ainsi que le texte quand la souris quitte un point puis réajoute la légende
const mouseout = function(event,d) {
    d3.select(this)
    .attr("r",5)
    d3.selectAll("text")
    .remove()
    d3.selectAll("rect")        
    .remove()
    canevas1.append(legendeTexte)
}
// création d'un cercle par parlementaire
canevas1.selectAll('circle')
    .data(donnees)
    .enter()
    .append('circle')
        .attr('cx', d => echelleDesX(+d.vote*+d.multiplicateur))
        .attr("cy", d => langueCantons(d))
        .attr('r',5)
        .attr("stroke-width",1.5)
        .attr('fill', d => couleurGroupe(d)) 
        .attr('stroke', d => couleurGenre(d)) 
        .on("mouseleave", mouseout)
        .on("mouseover",function mouseover(event,d){
// Déplacer le cercle survoler au premier plan pour faciliter la "lecture"
        let frontOnMouseOver = d3.select(this)
        frontOnMouseOver.moveToFront()
        .attr("r",6)
// Ajout d'un rectangle blanc sous le texte de l'infobulle pour en faciliter la lecture
        canevas1.append("rect")
            .attr('x',event.pageX - infobulleX(this) + 5)
            .attr('y', event.pageY - 30)
            .attr('width', 265)
            .attr('height', 80)
            .attr('stroke', 'black')
            .attr('fill', 'white')
// Ajout du texte de l'infobulle
        canevas1.append('text')
            .attr('x', event.pageX - infobulleX(this) + 10)
            .attr('y', event.pageY - 15)
            .style("font-size", "15px")
            .text(`Nom : ${d.nom}`)
            .attr("font-family", "Saira")
        canevas1.append('text')
            .attr('x', event.pageX - infobulleX(this) + 10)
            .attr('y', event.pageY )
            .style("font-size", "15px")
            .text(`Genre : ${d.genre}`)
            .attr("font-family", "Saira")
        canevas1.append('text')
            .attr('x', event.pageX - infobulleX(this) + 10)
            .attr('y', event.pageY + 15)
            .style("font-size", "15px")
            .text(`Groupe parlementaire : ${d.groupe_parlementaire}`)
            .attr("font-family", "Saira")
        canevas1.append('text')
            .attr('x', event.pageX - infobulleX(this) + 10)
            .attr('y', event.pageY + 30)
            .style("font-size", "15px")
            .text(`Parti : ${d.parti}`)
            .attr("font-family", "Saira")
        canevas1.append('text')
            .attr('x', event.pageX - infobulleX(this) + 10)
            .attr('y', event.pageY  + 45)
            .style("font-size", "15x")
            .text(`Nombre de votes "dissidents" : ${d.vote}`)
            .attr("font-family", "Saira")

})
// place l'infobulle à gauche si elle devait sortir de la fenêtre à droite
function infobulleX(d,i){
    if(event.pageX>1200){return "295"}
    else{return "0"}}

// tri par cantons des parlementires pour les positionner en Y
function langueCantons(d,i){
    if(d.canton === "fr"){return 25}
    else if(d.canton === "ge"){return 45}
    else if(d.canton === "ju"){return 65}
    else if(d.canton === "ne"){return 85}
    else if(d.canton === "vd"){return 105}
    else if(d.canton === "vs"){return 125}
    else if(d.canton === "ti"){return 190}
    else if(d.canton === "ag"){return 255}
    else if(d.canton === "ai"){return 275}
    else if(d.canton === "ar"){return 295}
    else if(d.canton === "be"){return 315}
    else if(d.canton === "bl"){return 335}
    else if(d.canton === "bs"){return 355}
    else if(d.canton === "gl"){return 375}
    else if(d.canton === "gr"){return 395}
    else if(d.canton === "lu"){return 415}
    else if(d.canton === "nw"){return 435}
    else if(d.canton === "ow"){return 455}
    else if(d.canton === "sg"){return 475}
    else if(d.canton === "sh"){return 495}
    else if(d.canton === "so"){return 515}
    else if(d.canton === "sz"){return 535}
    else if(d.canton === "tg"){return 555}
    else if(d.canton === "ur"){return 575}
    else if(d.canton === "zg"){return 595}
    else if(d.canton === "zh"){return 615}
}
// faire apparaître l'axe X              
const monAxe = d3.axisBottom(echelleDesX).ticks(15)

// création d'une fonction regroupant toute les légendes textuelles,
// ainsi que le déplacement de l'axe.
canevas1.append(legendeTexte)
    function legendeTexte(d){
    canevas1.append('g')
        .attr("transform", "translate(0,630)")
        .call(monAxe)
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("textLength", "110") 
        .attr("x", 10)        
        .attr("y", 75)         
        .text("Cantons à majorité")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("x", 10)        
        .attr("y", 95)     
        .attr("font-weight","bold")    
        .text("francophone")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("textLength", "110") 
        .attr("x", 10)        
        .attr("y", 180)         
        .text("Canton à majorité")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("x", 10)        
        .attr("y", 200)     
        .attr("font-weight","bold")    
        .text("italophone")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("textLength", "110") 
        .attr("x", 10)        
        .attr("y", 435)         
        .text("Cantons à majorité")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("x", 10)        
        .attr("y", 455)     
        .attr("font-weight","bold")    
        .text("germanophone")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 29)      
        .text("FR")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 49)      
        .text("GE")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 69)      
        .text("JU")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 89)      
        .text("NE")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 109)      
        .text("VD")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 129)      
        .text("VS")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 194)      
        .text("TI")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 259)      
        .text("AG")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 279)      
        .text("AI")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 299)      
        .text("AR")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 319)      
        .text("BE")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 339)      
        .text("BL")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 359)      
        .text("BS")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 379)      
        .text("GL")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 399)      
        .text("GR")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 419)      
        .text("LU")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 439)      
        .text("NW")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 459)      
        .text("OW")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 479)      
        .text("SG")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 499)      
        .text("SH")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 519)      
        .text("SO")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 539)      
        .text("SZ")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 559)      
        .text("TG")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 579)      
        .text("UR")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 599)      
        .text("ZG")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-family", "Saira")
        .attr("x", 130)        
        .attr("y", 619)      
        .text("ZH")
    canevas1.append("rect")
    .attr("fill","#ffffff")
            .attr("x",1080)
            .attr("y",10)
            .attr('width', 404)
            .attr('height', 120)
            .attr("stroke","black")
            .style("stroke-width", 0.7)
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "18px")
        .attr("font-family", "Saira")
        .attr("x", 1282)        
        .attr("y", 50)    
        .attr("font-weight","bold")  
        .attr("text-anchor", "middle")  
        .text("Dissidience au conseil national ?") 
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "16px")
        .attr("font-family", "Saira")
        .attr("x", 1282)        
        .attr("y", 85)      
        .attr("text-anchor", "middle")  
        .text("Nombre de votes contre l'avis majoritaire")
    canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "16px")
        .attr("font-family", "Saira")
        .attr("x", 1282)        
        .attr("y", 105)     
        .attr("text-anchor", "middle")  
        .text("de son groupe parlementaire ")  
    canevas1.append(creerBoutons)  
}
canevas1.append(creerBoutons)
function creerBoutons(d){
bouton0()
    function bouton0(d){
        canevas1.append("rect")
            .attr("fill","#b0b0b0")
            .attr("x",10)
            .attr("y",655)
            .attr("rx",10)
            .attr('width', 130)
            .attr('height', 35)
            .attr("stroke","black")
            .attr( "cursor", "pointer" )
            .on("click",function boutonReset(update){
                d3.selectAll("circle")
                            .attr("fill",couleurGroupe)
                            .attr("r",5)
                            .attr("stroke", couleurGenre)
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 75)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Réinitialiser")
        .attr( "cursor", "pointer" )
        .on("click",function boutonReset(update){
                d3.selectAll("circle")
                            .attr("fill",couleurGroupe)
                            .attr("r", 5)
                            .attr("stroke", couleurGenre)
                             selectAll("circles")
    })
    }
bouton1()
    function bouton1(d){
        canevas1.append("rect")
            .attr("fill","#01DF01")
            .attr("x",210)
            .attr("y",655)
            .attr("rx",10)
            .attr('width', 130)
            .attr('height', 35)
            .attr("stroke","black")
            .attr( "cursor", "pointer" )
            .on("click",function boutonG(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceG)
                            .attr("r",grossissmentG)
                            .attr("stroke", couleurGenreG)
                            .classed("highlightedBar", true)
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 275)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Groupe vert-e-s")
        .attr( "cursor", "pointer" )
        .on("click",function boutonG(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceG)
                            .attr("r",grossissmentG)
                            .attr("stroke", couleurGenreG)
                            .classed("highlightedBar", true)

    })
    }
// changement de la couleur des cercles pour mettre en avant le groupe G
function surbrillanceG(d){
    if(d.groupe_parlementaire === 'G'){return '#01DF01'}
    else if(d.groupe_parlementaire === 'RL'){return '#cbfcf5'}
    else if(d.groupe_parlementaire === 'S'){return '#ffbfaa'}
    else if(d.groupe_parlementaire === 'M-E'){return '#ffddba'}
    else if(d.groupe_parlementaire === 'GL'){return "#cbc1ff"} 
    else if(d.groupe_parlementaire === 'V'){return "#b7d8c0"}
}
// grossisement des cercles du groupe G
function grossissmentG(d){
    if(d.groupe_parlementaire === 'G'){return '6'}
    else if(d.groupe_parlementaire === 'RL'){return '3'}
    else if(d.groupe_parlementaire === 'S'){return '3'}
    else if(d.groupe_parlementaire === 'M-E'){return '3'}
    else if(d.groupe_parlementaire === 'GL'){return "3"} 
    else if(d.groupe_parlementaire === 'V'){return "3"}
}
// changement de la couleur du pourtour des cercles pour mettre en avant le groupe G
function couleurGenreG(d){
    if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#df00cf"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#531002"}
}
bouton2()
    function bouton2(d){
        canevas1.append("rect")
            .attr("fill","#10F3E2")
            .attr("x",360)
            .attr("y",655)
            .attr("rx",10)
            .attr("stroke","black")
            .attr('width', 130)
            .attr('height', 35)
            .attr( "cursor", "pointer" )
            .on("click",function boutonRL(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceRL)
                            .attr("r",grossissmentRL)
                            .attr("stroke", couleurGenreRL)
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 425)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Groupe PLR")
        .attr( "cursor", "pointer" )
        .on("click",function boutonRL(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceRL)
                            .attr("r",grossissmentRL)
                            .attr("stroke",couleurGenreRL)

    })
    }
function surbrillanceRL(d){
    if(d.groupe_parlementaire === 'G'){return '#c8f7b9'}
    else if(d.groupe_parlementaire === 'RL'){return '#10f3e2'}
    else if(d.groupe_parlementaire === 'S'){return '#ffbfaa'}
    else if(d.groupe_parlementaire === 'M-E'){return '#ffddba'}
    else if(d.groupe_parlementaire === 'GL'){return "#cbc1ff"} 
    else if(d.groupe_parlementaire === 'V'){return "#b7d8c0"}
}
function grossissmentRL(d){
    if(d.groupe_parlementaire === 'G'){return '3'}
    else if(d.groupe_parlementaire === 'RL'){return '6'}
    else if(d.groupe_parlementaire === 'S'){return '3'}
    else if(d.groupe_parlementaire === 'M-E'){return '3'}
    else if(d.groupe_parlementaire === 'GL'){return "3"} 
    else if(d.groupe_parlementaire === 'V'){return "3"}
}
function couleurGenreRL(d){
    if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#df00cf"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#531002"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#c9aaa3"}
}
bouton3()
    function bouton3(d){
        canevas1.append("rect")
            .attr("fill","#FF0000")
            .attr("x",510)
            .attr("y",655)
            .attr("rx",10)
            .attr("stroke","black")
            .attr('width', 130)
            .attr('height', 35)
            .attr( "cursor", "pointer" )
            .on("click",function boutonS(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceS)
                            .attr("r",grossissmentS)
                            .attr("stroke", couleurGenreS)
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 575)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Groupe PS")
        .attr( "cursor", "pointer" )
        .on("click",function boutonS(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceS)
                            .attr("r",grossissmentS)
                            .attr("stroke", couleurGenreS)

    })
    }
function surbrillanceS(d){
    if(d.groupe_parlementaire === 'G'){return '#c8f7b9'}
    else if(d.groupe_parlementaire === 'RL'){return '#cbfcf5'}
    else if(d.groupe_parlementaire === 'S'){return '#FF0000'}
    else if(d.groupe_parlementaire === 'M-E'){return '#ffddba'}
    else if(d.groupe_parlementaire === 'GL'){return "#cbc1ff"} 
    else if(d.groupe_parlementaire === 'V'){return "#b7d8c0"}
}
function grossissmentS(d){
    if(d.groupe_parlementaire === 'G'){return '3'}
    else if(d.groupe_parlementaire === 'RL'){return '3'}
    else if(d.groupe_parlementaire === 'S'){return '6'}
    else if(d.groupe_parlementaire === 'M-E'){return '3'}
    else if(d.groupe_parlementaire === 'GL'){return "3"} 
    else if(d.groupe_parlementaire === 'V'){return "3"}
}
function couleurGenreS(d){
    if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#df00cf"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#531002"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#c9aaa3"}
}
bouton4()
    function bouton4(d){
        canevas1.append("rect")
            .attr("fill","#FE9A2E")
            .attr("x",660)
            .attr("y",655)
            .attr("stroke","black")
            .attr("rx",10)
            .attr('width', 130)
            .attr('height', 35)
            .attr( "cursor", "pointer" )
            .on("click",function boutonME(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceME)
                            .attr("r",grossissmentME)
                            .attr("stroke", couleurGenreME)
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 725)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Groupe PDC")
        .attr( "cursor", "pointer" )
        .on("click",function boutonME(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceME)
                            .attr("r",grossissmentME)
                            .attr("stroke", couleurGenreME)

    })
    }
function surbrillanceME(d){
    if(d.groupe_parlementaire === 'G'){return '#c8f7b9'}
    else if(d.groupe_parlementaire === 'RL'){return '#cbfcf5'}
    else if(d.groupe_parlementaire === 'S'){return '#ffbfaa'}
    else if(d.groupe_parlementaire === 'M-E'){return '#FE9A2E'}
    else if(d.groupe_parlementaire === 'GL'){return "#cbc1ff"} 
    else if(d.groupe_parlementaire === 'V'){return "#b7d8c0"}
}
function grossissmentME(d){
    if(d.groupe_parlementaire === 'G'){return '3'}
    else if(d.groupe_parlementaire === 'RL'){return '3'}
    else if(d.groupe_parlementaire === 'S'){return '3'}
    else if(d.groupe_parlementaire === 'M-E'){return '6'}
    else if(d.groupe_parlementaire === 'GL'){return "3"} 
    else if(d.groupe_parlementaire === 'V'){return "3"}
}
function couleurGenreME(d){
    if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#df00cf"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#531002"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#c9aaa3"}
}
bouton5()
    function bouton5(d){
        canevas1.append("rect")
            .attr("fill","#004EFF")
            .attr("x",810)
            .attr("y",655)
            .attr("stroke","black")
            .attr("rx",10)
            .attr('width', 130)
            .attr('height', 35)
            .attr( "cursor", "pointer" )
            .on("click",function boutonGL(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceGL)
                            .attr("r",grossissmentGL)
                            .attr("stroke", couleurGenreGL)
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 875)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Groupe Vert'lib")
        .attr("cursor", "pointer" )
        .on("click",function boutonGL(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceGL)
                            .attr("r",grossissmentGL)
                            .attr("stroke", couleurGenreGL)

    })
    }
function surbrillanceGL(d){
    if(d.groupe_parlementaire === 'G'){return '#c8f7b9'}
    else if(d.groupe_parlementaire === 'RL'){return '#cbfcf5'}
    else if(d.groupe_parlementaire === 'S'){return '#ffbfaa'}
    else if(d.groupe_parlementaire === 'M-E'){return '#ffddba'}
    else if(d.groupe_parlementaire === 'GL'){return "#004EFF"} 
    else if(d.groupe_parlementaire === 'V'){return "#b7d8c0"}
}
function grossissmentGL(d){
    if(d.groupe_parlementaire === 'G'){return '3'}
    else if(d.groupe_parlementaire === 'RL'){return '3'}
    else if(d.groupe_parlementaire === 'S'){return '3'}
    else if(d.groupe_parlementaire === 'M-E'){return '3'}
    else if(d.groupe_parlementaire === 'GL'){return "6"} 
    else if(d.groupe_parlementaire === 'V'){return "3"}
}
function couleurGenreGL(d){
    if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#df00cf"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#531002"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#c9aaa3"}
}
bouton6()
    function bouton6(d){
        canevas1.append("rect")
            .attr("fill","#088A4B")
            .attr("x",960)
            .attr("y",655)
            .attr("rx",10)
            .attr('width', 130)
            .attr("stroke","black")
            .attr('height', 35)
            .attr( "cursor", "pointer" )
            .on("click",function boutonV(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceV)
                            .attr("r",grossissmentV)
                            .attr("stroke", couleurGenreV)
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 1025)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Groupe UDC")
        .attr( "cursor", "pointer" )
        .on("click",function boutonV(update){
                d3.selectAll("circle")
                            .attr("fill",surbrillanceV)
                            .attr("r",grossissmentV)
                            .attr("stroke", couleurGenreV)

    })
    }
function surbrillanceV(d){
    if(d.groupe_parlementaire === 'G'){return '#c8f7b9'}
    else if(d.groupe_parlementaire === 'RL'){return '#cbfcf5'}
    else if(d.groupe_parlementaire === 'S'){return '#ffbfaa'}
    else if(d.groupe_parlementaire === 'M-E'){return '#ffddba'}
    else if(d.groupe_parlementaire === 'GL'){return "#cbc1ff"} 
    else if(d.groupe_parlementaire === 'V'){return "#088A4B"}
}
function grossissmentV(d){
    if(d.groupe_parlementaire === 'G'){return '3'}
    else if(d.groupe_parlementaire === 'RL'){return '3'}
    else if(d.groupe_parlementaire === 'S'){return '3'}
    else if(d.groupe_parlementaire === 'M-E'){return '3'}
    else if(d.groupe_parlementaire === 'GL'){return "3"} 
    else if(d.groupe_parlementaire === 'V'){return "6"}
}
function couleurGenreV(d){
    if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#c9aaa3"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#df00cf"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#531002"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#fabff0"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#c9aaa3"}
}

bouton7()
    function bouton7(d){
        canevas1.append("rect")
            .attr("fill","#df00cf")
            .attr("x",1160)
            .attr("y",655)
            .attr("rx",10)
            .attr("stroke","black")
            .attr('width', 130)
            .attr('height', 35)
            .attr( "cursor", "pointer" )
            .on("click",function boutonFemmes(update){
                canevas1.selectAll("circle")
                        .attr("fill",surbrillanceFemme)
                        .attr("r",grossissmentFemme)
                        .attr("stroke", couleurGenreFemme)            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 1225)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Femmes")
        .attr( "cursor", "pointer" )
        .on("click",function boutonFemmes(update){
                canevas1.selectAll("circle")
                        .attr("fill",surbrillanceFemme)
                        .attr("r",grossissmentFemme)
                        .attr("stroke", couleurGenreFemme)  
    })
    function surbrillanceFemme(d){
        if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#FF0000"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#ffbfaa"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#004EFF"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#cbc1ff"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#FE9A2E"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#ffddba"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#10F3E2"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#cbfcf5"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#088A4B"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#b7d8c0"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#01DF01"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#c8f7b9"}
}
function grossissmentFemme(d){
    if(d.genre === 'Homme'){return '3'}
    else if(d.genre === 'Femme'){return '6'}
   
}
function couleurGenreFemme(d){
    if(d.genre === 'Homme'){return '#c9aaa3'}
    else if(d.genre === 'Femme'){return '#df00cf'}

}}
    
bouton8()
    function bouton8(d){
        canevas1.append("rect")
            .attr("fill","#723729")
            .attr("x",1310)
            .attr("y",655)
            .attr("rx",10)
            .attr("stroke","black")
            .attr('width', 130)
            .attr('height', 35)
            .attr( "cursor", "pointer" )
            .on("click",function boutonHomme(update){
                d3.selectAll("circle")
                    .attr("fill",surbrillanceHomme)
                    .attr("r",grossissmentHomme)
                    .attr("stroke", couleurGenreHomme)  
                     
            
        })
        canevas1.append("text")       
        .style("fill", "black")
        .style("font-size", "15px")
        .attr("font-family", "Saira")
        .attr("text-anchor", "middle")
        .attr("x", 1375)        
        .attr("y", 677)     
        .attr("font-weight","bold")    
        .text("Hommes")
        .attr( "cursor", "pointer" )
        .on("click",function boutonHomme(update){
                d3.selectAll("circle")
                    .attr("fill",surbrillanceHomme)
                    .attr("r",grossissmentHomme)
                    .attr("stroke", couleurGenreHomme)  

                    
    })

    function surbrillanceHomme(d){
        if(d.groupe_parlementaire === 'S' && d.genre === "Femme"){return "#ffbfaa"}
    else if(d.groupe_parlementaire === 'S' && d.genre === "Homme"){return "#FF0000"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Femme"){return "#cbc1ff"}
    else if(d.groupe_parlementaire === 'GL' && d.genre === "Homme"){return "#004EFF"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Femme"){return "#ffddba"}
    else if(d.groupe_parlementaire === 'M-E' && d.genre === "Homme"){return "#FE9A2E"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Femme"){return "#cbfcf5"}
    else if(d.groupe_parlementaire === 'RL' && d.genre === "Homme"){return "#10F3E2"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Femme"){return "#b7d8c0"}
    else if(d.groupe_parlementaire === 'V' && d.genre === "Homme"){return "#088A4B"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Femme"){return "#c8f7b9"}
    else if(d.groupe_parlementaire === 'G' && d.genre === "Homme"){return "#01DF01"}
}
function grossissmentHomme(d){
    if(d.genre === 'Homme'){return '6'}
    else if(d.genre === 'Femme'){return '3'}
   
}
function couleurGenreHomme(d){
    if(d.genre === 'Homme'){return '#531002'}
    else if(d.genre === 'Femme'){return '#fabff0'}
    }

    }}

})
