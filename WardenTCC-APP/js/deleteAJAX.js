$("#del").submit(function (e){
    e.preventDefault();

     $.ajax({
        type: "GET",
        url: "https://Warden.today/delete.php", 
        data: {
            acao: 'Deletar',
            id: $("#idd").val()
        },            
        async: false,
        dataType: "json", 
        success: function (json) {

            if(json.result == true){
               //redireciona o usuario para pagina
               localStorage.removeItem('nome');
               location.replace("login.html");
            }else{
                alert("erro ao deletar conta");
            }
        },error: function(xhr,e,t){
            console.log("xhr.responseText");                
        }
    });
  });
