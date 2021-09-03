

window.onload = function ()
{


//Je veux ecouter la music quand je click sur un track
//Je veux des informations sur l'artist et l'album quand je click sur album ou artiste



var source = document.getElementById("btn");

source.addEventListener('click', jouer); // si tu detecte un click sur la source tu declanche l'argument jouer

}


function jouer() 
{
let piste = document.getElementById('Tracks');
console.log('piste, ' + piste);
let titre = piste.children[0]; //vas chercher le premier enfant de l element ul qui est la "piste"
console.log('titre, ' + titre);
titre.style.backgroundColor = 'yellow';
}

