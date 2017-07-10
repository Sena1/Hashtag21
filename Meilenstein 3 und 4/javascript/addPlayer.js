

	document.addEventListener('DOMContentLoaded', function () {
	var b = document.getElementById("senden");
});

function post(form){
	var pattern = /^[A-Za-zÄÖÜäöüß]+$/ {2,40};
	var pattern2= "[4,5,6,7,8,9,10,11,12,13,14,15]";
	var vorname = document.getElementById("Vorname").value;
	var name = document.getElementById("Name").value;
	var verein = document.getElementById("Verein").value;
	var hcoach = document.getElementById("Headcoach").value;
	var acoach = document.getElementById("AssistantCoach").value;
	var rnummer = document.getElementById("Rueckennummer").value;
	var isvalid = false;

if(vorname.match(pattern) && name.match(pattern) && verein.match(pattern) && hcoach.match(pattern) && acoach.match(pattern) && rnummer.match(pattern2)){
	isvalid = true;
	valideData(form);

				} else{
          alert("Einige Eingaben sind fehlerhaft. Bitte ueberpruefen Sie ihre Eingaben.");
			 }

function valideData(){

var formData = new FormData(form);//Ein Objekt der Klasse FormData wird instanziert (Parameter für den Konstruktor ist die Variable form)
	var xhr = new XMLHttpRequest();


xhr.open('POST', 'http://localhost:3000/api/players', true);


xhr.setRequestHeader('Content-Type','application/json');


//xhr.setRequestHeader('Access-Control-Allow-Origin','*');
//xhr.setRequestHeader('Access-Control-Allow-Methods','GET, POST');


	xhr.onload = function(senden) {  	// dem Objekt xhr wird beim Ereignis "onload" die zugeordnete Funktion ausführen
 	 if (xhr.status==200) {						// Body der Funktion: Abfrage auf Status 200 => alles OK
		alert(xhr.responseText);			// Bildschrimnachricht mit der Statusmeldung
 	 } else {
  	  alert(xhr.response);					// Bildschirmnachricht mit dem Status

	 }
 } //Ende der Zuweisung

 	xhr.send(formData);
	alert("Daten wurden an Server gesendet");
}
}// function valideData ENDE





/* else{
	alert('Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben');
}*/
