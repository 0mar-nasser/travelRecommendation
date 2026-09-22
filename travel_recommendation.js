let data;
async function loadData() {
    const response = await fetch("./travel_recommendation_api.json");
    data = await response.json();
}
loadData();

const searchForm = document.getElementById("searchForm")
const searchInput = document.getElementById("searchInput")

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const keyword = searchInput.value.toLowerCase().trim();

    const results = document.getElementById("results");
    results.innerHTML = "";

    if (keyword === 'beach' || keyword === 'beaches') {
        data.beaches.forEach(function (beach) {
            results.innerHTML += `
            <div class="card">
                <img src="${beach.imageUrl}" alt="${beach.name}">
                <h2>${beach.name}</h2>
                <p>${beach.description}</p>
            </div>
            `;
        });
    }
    else if (keyword === 'country' || keyword === 'countries') {
        data.countries.forEach(function (country) {
            country.cities.forEach(function (city) {
                results.innerHTML += `
                <div class="card">
                    <img src="${city.imageUrl}" alt="${city.name}">
                    <h2>${city.name}</h2>
                    <p>${city.description}</p>
                </div>
                `;
            })
        });
    }
    else if (keyword === 'temple' || keyword === 'temples') {
        data.temples.forEach(function (temple) {
            results.innerHTML += `
            <div class="card">
                <img src="${temple.imageUrl}" alt="${temple.name}">
                <h2>${temple.name}</h2>
                <p>${temple.description}</p>
            </div>
            `;
        });
    }
    else {
        console.log("No match found")
    }
})

const clearButton = document.getElementById("clearButton")
clearButton.addEventListener("click", function () {
    searchInput.value = "";
    results.innerHTML = "";
})

const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);