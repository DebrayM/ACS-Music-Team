
window.onload = function() {

    // pace un évènement sur la barre de sercherche //
    // id="id-search" //
    let v1 = document.querySelector('#id-search');
    v1.addEventListener('click', load_div_img);
}

function load_img() {
    // fonction de chargement des images //
    return ['assets/images/img_1.jpg','assets/images/img_2.jpg','assets/images/mozart.jpg',
    'assets/images/img_3.jpg','assets/images/img_4.jpg', 'assets/images/strauss.jpg',
    'assets/images/img_5.jpg','assets/images/bach.jpg', 'assets/images/beethoven.jpg',
    'assets/images/img_1.jpg','assets/images/img_2.jpg','assets/images/mozart.jpg',
    'assets/images/img_3.jpg','assets/images/img_4.jpg', 'assets/images/strauss.jpg',
    'assets/images/img_5.jpg','assets/images/bach.jpg', 'assets/images/beethoven.jpg',
    'assets/images/img_2.jpg','assets/images/mozart.jpg'];
}

function load_div_img() {
    // fontion qui crée les balises qui vont contenir //
    // les images chargées par la fonction load_img() //
    // arr_img : tableau recevant les images //
    let arr_img = load_img();
    // nb_img : nombre d'images dans le tableau //
    let nb_img =  arr_img.length;
    let container_img = "";
    if (nb_img>0) {
    // container_img : structure qui va être affichée dans le scroller //
        for (let i=0; i<nb_img; i++) {
            y=i+1
            container_img = container_img + '<div class="album"><a href="#" id="ida' + y +'">';
            container_img = container_img + '<img src="' + arr_img[y] + '" alt="pochette">';
            container_img = container_img + "</a></div>";
        }
    }else {
        // aucune image n'a été trouvée
    }
    // afficher la structure créée dans la div id="id_scroll" //
    document.getElementById("id_scroll").innerHTML = container_img;

    /* pose un écouteur d'évènement (click) sur les titres des albums*/
    /* les albums = toutes les div de class album*/
    /* les titres = la balise a de chaque div album */
    let t;
    let a = document.querySelectorAll(".album");
    for (let i=0; i<a.length; i++) {
        a[i].addEventListener('click', albumSelect);
    }

    /* pose un écouteur d'évènement (click) sur les albums récemment écoutés*/

    let i1 = document.getElementById("img1");
    e3.addEventListener('click', songsSelect);
}

function albumSelect() {
    // trouve quel album à été sélectionné dans la barre de scroll //
    // renvoie le titre de l'album sélectionné (id de la balise a) //
    let cover = this.firstChild.id;
}

function songsSelect() {
    let cover = this.firstChild.id;
}