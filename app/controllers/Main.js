$.NavigationBar.setBackgroundColor("#35ABFF");

$.NavigationBar.showLeft({
    image:"/images/Icon_SlideMenu.png",
    callback: function() {
	
	if(MenuIsOpen){
  		closeMenu();
  		MenuIsOpen=false;
		}
	else{
  		openMenu();
  		MenuIsOpen=true;
		}
	}
});

//Variable par controlar el slidemenu
var MenuIsOpen=false;


/*
 * Opciones del menu
 * 
 *  */
var nodes = [
    { menuHeader: "Opciones", id: 0, title: "Menu Principal", image: "/images/Icon_Home.png"},
    { id: 1, title: "Horario", image: "/images/Icon_Schedule.png" },
    { id: 2, title: "Ubicacion", image: "/images/Icon_Map.png" },
    { id: 3, title: "Informacion", image: "/images/Icon_Info.png"}
];


// Initializador del slide menu
$.SlideMenu.init({
    nodes: nodes,
    color: {
        headingBackground: "#000",
        headingText: "#FFF"
    }
});

// Set the first node as active
$.SlideMenu.setIndex(3);

// Agrega eventos a las opciones del menu

$.SlideMenu.Nodes.addEventListener("click", handleMenuClick);

var token;
function setToken(codigo){
	token=codigo;
	alert(token+" dddd");
	
}
exports.setToken=setToken;
// Handle the click event on a node
function handleMenuClick(_event) {
	
	if(_event.row.id==0){
		 $.AppWrapper.animate({
        	left: "0dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		 $.SlideMenu.Wrapper.animate({
        	left: "-200dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		var MainMenu_Window=Alloy.createController('Main_Menu');
		MainMenu_Window.setToken(token);
		MainMenu_Window.getView().open();
	}
	else if(_event.row.id==1){
		 $.AppWrapper.animate({
        	left: "0dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		 $.SlideMenu.Wrapper.animate({
        	left: "-200dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		Change_Window_Horario();
		
	}
	else if(_event.row.id==2){
		 $.AppWrapper.animate({
        	left: "0dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		 $.SlideMenu.Wrapper.animate({
        	left: "-200dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		Change_Window_Map();
		
	}
	else if(_event.row.id==3){
		 $.AppWrapper.animate({
        	left: "0dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		 $.SlideMenu.Wrapper.animate({
        	left: "-200dp",
        	duration: 250,
        	curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    	});
		Change_Window_Informacion();
	}
	
    else if(typeof _event.row.id !== "undefined") {
        // Open the corresponding controller
        openScreen(_event.row.id);
    }
}

function openMenu() {
    $.AppWrapper.animate({
        left: "200dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });

    $.SlideMenu.Wrapper.animate({
        left: "0dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
}

function closeMenu() {
    $.AppWrapper.animate({
        left: "0dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });

    $.SlideMenu.Wrapper.animate({
        left: "-200dp",
        duration: 250,
        curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
    });
}


$.AppWrapper.addEventListener("swipe", function(_event) {
    if(_event.direction == "right") {
        openMenu();
    } else if(_event.direction == "left") {
        closeMenu();
    }
});


/*
 * Cambia el view dependiendo de item selecionado
 * 
 * 
 */

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
Change_Window_Informacion();
$.Win.open();
