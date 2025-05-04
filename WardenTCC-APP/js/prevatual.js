navigator.geolocation.getCurrentPosition(function(position) {
    let x0 = position.coords.latitude;
    let y0 = position.coords.longitude;
    let x1 = parseFloat(localStorage.getItem('lat'));
    let y1 = parseFloat(localStorage.getItem('lon'));
    getWeather(x0,y0,x1,y1);
});

async function getWeather(x0, y0, x1, y1){
    //localização atual
    const url_weatherAtual= `https://api.openweathermap.org/data/2.5/weather?lat=${x0}&lon=${y0}&lang=pt_br&appid=ca9e0b1933cd1287e61092c48b28c160`;
    const fetch_ = await fetch(url_weatherAtual);
    const consulta = await fetch_.json();

    var weaatual = consulta.weather[0].description.toUpperCase();
    var weaChuva = consulta.rain;
    var tempAtual= consulta.main.temp;
    var humidade = consulta.main.humidity;
    var iconAtual = consulta.weather[0].icon;
    
    if(weaChuva != null || weaChuva != undefined){
        var weaChuva = consulta.rain["1h"];
    }
    else {
        var weaChuva = "0";
    }

    const api_map= `https://www.mapquestapi.com/geocoding/v1/reverse?key=ii9GOoyG9KG4VrAZoNdc7WlBsGA5QUar&location=${x0},${y0}&includeRoadMetadata=true&includeNearestIntersection=true`;
    const fetch_map= await fetch(api_map);
    const consulta_map= await fetch_map.json();

    let cidade= consulta_map.results[0].locations[0].adminArea5;
    let estado= consulta_map.results[0].locations[0].adminArea3;

    //marcador

    if(isNaN(x1) == false || isNaN(y1) == false){
        const url_weatherAtual1= `https://api.openweathermap.org/data/2.5/weather?lat=${x1}&lon=${y1}&lang=pt_br&appid=ca9e0b1933cd1287e61092c48b28c160`;
        const fetch_1 = await fetch(url_weatherAtual1);
        const consulta1 = await fetch_1.json();

        var weaatual1 = consulta1.weather[0].description.toUpperCase();
        var weaChuva1 = consulta1.rain;
        var tempAtual1 = consulta1.main.temp;
        var humidade1 = consulta1.main.humidity;
        var iconAtual1 = consulta1.weather[0].icon;
        
        if(weaChuva1 != null || weaChuva1 != undefined){
            var weaChuva1 = consulta1.rain["1h"];
        }
        else {
            var weaChuva1 = "0";
        }

        const api_map1= `https://www.mapquestapi.com/geocoding/v1/reverse?key=ii9GOoyG9KG4VrAZoNdc7WlBsGA5QUar&location=${x1},${y1}&includeRoadMetadata=true&includeNearestIntersection=true`;
        const fetch_map1= await fetch(api_map1);
        const consulta_map1= await fetch_map1.json();

        var cidade1= consulta_map1.results[0].locations[0].adminArea5;
        var estado1= consulta_map1.results[0].locations[0].adminArea3;
    }

    createMini(
        weaatual,tempAtual,humidade,weaChuva,iconAtual,cidade,estado,
        weaatual1,tempAtual1,humidade1,weaChuva1,iconAtual1,cidade1,estado1
    );

    const drop = document.getElementById("drop");
    drop.addEventListener("change", ()=>(troca(x0,y0,x1,y1)), false);
}

function createMini(
    wea0,tempera0,humidade0,chuva0,icon0,cidade0,estado0,
    wea1,tempera1,humidade1,chuva1,icon1,cidade1,estado1){
    
    let big = document.getElementById(`prevAtual`);
    let mini = document.createElement("div");
    let extramini = '';
    if(cidade1 != undefined || estado1 != undefined){
        extramini = `<option value="1" class="nav-prev">${cidade1}, ${estado1}</p>`;
    }
    mini.className = "navbar-nav text-center";
    mini.id= "bottombar";
    mini.innerHTML = `
    <div class="nav-grid1 mx-auto">
        <select id="drop" class="form-select">
            <option value="0" class="nav-prev" select>${cidade0}, ${estado0}</p>
            ${extramini}
        </select>
    </div>
    
    <div class="nav-grid2">
        <p class="nav-prev toggle">${wea0}</p>
        <p class="nav-prev toggle off">${wea1}</p>
    </div>
    <div class="nav-grid3">
        <img class="nav-icon toggle" src="https://openweathermap.org/img/wn/${icon0}@2x.png">
        <img class="nav-icon toggle off" src="https://openweathermap.org/img/wn/${icon1}@2x.png">
    </div>
    <div class="nav-grid4">
        <p class="nav-prev large toggle">${Math.round((tempera0 - 273.15))}°C</p>
        <p class="nav-prev large toggle off">${Math.round((tempera1 - 273.15))}°C</p>
        <p class="nav-sub">Temperatura</p>
    </div>
    <div class="nav-grid5">
        <p class="nav-prev large toggle">${humidade0}%</p>
        <p class="nav-prev large toggle off">${humidade1}%</p>
        <p class="nav-sub">Humidade</p>
    </div>
    <div class="nav-grid6">
        <p class="nav-prev large toggle">${chuva0}mm</p>
        <p class="nav-prev large toggle off">${chuva1}mm</p>
        <p class="nav-sub">Volume</p>
    </div>
    `;
    
    big.appendChild(mini);
}

function troca(x0,y0,x1,y1){
    dados = document.getElementsByClassName("toggle");
    for (let i = 0; i < 10; i++) {
        dados[i].classList.toggle("off");
    }
}