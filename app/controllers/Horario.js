// Realiza la llamada al endpoint de horario.
function llamarServicio(variable, dia){

	xhr = Titanium.Network.createHTTPClient({
	onload: function(e){
		

		var Window_Horario_por_dia=Alloy.createController('Horario_por_dia');
		Window_Horario_por_dia.getView().open();
		Window_Horario_por_dia.cargarHorario(JSON.parse(this.responseText), dia);
		
		// ocultar spinner
		$.activityIndicator.hide();
			
	},
	onerror: function (e){
		// ocultar spinner
		$.activityIndicator.hide();		
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


xhr.open('GET', variable+dia);	
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
xhr.send();

}

var tableData=[{title:'Lunes', backgroundColor:"#535353",font:{fontSize:30},rightImage:"/images/next.png"},
	{title:'Martes', backgroundColor:"#535353",font:{fontSize:30},rightImage:"/images/next.png"},
	{title:'Miercoles', backgroundColor:"#535353",font:{fontSize:30},rightImage:"/images/next.png"},
	{title:'Jueves', backgroundColor:"#535353",font:{fontSize:30},rightImage:"/images/next.png"},
	{title:'Viernes', backgroundColor:"#535353",font:{fontSize:30},rightImage:"/images/next.png"},
	{title:'Sabado', backgroundColor:"#535353",font:{fontSize:30},rightImage:"/images/next.png"},
	{title:'Domingo', backgroundColor:"#535353",font:{fontSize:30},rightImage:"/images/next.png"}];
	
	
var table=Ti.UI.createTableView({
	
		width:"98%",
		height:"100%",
		left:0,
		borderRadius :10,
		top: "10%",
		data:tableData
		
	});
  
table.data=tableData;

$.Horario.add(table);

table.addEventListener('click', function(e){
	if(e.rowData){
		$.activityIndicator.show();		
		llamarServicio("http://gymservicio.cloudapp.net/Service1.svc/json/Horario?valor=", e.source.title);
	}
});





