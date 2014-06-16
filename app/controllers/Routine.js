$.NavigationBar.setBackgroundColor("#35ABFF");

$.NavigationBar.showBack(
    function(_event) {
        $.Window_Rutina.close();
    }
);
var Rjson;
// Realiza la llamada al endpoint de rutina con su id correspondiente.
function llamarServicioRutina(Id_Usuario){
	xhr = Titanium.Network.createHTTPClient({
	onload: function(e){
		Rjson=JSON.parse(this.responseText);
		//var json=JSON.parse(this.responseText);
		
		cargarRutina(Rjson);
	},
	onerror: function (e){
		// ocultar spinner
		activityIndicator.hide();		
		alert("Revise su conexion a Internet");
	},
	onsendstream: function (e){
	},
	ondatastream: function (e){
	},
	onreadystatechange: function(e){
		switch (this.readyState){
			case 0:
			break;
		}
	},
	timeout:5000
});


xhr.open('GET','http://gymservicio.cloudapp.net/Service1.svc/json/Rutina?a='+Id_Usuario);	
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
xhr.send();

}

exports.llamarServicioRutina=llamarServicioRutina;
// Realiza la carga de informacion de la rutina correspondiente al cliente especifico

function cargarRutina(argument){
	tableData=[];
	for (var i=0; i < argument.d.Result.length; i++) {
	  var name= Ti.UI.createTableViewRow({
		title: argument.d.Result[i][0],
		color:"white",
		rightImage:"/images/next.png",
 		backgroundColor:"#535353",
  		font:{fontSize:25}
  		}); 
  		
  tableData.push(name);
	};
	$.TV_Rutina.data=tableData;
};



// Funcion para encontrar la fila correspondiente en el Json deacuerdo al title de la row del tablerow
function FindRow (json,nameRow) {
	for (var i=0; i < json.d.Result.length; i++) {
		if(nameRow==json.d.Result[i][0]){
			return json.d.Result[i];
		}
	}
  
}
	  
//Evento para poder visualizar un ejercicio en especifico
$.TV_Rutina.addEventListener('click', function(e){
	
	if(e.rowData){
		var Window_Ejercicio_por_dia=Alloy.createController('Ejercicio_Especifico');
		var Row=FindRow(Rjson,e.source.title);
		Window_Ejercicio_por_dia.cargarinfo(Row);
		Window_Ejercicio_por_dia.getView().open();
	}
	
	
});
