document.getElementById("update").addEventListener("click",destravar);

function destravar(){
    document.getElementById("field").removeAttribute("disabled"); 
}

document.getElementById("disconectar").addEventListener("click",sair);

function sair(){
    localStorage.setItem('id','?');
    localStorage.setItem('nome','?');
    localStorage.setItem('senha','?');
    localStorage.setItem('email','?');
    localStorage.setItem('lat','?');
    localStorage.setItem('lon','?');


    location.replace("login.html");
}