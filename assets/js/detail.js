window.onload = async () => {
    const urlParams = getFromURL();
    const movieDetails = await getMovieDetails(urlParams.get("id"));
    const movieCredits = await getMovieCredits(urlParams.get("id"));
    const movieSocials = await getMovieSocials(urlParams.get("id"));

    console.log(movieDetails);
    console.log(movieCredits);
    console.log(movieSocials);
    
    setMovieDetails(movieDetails);
    setSocials(movieSocials);
    setCastCarousel(movieCredits);
}

getFromURL = () => {
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
}

setMovieDetails = (movieDetails) => {
    $('.detail__main-details__left-img').attr('src', apiImageUrl + movieDetails.poster_path);
    $('.detail__main-details__right-overview__desc').text(movieDetails.overview);
    $('.detail__main-details__right-stats__item--releasedate').text(convertDate(movieDetails.release_date));
    $('.detail__main-details__right-stats__item--runtime').text(convertRunTime(movieDetails.runtime));
    $('.detail__main-details__right-stats__item--director').text(`<p></p>`);

    // Set budget
    $('.detail__main-details__right-stats__item--budget').text(convertCurrency(movieDetails.budget));

    // Set revenue
    $('.detail__main-details__right-stats__item--revenue').text(convertCurrency(movieDetails.revenue));

    // Set genres
    let genreString = "";   
    for(let k = 0; k < movieDetails.genres.length; k++){
        if(k !== movieDetails.genres.length - 1) {
            genreString += movieDetails.genres[k].name + ", ";
        } else {
            genreString += movieDetails.genres[k].name;
        }
    }
    $('.detail__main-details__right-stats__item--genre').text(genreString);

    // Set status
    $('.detail__main-details__right-stats__item--status').text(movieDetails.status);

    // Set language
    let languageString = "";
    for(let j = 0; j < movieDetails.spoken_languages.length; j++) {
        if(j !== movieDetails.spoken_languages.length - 1) {
            languageString += movieDetails.spoken_languages[j].name + ", ";
        } else {
            languageString += movieDetails.spoken_languages[j].name;
        }
    }
    $('.detail__main-details__right-stats__item--language').text(languageString);

    // Set production
    let productionString = "";
    for(let i = 0; i < movieDetails.production_companies.length; i++) {
        if(i !== movieDetails.production_companies.length - 1) {
            productionString += movieDetails.production_companies[i].name + ", ";
        } else {
            productionString += movieDetails.production_companies[i].name;
        }
    }
    $('.detail__main-details__right-stats__item--production').text(productionString);
}

setSocials = (movieSocials) => {
    if(movieSocials.facebook_id) {
        appendSocialToList(`https://facebook.com/${movieSocials.facebook_id}`, 'logo-facebook');
    }

    if(movieSocials.instagram_id) {
        appendSocialToList(`https://instagram.com/${movieSocials.instagram_id}`, 'logo-instagram');
    }

    if(movieSocials.twitter_id) {
        appendSocialToList(`https://twitter.com/${movieSocials.twitter_id}`, 'logo-twitter');
    }
}

appendSocialToList = (link, logoName) => {
    $('.detail__main-details__right-external').append(`
    <li class="detail__main-details__right-external__item">
        <a href="${link}" target="_blank">
            <ion-icon name="${logoName}"></ion-icon>
        </a>
    </li>
    `)
}

setCastCarousel = (movieCredits) => {
    var $castCarousel = $('.cast-carousel').flickity({
        pageDots: false,
        prevNextButtons: false,
        cellAlign: 'left',
        accessibility: true,
        contain: true,
        lazyLoad: movieCredits.cast.length
    });

    fillCastCarousel($castCarousel, movieCredits);
}

fillCastCarousel = async ($castCarousel, apiResultCast) => {
    for(let i = 0; i < apiResultCast.cast.length; i++) {
        var $cellElems = $(makeCellHtmlDetail('cast-carousel', apiResultCast.cast[i]));
        $castCarousel.flickity( 'append', $cellElems );
        console.log(apiResultCast.cast[i]);
    }
}

const makeCellHtmlDetail = (itemClass, item) => {
    if(item.profile_path) {
        return `
            <div class="${itemClass}__item">
                <a href="castDetail.html?id=${item.id}" class="${itemClass}__item-link">
                    <img src="./assets/img/movieLazyload.png" data-flickity-lazyload-srcset="${apiImageUrl + item.profile_path}" alt="${item.title}" class="${itemClass}__item-img" />
                    <h2 class="${itemClass}__item-name">${item.name}</h2>
                    <div class="${itemClass}__item-character">${item.character}</div>
                </a>
            </div>
        `;
    } else {
        return `
        <div class="${itemClass}__item">
            <a href="castDetail.html?id=${item.id}" class="${itemClass}__item-link">
                <img src="./assets/img/movieLazyload.png" data-flickity-lazyload-srcset="./assets/img/movieLazyload.png" alt="${item.title}" class="${itemClass}__item-img" />
                <h2 class="${itemClass}__item-title">${item.name}</h2>
                <div class="${itemClass}__item-character">${item.character}</div>
            </a>
        </div>
    `;
    }
}

convertDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
}

convertCurrency = (currency) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(currency);
}