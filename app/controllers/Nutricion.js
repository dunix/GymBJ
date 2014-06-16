

$.NavigationBar.setBackgroundColor("#35ABFF");

$.NavigationBar.showBack(
    function(_event) {
        $.ContainerNutri.close();
    }
);
// Realiza la carga de datos del API de nutricion.
function procesarJson(json){
	// datos de la tabla
	//alert(json.hits[0].fields.nf_calories);
	var sections = [];
	for (var i=0; i < json.hits.length ; i++) {
		
		var fruitSection = Ti.UI.createListSection({headerTitle: json.hits[i].fields.item_name});
		var fruitDataSet = [
		    {properties: { title: "Calorias: "+ json.hits[i].fields.nf_calories, color:"white" }},
		    {properties: { title: "Grasa : "+ json.hits[i].fields.nf_total_fat + "g" ,color:"white" }},
		];
		
		fruitSection.setItems(fruitDataSet);
		sections.push(fruitSection);	
		
	}
	
	 $.activityIndicator.hide();
		
	$.list_Resultados.visible = true;
	$.list_Resultados.sections = sections;
}
// Realiza la carga de datos con el API de nutricion.
function obtenerInfo(){	
	
	// Variable obtenida del TextFiel de busqueda
	var alimento = $.textFieldAlimento.getValue();
	
	//revisión con Expresión regular
    var patt = new RegExp("[a-zA-Z\\s']+");
    var res = patt.test(alimento);
    $.textFieldAlimento.blur();
	if (res == true && alimento != " "){
		
		 $.activityIndicator.show();
			
	
		 var url = "https://nutritionix-api.p.mashape.com/v1_1/search/" + alimento
		 + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat";
		 var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {
		         procesarJson(JSON.parse(this.responseText));
		         $.textFieldAlimento.value = "";
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
				// ocultar spinner
				 $.activityIndicator.hide();
						     	
		         Ti.API.debug(e.error);
		         alert('error');
		     },
		     timeout : 5000  // in milliseconds
		 });
		 // Prepare the connection.
		 client.open("GET", url);
		 //Mashape-Authorization"
		 client.setRequestHeader( "X-Mashape-Authorization", "Baw0ZOo4SgdbRrxhKsv2DQFeA65pDbDc" ); 
		 // Send the request.
		 client.send();
	 } else{
	 	$.textFieldAlimento.value = "";
	 	alert('Debe ingresar un alimento');
	 }
}
