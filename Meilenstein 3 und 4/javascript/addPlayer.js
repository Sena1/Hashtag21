function post(form){
var isvalid = true;
for(i=0; i<form.length; i++){
	if(!form[0].validity.valid){
		isvalid = false;
		i = form.length;
	}
}
if(isvalid){
	var formData = new FormData(form);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:3000/api/players');

	xhr.send(formData);

	xhr.onload = function(e) {
 	 if (xhr.status==200) {
		alert(xhr.responseText);
 	 } else {
  	  alert(xhr.response);
	 }
  	};
} else{
	alert('Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben');
}
}
