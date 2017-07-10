onload = function(){
	getAndBuild('http://localhost:3000/api/players');
}

function getAndBuild(link){
	var xhr = new XMLHttpRequest();

	  if(link.search('search') != -1 ) {
	    link = link + document.getElementById('query').value;
	  }

   	xhr.open("GET",link);
	xhr.responseType = 'json';

	xhr.onreadystatechange=function() {
    	if (xhr.readyState == 4 && xhr.status == 200) {
			buildHtmlTable(xhr.response);
    	}
	}
	xhr.send();
}

// Builds the HTML Table
 function buildHtmlTable(response) {
	 var i,j;
	 var out = "";
	 for(i=0; i < response.length; i++){
			 out += "<tr><td>" + response[i].name +
			 				"</td><td>" + response[i].vorname +
      	   	 	"</td><td>" + response[i].club +
         	 		"</td><td>" + response[i].coach +
			 				"</td><td>" + response[i].position +
             	"</td><td>" + response[i].number +
             	"</td><td>" + response[i].year +
             	"</td><td>" +   "<button type=\"button\" onclick=\"\">löschen</button>"+
             	"</td></tr>";
	 }
	 document.getElementById("servertable").innerHTML = out;
 }
