var token;
var Telefono;
var Email;
var Ocupacion;
var con;

function setTokenProfile(codigo){
	token=codigo;
	llamarServicio();
}
exports.setTokenProfile=setTokenProfile;
// Realiza la toma de fotos
function Take_Photo (e) {
	Titanium.Media.showCamera({
		success:function(e){
			
			$.Img_User.image=e.media;
		},
		error:function(e){
			alert("Error al accesar al dispositivo");
		},
		cancel:function(e){
			alert("Captura cancelada");
		},
		allowEditing:true,
		saveToPhotoGallery:true,
		mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO] 
	});

}

// Valida la cantidad de parametros editables
function  validaTF(){
	if($.Tf_New_Email_User.getValue()==""){
		Email=$.Lb_Email_User.text;
	}
	if($.Tf_New_Phone_User.getValue()==""){
		Telefono=$.Lb_Phone_User.text;
	}
	
	if($.Tf_New_Ocupacion_User.getValue()==""){
		Ocupacion=$.Lb_Ocupacion_User.text;
	}
}

// Realiza la llamada al endpoint de perfil para obtener los datos correspondientes al usuario logeado
function llamarServicio(){
		
		
		xhr = Titanium.Network.createHTTPClient({
		onload: function(e){
			var json=JSON.parse(this.responseText);
			$.Lb_Name_User.text = json.d.Result[0][0];
			$.Lb_Phone_User.text = json.d.Result[0][1];
			$.Lb_Ocupacion_User.text = json.d.Result[0][2];
			$.Lb_Email_User.text = json.d.Result[0][3];
			
			
			var imagen = json.d.Result[0][4];
			var imageBlob = Ti.Utils.base64decode(imagen);
			
			
			//$.Img_User.image = imageBlob;
		    $.Img_User.image  = imageBlob;
		    
		    
		},
		onerror: function (e){
			// ocultar spinner
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
	
	xhr.open('GET', 'http://gymservicio.cloudapp.net/Service1.svc/json/Perfil?NUMERO_CLIENTE='+token);	
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
	xhr.send();	
}
// Realiza la llamada al endpoint para actualizar los datos del usuario logeado con su id correspondiente.
function Update(e) {
	Id_Usuario=token;
	xhr = Titanium.Network.createHTTPClient({
	onload: function(e){
		var json=JSON.parse(this.responseText);
		alert("Cambios realizados exitosamente");
		
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

Telefono=$.Tf_New_Phone_User.getValue();
Email=$.Tf_New_Email_User.getValue();
Ocupacion=$.Tf_New_Ocupacion_User.getValue();
validaTF();
var text2='http://gymservicio.cloudapp.net/Service1.svc/json/UpdatePerfil?Id_Usuario='+Id_Usuario+'&Telefono='+Telefono+'&Ocupacion='+Ocupacion+'&Email='+Email;

//var url='http://gymservicio.cloudapp.net/Service1.svc/json/UpdateDataUser?Id_Usuario='+text;
//alert(text);
xhr.open('GET',text2);	
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
xhr.send();
$.Win_Profile.close();
}

