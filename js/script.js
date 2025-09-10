import { getMovieReviewData } from './data.js' // Import the function to get movie review data

// Initialize the app: fetch data and update statistics
function init() {
   const movieReviewData = getMovieReviewData(); // Get movie review data (array of arrays)
   paintStatistics(movieReviewData); // Update statistics on the page
   painMovieData(movieReviewData);
}

// Calculate and display movie statistics
function paintStatistics(movieReviewData) {
   // Flatten the nested array to a single array of reviews
   const flatReview = movieReviewData.flat(); 
   const totalMovies = movieReviewData.length
   const totalReviews = flatReview.length; // Total number of reviews
   const totalRating = flatReview.reduce((acc, item) => {
      return acc + item.rating; // Sum all ratings
   }, 0);
   const averageRating = (totalRating / totalReviews).toFixed(2); // Calculate average rating

   // Showing the datas in the web page
   const totalMoviesEL = document.getElementById('tMoviesID');
   addState(totalMoviesEL, totalMovies);
   
   const averageMovieRating = document.getElementById('tAverageRating');
   addState(averageMovieRating, averageRating);
   
   const totalReviewsID = document.getElementById('tReviewsID');
   addState(totalReviewsID, totalReviews);
   
}

function addState(elem, value) {
   const spanElem = document.createElement("span");
   spanElem.classList.add("text-6xl")
   spanElem.innerText = value;
   elem.appendChild(spanElem);
}

function painMovieData(movieReviewData) {
   const flatReviewData = movieReviewData.flat();
   const movieListEL = document.querySelector('#movieListID UL');
   
   flatReviewData.map(movie => {
      const liElem = document.createElement("li");
      liElem.classList.add('card', 'my-2', 'p-2');

      const titleElem = document.createElement("p");
      titleElem.classList.add('text-xl', 'mb-2');
      titleElem.innerText = `${movie.title} - ${movie.rating}`;
      liElem.appendChild(titleElem);

      const reviewElem = document.createElement("p");
      reviewElem.classList.add('mx-2', 'mb-2');
      reviewElem.innerText = `${movie.content}`;
      liElem.appendChild(reviewElem);

      const byElem = document.createElement("p");
      byElem.classList.add('mx-2', 'mb-2');
      byElem.innerText = `${movie.by} on ${new Intl.DateTimeFormat(
        'en-BD'
      ).format(movie.on)}`;
      liElem.appendChild(byElem);

      movieListEL.appendChild(liElem)
   })
}

console.log(getMovieReviewData());

init(); // Run the initialization