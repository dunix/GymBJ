

// Funciones para cambio de ventanas en el menu lateral.

function Change_Window_Map(e) {
	$.View_Resultado.removeAllChildren();
  var Map_View=Alloy.createController('Map').getView();

  $.View_Resultado.add(Map_View);
}

function Change_Window_Horario(e) {
  var Horario_View=Alloy.createController('Horario').getView();
  $.View_Resultado.removeAllChildren();
   $.View_Resultado.add(Horario_View);
}

function Change_Window_Informacion(e) {
  var Informacion_View=Alloy.createController('Informacion').getView();
  $.View_Resultado.removeAllChildren();
   $.View_Resultado.add(Informacion_View);
}

function Change_Window_Login(e){
	var Login_Window=Alloy.createController('Login').getView();
	Login_Window.open();
	
}
$.index.open();
