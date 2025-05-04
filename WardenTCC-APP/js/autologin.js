if (localStorage.getItem('nome') == '?'){
    console.log("inn");
}else if (localStorage.getItem('nome') == null){
    console.log("nann");
}
else{ 
    location.replace("index.html");
}