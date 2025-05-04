var id_u = localStorage.getItem('id'); 
document.getElementById("idd").value = id_u;

$("#mark").submit(function (e){
    e.preventDefault();

     $.ajax({
        type: "GET",
        url: "https://Warden.today/Localsave.php", 
        data: {
            acao: 'RegLoca',
            lat: $("#lat").val(),
            lon: $("#lon").val(),
            id: $("#idd").val()
        },            
        async: false,
        dataType: "json", 
        success: function (json) {

            if(json.result == true){
               //redireciona o usuario para pagina
               var lat = json.lat;
               var lon = json.lon;
            
               localStorage.setItem('lat', lat);
               localStorage.setItem('lon', lon);

               location.replace("index.html");

            }else{
                alert("error");
                location.replace("marcador.html");
            }
        },error: function(xhr,e,t){
            console.log("xhr.responseText");                
        }
    });
  });
