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
