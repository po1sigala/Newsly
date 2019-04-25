//documentready the thing
/* general thoughts below about building the logic

fucntions section

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




//API code below
//2328e350ebab4672a9dfa7ce0fdddacd news api
//2328e350ebab4672a9dfa7ce0fdddacd twitter api


//below are our global variables
var selectedSites= []//empty array to contain the sites I want searched this array wil lget aded when user checks a box
var search = ""; //user search will be a "this.val" object i can call once the html is set up for the search bar


/*below is a for loop that will take all the websites our user wants to check 
and pass them through the API request
*/

$("whateverthesubmitbuttonis").on("click", function(){
//update the above class


    search= $("whatever the serach box id is").val;//set the search variable to the text of the search box
    //update the above class

    for (i=0; i<selectedSites.length;i++){
        searchSites([i]);//if working correctly search sites will run with a source parameter of i aka which site the user wants to check
    }
})
var searchSites= function(source){
    //were gonna need two query urls i think that will be called in two different ajax requests
    var newsQueryURL = 'https://newsapi.org/v2/everything?q='
                        + search +'&sources='
                        + source 
                        + '&apiKey=2328e350ebab4672a9dfa7ce0fdddacd';
// this will query the news API for our users searchinput and whatever source they selected
        console.log(newsQueryURL); //debug to make sure the url is coming out ok
    $.ajax({
        url: newsQueryURL,
        method: "GET"
    })
        .then(function(response){
            console.log(response)
            var newCard=//create the element with the classes to make it like our card example
            var newImage=//create an img link to the responses image 
            var newLink=//create a link to the response article
            newCard.append(newImage).append(newLink)
            
        })

    var twitterQueryURL
    $.ajax({})
    
}
