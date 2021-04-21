window.onload = async () => {
    const urlParams = getFromURL();
    const personDetails = await getPersonDetails(urlParams.get("id"));
    const personSocials = await getPersonSocials(urlParams.get("id"));

    console.log(personDetails);
    console.log(personSocials);

    setCastDetails(personDetails);
    setSocials(personSocials);
}

getFromURL = () => {
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
}

setCastDetails = (personDetails) => {
    $('.castDetail__main-details__left-img').attr('src', apiImageUrl + personDetails.profile_path);
    $('.castDetail__main-details__right-overview__name').text(personDetails.name);
    $('.castDetail__main-details__right-overview__desc').text(personDetails.biography);
    $('.castDetail__main-details__right-stats__item--knownfor').text(personDetails.known_for_department);
    $('.castDetail__main-details__right-stats__item--born').text(personDetails.birthday);
    $('.castDetail__main-details__right-stats__item--placeofbirth').text(personDetails.place_of_birth);
}

setSocials = (personSocials) => {
    if(personSocials.facebook_id) {
        appendSocialToList(`https://facebook.com/${personSocials.facebook_id}`, 'logo-facebook');
    }

    if(personSocials.instagram_id) {
        appendSocialToList(`https://instagram.com/${personSocials.instagram_id}`, 'logo-instagram');
    }

    if(personSocials.twitter_id) {
        appendSocialToList(`https://twitter.com/${personSocials.twitter_id}`, 'logo-twitter');
    }
}

appendSocialToList = (link, logoName) => {
    $('.castDetail__main-details__right-external').append(`
    <li class="castDetail__main-details__right-external__item">
        <a href="${link}" target="_blank">
            <ion-icon name="${logoName}"></ion-icon>
        </a>
    </li>
    `)
}