const countryName = new URLSearchParams(location.search).get('name')
const flag = document.querySelector("#country-data img")
const main = document.getElementById("country-main")

let fetchCountry = async () =>{

    // Data Fetching
    let res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    let data = await res.json();
    let country = data[0];
    console.log(country)
    
    // Some checks
    let nativeN,subregion;
    if(country.subregion){
        subregion=country.subregion
    }
    else{
        subregion = country.region;
    }
    if(country.name.nativeName){
        nativeN=Object.values(country.name.nativeName)[0].common;
    }
    else{
        nativeN=country.name.common;
    }


    // Creating div element
    let div = document.createElement("div")
    div.setAttribute("id","country-data")

    div.innerHTML=`<img src="${country.flags.svg}" alt="flag">
            <div class="country-details">
                <h1>${country.name.common}</h1>
                <div id="details">
                    <p><b>Native Name: </b>${nativeN}</p>
                    <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Sub Region: </b>${subregion}</p>
                    <p><b>Capital: </b>${country.capital?.[0]}</p>
                    <p><b>Top Level Domain: </b>${country.tld}</p>
                    <p><b>Currencies: </b>${Object.values(country.currencies)[0].name} ,&nbsp; ${Object.values(country.currencies)[0].symbol}</p>
                    <p><b>Languages: </b>${Object.values(country.languages).join(",")}</p>
                </div>
                <div id="border-countries">
                    <b>Border Countries: </b>&nbsp;&nbsp;
                </div>`
    
    main.appendChild(div);  
    const borderCountries = document.getElementById("border-countries")

    if(country.borders){
        country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res)=>res.json())
              .then(([borderCountry])=>{
                let borderCountryTag = document.createElement("a");
                borderCountryTag.setAttribute("href",`country.html?name=${borderCountry.name.common}`)
                borderCountryTag.innerText=borderCountry.name.common
                borderCountries.appendChild(borderCountryTag)
            })
        });
    }
    else{
        borderCountries.innerHTML="<b>Border Countries: </b>&nbsp;&nbsp; No Border Countries."
    }
}

fetchCountry()


