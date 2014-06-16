
// Carga el horario con su respectivo dia proporcionado por el endpoint.
function cargarHorario(json, dia){
tableData=[];	
for (var i=0; i < json.d.Result.length; i++) {
	  //var results=json.Result[i],
	var name= Ti.UI.createTableViewRow({
		title: json.d.Result[i][0],
		leftImage:"KS_nav_ui.png",
	 	backgroundColor:"#535353",
	  	font:{fontSize:25}
	  }); 
	  //row.add(name);
	  tableData.push(name);
};

$.Lb_DiaSemana.text=dia;
$.Lb_DiaSemana.color="white";
$.Table_Horario_por_dia.data=tableData;
//$.Horario_por_dia.add(dia);
	
}
exports.cargarHorario=cargarHorario;
$.Horario_por_dia.open();