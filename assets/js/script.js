// To Do: Declare global variables
//const APIkey = AIzaSyA9qnL3RBSyVXPew7iMQDfMDrtnAcZk780

// Retrieve previous search results from local storage
const previousResults = JSON.parse(localStorage.getItem('previousResults')) || [];

// Display previous search results
const previousResultsContainer = document.getElementById('previous-results');
previousResults.forEach(result => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">${result.author}</p>
            
        </div>
    `;
    previousResultsContainer.appendChild(card);
});

// To Do : Add NYT Best Sellers API fetch function
// Function to fetch NYT Best Sellers API data
// function getBestSellersData() {
//     // API endpoint
//     const bestSellersAPI = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=AFYgXoe5pmVDuEA0fr01nWXwxIu38wYX';
//     console.log(bestSellersAPI);

// function getBestSellersData() {
//     // API endpoint
//     const bestSellersAPI = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=AFYgXoe5pmVDuEA0fr01nWXwxIu38wYX';
//     console.log(bestSellersAPI);
    // Fetch data from the API
//     fetch(bestSellersAPI)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     console.log(data);
//                     // To Do: Make use of data

//                     // Display books in the nyt-container
//                     const nytContainer = document.getElementById('nyt-container');
                    
//                     data.results.books.forEach(book => {
//                         const card = document.createElement('div');
//                         card.classList.add('card');
//                         card.innerHTML = `
//                             <div class="card-body">
//                                 <h5 class="card-title">${book.title}</h5>
//                                 <p class="card-text">Author: ${book.author}</p>
//                                 <p class="card-text">Genre: ${book.genre}</p>
//                             </div>
//                         `;
//                         nytContainer.appendChild(card);
//                     });
                    // Display books in the nyt-container
                    // const nytContainer = document.getElementById('nyt-container');
                    // data.results.books.forEach(book => {
                    //     const card = document.createElement('div');
                    //     card.classList.add('card');
                    //     card.innerHTML = `
                    //         <div class="card-body">
                    //             <h5 class="card-title">${book.title}</h5>
                    //             <p class="card-text">Author: ${book.author}</p>
                    //             <p class="card-text">Genre: ${book.genre}</p>
                    //         </div>
                    //     `;
                    //     nytContainer.appendChild(card);
                    // });
                    
//                 });
//             } else {
//                 alert('Error: ' + response.statusText);
//             }
//         });
// }

// Call the getBestSellersData function to fetch data from the NYT Best Sellers API
// getBestSellersData();


//To Do: Link review button to review.html
window.onload = function() {
    let AddreviewButton = document.querySelector('#add-review');

    AddreviewButton.addEventListener('click', function(){
       window.location.href = 'review.html';
    });
};

//To Do: Add event listener for search form submission
// Select the search form element
const searchForm = document.querySelector("form");

// Add event listener for form submission
searchForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get the values from the search form inputs
   const title = document.getElementById("search-title").value;
   const author = document.getElementById("search-author").value;
    const genre = document.getElementById("search-genre").value;
    
    // Perform any necessary actions with the search values (e.g., fetch data, display results)
    
    // Reset the form after submission
    searchForm.reset();
});


//Logic for enabling the search modal
function openSearchModal() {
    var modal = document.getElementById('search-modal');
    modal.style.display = 'block';
        
};


//handle search for books
function handleSearchBooks(event) {
    event.preventDefault();

    let title = $('#search-title').val().trim();
    let author = $('#search-author').val().trim();
    let genre = $('#search-genre').val().trim();
    
    console.log('Title', title);
    console.log('Author', author);
    console.log('Genre', genre);

    let searchParams = { title, author, genre };

    let previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];

    previousSearches.push(searchParams);

    localStorage.setItem('previousSearches', JSON.stringify(previousSearches));

    getOpenLibaryData(title, author, genre);

};

