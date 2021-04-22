const maxMoviesCarousel = 5;

window.onload = async () => {
    const movieUpcoming = await getAllUpcomingMovies();

    setCarousel(movieUpcoming);
    setMovieCarousel();
    setSearch();
    setAddMovie();
}

/* Carousel */
const setCarousel = (movieUpcoming) => {
    const $carousel = $('.carousel').flickity({
        pageDots: false,
        prevNextButtons: false,
        draggable: false,
        freeScroll: false,
        autoPlay: 8000,
        setGallerySize: false,
        adaptiveHeight: false,
        lazyLoad: movieUpcoming.results.length
    });

    fillCarousel($carousel, movieUpcoming);
}

const fillCarousel = async ($carousel, apiResultUpcomingMovies) => {
    for(let i = 0; i < apiResultUpcomingMovies.results.length; i++) {
        const movieDetails = await getMovieDetails(apiResultUpcomingMovies.results[i].id);
        console.log(movieDetails);
        var $cellElems = $(makeCellHtmlMain(movieDetails));
        $carousel.flickity( 'append', $cellElems );
    }
}


// Initialize carousels
const setMovieCarousel = () => {
    getAllTrendingMovies()
    .then(res => {
        var $movieCarousel = $('.movie-carousel').flickity({
            pageDots: false,
            prevNextButtons: false,
            cellAlign: 'left',
            accessibility: true,
            contain: true,
            lazyLoad: res.results.length
        });
    
        fillMovieCarousel($movieCarousel, res);
    });
}

const fillMovieCarousel = async ($movieCarousel, apiResultMovie) => {
    console.log(apiResultMovie);
    for(let i = 0; i < apiResultMovie.results.length; i++) {
        var $cellElems = $(makeCellHtml('movie-carousel', apiResultMovie.results[i]));
        $movieCarousel.flickity( 'append', $cellElems );
    }

    console.log(apiResultMovie);
}

const makeCellHtml = (itemClass, item) => {
    return `
        <div class="${itemClass}__item">
            <a href="detail.html?id=${item.id}" class="${itemClass}__item-link">
                <img src="./assets/img/movieLazyload.png" data-flickity-lazyload-srcset="${apiImageUrl + item.poster_path}" alt="${item.title}" class="${itemClass}__item-img" />
                <h2 class="${itemClass}__item-title">${item.title}</h2>
            </a>
        </div>
    `;
}

/** Add to makeCellHtml for rating
 * <div class="${itemClass}__item-rating">RATING</div>
 */

const makeCellHtmlMain = (item) => {
    return `
        <div class="carousel__item">
            <div class="carousel__item-gradient"></div>
            <div class="carousel__item-info">
                <h1 class="carousel__item-info__title">${item.title}</h1>
                <div class="carousel__item-info__rating">
                    <p class="carousel__item-info__rating-reviews">${item.vote_count} Reviews</p>
                    <p class="carousel__item-info__rating-year">${convertDateYearOnly(item.release_date)}</p>
                    <p class="carousel__item-info__rating-length">${convertRunTime(item.runtime)}</p>
                </div>
                <p class="carousel__item-info__desc">${item.overview}</p>
            </div>
            <img alt="${item.title}" rel="noreferrer" data-flickity-lazyload-srcset="${apiImageUrl + item.backdrop_path}" class="carousel__item-backdrop" />
        </div>
    `
}

/** Add to makeCellHtmlMain for trailer button
 * 
 * <button class="carousel__item-info__trailer">
                    <span><ion-icon name="caret-forward-outline"></ion-icon></span>
                    <span>Watch Trailer</span>
                </button>
 */

const convertDateYearOnly = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate);
}

const convertRunTime = (runtime) => {
    let hours = (runtime / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}min`;
}

const setSearch = () => {

    // Initialize all search components when clicked on search button
    $('.navigation__list-item__search').on("click", () => {
        const search = document.querySelector('.search');
        const details = document.querySelector('.search-results');

        console.log('item clicked');

        // Check if search bar is already initialized 
        if(search.classList.contains("search-active")) {

            // Remove class from the search bar
            search.classList.remove("search-active");

            // Empty the search bar
            search.value = "";

            // Remove class from the search details bar
            details.classList.remove('search-results-active');
        } else {

            // If search bar is not initialized yet, add class to the search bar
            search.classList.add("search-active");
        }
    });

    $(".search").on("keyup", async () => {
        const query = $(".search").val();
        $(document.body).css("overflow", "hidden");

        if(query !== "") {
            document.querySelector('.search-results').classList.add("search-results-active");
        } else {
            document.querySelector('.search-results').classList.remove("search-results-active");
            $(document.body).css("overflow", "unset");
        }

        $(".search-results__for").text(`Results For: ${query}`);
        $('.search-results__results').empty();

        const searchResults = await searchInApi(query);

        for(let i = 0; i < searchResults.results.length; i++) {
            if(searchResults.results[i].poster_path !== null) {
                $('.search-results__results').append(`
                <div class="search-results__results-item">
                    <a href="detail.html?id=${searchResults.results[i].id}" class="search-results__results-item__link">
                        <img alt="${searchResults.results[i].title}" src="${apiImageUrl + searchResults.results[i].poster_path}" class="search-results__results-item__img">
                        <h2 class="search-results__results-item__title">${searchResults.results[i].title}</h2>    
                    </a>
                </div>
            `)
            } else {
                $('.search-results__results').append(`
                <div class="search-results__results-item">
                    <a href="detail.html?id=${searchResults.results[i].id}" class="search-results__results-item__link">
                        <img alt="${searchResults.results[i].title}" src="./assets/img/movieLazyload.png" class="search-results__results-item__img">
                        <h2 class="search-results__results-item__title">${searchResults.results[i].title}</h2>    
                    </a>
                </div>
            `)
            }
        }
    });
}

const setAddMovie = () => {
    $('.navigation__list-item__addmovie').on("click", () => {
        document.querySelector('.addmovie').classList.toggle("addmovie-active");
    });
}

$('.addmovie__form-back').on('click', () => {
    console.log('back');
    document.querySelector('.addmovie').classList.remove('addmovie-active');
});