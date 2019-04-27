//documentready the thing
//below are our global variables
//storing the sources we want to search for
var search = ""; //user search will be a "this.val" object i can call once the html is set up for the search bar


//-----------------------update the above class------------------------------------------------

$("#searchButton").on("click",function(){
//----------------------update the above class------------------------------------------------
console.log("clicked")
    search= $(this).val;//set the search variable to the text of the search box

    // get all checked boxes
   var checkedBoxes=$(".sources:checked").map(function(){
       return this.id;
   })
   .get();
    // get all ids from checked boxes
   
    // user all ids as array to for loop
    // look at jQuery map method

    for(i=0;i<checkedBoxes.length;i++){
        var site = checkedBoxes[i];//we are setting var site to the element at index i
        searchSites(site)//we are running the searchsites function with the result of selectedsites{i}

    }
    // searchSites(selectedSites);//if working correctly search sites will run with a source parameter of i aka which site the user wants to check

})
var searchSites= function(search, source){
    //were gonna need two query urls i think that will be called in two different ajax requests
    //the type of news we're looking for
    //takes the array and joins it and seperates by a comma makes an API request from all the sources
    // source=source.join(',')
    
    console.log(search);
    console.log(source);
    //source like what kind of 
    var newsQueryURL = 
    // " 
                        'https://newsapi.org/v2/everything?q='
                        + search +'&sources='
                        + source 
                        +"&pageSize=1"
                        + '&apiKey=2328e350ebab4672a9dfa7ce0fdddacd';
// this will query the news API for our users searchinput and whatever source they selected
        console.log(newsQueryURL); //debug to make sure the url is coming out ok
    $.ajax({
        url: newsQueryURL,
        method: "GET"
    })
        .then(function(response){
            console.log(response)
            // var newCard="";//create the element with the classes to make it like our card example
            // var newImage="";//create an img link to the responses image 
            // var newLink="";//create a link to the response article
            // newCard.append(newImage).append(newLink)
            
        })

    var twitterQueryURL
    $.ajax({})
    
}
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