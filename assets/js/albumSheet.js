window.onload = function() {

    let params = new URLSearchParams(document.location.search.substring(1));
    //console.log(params.get("id"));
    
    //affiche l'ID de l'album
    let idalbum = '<p>' + params.get("id") + '</p>';
    document.querySelector('div').innerHTML = idalbum;

    loadalbumtracks (params.get("id"))

}

function loadToken (){
    // récupère le Token stockée dans le navigateur avec sessionStorage
    return sessionStorage.getItem('Token');
}

function loadalbumtracks (param) {
    // récupère le token
    let token = loadToken();
    //création de l'url qui va envoyer la demande à l'api
    let url = 'http://api-music.test/api/albums/' + param;

    //fetch communique avec l'API par l'intermediaire de l'URL
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
          }
    })
    //récupération de la promesse de réponse
    //formatage de la réponse en JSON
    .then(response => response.json())
    .then(post => 
    {
        //affiche le titre de l'album
        let title = document.querySelector("h1");
        title.innerText = post.name +" (" + post.id + ")";
        //affiche l'image de l'album
        let myalbum = '<img src="' + post.picture + '" alt="image">';
        document.querySelector("#div1").innerHTML = myalbum;
        //recherche le nom de l'artiste de l'album
        apiArtist(post.artist);
        //recherche les pistes de l'album
        apitracks(post.tracks);
    })
}

function loadToken (){
    // récupère le Token stockée dans le navigateur avec sessionStorage
    return sessionStorage.getItem('Token');
}

function apitracks (tracks) {
    // récupère le token
    let token = loadToken();
    let myuldiv = document.createElement('ul');

        tracks.forEach(track => {
            fetch('http://api-music.test' + track, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        
            //récupération de la promesse de réponse
            //formatage de la réponse en JSON
            .then(response => response.json())
            .then(piste => 
                {
                    console.log("Nom de la piste musicale : " + piste.name)

                    let li = document.createElement('li');
                    li.innerText = piste.name + " (" + piste.time + ")";
                    myuldiv.append(li);

                    document.querySelector("#div2").append(myuldiv);
                })
            .catch(error => alert('Erreur:'+ error))
        });
}

function apiArtist(artist) {
    // récupère le token
    let token = loadToken();


    fetch('http://api-music.test' + artist, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    //récupération de la promesse de réponse
    //formatage de la réponse en JSON
    .then(response => response.json())
    .then(artistAlbum => 
        {
            console.log("Nom de l'artiste' : " + artistAlbum.username);

            let mydiv = document.getElementById("div1");
            let p = document.createElement('p');
            p.innerText = artistAlbum.username + " (" + artistAlbum.id + ")" ;
            mydiv.append(p);

        })
    .catch(error => alert('Erreur:'+ error))
}