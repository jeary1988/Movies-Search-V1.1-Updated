// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
    

$('#movieForm').on('submit', function(e){
    var searchMovie = $('#movieName').val();
    console.log(searchMovie); 
    fetchMovies(searchMovie);
        e.preventDefault();
  });
  
/*---------------fetch movies------------------*/
    
function fetchMovies(searchMovie){
  $.ajax({
    method:'GET',
    url:'http://www.omdbapi.com/?apikey=80fe09c6&s='+searchMovie
  }).done(function(data){
    console.log(data);  
    var moviesArray = data.Search;
    var output = '';
    $.each(moviesArray, function(index, movie){
      output += `
        <li>

 <a  onclick="movieClicked('${movie.imdbID}')" href="movie.html" class="item-link item-content">
        <div class="item-media"><img src="${movie.Poster}">
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">${movie.Title}</div>
            <div class="item-after"><br><br> ${movie.Year}</div>
          </div>
        </div>
      </a>

    </li>
      `;
    });
    $('#movieslist').html(output);
  });
}
   


 }); /*---------end of onDeviceready function ------------*/
    


function movieClicked(id){
  sessionStorage.setItem('movieId', id);
}




myApp.onPageInit('movie', function (page) {
    var movieId = sessionStorage.getItem('movieId');
    getMovie(movieId);
    
    $$('.page').css('background', 'url("img/023-natalie-wood-theredlist.jpg") no-repeat center center fixed');
    $$('.page').css('background-size', 'cover');       
   $$('.layer').css('background', 'rgba(0, 0, 0, .9)').css('height', '100%');

}) /*------- end of movie page scripting -----*/ 

    // Get Single Movie
function getMovie(movieId){
  $.ajax({
    method:'GET',
     url:'http://www.omdbapi.com/?apikey=80fe09c6&i='+movieId
  }).done(function(movie){
   console.log(movie);
    var movieDetails = `
     <div class="card">
          <img src="${movie.Poster}">    
            <ul>
      <i class="far fa-calendar-alt"></i>&#160;&#160;<strong>Released: ${movie.Released}</strong><br><br>
      <strong>Genre: ${movie.Genre}</strong> <br><br>
      <i class="far fa-star"></i>&#160; <strong> Rated: ${movie.Rated}</strong> <br><br>
     <i class="far fa-clock"></i>&#160; <strong>Runtime: ${movie.Runtime} </strong> <br><br>
         <i class="far fa-star"></i>&#160;<strong>IMDB Rating: ${movie.imdbRating} </strong> <br><br>
      <i class="fab fa-imdb"></i>&#160;&#160;<strong>Votes: ${movie.imdbVotes} </strong> <br><br>
     <i class="fas fa-users"></i> &#160;<strong>Actors:  ${movie.Actors} </strong><br>
     <div class="card-footer"><strong> Director:</strong> ${movie.Director}</div>
            </ul>
       
        </div>
    `;

    $('#movieDetails').html(movieDetails);
  });
}
    


          

  