const api_key = 'ca9e0b1933cd1287e61092c48b28c160';

navigator.geolocation.getCurrentPosition(function(position) {
    let x = position.coords.latitude;
    let y = position.coords.longitude;
    let x1 = parseFloat(localStorage.getItem('lat'));
    let y1 = parseFloat(localStorage.getItem('lon'));
    cidadeEstado(x,y,x1,y1);
    previsao(x,y);
});

//Localizar cidade e estado
async function cidadeEstado(x,y,x1,y1){
    console.log(`${x},${y}`);
    const api_map= `https://www.mapquestapi.com/geocoding/v1/reverse?key=ii9GOoyG9KG4VrAZoNdc7WlBsGA5QUar&location=${x},${y}&includeRoadMetadata=true&includeNearestIntersection=true`;
    const fetch_map= await fetch(api_map);
    const consulta_map= await fetch_map.json();
    console.log(`${x1},${y1}`);
    const api_map1= `https://www.mapquestapi.com/geocoding/v1/reverse?key=ii9GOoyG9KG4VrAZoNdc7WlBsGA5QUar&location=${x1},${y1}&includeRoadMetadata=true&includeNearestIntersection=true`;
    const fetch_map1= await fetch(api_map1);
    const consulta_map1= await fetch_map1.json();

    let cidade0= consulta_map.results[0].locations[0].adminArea5;
    let estado0= consulta_map.results[0].locations[0].adminArea3;
    let cidade1= consulta_map1.results[0].locations[0].adminArea5;
    let estado1= consulta_map1.results[0].locations[0].adminArea3;

    let big = document.getElementById(`divCE`);
    let mini = document.createElement('div');
    mini.className = 'cidadeEstado mx-auto col-8';
    mini.innerHTML = `
    <select id="drop" class="form-select">
        <option value="0" class="nav-prev" select>${cidade0}, ${estado0}</p>
        <option value="1" class="nav-prev">${cidade1}, ${estado1}</p>
    </select>
    `;
    big.appendChild(mini);

    const drop = document.getElementById("drop");
    drop.addEventListener("change", ()=>(troca(x,y,x1,y1,drop)), false);
}

//previsao do dia de hoje, porém daqui a 3 horas do horario
async function previsao(x, y){
    const api_url= `https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&lang=pt_br&appid=ca9e0b1933cd1287e61092c48b28c160`;
    const fetch_= await fetch(api_url);
    const consulta= await fetch_.json();
    let pass = 1;
    
    for (let i = 0; i < 40; i++) {

        let utcdata = new Date(consulta.list[i].dt*1000);
        let wea = consulta.list[i].weather[0].description;
        let tempera = consulta.list[i].main.temp;
        let chuvateste = consulta.list[i].rain;
        let icon = consulta.list[i].weather[0].icon;
        let dataS = utcdata.getDate();
        let data = utcdata.toLocaleDateString();
        let hora = utcdata.getHours();
        let weaBig = wea.toUpperCase();

        if(chuvateste != null || chuvateste != undefined){
            chuva = consulta.list[i].rain['3h'];
        }
        else {
            chuva = "0";
        }

        if(pass == 1 || hora == 0){
            createBig(dataS,data);
            pass = 0;
        }

        createMini(dataS,hora,weaBig,tempera,chuva,icon);
    }
}

function createBig(dataS,data){
    let section = document.getElementById('secPrev');
    let big = document.createElement("div");
    big.id = `divDate${dataS}`;
    big.className = 'divBig';
    big.innerHTML = `<p class="pData">Dia ${data}</p>`;
    section.appendChild(big);

}

function createMini(dataS,hora,wea,tempera,chuva,icon){
    let big = document.getElementById(`divDate${dataS}`);
    let mini = document.createElement("div");
    mini.className = "divPrev";
    mini.innerHTML = `
    <img class="icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p class="pHora">${hora}:00</p>
    <p class="pHora">${wea}</p>
    <p class="pHora">${Math.round((tempera - 273.15))}°C </p>
    <p class="pHora">${chuva}mm</p>`;
    big.appendChild(mini);
}

function troca(x,y,x1,y1,drop){
    secPrev = document.getElementById("secPrev");
    secPrev.innerHTML = '';

    if(drop.value == 0){
        previsao(x,y);
    }else{
        previsao(x1,y1);
    }
}

previsao();

/* ARMAZEM
document.getElementById("data1").innerText = "Previsão do horário: " + data;
document.getElementById("tempo1").innerText =  "Tempo previsto: " + wea;
document.getElementById("temperatura1").innerText =  "Temperatura: " + Math.round((tempera - 273.15))+ "°C";
document.getElementById("chuva1").innerText =  "Volume de chuva nas ultimas 3 horas: " + chuva + " mm";
utcdata.toLocaleDateString()
*/