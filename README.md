Dans le cadre d'un projet technique, l'objectif est de proposer une application web permettant à un utilisateur de consulter l'occupation des pièces de son bâtiment.
Le choix de la stack s'est portée sur HTML 5, CSS et Javascript, etant donné que j'apprends à utiliser Vue.js et que je voudrais pas faire pénaliser sur des erreurs de structures de composants ou perdre du temps sur des erreurs de modules.

Le résultat attendu de ce projet a été reussi, l'utilisateur peut voir l'etat des pièces du bâtiment.
J'ai choisi text content au lieu d'innerHtml pour des questions de sécurité,
L'Utilisateur se dirigera dans la page accueil.html, puis cliquera sur "Voir l'exercice", qui le redirigera automatiquement dans la page firstExercice.html.
Il cliquera alors sur "Voir le plan du bâtiment", où le nom de la zone géographique s'affichera.
En cliquant sur la zone géographique, il obtiendra le nom bâtiment et en cliquant sur le nom du bâtiment, il obtiendra la liste des étages et des pièces.
En cliquant sur l'une de ces pièces, un pop up s'affichera en lui indiquant la valeur de la pièce : Occupée, Non occupée ou une indisponibilité de connaitre l'état de la pièce.
Le fichier ./config/data.json me permettait de visualiser les children de chaque données.

Dans ce projet j'ai privilégié la fonctionnalité de l'exercice qu'au design du front end et de la responsivité, j'ai compensé ce manque en faisant l'exercice 2. (Je ne savais pas si il était à faire mais j'ai voulu le faire en regardant le pdf).
