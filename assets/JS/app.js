//documentready the thing




//below are our global variables
//storing the sources we want to search for
// var search = ""; //user search will be a "this.val" object i can call once the html is set up for the search bar


//trying to dynamically create custom col breaks so if its on card col-md-12
// var numOfCards=0;
// var numColumns= 12;
// if (numOfCards=1) 

$(document).ready(function(){
    $("#lastSearch").text(localStorage.getItem("lastSearch"));
    // on ready we want any last searched terms to be displayed from local storage

$("#searchButton").on("click",function(){

    $(".cardRow1").empty();//clear out the example cards
    var search= $(".searchBox").val();//deaclare a search variable set to the text of the search box


        // get all boxes our user checked and put them into and array
    var checkedBoxes=$("input:checked").map(function(){
        return this.id;//our arrary is composed of the id's of the buttons. these ids match the newsAPI id search keys
        
    })
    .get();//turns our jQuery array into a javascript array
        
    //The nature of the sorting of this API's resonses means we have to use a for loop and run multiple queries if we want to ensure each source is queried for the input
    for(i=0;i<checkedBoxes.length;i++){
           var site = checkedBoxes[i];//we are setting var site to the element at index i
            
            searchSites(search, site)//we are running the searchsites function with the result of selectedsites{i}

        }
        // searchSites(selectedSites);//if working correctly search sites will run with a source parameter of i aka which site the user wants to check


        //below we want to add searches to local storage for next time the user loads
        localStorage.clear();
        localStorage.setItem("lastSearch",search);
        $("#lastSearch").text(localStorage.getItem("lastSearch"));
    
    // searchTwitter(search);

})
var searchSites= function(search, source){
    var newsQueryURL = 
                        'https://newsapi.org/v2/everything?q='//queries all articles
                        + search +'&sources='//searches articles above for the text the user put in the text box and adds a input for specific sites
                        + source //here we are populating the id's the API takes from our array. the id's of the checked boxes match the API source ID's
                        +"&pageSize=1"//I am just taking the firts response that oure API gives us
                        + '&apiKey=2328e350ebab4672a9dfa7ce0fdddacd';//my API key

        console.log(newsQueryURL); //debug to make sure the url is coming out ok
    $.ajax({
        url: newsQueryURL,
        method: "GET"
    })
        .then(function(response){
            console.log(response);
            //goal of this block is to create our card div with the image divs in it and append it to the card row

                var newimage= $("<img>").attr("src", response.articles[0].urlToImage ).addClass("imgFit");
                //variable that contains the cardimage
                //added class here called imgFit which I hope targets the img and les me force it to fit the box via some css code

                var newDiv = $("<div>").addClass("post-image")
                //variable that contains the div that the card image goes in
                newDiv.append(newimage);
                //appending the new image into its div container
                
                var header = $("<h2>").addClass("post-header").text(response.articles[0].title);
                var summary = $("<p>").text(response.articles[0].description);
                var categoryTitle= $("<span>").addClass("category").text(response.articles[0].source.name);


                var linktosite=$("<a>").addClass("btn btn-primary").attr("href",response.articles[0].url).attr("target", "_blank").text("go to article");


                var newsContentDiv=$("<div>").addClass("news-content")
                newsContentDiv.append(categoryTitle).append(header).append(summary).append(linktosite);
                //
                var cardDiv= $("<div>").addClass("card");
                //variable that contains my div where all the query cards go
                cardDiv.append(newDiv).append(newsContentDiv);
                //append the dive witg the image of the query into the div that contains the whole card

                var responsiveDiv = $("<div>").addClass("col-sm-4");
                //variable that holds the div which uses a bootstrap class to divide the 12 normal coumns by 4 to make 3 columns
                responsiveDiv.append(cardDiv);
                //append all the dynamically created card info into this div
                $(".cardRow1").append(responsiveDiv);
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
            
        })
    
}

// below is where my twitter request is happening it should run when the page refreshes and get the trending tweets globally
// var searchTwitter= function(search){
// var twitterQueryURL= "https://api.twitter.com/1.1/search/tweets.json?q="
//                       +search;
// $.ajax({
//     url: twitterQueryURL,
//     authorization: "basic 2424115598-HJLl6fWq6zt2lSfsfDw9DNPH9IazrmgoJ7X8PC8",
//     dataType:"jsonp",
//     method: "GET"
// })
//     .then(function(response){
        
//         console.log("twitter function is running")(response);
//     })
// }
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