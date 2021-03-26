import pec2 from "./pec2";


/**
 * Exercise 1
 * @param movieId
 * @param titleSelector
 * @param infoSelector
 * @param directorSelector
 */
async function setMovieHeading (movieId, titleSelector, infoSelector, directorSelector) {
    let titleElement = document.querySelector(titleSelector);
    let infoElement = document.querySelector(infoSelector);
    let directorElement = document.querySelector(directorSelector);

    let movieInfo = await pec2.getMovieInfo(1);

    titleElement.innerHTML = movieInfo.name;
    infoElement.innerHTML = getMovieInfo(movieInfo.episodeID, movieInfo.release);
    directorElement.innerHTML = getDirector(movieInfo.director);
}

function getMovieInfo(episode, date) {
    return 'Episode ' + episode + '-' + date.split('-')[0];
}

function getDirector(director) {
    return 'Director: ' + director;
}

/**
 * Exercise 2
 * @returns {Promise<void>}
 * @param selectMovieSelector
 */
async function initMovieSelect (selectMovieSelector) {
    let selectMovie = document.querySelector(selectMovieSelector);
    let listMovies = await pec2.listMoviesSorted();

    addMoviesSelectFirstOption(selectMovie);
    addMovieOptions(selectMovie, listMovies);
}

function addMoviesSelectFirstOption(selectMovie) {
    let firstOption = document.createElement('option');
    firstOption.value = '';
    firstOption.appendChild(document.createTextNode('Select a movie'));
    selectMovie.appendChild(firstOption);
}

function addMovieOptions (selectMovie, listMovies) {
    for (let index in listMovies) {
        let option = document.createElement('option');
        option.value = listMovies[index].episodeID;
        option.appendChild(document.createTextNode(listMovies[index].name));
        selectMovie.appendChild(option);
    }
}

/**
 * Exercise 3
 * @returns {Promise<void>}
 */
async function setMovieSelectCallbacks () {
    let selectMovie = document.querySelector('#select-movie');

    selectMovie.addEventListener('change',(event) => {
        let id = event.target.value;

        if (id !== '') {
            /* Exercise 3*/
            changeHeader(id);
            /* Exercise 4*/
            addHomeWorldOptions(id)
        } else {
            removeHeader();
            deleteCharactersList();
            removeHomeWorldOptions();
        }

    });
}

function removeHeader()
{
    document.querySelector('.movie__title').innerHTML = '';
    document.querySelector('.movie__info').innerHTML = '';
    document.querySelector('.movie__director').innerHTML = '';
}

async function changeHeader (id) {
    let movieInfo = await pec2.getMovieInfo(id);

    document.querySelector('.movie__title').innerHTML = movieInfo.name;
    document.querySelector('.movie__info').innerHTML = getMovieInfo(movieInfo.episodeID, movieInfo.release);
    document.querySelector('.movie__director').innerHTML = getDirector(movieInfo.director);
}

/**
 * Exercise 4
 */
async function addHomeWorldOptions(id) {
    let homeWorldSelector = document.querySelector('#select-homeworld');
    homeWorldSelector.innerHTML = '';
    let data = await pec2.getMovieCharactersAndHomeworlds(id);

    addHomeWorldsSelectFirstOption(homeWorldSelector);
    addHomeWorldsOptions(homeWorldSelector, data);
    deleteCharactersList();
}


function addHomeWorldsSelectFirstOption(homeWorldSelect) {
    let firstOption = document.createElement('option');
    firstOption.value = '';
    firstOption.appendChild(document.createTextNode('Select a homeworld'));
    homeWorldSelect.appendChild(firstOption);
}

function addHomeWorldsOptions (homeWorldSelect, data) {
    let listHomeWorlds = [];

    for (let index in data.characters) {

        if (listHomeWorlds.includes(data.characters[index].homeworld) === false) {
            let option = document.createElement('option');
            option.value = data.characters[index].homeworld;
            option.appendChild(document.createTextNode(data.characters[index].homeworld));
            homeWorldSelect.appendChild(option);
        }
        listHomeWorlds.push(data.characters[index].homeworld);
    }
}

function removeHomeWorldOptions () {
    document.querySelector('#select-homeworld').innerHTML = '';
}

function deleteCharactersList () {
    document.querySelector('.list__characters').innerHTML = '';
}

/**
 * Exercise 5
 */
async function addChangeEventToSelectHomeworld () {
    let homeWorldSelector = document.querySelector('#select-homeworld');

    homeWorldSelector.addEventListener('change',(event) => {
        deleteCharactersList();
        let homeworld = event.target.value;

        let moviesSelect = document.querySelector('#select-movie');
        let movieId = moviesSelect.options[moviesSelect.selectedIndex].value;

        if (homeworld !== '' && movieId !== '') {
            getMovieCharactersAndHomeworlds(movieId, homeworld);
        }
    });
}

async function getMovieCharactersAndHomeworlds (movieId, homeworld) {
    let data = await pec2.getMovieCharactersAndHomeworlds(movieId);
    getCharactersBySelectedMovieAndHomeWorld(data, homeworld);
}

function getCharactersBySelectedMovieAndHomeWorld (data, homeworld) {
    let characters = [];
    for (let index in data.characters) {
        if (data.characters[index].homeworld === homeworld) {
            characters.push(data.characters[index]);
        }
    }
    printCharactersInfo(characters);
}

function printCharactersInfo (characters) {
    let list = '';

    for (let i in characters) {
    list = list +
            '<li class="list__item item character">\n' +
                    '<img src="' + user_image + '" class="character__image" />\n' +
                    '<h2 class="character__name">' + characters[i].name + '</h2>\n' +
                    '<div class="character__birth"><strong>Birth Year:</strong> ' + characters[i].birth_year + '</div>\n' +
                    '<div class="character__eye"><strong>Eye color:</strong> ' + characters[i].eye_color + '</div>\n' +
                    '<div class="character__gender"><strong>Gender:</strong> ' + characters[i].gender + '</div>\n' +
                    '<div class="character__home"><strong>Home World:</strong> ' + characters[i].homeworld + '</div>\n' +
            '</li>';
    }

    document.querySelector('.list__characters').innerHTML = list;
}

export default {
    setMovieHeading,
    initMovieSelect,
    setMovieSelectCallbacks,
    addChangeEventToSelectHomeworld
}