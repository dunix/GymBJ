var options = {};

var chartView = Ti.UI.createWebView({
	height : "100%",
	width : "100%",
	left : 0,
	top : 0,
	showScrollbars : true,
	touchEnabled : true,
	url:'/chart.html',
	//pluginState:2
    //pluginState: win.pluginState

});

// Genera la grafica con un webview empotrado.
function Generar_Grafica (e) {

	setTimeout(function() {
		Ti.App.fireEvent('renderChart', options);
	}, 400);
}
// Realiza la llamada al endpoint de grafico con su id respectivo
function llamarServicioGrafica(Id_Usuario){
	xhr = Titanium.Network.createHTTPClient({
	onload: function(e){
		Rjson=json=JSON.parse(this.responseText);
		var json=JSON.parse(this.responseText);
		alert(json.d.Result[0][0]);
		//var a=new Array();
		
		options.oldM = json.d.Result[0];
		options.newM= json.d.Result[1];
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


xhr.open('GET','http://gymservicio.cloudapp.net/Service1.svc/json/GetMedidas?Id_Usuario='+Id_Usuario);	
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
xhr.send();

}

exports.llamarServicioGrafica=llamarServicioGrafica;

$.View_Grafica_Progreso.add(chartView);
