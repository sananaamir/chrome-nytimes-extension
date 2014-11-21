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
    var imgString;
    var multimediaArrayLength;

    
    //For loop that adds the snippets and readmore links to the list
    for(var i = 0; i < data.response.docs.length; i++){
        
        multimediaArrayLength = data.response.docs[i].multimedia.length;
        console.log(multimediaArrayLength);
        if(multimediaArrayLength == 3){
            imgString = '<img src="http://static01.nyt.com/' + data.response.docs[i].multimedia[2].url + '">';
        }
        else if(multimediaArrayLength == 2){
            imgString = '<img src="http://static01.nyt.com/' + data.response.docs[i].multimedia[1].url + '">';
        }
        else{
            imgString = '';
        }
        
        document.getElementById('test').innerHTML += '<li>' + imgString + '<p>'  + 
            data.response.docs[i].snippet + 
            '</p> <a target="_blank" href="' +                
            data.response.docs[i].web_url + 
            '">read more</a>' +'</li><hr><br>';
    }
    
};

//The function gets called once the DOM content has been loaded
document.addEventListener('DOMContentLoaded', function () {
    getArticles();
});



//http://static01.nyt.com/images/2014/11/26/dining/26POUR/26POUR-master180.jpg