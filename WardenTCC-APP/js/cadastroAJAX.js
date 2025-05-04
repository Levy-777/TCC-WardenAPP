$("#forme").submit(function (e){
    e.preventDefault();

     $.ajax({
        type: "GET",
        url: "https://Warden.today/cadastrox.php", 
        data: {
            acao: 'Registrar',
            nome: $("#nomeusuario").val(),
            email: $("#emailusuario").val(),
            senha: $("#senhausuario").val()
        },            
        async: false,
        dataType: "json", 
        success: function (json) {

            if(json== 'true'){
               //redireciona o usuario para pagina
               location.replace("login.html");

            }else{
                location.replace("cadastro.html");
            }
        },error: function(xhr,e,t){
            console.log("xhr.responseText");                
        }
    });
  });


 

