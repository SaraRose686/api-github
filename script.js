"use strict";


const searchURL = ["https://api.github.com/users/","/repos"];

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $("#results-list").empty();
    // iterate through the results
    if(responseJson.length > 0 ) {
        responseJson.forEach( result => $("#results-list").append(
            `<li><h3><a href="${result.html_url}">${
                result.name
            }</a></h3>
            <p>${result.description}</p>
            </li>`
        ));
        //display the results section
        $("#results").removeClass("hidden");
        $("#js-error-message").empty();
    }
    else {
        $("#js-error-message").text(`No results found.`);
        $("#results").addClass("hidden");
    }
    
}

function getRepo(query) {

    const url = searchURL[0] + query + searchURL[1];
    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Something went wrong: ${err.message}`);
            $("#results").addClass("hidden");
        });
}

function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        const searchUser = $("#js-search-user").val();
        getRepo(searchUser);
    });
}

$(watchForm);
