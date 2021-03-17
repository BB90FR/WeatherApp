console.log('Link OK');

const map = L.map('worldmap').setView([48.866667, 2.333333], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var redIcon = L.icon({
    iconUrl: '/images/leaf-red.png',
    shadowUrl: '/images/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const cities = document.getElementsByClassName('list-group-item');

for (let i = 0; i < cities.length; i++) {
    L.marker([cities[i].dataset.lat, cities[i].dataset.lon], {icon: redIcon}).addTo(map).bindPopup(`${cities[i].dataset.city}, ${cities[i].dataset.country}`);
};

cities.forEach(element => {
    L.marker([element.dataset.lat, element.dataset.lon], {icon: redIcon}).addTo(map).bindPopup(`${element.dataset.city}, ${element.dataset.country}`);
});



