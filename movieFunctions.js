const resetPage = () => {
    moviePageCast.classList.remove("bottom-line");
    moviePageDirectors.classList.remove("bottom-line");
    movieInfo.innerHTML = '';
    moviePageDirectors.innerHTML = '';
    moviePageCast.innerHTML = '';
    movieList.innerHTML = '';
    moviePageHeader.innerHTML = '';
    moviePageMedia.innerHTML = '';
    moviePageDescription.innerHTML = '';
    genresContainer.innerHTML = '';
}

const minutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours == 0) return mins + "m";
    else if (mins == 0) return hours + "h";
    else return hours + "h " + mins + "m";
}

const lightMode = () => {
    moonButton.style.display = "inline-block";
    sunButton.style.display = "none";
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    const actorSpans = document.querySelectorAll('span.showYear, span.genre, span.actor, span.director');
    for (let i = 0; i < actorSpans.length; i++) {
        actorSpans[i].style.color = "var(--creatorsStarsGenreslightColor)";
    }
}

const darkMode = () => {
    sunButton.style.display = "inline-block";
    moonButton.style.display = "none";
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    const actorSpans = document.querySelectorAll('span.showYear, span.genre, span.actor, span.director');
    for (let i = 0; i < actorSpans.length; i++) {
        actorSpans[i].style.color = "var(--creatorsStarsGenresdarkColor)";
    }
}
