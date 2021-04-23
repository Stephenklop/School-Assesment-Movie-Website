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