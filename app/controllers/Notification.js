
$.NavigationBar.setBackgroundColor("#35ABFF");

$.NavigationBar.showBack(
    function(_event) {
        $.Window_Avisos.close();
    }
);
tableData=[];
// Realiza la llamada al endpoint de cargarnoticias	
function llamarServicioNotificaciones (Id_Usuario) {

xhr = Titanium.Network.createHTTPClient({
	onload: function(e){
		
		var json=JSON.parse(this.responseText);
		//var a=new Array();
		cargarNotificacion(json);
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


xhr.open('GET','http://gymservicio.cloudapp.net/Service1.svc/json/GetNotificaciones?Id_Usuario='+Id_Usuario);	
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
xhr.send();

}

exports.llamarServicioNotificaciones=llamarServicioNotificaciones;
// Realiza la carga de datos con lo recibido edel endpoint.
function cargarNotificacion(argument){
	for (var i=0; i < argument.d.Result.length; i++) {
	  var name= Ti.UI.createTableViewRow({
		title: argument.d.Result[i][0]+"  "+argument.d.Result[i][1],
		leftImage:"KS_nav_ui.png",
 		backgroundColor:"black",
 		color:"white",
  		font:{fontSize:20}
  		}); 
  tableData.push(name);
	};
  if(argument.d.Result[0][2]>=0){
  $.Lb_Dia_Pago.text="Su mebresia de vence en "+argument.d.Result[0][2]+" dias";
  }
  else{
 	 	$.Lb_Dia_Pago.text="Su mebresia está vencida";
  }
  $.TV_Avisos.data=tableData;
}
