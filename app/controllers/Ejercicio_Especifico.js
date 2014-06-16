

/*
 Venatana de Ejercicio especifico donde se realiza la carga de datos con el ejercicio especifico seleccionado en su rutina.
 */
$.NavigationBar.setBackgroundColor("#35ABFF");

$.NavigationBar.showRight({
    image: "/images/Icon_Facebook.png",
    callback: function() {
        publicar();
    }
});

$.NavigationBar.showBack(
    function(_event) {
        $.Window_Ejercicio_Especifico.close();
    }
);
var id;
var win = Ti.UI.createWindow();
var nombre;
var video="https://www.youtube.com/watch?v=";

// LLamada al API de Youtube para la visualizacion del video
$.Bt_Video.addEventListener('click', function() {
	if (Ti.Platform.osname=="android"){
		var youtubePlayer = require('titutorial.youtubeplayer');
		youtubePlayer.playVideo(id);// id
	}
	else{
		Alloy.createWidget('ytPlayer').play('BXb5zeaaZss');
	}
});
// Realiza la carga de informacion en los labels correspondientes.

function cargarinfo(argument){
	id=argument[7];
	$.Lbl_NombreEjercicio.text=argument[0];
	$.Lbl_DescripcionEjer.value=argument[1];
	$.Lbl_Serie.text="Serie:"+argument[6];
	$.Lbl_Repetecion.text="Repetición:"+argument[3];
	$.Lbl_Peso.text="Peso:"+argument[4]+" kg";
	$.Lbl_Descanso.text="Descanso:"+argument[5]+" min";
	$.Lbl_Duracion.text="Duración:"+argument[2]+" min";
	video+=id;
	nombre=argument[0];
	
}
exports.cargarinfo=cargarinfo;

// Realiza la publicacion de facebook con su respectivo API 
function publicar(){
	var facebook = Alloy.Globals.Facebook;
	facebook.appid = 794101107281049;
	//facebook.authorize();	
	data = {
		name: nombre,
		link: video
	};
	facebook.dialog("feed", data, function(e){
		if(e.success && e.result){
			alert("Se ha publicado exitosamente");
		}else{
			if(e.error){
				alert("Hubo un error al publicar");
			}else{
				alert("Hubo un error al publicar");
			}
		}
	});
	
}


