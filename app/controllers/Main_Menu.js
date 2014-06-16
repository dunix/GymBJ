var token;

// Inicializa el la barra superior para regresar al menu principal
$.NavigationBar.setBackgroundColor("#35ABFF");
$.NavigationBar.showBack(
    function(_event) {
        $.Win_Main_Menu.close();
    }
);

function setToken(codigo){
	token=codigo;
	alert(token+" dddd");
	
}
exports.setToken=setToken;

// Funciones para cambio de ventanas en el Menu principal.
function Change_Win_Chart (e) {
	
	var Grafica_Window=Alloy.createController('Grafica_Progreso');
	Grafica_Window.llamarServicioGrafica(token);
	Grafica_Window.getView().open();


}

function Change_Win_Diet (e) {
 	var Diet_Window=Alloy.createController('Nutricion').getView();
	Diet_Window.open();
  
}

function Change_Win_Profile(e) {
	var Profile_Window=Alloy.createController('Profile');
	Profile_Window.setTokenProfile(token);
	Profile_Window.getView().open();
}

function Change_Win_Notification (e) {

	var Notification_Window=Alloy.createController('Notification').getView();
	Notification_Window.open();
  
}

function Change_Win_Routine(e) {
	
  var Routine_Window=Alloy.createController('Routine');
  Routine_Window.llamarServicioRutina(token);
  Routine_Window.getView().open();
}

function Change_Win_Schedule(e) {
 alert("Acerca de:");
}