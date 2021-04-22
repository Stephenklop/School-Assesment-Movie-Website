const apiKey = 'b3dc30d1b882188c9c0161b97d66f032';
const apiImageUrl = 'https://image.tmdb.org/t/p/original';

const connect = (link) => {
    return fetch(`https://api.themoviedb.org/3/${link}?api_key=${apiKey}`);
}

const connectSearch = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
}

// Movies
const getAllNowPlayingMovies = () => {
    return new Promise((result, reject) => {
        connect('movie/now_playing')
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getAllUpcomingMovies = () => {
    return new Promise((result, reject) => {
        connect('movie/upcoming')
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getPopularMovies = () => {
    return new Promise((result, reject) => {
        connect('movie/popular')
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getAllTrendingMovies = () => {
    return new Promise((result, reject) => {
        connect('trending/movie/week')
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getMovieDetails = (movieId) => {
    return new Promise((result, reject) => {
        connect(`movie/${movieId}`)
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getMovieCredits = (movieId) => {
    return new Promise((result, reject) => {
        connect(`movie/${movieId}/credits`)
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getMovieSocials = (movieId) => {
    return new Promise((result, reject) => {
        connect(`movie/${movieId}/external_ids`)
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getMovieReviews = (movieId) => {
    return new Promise((result, reject) => {
        connect(`movie/${movieId}/reviews`)
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

// TV Shows
const getAllTrendingTVShows = () => {
    return new Promise((result, reject) => {
        connect('trending/tv/week')
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

// Cast
const getPersonDetails = (personId) => {
    return new Promise((result, reject) => {
        connect(`person/${personId}`)
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

const getPersonSocials = (personId) => {
    return new Promise((result, reject) => {
        connect(`person/${personId}/external_ids`)
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}

// Search
const searchInApi = (query) => {
    return new Promise((result, reject) => {
        connectSearch(query)
        .then(data => {
            return data.json();
        })
        .then(res => result(res))
        .catch(err => reject(err));
    });
}