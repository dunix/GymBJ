
var Map = Alloy.Globals.Map;

var flag= Map.createAnnotation({
	latitude: 9.9935855, 
	longitude: -83.9891481,
	title:"Aquí se encuentra el gimnasio" 
	
	});
// Realiza la carga del mapa mediante el API de google Maps
var mapview = Map.createView({
	
	mapType:Map.NORMAL_TYPE,
	
	region:{latitude: 9.976406, longitude: -84.015299, latitudeDelta: 0.1 , longitudeDelta : 0.1},
	animate: true,
	userLocation: true,
	top: 50,
	annotations:[flag],
	

	});
$.Window_Map.add(mapview);


