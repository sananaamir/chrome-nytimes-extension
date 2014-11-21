/*
Get articles function that handles the get request to the API
The function gets the json response and injects it into an unordered list
*/
function getArticles(){
    
    //URL for the nytimes api
    var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=YOUR-API-KEY";

    //The get request
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", URL, false);
    xmlHttp.send();
    
    //Parsing it into JSON to make it easy to use
    var data = JSON.parse(xmlHttp.responseText);

    //For loop that adds the snippets and readmore links to the list
    for(var i = 0; i < data.response.docs.length; i++){
        document.getElementById('test').innerHTML += '<li><p>'  + 
            data.response.docs[i].snippet + 
            '</p> <a target="_blank" href="' +                
            data.response.docs[i].web_url + 
            '">read more</a>' +'</li>';
    }
    
};

//The function gets called once the DOM content has been loaded
document.addEventListener('DOMContentLoaded', function () {
    getArticles();
});