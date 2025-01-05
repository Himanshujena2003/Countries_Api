const container = document.getElementById("countries-container")
const filterByRegion = document.getElementById("filter-by-region")
const searchCountry = document.querySelector("input")

let fetchData = async () => {
    let res = await fetch("https://restcountries.com/v3.1/all");
    let data = await res.json();

    data.forEach(element => {
        let card = document.createElement("a");
        card.setAttribute("id","country-card");
        card.setAttribute("href",`country.html?name=${element.name.common}`)
        card.innerHTML=`<div id="country-img"><img src="${element.flags.svg}"alt="${element.name.common}flag"></div>
            <div id="card-text">
                <h3 id="card-title">${element.name.common}</h3>
                <p><b>Population: </b>${element.population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${element.region}</p>
                <p><b>Capital: </b>${element.capital?.[0]}</p>
            </div>`
        
        container.appendChild(card);
    });
}
fetchData();


//filter by region
filterByRegion.addEventListener('change',(e)=>{
    container.innerHTML=""
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=>res.json())
    .then((data)=>data.forEach((element)=>{
        let card = document.createElement("a");
        card.setAttribute("id","country-card");
        card.setAttribute("href",`country.html?name=${element.name.common}`)
        card.innerHTML=`<div id="country-img"><img src="${element.flags.svg}"alt="${element.name.common}flag"></div>
            <div id="card-text">
                <h3 id="card-title">${element.name.common}</h3>
                <p><b>Population: </b>${element.population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${element.region}</p>
                <p><b>Capital: </b>${element.capital?.[0]}</p>
            </div>`
        container.appendChild(card);
    }))
})


//search country by name
searchCountry.addEventListener("click",(e)=>{
    container.innerHTML=""
    fetch(`https://restcountries.com/v3.1/name/${e.name.common}?fullText=elementtrue`)
})

