/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

//Rastreando ser humano...

navigator.geolocation.getCurrentPosition(function(position) {
    let x= position.coords.latitude;
    let y = position.coords.longitude;
    StartMap(x, y);
});

//Iniciando MapQuest

L.mapquest.key = 'ii9GOoyG9KG4VrAZoNdc7WlBsGA5QUar';


// 'map' refers to a <div> element with the ID map
function StartMap (x, y){
    
    bounds = new L.LatLngBounds(new L.LatLng(90, 180), new L.LatLng(-90, -180));

    let map = L.mapquest.map('map', {
    center: [x, y],
    layers: L.mapquest.tileLayer('map'),
    zoom: 13,
    maxZoom: 19,
    minZoom: 3,
    zoomControl: false,
    zoomSnap: 1,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3
    }).addTo(map);

    L.tileLayer('https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=1e22b96a12fbad020c023d466cfe38b6',{
        maxZoom: 19,
        minZoom: 3,
        zoomSnap: 0.1
    }).addTo(map);
    L.marker([x, y]).addTo(map);

    async function marcarcasa(){
        let latitude = localStorage.getItem('lat');
        let longitude = localStorage.getItem('lon');
        if (latitude && longitude != null){
            L.marker([latitude, longitude]).addTo(map);
        }
    };
    marcarcasa();  
}