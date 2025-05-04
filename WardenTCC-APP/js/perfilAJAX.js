$("#forma").submit(function (e){
    e.preventDefault();

     $.ajax({
        type: "GET",
        url: "https://Warden.today/updater.php", 
        data: {
            acao: 'update',
            nome: $("#nome").val(),
            email: $("#email").val(),
            senha: $("#senha").val(),
            id: $("#idd").val()
        },            
        async: false,
        dataType: "json", 
        success: function (json) {

            if(json.result == true){
               //redireciona o usuario para pagina
               var nm = json.nome;
               var email = json.email;
               var senha = json.senha;
            
               localStorage.setItem('nome', nm);
               localStorage.setItem('email', email);
               localStorage.setItem('senha', senha);
               location.replace("perfil.html");
            }else{
                alert(json.error);
                
            }
        },error: function(xhr,e,t){
            console.log("xhr.responseText");                
        }
    });
  });
