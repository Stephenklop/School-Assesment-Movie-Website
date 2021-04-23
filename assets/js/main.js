const maxMoviesCarousel = 5;

window.onload = async () => {
    const movieUpcoming = await getAllUpcomingMovies();

    setCarousel(movieUpcoming);
    setMovieCarousel();
    setSearch();
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
        var $cellElems = $(makeCellHtmlMain(movieDetails));
        $carousel.flickity( 'append', $cellElems );
    }
}

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


/* Set Movie Carousel */
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

/* Secondary functions*/
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