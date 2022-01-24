const apiUrl = "https://anime-facts-rest-api.herokuapp.com/api/";
async function getAnimeList() {
    const apiEndpoint = apiUrl + "v1";
    const resp = await (await fetch(apiEndpoint)).json();
    if (resp.success === true) {
        let html = "";
        const data = resp.data;
        data.forEach((anime) => {
            let htmlseg = `<tr><td>${anime.anime_id}</td>
            <td>${anime.anime_name}</td>
            <td><img src="${anime.anime_img}" class="image"></img></td><tr>`;
            html += htmlseg;
        });
        let body1 = document.querySelector(".body1");
        body1.innerHTML = html;
    }
}
getAnimeList();
