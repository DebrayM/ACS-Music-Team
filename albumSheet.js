window.onload = function() {


    let params = new URLSearchParams(document.location.search.substring(1));
    let keys = params.get("key"); //
    console.log("clé passée en paramètre : " + keys);
    let toto = localStorage.getItem(keys);
    let resp = '<p>' + toto + '</p>';
    document.querySelector("div").innerHTML = resp;

}




