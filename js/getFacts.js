const apiUrl = "https://anime-facts-rest-api.herokuapp.com/api/";
function getParticularFact(name) {
    html = `<div class="particularFact">
    <h4 style="color:green">Want to read particular Fact about ${name}</h4>
    <form onsubmit="getFactsWithId(event)" class="Factform">
    <div class="wrapper">
    <label>Enter Fact Number</label>
        <input type="text" placeholder="Fact Number" id="fact_id"/>
        <button type="submit" class="btn btn-primary">
            <i class="fa fa-search"></i>
        </button>
        </div>
    </form>                   
    </div>`;
    return html;
}
async function getFacts(e) {
    e.preventDefault();
    var name = document.getElementById("anime_name");
    if (name.value === "") {
        let html = `<h3 class="error">Please Enter anime Name!!</h3>`;
        var facts = document.querySelector(".addFacts");
        facts.innerHTML = html;
        return;
    }
    const apiEndpoint = apiUrl + "v1/" + `${name.value}`;
    const resp = await (await fetch(apiEndpoint)).json();
    if (resp.success === true) {
        let html = `
        <div class="Animefacts">
        
        <h4>All Facts about <label>${name.value}</label></h4>
        <h4>Number of facts : ${resp.total_facts}</h4>
        <table class="table table-hover">
        <thead>
        <tr>
        <th scope="col">Facts</th>
        </tr>
        </thead>
        <tbody>`;
        const data = resp.data;
        data.forEach((f) => {
            let htmlseg = `<tr>
            <td>${f.fact}</td><tr>`;
            html += htmlseg;
        });
        html += `</tbody></table></div>`;
        html = getParticularFact(name.value) + html;
        let body1 = document.querySelector(".addFacts");
        document.title = `${name.value}` + " facts";
        body1.innerHTML = html;
    } else {
        let html = `<h3 class="error">Please Enter anime Name which is present in anime list!!</h3>`;
        var facts = document.querySelector(".addFacts");
        facts.innerHTML = html;
    }
}
async function getFactsWithId(e) {
    e.preventDefault();
    var factid = document.getElementById("fact_id");
    var name = document.getElementById("anime_name").value;
    if (factid.value === "0") {
        getFacts(e);
        return;
    }
    const apiEndpoint = apiUrl + "v1/" + `${name}` + "/" + `${factid.value}`;
    const resp = await (await fetch(apiEndpoint)).json();
    if (resp.success === true) {
        let html = `
        <div class="Animefacts">
        
        <p>[ To get all facts enter 0 ]</p>
        <h4>Fact Number ${factid.value} about <label>${name}</label></h4>
        <table class="table table-hover">
        <thead>
        <tr>
        <th scope="col">Facts</th>
        </tr>
        </thead>
        <tbody>`;
        const data = resp.data;
        let htmlseg = `<tr>
        <td>${data.fact}</td><tr>`;
        html += htmlseg;
        html += `</tbody></table></div>`;
        let body1 = document.querySelector(".Animefacts");
        body1.innerHTML = html;
    } else {
        let html = `<p>[ To get all facts enter 0 ]</p><h3 class="error">Please Enter Valid Fact Number !!</h3>`;
        var facts = document.querySelector(".table");
        facts.innerHTML = html;
    }
}

async function getAnimeNames() {
    const apiEndpoint = apiUrl + "v1";
    const resp = await (await fetch(apiEndpoint)).json();
    if (resp.success === true) {
        const animes = [];
        const data = resp.data;
        data.forEach((anime) => {
            animes.push(anime.anime_name);
        });
        return animes;
    }
}
async function GenrateDropdown() {
    let html = "";
    animes = await getAnimeNames();
    animes.forEach((anime) => {
        let htmlseg = `<option value=${anime}>`;
        html += htmlseg;
    });
    var temp = document.querySelector("#AnimeNames");
    temp.innerHTML = html;
}

GenrateDropdown();
