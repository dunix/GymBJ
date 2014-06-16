
var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'white',
  font: {fontFamily:'Helvetica Neue', fontSize:30, fontWeight:'bold'},
  message: 'Loading...',
  top:20,
  left:30,
  height:Ti.UI.SIZE,
  width:Ti.UI.SIZE
});

$.Login.add(activityIndicator);

// Obtiene los datos para el endpoint
function Change_Win_Main (e) {
	// Mostrar spinner
	activityIndicator.show();
	var usuario=$.Tf_Usuario.getValue();
	var pass=$.Tf_Contrasena.getValue();
	llamarServicioLogin(usuario,pass);
	
}
// Realiza la llamada al endpoint de login donde verifica sus credenciales
function llamarServicioLogin(usuario, contraseña){
	
	var args={};
	args.A=usuario;
	args.B=contraseña;
	xhr = Titanium.Network.createHTTPClient({
	onload: function(e){
		var result=JSON.parse(this.responseText);
		activityIndicator.hide();
		if (result.d.Result.length!=0){
			alert("Se ha conectado satifcatoriamente.");
			var Main_Window=Alloy.createController('Main');
			Main_Window.setToken(result.d.Result[0][0]);
			Main_Window.getView().open();
		}
		else{
				alert("Nombre de usuario o contraseña incorrectos");
		}
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


xhr.open('GET', 'http://gymservicio.cloudapp.net/Service1.svc/json/Login?a='+usuario+'&b='+contraseña);	
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
xhr.send();

}