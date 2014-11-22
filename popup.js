/*
Get articles function that handles the get request to the API
The function gets the json response and injects it into an unordered list
*/
function getArticles(){
    
    //URL for the nytimes api
    var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=adf40b3b4306272aaa839500a3e15cc5:13:70127702";

    //The get request
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", URL, false);
    xmlHttp.send();
    
    //Parsing it into JSON to make it easy to use
    var data = JSON.parse(xmlHttp.responseText);
    var imgString;
    var multimediaArrayLength;

    
    //For loop that adds the snippets and readmore links to the list
    for(var i = 0; i < data.response.docs.length; i++){
        
        /*
        Getting the length of the multimedia array since different
        articles have different images. Some don'e event have them
        */
        multimediaArrayLength = data.response.docs[i].multimedia.length;
        
        if(multimediaArrayLength == 3){
            imgString = '<img src="http://static01.nyt.com/' + data.response.docs[i].multimedia[2].url + '">';
        }
        else if(multimediaArrayLength == 2){
            imgString = '<img src="http://static01.nyt.com/' + data.response.docs[i].multimedia[1].url + '">';
        }
        else{
            imgString = '';
        }
        
        //Appended imgString in the list
        document.getElementById('generalList').innerHTML += '<li>' + imgString + '<p>'  + 
            data.response.docs[i].snippet + 
            '</p> <a target="_blank" href="' +                
            data.response.docs[i].web_url + 
            '">read more</a>' +'</li><hr><br>';
    }
    
};

function getSearchResults(searchString){
    
    console.log(searchString);
    //URL for the nytimes api
    var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchString + "&api-key=adf40b3b4306272aaa839500a3e15cc5:13:70127702";

    //The get request
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", URL, false);
    xmlHttp.send();
    
    //Parsing it into JSON to make it easy to use
    var data = JSON.parse(xmlHttp.responseText);
    var imgString;
    var multimediaArrayLength;

    
    //For loop that adds the snippets and readmore links to the list
    for(var i = 0; i < data.response.docs.length; i++){
        
        /*
        Getting the length of the multimedia array since different
        articles have different images. Some don'e event have them
        */
        multimediaArrayLength = data.response.docs[i].multimedia.length;
        
        if(multimediaArrayLength == 3){
            imgString = '<img src="http://static01.nyt.com/' + data.response.docs[i].multimedia[2].url + '">';
        }
        else if(multimediaArrayLength == 2){
            imgString = '<img src="http://static01.nyt.com/' + data.response.docs[i].multimedia[1].url + '">';
        }
        else{
            imgString = '';
        }
        
        //Appended imgString in the list
        document.getElementById('searchList').innerHTML += '<li>' + imgString + '<p>'  + 
            data.response.docs[i].snippet + 
            '</p> <a target="_blank" href="' +                
            data.response.docs[i].web_url + 
            '">read more</a>' +'</li><hr><br>';
    }
    
}


//The function gets called once the DOM content has been loaded
document.addEventListener('DOMContentLoaded', function () {
        
    //Search is not initiated until button is clicked
    document.getElementById('btn').addEventListener('click', function() {
        
        //Erase the previous view
        document.getElementById('generalList').innerHTML = '';
        
        /*
        Grabbing the search string and then calling the search function
        After the search result the trending/latest is also called 
        just to keep those in the list all the time
        */
        var searchString = document.getElementById('searchString').value;
        document.getElementById('searchHeader').innerHTML = 'Search results:';
        getSearchResults(searchString);
        getArticles();
    });
    
    /*
    When user clicks the trending icon a default
    list of trending/latest snippets is shown
    */
    getArticles();

});