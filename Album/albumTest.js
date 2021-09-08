

window.onload = function ()
{ // definir l'album, track_tableau

    //  ID API ou page SONG MARTINE keys
    
    let url = "http://api-music.test/api/albums";

    let album = 112 //ID Martine

    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzEwMjQ1MTMsImV4cCI6MTYzMTAyODExMywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZGVtb0BkZW1vLmNvbSJ9.DCoFjzAJUlQ16xaweHeXQRc8n8R_GNwCprqtvEd_sas3OhGeyfSOFmw0Ok6_o_NdX2N-gFgWm9KjxbdZMDWI59na-OjjPZGn3yqjkLpGKTNqqYMIjDZ5BD3zg5wXTBLM4_keg5UCKWFXOXD-eAFvoZmwR5d2EIPWANo3GRvXThyg_149fOFGn8R3LeEEaf9zhPcnGFtSNImZHigFRRM_QUT9rhqe4Rtp2LiODTj3hIl1is3eUi3kAKER-NA91P8gOSSIykBYzmFYhxMQWBxALjDuzb7ghaHKGeDv8WOH8plZ1sJ9AHTm8R1LHguBYCal2KGghXrhw6MyYu-yBdNC80e061oUKugY29NghKRq8g52w4uP-zSduVX8kamq-TPfs6p11A1s9XmsYXZx3bEov1DZQ4ZXbale-sETlo_WOEZ5vSaWcxBzkaj0HJ3kzATbKxCDv6OuKsamfPkRMVAP2Ukj_xJKfgGeHhLSw9Y4M5nLWItGnlYAZ_hRqff9yVo_eCbMB2ZFZiIjuAjkjnWx7E3OqyFT_s6F3_rbxXb2glBxD6Jxa1NSfbGEpqBikusSKxPadR89p6KjIadX-9WC7XN-RK4kVExXmh5QCS6RcyxCGPGPk1Qm7CXRa5idoKk9Wz_Sl-tsDGVoc2H34G5Te5u2Ud0QK15MfoIjga0kxDg";

    fetch (url, {
        method: "GET",
        headers : {
          Authorization: `Bearer ${token}`
        },
        body : JSON.stringify({
          id : album
    })
    

                //for (let index=0, c=titreAlbum.length; index<c; index++) {
                //alert(titreAlbum[i]);
    
    let ul = document.querySelector('ul')

    for(let i=0; i < Album.length; i++) {
      //i++ : incrémente i   // for possede 3 elements obligatoire :    
    console.log(Album[i]);
      //list est la salle, les crochets le mec qui rentre et nous appelle, le i c'est moi   ///list[i] afficher ce que index pointe dans le tableau list
    let track = '<li>'+ Album[i] +'</li>';
      // Création d'un élément de la liste Ul
    ul.innerHTML += track;
    }
}

// Jouer Track au 'clic'
let trackList = document.querySelectorAll('li');

for (let i=0; i < Album.length; i++) {
      // console.log(element[i])

    //Ajout un écouteur d'évènement sur un element de la liste
    trackList[i].addEventListener('click', play);
}  


function play ()
{
//alert(this.innerHTML);
let newplay = prompt ('modif item', this.innerText); // this represente le element[i] plus haut, sur lequel il y a un clic, dans lequel on applique la fonction presente
this.innerText = newPlay;

}

localStorage.setItem('token', data.token)
location.href = //page player











let source = API

function click ()

let titre = play.children[0]; //vas chercher le premier enfant de l element ul qui est la "piste"


   
let jouerTrack = document.getElementById("trackList");
play.addEventListener('click', jouerTrack); // si tu detectes un click sur la source tu declanches la fonction "jouer"


// Evènement au clique du bouton "
play.addEventListener('click', jouerTrack);

function play ()
{
  let play = document.getElementById('Track', );
  document.addEventListener('click')
    AudioContext
){
  if 

}




function jouer() 
{



});





}

// metadata : indique la durée
// HTMLMediaElement
//objet : AudioContext   AudioNode  AudioBuffer...... AudioContext.createBuffer () ou AudioContext.decodeAudioData() 
// baseAudiocontext.decodeAudioData ()

// buffer d'entree
// noeud : ScriptProcessorNode (AudioProcessingEvent, API?)


let source = //lister les tracks api/tracks/1453

let contexteAudio = new (window.AudioContext || window.webkitAudioContext)(); // définition du contexte audio
// les navigateurs avec un moteur Webkit/blink demandent un préfixe

var voixSelectionnee = document.getElementById("voice"); // case à cocher pour la sélection d'effets de voix
var visualisationSelectionnee = document.getElementById("visual"); // case à cocher pour la sélection d'options de visualisation audio


var analyseur = contexteAudio.createAnalyser();
var distorsion = contexteAudio.createWaveShaper();
var gainVolume = contexteAudio.createGain();
var filtreAccordable = contexteAudio.createBiquadFilter();




  // callback de succès
  function (flux) {
    source = contexteAudio.createMediaStreamSource(flux);
    source.connect(analyseur);
    analyseur.connect(distorsion);
    distorsion.connect(filtreAccordable);
    filtreAccordable.connect(gainVolume);
    gainVolume.connect(contexteAudio.destination); // connecte les différents noeuds de graphes audio entre eux

    genererVisualisation(flux);
    voiceChange();

 

  }