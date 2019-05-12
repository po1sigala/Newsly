//documentready the thing

//below are our global variables
//storing the sources we want to search for
// var search = ""; //user search will be a "this.val" object i can call once the html is set up for the search bar

//trying to dynamically create custom col breaks so if its on card col-md-12

// var numColumns= 12;
// if (numOfCards=1)

$(document).ready(function() {
  //below we enable our popover 
  $(function () {
    $('[data-toggle="popover"]').popover()
  })
  var numOfCards = 0;

  //clear out the example cards
  $(".cardRow1").empty();

  //get the trending topic
  searchSites("us", "headline");
  // on ready we want any last searched terms to be displayed from local storage
  $("#lastSearch").text(localStorage.getItem("lastSearch"));

  //query our news api for our users search when they click search
  $("#searchButton").on("click", function() {
    clearPassAndStore();
  });

  //make pressing the enter key do the same thing as hitting submit
  $(document).on("keypress",function(enter){
    if(enter.which==13){
      //first prevent the defulat function of refreshing the page
      event.preventDefault();
      clearPassAndStore();
    }
  }) 
  //make clicking the last searched text queries the api the same way as if we typed and submitted that text in the search box
  $(document).on("click", "#lastSearch", function(){
    console.log();
    $(".searchBox").val($("#lastSearch").text());
    clearPassAndStore();
  })

  //below is a function that listens for when user clicks an article link and stores it in memory
  $(document).on("click", ".siteLink", function() {
    $("#lastSite").empty();
    localStorage.clear("siteLink");
    var siteLink = $(this).val();
    if (siteLink=== null){
      siteLink="Trending";
      console.log(siteLink);
    }
    localStorage.setItem("siteLink", siteLink);
    var linktosite = $("<a>")
      .text($(this).attr("id"))
      .attr("href", siteLink)
      .attr("target", "_blank");
    $("#lastSite").append(linktosite);
  });
//below we have logic which governs our popovers. It should dismiss any popover on the users next click
  $('.popover-dismiss').popover({
    trigger: 'focus'
  })

  function emptyRows(){
    $(".cardRow1").empty()
    $(".cardRow2").empty()
    $(".cardRow3").empty()
    $(".cardRow4").empty()
    $(".cardRow5").empty()
    $(".cardRow6").empty()
    $(".cardRow7").empty()
  }

  function clearPassAndStore(){
    numOfCards = 0;

    emptyRows(); //clear out the example cards
    var search = $(".searchBox").val(); //deaclare a search variable set to the text of the search box
    //update page headline to reflect what user searched
    $("#searchTitle").text("Top Headline(s):" + search);
    console.log("the search was" + search);
    // get all boxes our user checked and put them into and array
    var checkedBoxes = $("input:checked")
      .map(function() {
        return this.id; //our arrary is composed of the id's of the buttons. these ids match the newsAPI id search keys
      })
      .get(); //turns our jQuery array into a javascript array

    //The nature of the sorting of this API's resonses means we have to use a for loop and run multiple queries if we want to ensure each source is queried for the input
    for (i = 0; i < checkedBoxes.length; i++) {
      var site = checkedBoxes[i]; //we are setting var site to the element at index i

      searchSites(search, "source", site); //we are running the searchsites function with the result of selectedsites{i}
    }
    // searchSites(selectedSites);//if working correctly search sites will run with a source parameter of i aka which site the user wants to check

    //below we want to add searches to local storage for next time the user loads
    localStorage.clear("lastSearch");
    localStorage.setItem("lastSearch", search);
    $("#lastSearch").text(localStorage.getItem("lastSearch"));
    
  }

  function searchSites(search, type, source) {
  
  console.log("you ran searchSites");
    //we need an if statment that gives an alert if our user didnt type anythign in the search bar. The  rest of the code will still run and give them either the top result from their site they searched or an article from trending if they also didnt specify a site.
    // if( search=== ""){
    
    //   $(function () {
    //     $('[data-toggle="popover"]').popover()
    //   })
      //dont think i need this code i switche dto a hover function instead of a cick becausue there was an issue with it relying on clicks so the order could mess up. i.e if i click two BLANK searches in a row the note ould disapear but i would want it to persist
    // }
    //next line of code says if our user pressed enter or clicked search lets search the sites the checked based on the query they input
    if (type === "source") {
      var newsQueryURL =
        // "https://newsapi.org/v2/sources?apiKey=2328e350ebab4672a9dfa7ce0fdddacd"
        //sources query. keep above commented out unless you just want to see the possible sources

        "https://newsapi.org/v2/everything?q=" + //queries all articles
        search +
        "&sources=" + //searches articles above for the text the user put in the text box and adds a input for specific sites
        source + //here we are populating the id's the API takes from our array. the id's of the checked boxes match the API source ID's
        "&pageSize=1" + //I am just taking the firts response that oure API gives us
        "&apiKey=2328e350ebab4672a9dfa7ce0fdddacd"; //my API key
    } else {
      //creating a new queries for top headlines in the country
      var newsQueryURL =
        "https://newsapi.org/v2/top-headlines?country=" +
        search +
        "&apiKey=2328e350ebab4672a9dfa7ce0fdddacd";
    }

    console.log(newsQueryURL); //debug to make sure the url is coming out ok
    $.ajax({
      url: newsQueryURL,
      method: "GET"
    }).then(function(response) {
      numOfCards++;
      var rowNum = Math.ceil(numOfCards / 3);
      console.log(newsQueryURL);
      console.log(response);
      //goal of this block is to create our card div with the image divs in it and append it to the card row

      var newimage = $("<img>")
        .attr("src", response.articles[0].urlToImage)
        .addClass("imgFit");
      //variable that contains the cardimage
      //added class here called imgFit which I hope targets the img and les me force it to fit the box via some css code

      var newDiv = $("<div>").addClass("post-image");
      //variable that contains the div that the card image goes in
      newDiv.append(newimage);
      //appending the new image into its div container

      var header = $("<h2>")
        .addClass("post-header")
        .text(response.articles[0].title);
      var summary = $("<p>").text(response.articles[0].description);
      var categoryTitle = $("<span>")
        .addClass("category")
        .text(response.articles[0].source.name);

      var linktosite = $("<a>")
        .addClass("btn btn-primary siteLink")
        .attr("href", response.articles[0].url)
        .attr("target", "_blank")
        .text("go to article")
        .attr("id", response.articles[0].title);

      var newsContentDiv = $("<div>").addClass("news-content");
      newsContentDiv
        .append(categoryTitle)
        .append(header)
        .append(summary)
        .append(linktosite);
      //
      var cardDiv = $("<div>").addClass("cards");
      //variable that contains my div where all the query cards go
      cardDiv.append(newDiv).append(newsContentDiv);
      //append the dive witg the image of the query into the div that contains the whole card

      var responsiveDiv = $("<div>").addClass("col-sm-4");
      //variable that holds the div which uses a bootstrap class to divide the 12 normal coumns by 4 to make 3 columns
      responsiveDiv.append(cardDiv);
      //append all the dynamically created card info into this div
      $(".cardRow" + rowNum).append(responsiveDiv);
      //append the card into the card section of the html

      //create our news content div divs in it and append that to the card div
      /* inside our carDiv I need news content div
                      inside news content I need span category, div post-meta, h2 post-header, and a p tag
              */

      /*
          make an img tag with link to image from the article
          put it in a div with class "post-image"
          put that in a  div with class "card"
          put that in a div with class "col-sm-4"
          append everythign to class cardRow
          */
    });
  }

  // below is where my twitter request is happening it should run when the page refreshes and get the trending tweets globally
});

//below is tester code im not sure if i want
// numOfCards++ this was under the response function
// //working on this following code to dynamiclaly create rows every three searches
// numRows= Math.ceil(numOfCards/3);//calculate the rows needed to house all the cards
// if (numRows>1){
//     console.log("numrows is" + numRows);
//     for (i=1;i<numRows;i++){//run a function the same number of times as i want rows created
//         // var spacing= $("<br>");
//         var newRow= $("<div>").addClass("row"+numRows);//row 2 row 3 etc etc depending on how many sources chosen
//         // newRow.append(spacing);
//         console.log("looped")//should pop up one less time than the value of numRows
//         $(".cardContainer").append(newRow);//put the new row in the card div

//     }
// }else{
// $(".cardRow").append(responsiveDiv);//otherwise just put it in the row already there if no new rows needed
// }

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
