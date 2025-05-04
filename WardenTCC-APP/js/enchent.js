navigator.geolocation.getCurrentPosition(function(position) {
    let x = position.coords.latitude;
    let y = position.coords.longitude;
    let x1 = parseFloat(localStorage.getItem('lat'));
    let y1 = parseFloat(localStorage.getItem('lon'));
    previsaoench(x1,y1);
    prevloc(x,y);
});


async function prevloc(x, y){
    const url_weatherAtual= `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&lang=pt_br&appid=ca9e0b1933cd1287e61092c48b28c160`;
    const api_Loc= `https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&cnt=8&lang=pt_br&appid=ca9e0b1933cd1287e61092c48b28c160`;
    const fetch_Loc= await fetch(api_Loc);
    const fetch_3= await fetch(url_weatherAtual);
    const consulta4= await fetch_Loc.json();
    const consulta3= await fetch_3.json();

    var weaChuvaa = consulta3.rain;
    
    if(weaChuvaa != null || weaChuvaa != undefined){
        var weaChuvaa = consulta3.rain["1h"];
    }
    else {
        var weaChuvaa = "0";
    }

var lolench = 0;

    for (let i = 0; i < 2; i++) {

        let chuvatestes = consulta4.list[i].rain;

        if(chuvatestes != null || chuvatestes != undefined){
            chuvav = consulta4.list[i].rain['3h'];
        }
        else {
            chuvav = "0";
        }


        lolench = lolench + parseFloat(chuvav);

    }
    lolench = lolench + parseFloat(weaChuvaa);


    if(lolench<10){
        document.getElementById("prevLocal").innerText= "Baixo risco de enchente nas próximas 6 horas no seu local atual";
    }
    if(lolench>=10)
        {
            document.getElementById("prevLocal").innerText= "se você estiver em uma area suscetível à alagamentos,há chance ter alagamentos parciais nas ruas nas proximas 6 horas";
        }
   if(lolench>=25)
    {
        document.getElementById("prevLocal").innerText= "alto risco de inundação total de ruas nas próximas 6 horas, é recomendado se manter em um local seguro";
    }
    if(lolench>=50)
    {
        document.getElementById("prevLocal").innerText= "Extremo risco de alagamento, fortemente recomendado se proteger ";
    }

    
};


async function previsaoench(x1, y1){
    const url_weatherAtual= `https://api.openweathermap.org/data/2.5/weather?lat=${x1}&lon=${y1}&lang=pt_br&appid=ca9e0b1933cd1287e61092c48b28c160`;
    const api_url= `https://api.openweathermap.org/data/2.5/forecast?lat=${x1}&lon=${y1}&cnt=8&lang=pt_br&appid=ca9e0b1933cd1287e61092c48b28c160`;
    const fetch_= await fetch(api_url);
    const fetch_2= await fetch(url_weatherAtual);
    const consulta= await fetch_.json();
    const consulta2= await fetch_2.json();

    var weaChuva = consulta2.rain;
    
    if(weaChuva != null || weaChuva != undefined){
        var weaChuva = consulta2.rain["1h"];
    }
    else {
        var weaChuva = "0";
    }

var enchdiario = 0;

    for (let i = 0; i < 8; i++) {

        let chuvateste = consulta.list[i].rain;

        if(chuvateste != null || chuvateste != undefined){
            chuva = consulta.list[i].rain['3h'];
        }
        else {
            chuva = "0";
        }


        enchdiario = enchdiario + parseFloat(chuva);

    }

    

enchdiario = enchdiario + parseFloat(weaChuva);

    if(enchdiario<10){
        document.getElementById("prevCasa").innerText= "Baixo risco de enchente nas próximas 24 horas";
    }
    if(enchdiario>=10)
        {
            document.getElementById("prevCasa").innerText= "se sua casa estiver em uma area suscetível à alagamentos,há chance de suas ruas encherem";
        }
   if(enchdiario>=25)
    {
        document.getElementById("prevCasa").innerText=  "alto risco de inundação total de ruas, possível risco de alagamento residêncial nas próximas 24 horas, é recomendado se manter alerta";
    }
    if(enchdiario>=50)
    {
        document.getElementById("prevCasa").innerText= "Extremo risco de alagamento em residências nas próximas 24 horas ";
    }

    

};

previsaoench();
prevloc();