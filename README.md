### Read Me

# NEWSLY

## Search for news across multiple platforms!
Our team wanted the user to be able to see how one topic is discussed across multiple platforms. The reason this site is useful is most people get news from one or two places and see a narrow view of the world.


**Technologies and Concepts Used**

* HTML
* CSS
* JavaScript
* Bootstrap
* JQuery
* Ajax
* API authorizations
* Local Storage

**Methods**

* We have global variables storing the sources we want to search for.
* That mean any last searched terms will be displayed from local storage.
* Query our news api for our users search when prompted.
* A function that listens for when user clicks an article link and stores it in memory.
* Our arrary is composed of the id's of the buttons. These ids match the newsAPI id search keys.
* The nature of the sorting of this API's responses means we have to use a for loop and run multiple queries if we want to ensure each source is queried for the input.
* Populating the id's the API takes from our array. The id's of the checked boxes match the API source ID's.
