function Controller() {
    function setToken(codigo) {
        token = codigo;
        alert(token + " dddd");
    }
    function handleMenuClick(_event) {
        if (0 == _event.row.id) {
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
            var MainMenu_Window = Alloy.createController("Main_Menu");
            MainMenu_Window.setToken(token);
            MainMenu_Window.getView().open();
        } else if (1 == _event.row.id) {
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
        } else if (2 == _event.row.id) {
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
        } else if (3 == _event.row.id) {
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
        } else "undefined" != typeof _event.row.id && openScreen(_event.row.id);
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
    function Change_Window_Map() {
        $.View_Resultado.removeAllChildren();
        var Map_View = Alloy.createController("Map").getView();
        $.View_Resultado.add(Map_View);
    }
    function Change_Window_Horario() {
        var Horario_View = Alloy.createController("Horario").getView();
        $.View_Resultado.removeAllChildren();
        $.View_Resultado.add(Horario_View);
    }
    function Change_Window_Informacion() {
        var Informacion_View = Alloy.createController("Informacion").getView();
        $.View_Resultado.removeAllChildren();
        $.View_Resultado.add(Informacion_View);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Main";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Win = Ti.UI.createWindow({
        backgroundColor: "#000000",
        id: "Win"
    });
    $.__views.Win && $.addTopLevelView($.__views.Win);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.Win.add($.__views.__alloyId0);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.NavigationBar.setParent($.__views.__alloyId0);
    $.__views.SlideMenu = Alloy.createWidget("com.mcongrove.slideMenu", "widget", {
        id: "SlideMenu",
        __parentSymbol: $.__views.__alloyId0
    });
    $.__views.SlideMenu.setParent($.__views.__alloyId0);
    $.__views.AppWrapper = Ti.UI.createView({
        id: "AppWrapper",
        layout: "vertical",
        top: "46dp"
    });
    $.__views.Win.add($.__views.AppWrapper);
    $.__views.View_titulo = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "15%",
        id: "View_titulo"
    });
    $.__views.AppWrapper.add($.__views.View_titulo);
    $.__views.View_titulo_sec1 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: "80%",
        id: "View_titulo_sec1"
    });
    $.__views.View_titulo.add($.__views.View_titulo_sec1);
    $.__views.Lb_Name_Gym = Ti.UI.createLabel({
        width: "50%",
        height: "100%",
        color: "#888888",
        font: {
            fontSize: 25
        },
        text: "Gimnasio B.J.",
        id: "Lb_Name_Gym"
    });
    $.__views.View_titulo_sec1.add($.__views.Lb_Name_Gym);
    $.__views.Linea = Ti.UI.createLabel({
        width: "100%",
        height: "5%",
        color: "#000",
        backgroundColor: "#35ABFF",
        id: "Linea"
    });
    $.__views.View_titulo.add($.__views.Linea);
    $.__views.View_Resultado = Ti.UI.createView({
        width: "100%",
        height: "75%",
        id: "View_Resultado"
    });
    $.__views.AppWrapper.add($.__views.View_Resultado);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.NavigationBar.setBackgroundColor("#35ABFF");
    $.NavigationBar.showLeft({
        image: "/images/Icon_SlideMenu.png",
        callback: function() {
            if (MenuIsOpen) {
                closeMenu();
                MenuIsOpen = false;
            } else {
                openMenu();
                MenuIsOpen = true;
            }
        }
    });
    var MenuIsOpen = false;
    var nodes = [ {
        menuHeader: "Opciones",
        id: 0,
        title: "Menu Principal",
        image: "/images/Icon_Home.png"
    }, {
        id: 1,
        title: "Horario",
        image: "/images/Icon_Schedule.png"
    }, {
        id: 2,
        title: "Ubicacion",
        image: "/images/Icon_Map.png"
    }, {
        id: 3,
        title: "Informacion",
        image: "/images/Icon_Info.png"
    } ];
    $.SlideMenu.init({
        nodes: nodes,
        color: {
            headingBackground: "#000",
            headingText: "#FFF"
        }
    });
    $.SlideMenu.setIndex(3);
    $.SlideMenu.Nodes.addEventListener("click", handleMenuClick);
    var token;
    exports.setToken = setToken;
    $.AppWrapper.addEventListener("swipe", function(_event) {
        "right" == _event.direction ? openMenu() : "left" == _event.direction && closeMenu();
    });
    Change_Window_Informacion();
    $.Win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;