$("#formelog").submit(function (e){
    e.preventDefault();

     $.ajax({
        type: "POST",
        url: "https://Warden.today/login.php", 
        data: {
            acao: 'Logar',          
            email: $("#emailusuariol").val(),
            senha: $("#senhausuariol").val()
        },            
        async: false,
        dataType: "json", 
        success: function (json) {

            if(json.result== true){
               //redireciona o usuario para pagina
               var id = json.id;
               var nm = json.nome;
               var email = json.email;
               var senha = json.senha;
               var lat = json.lat;
               var lon = json.lon;
             
               localStorage.setItem('id', id);
               localStorage.setItem('nome', nm);
               localStorage.setItem('email', email);
               localStorage.setItem('senha', senha);
               localStorage.setItem('lat', lat);
               localStorage.setItem('lon', lon);
               
               location.replace("index.html");
            }else{
                alert(json.error);
                location.replace("login.html");
            }
        },error: function(xhr,e,t){
            alert("nem tenta");                
        }
    });
  });


