
window.onload = function() {

    //*************************VERIFICATION FORMULAIRE SIGNIN POUR ENVOI

    //ici pas de verification de tous les champs comme dans le signUp, 
    //on se sert des réponses du serveur pour les afficher dans une div
    
    // l'évenement doit agir sur le formulaire et non sur le bouton
    let formIn = document.querySelector('#formSignin');
    formIn.addEventListener('submit', () => {
        
        event.preventDefault();
        //lors du clic, on crée un objet newUser avec clef et valeur
        const newUser = {
            "username" : email.value,
            "password" : pwd.value
           }
           //envoi de l'objet newUser en méthode POST
           fetch('http://api-music.test/api/login',{
               method : 'POST',
               body : JSON.stringify(newUser),
               headers : {'Content-Type':'application/json'},
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);
               //si la réponse comporte un code 401
               if (data.code === 401) {
                //alors on affiche le message dans une div
                   document.querySelector('#messError').innerHTML = data.message;
               }
               else{
                   //sinon envoi du token reçu dans le localstorage
                   localStorage.setItem('Token',data.token);
                   // et redirection sur la page songs
                   location.href = 'page-songs.html';
               }
           })
           //traitement de la requête échouée
           .catch(error => console.log(error))
        });
}