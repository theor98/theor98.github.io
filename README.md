# Chronociné

Le jeu est accessible [ici](https://theor98.github.io/)
![Capture d’écran 2023-06-11 191341](https://github.com/theor98/theor98.github.io/assets/100685679/dc2cf249-2c51-4f4f-b845-f4752748271f)

## Descirption 

Durant le cours "Introduction à l'histoire du cinéma", donné par Alain Boillat et Pierre-Emmanuel Jaques, les étudiant·es visionnent plus de 200 séquences de films différents. Le corpus d'examen est constitué d'environ la moitié des films, soit une centaine. L'objectif de ce jeu est de permettre aux étudiant·es de vérifier leur capacité à dater correctement les films d'examen de manière ludique. Les joueur·euses doivent placer des films dans une frise chronologique relativement aux autres films déjà placés. Evidemment, plus le nombre de films déjà positionnés dans la frise chronologique est grand, plus le jeu devient difficile !

## Fonctionnalités 

Le jeu a été conçu pour placer jusqu'à 10 films dans la frise, une fois ce nombre atteint, tous les films disparaissent sauf un et le jeu continue. Un score comptabilise le nombre de films correctement positionnés et un highscore sauvegardé dans le stockage web local permet de conserver une trace de sa meilleure performance. Une fois la moindre erreur commise la partie s'arrête et les dates des films sont révélées aux joueur·euses. A ce moment, il est possible de cliquer sur les affiches des films pour ouvrir la page IMDb correspondante, ce qui permet de se renseigner facilement si les étudiant·es ne se souviennent plus du film. Le bouton "reset" permet de relancer une partie. Le jeu inclut également un tutoriel pour expliquer les actions à faire dans les premiers moments de la partie.

## Dataset

Le jeu permet de jouer avec 99 des 101 films que les étudiant·es en première année d'Histoire et esthétique du cinéma doivent savoir identifier pour l'examen. Les deux films non inclus sont Vie et Passion de Jésus Christ (Pathé, 1902-1907) et La Naissance, la vie et la mort du Christ (Alice Guy, 1906). Ayant tous deux le même sujet et n'ayant trouvé aucune affiche ou aucun visuel ne mentionnant Alice Guy ou la firme Pathé, j'ai préféré ne pas les inclure pour ne pas créer de confusion. De plus, l'indétermination de la date de sortie de la Passion Pathé rendait son implémentation impossible.

## Accès au jeu

Le jeu est actuellement en ligne [ici](https://theor98.github.io/). 
Une version avec un dataset composé de séries et de films médicaux est accessible [ici](https://elentyr.itch.io/histoire-du-cinma-le-jeu-mystres-de-lunil-2023).  

## Libraires utilisées 
Le jeu a été développé avec la version 3000 de la librairie [Kaboom.js](https://kaboomjs.com/). Les données des films sont chargées via la librairie [d3.js](https://d3js.org/).

## Contexte de développement
Le code du jeu a été rédigé par Théo Rochat, étudiant de Master en Humanités Numériques et en Histoire et esthétique du cinéma. Ce projet a été développé dans le cadre du cours "Développement de jeu vidéo 2D" dispensé par Isaac Pante à l'Université de Lausanne.
