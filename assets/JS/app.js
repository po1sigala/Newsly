//documentready the thing
//below are our global variables
//storing the sources we want to search for
// var search = ""; //user search will be a "this.val" object i can call once the html is set up for the search bar

//trying to dynamically create custom col breaks so if its on card col-md-12
// var numOfCards=0;
// var numColumns= 12;
// if (numOfCards=1)

$("#searchButton").on("click", function() {
  //----------------------update the above class------------------------------------------------
  console.log("clicked");
  $(".cardRow").empty(); //clear out the example cards
  var search = $(".searchBox").val(); //set the search variable to the text of the search box

  // get all checked boxes
  var checkedBoxes = $("input:checked")
    .map(function() {
      console.log(this.id);
      return this.id;
    })
    .get();
  console.log(checkedBoxes);
  // get all ids from checked boxes

  // user all ids as array to for loop
  // look at jQuery map method

  for (i = 0; i < checkedBoxes.length; i++) {
    var site = checkedBoxes[i]; //we are setting var site to the element at index i
    // numbOfCards++
    searchSites(search, site); //we are running the searchsites function with the result of selectedsites{i}
  }
  // searchSites(selectedSites);//if working correctly search sites will run with a source parameter of i aka which site the user wants to check
});
var searchSites = function(search, source) {
  //were gonna need two query urls i think that will be called in two different ajax requests
  //the type of news we're looking for
  //takes the array and joins it and seperates by a comma makes an API request from all the sources
  // source=source.join(',')

  console.log(search);
  console.log(source);
  //source like what kind of
  var newsQueryURL =
    // "
    "https://newsapi.org/v2/everything?q=" +
    search +
    "&sources=" +
    source +
    "&pageSize=1" +
    "&apiKey=2328e350ebab4672a9dfa7ce0fdddacd";
  // this will query the news API for our users searchinput and whatever source they selected
  console.log(newsQueryURL); //debug to make sure the url is coming out ok
  $.ajax({
    url: newsQueryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    //create our card div with the image divs in it and append it to the card row
    var newimage = $("<img>").attr("src", response.articles[0].urlToImage);
    console.log(newimage);
    var newDiv = $("<div>").addClass("post-image");
    newDiv.append(newimage);
    var cardDiv = $("<div>").addClass("card");
    cardDiv.append(newDiv);

    var responsiveDiv = $("<div>").addClass("col-sm-4");
    responsiveDiv.append(cardDiv);
    $(".cardRow").append(responsiveDiv);

    //create our news content div divs in it and append that to the card div
    /* inside our carDiv I need news content div
                  inside news content I need span category, div post-meta, h2 post-header, and a p tag
             */
    var newsContentDiv = $("<div>").addClass("news-content");

    var categoryTitle = $("<span>")
      .addClass("category")
      .text(response.articles[0].source.name);
    var header = $("<h2>")
      .addClass("post-header")
      .text(response.articles[0].title);
    var summary = $("<p>").text(response.articles[0].description);
    newsContentDiv
      .append(categoryTitle)
      .append(header)
      .append(summary);
    cardDiv.append(newsContentDiv);

    /*
              make an img tag with link to image from the article
              put it in a div with class "post-image"
              put that in a  div with class "card"
              put that in a div with class "col-sm-4"
              append everythign to class cardRow
              */
  });

  var twitterQueryURL;
  $.ajax({});
};
/*fucntions section
  for dynamically created results
      dynamically create whatever the card class with the header and footer
      give it an img attr 
      give it a button on the bottom
      make the button link to the article
      give the button a special id for the hover funciton later
      set the header to the article title
      set the footer to some text from the article
  hover
      when hovering over buttons in the results section it shoudl preview the site
      hovering over any link should change the color
      hovering over the ticker shoudl sop the ticker
      hovering over the carosel should pause the carosel
      hovering over the arrows on the carosel should accent their color
  clicks
      clicking on a result button should take you to the article
      clicking the search button should run our dynamically created button fucntion
      clicking the check boxes should add them to some array that will be used for the API
  API
      twitter search API for ticker
      twitter share API fro creating tweets about what the user found
      NewsAPI to query sites
  */

/* var selectedSites= ["bleacher-report","bbc-news","reddit-r-all","fox-news", "cnn"]//empty array to contain the sites I want searched this array wil lget aded when user checks a box
  this was an array i made that is no longer necessary bc i wil be creating the array within  the search function using .map*/

/*below is a function I was using to check for checked boxes but is no longer necessary because It was extra work
  buy just using .map I can create an array every time a function runs
  $("clickboxid").on("click",function(){
      if(selectedSites.includes(this.attr("id"))){//this should say if our array contains an element that matches the clicked boxes id do something
          selectedSites.splice(selectedSites.indexof(this.attr("id")),0)//removes it from the array
      }else{
          selectedSites.push(this.attr("id"))//if its notin the array add it
      }
  })*/
