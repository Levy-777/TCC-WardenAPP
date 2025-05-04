var tan = localStorage.getItem('nome');

document.getElementById("usuario").innerText = "Bem Vindo " + tan;
document.getElementById("nome").value =  tan;


var id_u = localStorage.getItem('id'); 
document.getElementById("idd").value = id_u;

var pass = localStorage.getItem('senha');
document.getElementById("senha").value = pass;


var mail = localStorage.getItem('email');
document.getElementById("email").value = mail;

