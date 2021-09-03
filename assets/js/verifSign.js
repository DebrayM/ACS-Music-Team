window.onload = function() {

let email = document.getElementById('email');
email.addEventListener('change', verifEmail);

let pwd = document.querySelector('#pwd');
pwd.addEventListener('change', verifMdp);

let name = document.querySelector('#name');
name.addEventListener('change', verifName);

// let envoyer = document.querySelector('.btnDone');
// envoyer.addEventListener('submit',verifForm);


// création et stockage d'un cookie 'user'
// document.cookie = 'user=pierre ; path=/signup ; domain=???.com ; secure ; max-age = 86400';

}

//VERIFICATION FORMULAIRE POUR ENVOI
// function verifForm()
// {
//     if(){

//     }

//     let formData = new FormData();
//     formData.append('name', 'name.value');
//     formData.append('email', 'email.value');
//     formData.append('password', 'pwd.value');
    
//     fetch("http://musics.logikstik.odns.fr/api/users", {
//       method: "POST",
//       body: formData
//     })
//     .then(response => response.json())
//     .then(response => alert(response))
//     .catch(error => alert("Erreur : " + error));

// }



//VERIFICATION NAME
function verifName()
{
    let error = document.querySelector('#nameError');
    
    if(this.value.length == 0){
        this.style.borderColor =  '#FF0077';
        error.style.display = 'block';
    }
    else{
        this.style.borderColor = "#51E62E";
        error.style.display = 'none';
    }
}

//VERIFICATION DE EMAIL
// Expression régulière permettant la vérification syntaxique d'une adresse email
function checkEmail(email)
    {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


function verifEmail()
{   
    // créer un élément HTML "<p class="error">Votre adresse email invalide</p>
    let error = document.createElement('p');// création du tag html "p"
    error.classList.add('error'); // ajout de la classe css "error"
    error.style.display = "block"; //changement de la valeur du display
    error.innerText = "Error email"; // ajout d'un texte
    
    // si l'adresse email est correct, on met les bordures en vert
    if (checkEmail(this.value)) {
        this.style.borderColor = "#51E62E";
        
        //supprime l'élément suivant le champ "email" si celui-ci existe
        if (!this.nextSibling.length){
            this.nextElementSibling.remove(error);
        }
    }
    else{
        this.style.borderColor = '#FF0077';
        //pour ne pas répéter
        //si aucun élément suit l'élément "email", on ajoute notre message d'erreur
        //.nextSibling = récupère un élément juste après un autre élément
        if (this.nextSibling.length){
            //ajoute le nouvel élément html juste après notre champ email
            this.after(error);
            }
        }
}


//VERIFICATION DU MDP
function verifMdp()
    {
        let error = document.querySelector('#pwdError');
        //this correspond à l'élément ayant enclenché cette fonction, soit dans notre cas de figure "pseudo"
        // console.log(this.value);
        // on vérifie que le nombre de caractères soit égal ou supérieur à 5
        if(this.value.length >=5){
            //si la longueur de la saisie est supérieur ou égale à 5
            //la bordure sera de couleur verte
            this.style.borderColor = '#51E62E';
            //et on cache le <p>
            error.style.display = 'none';
        }
        else{
            ///sinon la bordure sera rouge et on fait apparaitre le <P>
            this.style.borderColor =  '#FF0077';
            error.style.display = 'block';
        }
    }    