document.addEventListener('DOMContentLoaded', function() {
    function displayPreviousSearches() {
        let previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        let previousResultsContainer = document.getElementById('previous-results');
    
        if (previousResultsContainer) {
        previousResultsContainer.innerHTML = ''; // Clear existing buttons
    
        previousSearches.forEach((search, index) => {
            let button = document.createElement('button');
            button.classList.add('previous-search-button');
            button.textContent = search.title || "Search " + (index + 1);
            button.onclick = function() { displaySearchResults(search); };
            previousResultsContainer.appendChild(button);
        });
        } else {
        console.error("Element with ID 'previous-results' not found.");
        }
    }

    function displaySearchResults(searchParams) {
        // Use the searchParams to fetch or retrieve the search results
        // For demonstration, this will just log the searchParams
        console.log("Displaying results for:", searchParams);
        
        // Assuming getOpenLibaryData can be modified or used as is to display results based on searchParams
        getOpenLibaryData(searchParams.title, searchParams.author, searchParams.genre);

        const resultsContainer = document.getElementById('searchResultsContainer');
        resultsContainer.innerHTML = `<p>Search Results for: ${searchParams.title}</p>`;
    }

    displayPreviousSearches();

})


function displaySearchResults(searchParams) {
    // Use the searchParams to fetch or retrieve the search results
    // For demonstration, this will just log the searchParams
    console.log("Displaying results for:", searchParams);
    
    // Assuming getOpenLibaryData can be modified or used as is to display results based on searchParams
    getOpenLibaryData(searchParams.title, searchParams.author, searchParams.genre);
}

function getOpenLibaryData(title, author, genre) {
    
    let openLibraryApi ='https://openlibrary.org/search.json?';
    //if else statment to sort provided parameters
    if (title) {
        openLibraryApi += 'title=' + title;
        if (author) {
            openLibraryApi += '&author=' + author;
            if (genre) {
                openLibraryApi += '&subject=' + genre           
             }
        } else if (genre) {
            openLibraryApi += '&subject=' + genre
        }
    } else if (author) {
        openLibraryApi += 'author=' + author;
        if (genre) {
            openLibraryApi += '&subject=' + genre;
        }
    } else if (genre) {
        openLibraryApi += 'subject=' + genre;
    } else {
        alert('Must input at least one search parameter');
        return;
    }
    
    console.log(openLibraryApi); 

    fetch(openLibraryApi)
        .then(function (response) {
         if (response.ok){
            response.json().then(function (data){
            console.log(data);
            
        
            //Todo: make use of data
            renderSearchResults(data);
            //after processing search hide the modal
             $('#search-modal').hide();    
            });
         } else {
          alert("Error: " + response.statusText);
        };     
        });
}

//Function to render serch results
function renderSearchResults(searchResults) {
    if (searchResults.length === 0) {
        alert("Search results not available");
        return;
    }

    // Clear previous search results
    document.getElementById('searchResultsContainer').innerHTML = '';

    searchResults.docs.forEach(doc => {
        const resultsCard = document.createElement('div');
        resultsCard.classList.add('resultsCard');

        const textContent = document.createElement('div');
        textContent.classList.add('card-text-content');
        
        resultsCard.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">Title: ${doc.title}</h5>
                <p class="card-text">Author: ${doc.author_name}</p>
                <p class="card-text">Ratings: ${doc.rating_average}</p>
            </div>
        `;

        resultsCard.appendChild(textContent);

        document.getElementById('searchResultsContainer').appendChild(resultsCard);

        let id = doc.cover_i;
                console.log(id);

            //Make another API call using the id
                if (id) {
                    fetch('https://covers.openlibrary.org/b/id/' + id + '-M.jpg')
                    .then(function (response){
                        if (response.ok) {
                            return response.blob();
                        } else {
                            alert("Error fetching cover image");
                        }
                    })
                    .then(function(blob){
                        //creating image element and src
                        let img =document.createElement('img');
                        img.src =URL.createObjectURL(blob);
                        img.classList.add('results-image');
                        //append to resultsCard
                        resultsCard.append(img);
                    })
                };
    });

}

//search submit event listener
$('#submitsearch').on('click', handleSearchBooks)


