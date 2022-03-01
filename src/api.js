const searchBtn = document.querySelector(".search-button");
const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
    getTop();
});


async function getTop() {
    // const requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow',
    //     cookie: 'secure'
    // };

    // let key = `k_1m8l7rus`;
    let key = "k_7cj03z5n";
    // let key = "k_isw1pj75";
    // let key = "k_eg6q7641";

    let url = `https://imdb-api.com/API/MostPopularMovies/${key}`;
    let url1 = `https://imdb-api.com/API/MostPopularTVs/${key}`;

    let response = await fetch(url);
    let data = await response.json();
    let top = data.items;

    let responsee = await fetch(url1);
    let dataa = await responsee.json();
    let topp = dataa.items;

    // console.log(top);
    // console.log(topp);

    for (let i = 0; i < 20; i++) {

        let top50 = top[i];

        let top500 = topp[i];

        // console.log(top500);
        const area = document.querySelector(".movie-container");
        area.innerHTML += `<div class="movie">
                            <div class="movie-details">
                                <div class="movie-img">
                                    <img src=${top50.image}>
                                </div>
                                <div class="movie-desc">
                                    <span class="title">${top50.title}</span>
                                    <span class="type">${top50.fullTitle}</span>
                                    <span class="type">Movie</span>
                                    <span class="genres">${top50.rank}</span>
                                    <span class="year">${top50.rankUpDown}</span>
                                    <span class="imdb">${top50.imDbRating}<span style="color: #F5C518;">&#9733;</span></span>
                                    <span class="year">${top50.crew}</span>
                                </div>
                            </div>
                        </div>`;

        area.innerHTML += `<div class="movie">
                            <div class="movie-details">
                                <div class="movie-img">
                                    <img src=${top500.image}>
                                </div>
                                <div class="movie-desc">
                                    <span class="title">${top500.title}</span>
                                    <span class="type">${top500.fullTitle}</span>
                                    <span class="type">Series</span>
                                    <span class="genres">${top500.rank}</span>
                                    <span class="year">${top500.rankUpDown}</span>
                                    <span class="imdb">${top500.imDbRating}<span style="color: #F5C518;">&#9733;</span></span>
                                    <span class="year">${top500.crew}</span>
                                </div>
                            </div>
                        </div>`;
    }

}

getTop();

searchBtn.addEventListener("click", () => {
    const area = document.querySelector(".movie-container");
    area.innerHTML = "";
    const keyword = document.getElementById("search-input").value;
    // const api_key = "k_1m8l7rus";
    const api_key = "k_7cj03z5n";
    // const api_key = "k_isw1pj75";
    // const api_key = "k_53mpczb0";
    // const api_key = "k_eucmp4j8";
    const url = `https://imdb-api.com/en/API/SearchTitle/${api_key}/${keyword}`;

    if (keyword in localStorage) {
        const res = JSON.parse(localStorage.getItem(keyword));
        res.forEach(mov => {
            displayMovies(mov);
        });
    }

    else {
        getMoveId(url, keyword);
    }

});

async function getMoveId(url, keyword) {
    // const requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow',
    //     cookie: 'secure'
    // };

    let response = await fetch(url);
    let data = await response.json();
    let ids = data.results;


    const id_data = [];
    // console.log(id_data);

    for (let i = 0; i < ids.length; i++) {
        const movieId = ids[i].id;
        id_data.push(movieId);
    }

    const moviearr = [];


    id_data.forEach(id => {
        // const api_key = "k_1m8l7rus";
        const api_key = "k_7cj03z5n";
        // const api_key = "k_isw1pj75";
        // const api_key = "k_53mpczb0";
        // const api_key = "k_eucmp4j8";

        const url = `https://imdb-api.com/en/API/Title/${api_key}/${id}/FullCast,Posters,Trailer,Ratings,`;
        fetch(url)
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then((data) => {
                        moviearr.push(data);
                        displayMovies(data);
                        localStorage.setItem(`${keyword}`, JSON.stringify(moviearr));
                    });
                }
            )
            .catch(function (err) {
                alert('Error : ', err);
            });
    });
}

function displayMovies(movie) {

    const area = document.querySelector(".movie-container");
    const type = document.querySelector("#type");
    const val = type.options[type.selectedIndex].value;

    console.log(movie);

    if (movie.type == val) {
        area.innerHTML += `<div class="movie">
                            <div class="movie-details">
                                <div class="movie-img">
                                    <img src=${movie.image}>
                                </div>
                                <div class="movie-desc">
                                    <span class="title">${movie.title}</span>
                                    <span class="type">${movie.type}</span>
                                    <span class="genres">${movie.genres}</span>
                                    <span class="year">${movie.year}</span>
                                    <span class="pg">${movie.contentRating}</span>
                                    <span class="box-office">${movie.boxOffice.cumulativeWorldwideGross}</span>
                                    <span class="time">${movie.runtimeStr}</span>
                                    <span class="imdb">${movie.imDbRating}<span style="color: #F5C518;">&#9733;</span></span>
                                    <input type="button" class="${movie.id}" id="trailer" value="Watch Trailer">
                                    <div id="${movie.id}" class="video" style="visibility: hidden;" >
                                        <button id="close" onclick="closeTrailer()">
                                            x
                                        </button>
                                        <iframe id="${movie.id}src" class="${movie.trailer.imDbId}" src="${movie.id}src"></iframe>
                                    </div>
                                </div>
                            </div >
                        </div > `;

    }

    showTrailer();
}

function showTrailer() {
    const trailer = document.querySelectorAll('#trailer');

    trailer.forEach(e => e.addEventListener("click", () => {

        console.log(e.className + "input");

        let videoid = document.getElementById(e.className + "src");

        console.log(videoid.className);

        // const api_key = "k_1m8l7rus";
        const api_key = "k_7cj03z5n";
        // const api_key = "k_isw1pj75";
        // const api_key = "k_53mpczb0";
        // const api_key = "k_eucmp4j8";

        const url = `https://imdb-api.com/en/API/YouTubeTrailer/${api_key}/${videoid.className}`;

        fetch(url)
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then((data) => {
                        console.log(data.videoUrl);
                        videoid.src = data.videoUrl;
                    });
                }
            )
            .catch(function (err) {
                alert('Error : ', err);
            });

        document.getElementById(e.className).style.visibility = "visible";
    }));
}


function closeTrailer() {

    const close = document.querySelectorAll('#close');

    close.forEach(e => e.addEventListener("click", () => {
        console.log(e.parentElement.id);
        document.getElementById(e.parentElement.id).style.visibility = "hidden";
    }));
}
