const menu = document.querySelector('.menu');
const body = document.querySelector('body');
const sunButton = document.querySelector('#sun-button');
const moonButton = document.querySelector('#moon-button');
sunButton.addEventListener('click', lightMode);
moonButton.addEventListener('click', darkMode);

const movieList = document.querySelector("#movie-container");
const moviePageHeader = document.querySelector("#movie-page-header");
const movieInfo = document.querySelector("#movie-info");
const genresContainer = document.querySelector("#genres-container");
const moviePageMedia = document.querySelector("#movie-page-media");
const moviePageDirectors = document.querySelector("#directors-container");
const moviePageCast = document.querySelector("#cast-container");
const moviePageDescription = document.querySelector("#movie-page-description");

const homeButton = document.querySelector("#home-button");
homeButton.addEventListener('click', () => {
    resetPage();
});

const displayShowInfo = (show) => {
    // Clear the modal or the show info section
    resetPage();
    // Create and append the show info elements to the modal or section
        const title = document.createElement('h2');
        title.display = 'inline-block';
        title.style.marginBottom = "0.5rem";
        title.innerHTML += show.title;
        moviePageHeader.append(title);

        const showInfo = document.createElement('h6');
        showInfo.display = 'inline-block';
        const showType = document.createElement('span');
        showType.classList.add('show-type');
        showType.style.color = "rgb(101, 145, 255)";

        const bulletPoint = document.createElement('span');
        bulletPoint.textContent = " • ";
        const bulletPoint2 = document.createElement('span');
        bulletPoint2.textContent = " • ";

        const showYear = document.createElement('span');
        showYear.classList.add('show-year');
        showYear.style.color = "rgb(101, 145, 255)";

        const runtime = document.createElement('span');
        runtime.style.color = "rgb(101, 145, 255)";

        if (show.showType == 'series') {
            showType.textContent = "TV Series";
            if (show.firstAirYear == show.lastAirYear) {
                showYear.textContent = "(" + show.firstAirYear + ")";
            } else {
                showYear.textContent = "(" + show.firstAirYear + '-' + show.lastAirYear + ")";
            }
            // runtime.innerHTML = minutesToHours(show.episodeRuntimes[0]);
        } else {
            showType.textContent = "Movie";
            showYear.textContent = "(" + show.releaseYear + ")";
            runtime.innerHTML = minutesToHours(show.runtime);
        }
        showInfo.appendChild(showType);
        showInfo.appendChild(bulletPoint);
        showInfo.appendChild(showYear);
        showInfo.appendChild(bulletPoint2);
        showInfo.appendChild(runtime);
        movieInfo.append(showInfo);


        // create genres and append to genres container
        const showGenres = document.createElement('h6');
        showGenres.display = 'inline-block';
        const maxGenres = Math.min(show.genres.length, 3);
        for (let i = 0; i < maxGenres; i++){
            const genresSpan = document.createElement('span');
            genresSpan.classList.add("genre");
            genresSpan.style.color = "var(--creatorsStarsGenresdarkColor)";
            genresSpan.textContent += show.genres[i].name;
            if(i < maxGenres - 1){
                genresSpan.innerHTML += ", ";
            };
            showGenres.appendChild(genresSpan);
        }
        genresContainer.append(showGenres);

    // create image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    // create image element and append to image container
    const img = document.createElement('img');
    img.src = show.imageSet.verticalPoster.w720;
    img.classList.add('movie-page-img');
    // create rating badge and append to image container
    const rating = document.createElement('span');
    rating.classList.add('badge');
    rating.innerText = (show.rating / 10).toFixed(1) + "/10";
    
    // append image container to movie media page
    imageContainer.appendChild(img);
    imageContainer.appendChild(rating);
    moviePageMedia.appendChild(imageContainer);

    // // create trailer iframe and append to movie media page
    // if(show.youtubeTrailerVideoLink){
    //     const iframe = document.createElement('iframe');
    //     const videoID = extractYouTubeVideoId(show.youtubeTrailerVideoLink);
    //     iframe.classList.add('movie-page-trailer');
    //     iframe.src = `https://www.youtube.com/embed/${videoID}`;
    //     iframe.allowFullscreen = true;
    //     moviePageMedia.append(iframe);
    // }
    
    // if(show.tagline){
    //     const tagline = document.createElement('p');
    //     tagline.innerHTML = show.tagline;
    //     tagline.display = 'block';
    //     tagline.style.marginBottom = 0;
    //     tagline.style.fontStyle = 'italic';
    //     tagline.style.fontWeight = 'bold';
    //     tagline.style.fontSize = '1.4rem';
    //     moviePageDescription.append(tagline);
    // }

    // create description and append to movie description page
    if(show.overview){
        const overview = document.createElement('p');
        overview.innerHTML = show.overview;
        overview.display = 'block';
        moviePageDescription.append(overview);
    }

    // create directors and append to movie directors page
    const director = document.createElement('h3');
    director.classList.add("directors");
    director.classList.add("crew");
    // function for creating directors
    function createDirectors(showType){
        let directors;
        const maxDirectors = Math.min(show.directors.length, 3);
        if (showType === "series") {
            directors = show.creators;
            director.innerHTML += "Creators: ";
        } else {
            directors = show.directors;
            director.innerHTML += "Director: ";
        }
        for (let i = 0; i < maxDirectors; i++) {
            const directorSpan = document.createElement('span');
            directorSpan.classList.add("director");
            directorSpan.style.color = "var(--creatorsStarsGenresdarkColor)";
            directorSpan.textContent = directors[i];
            // if not last director, add comma after name
            if (i < maxDirectors - 1) {
                directorSpan.textContent += ", ";
            }
            director.appendChild(directorSpan);
        }
    }
    // call createDirectors function passing in show type
    createDirectors(show.showType);
    moviePageDirectors.appendChild(director);
    moviePageDirectors.classList.add("bottom-line");

    if(show.cast){
        const cast1 = document.createElement('h3');
        cast1.classList.add("casts");
        cast1.classList.add("crew");
        cast1.innerHTML += "Stars: ";
        const maxActors = Math.min(show.cast.length, 3);
        for (let i = 0; i < maxActors; i++) {
            const actorSpan = document.createElement('span');
            actorSpan.classList.add("actor");
            actorSpan.style.color = "var(--creatorsStarsGenresdarkColor)";
            actorSpan.textContent += show.cast[i];
            if(i < maxActors - 1){
                actorSpan.textContent += ", ";
            }
            cast1.appendChild(actorSpan);
        }
        moviePageCast.appendChild(cast1);
        moviePageCast.classList.add("bottom-line");
    }
};


const createShowButtons = (shows) => {
    resetPage();
    if(shows.length === 0) {
        const noResults = document.createElement('h3');
        noResults.innerHTML = 'Sorry. No results matched your search criteria.';
        noResults.style.margin = '10% auto';
        movieList.append(noResults);    
    } else {
        for(let show of shows) {
            if(show.imageSet.verticalPoster.w720) {
                const img = document.createElement('img');
                img.src = show.imageSet.verticalPoster.w720;
                img.classList.add('movie-img');
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
                img.addEventListener('click', () => {
                    displayShowInfo(show);
                });
                movieList.append(img);
            }
        }
    }
}


const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchValue = searchInput.value;
    searchInput.value = '';

    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: searchValue }),
        });

        if (!response.ok) {
            throw new Error(`Network response error: ${response.statusText}`);
        }

        const data = await response.json();
        createShowButtons(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
