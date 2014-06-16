function Controller() {
    function cargarinfo(argument) {
        id = argument[7];
        $.Lbl_NombreEjercicio.text = argument[0];
        $.Lbl_DescripcionEjer.value = argument[1];
        $.Lbl_Serie.text = "Serie:" + argument[6];
        $.Lbl_Repetecion.text = "Repetición:" + argument[3];
        $.Lbl_Peso.text = "Peso:" + argument[4] + " kg";
        $.Lbl_Descanso.text = "Descanso:" + argument[5] + " min";
        $.Lbl_Duracion.text = "Duración:" + argument[2] + " min";
        video += id;
        nombre = argument[0];
    }
    function publicar() {
        var facebook = Alloy.Globals.Facebook;
        facebook.appid = 794101107281049;
        data = {
            name: nombre,
            link: video
        };
        facebook.dialog("feed", data, function(e) {
            e.success && e.result ? alert("Se ha publicado exitosamente") : e.error ? alert("Hubo un error al publicar") : alert("Hubo un error al publicar");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Ejercicio_Especifico";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Window_Ejercicio_Especifico = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "black",
        id: "Window_Ejercicio_Especifico"
    });
    $.__views.Window_Ejercicio_Especifico && $.addTopLevelView($.__views.Window_Ejercicio_Especifico);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Window_Ejercicio_Especifico
    });
    $.__views.NavigationBar.setParent($.__views.Window_Ejercicio_Especifico);
    $.__views.View_titulo = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "12%",
        id: "View_titulo"
    });
    $.__views.Window_Ejercicio_Especifico.add($.__views.View_titulo);
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
        backgroundColor: "#35ABFF",
        id: "Linea"
    });
    $.__views.View_titulo.add($.__views.Linea);
    $.__views.view_Nombre = Ti.UI.createView({
        width: "100%",
        height: "6%",
        color: "#888888",
        layout: "horizontal",
        id: "view_Nombre"
    });
    $.__views.Window_Ejercicio_Especifico.add($.__views.view_Nombre);
    $.__views.Lbl_NombreEjercicio = Ti.UI.createLabel({
        width: "48%",
        height: "90%",
        color: "#888888",
        font: {
            fontSize: 25
        },
        id: "Lbl_NombreEjercicio",
        text: "Nombre"
    });
    $.__views.view_Nombre.add($.__views.Lbl_NombreEjercicio);
    $.__views.Lbl_Titulo_DescripcionEjer = Ti.UI.createLabel({
        width: "100%",
        height: "8%",
        color: "#888888",
        font: {
            fontSize: 15
        },
        id: "Lbl_Titulo_DescripcionEjer",
        text: "Descripciòn del ejercicio:"
    });
    $.__views.Window_Ejercicio_Especifico.add($.__views.Lbl_Titulo_DescripcionEjer);
    $.__views.Lbl_DescripcionEjer = Ti.UI.createTextArea({
        backgroundColor: "black",
        editable: false,
        color: "white",
        height: "23%",
        width: "98%",
        id: "Lbl_DescripcionEjer"
    });
    $.__views.Window_Ejercicio_Especifico.add($.__views.Lbl_DescripcionEjer);
    $.__views.View_DatosEjercicio = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: "30%",
        id: "View_DatosEjercicio"
    });
    $.__views.Window_Ejercicio_Especifico.add($.__views.View_DatosEjercicio);
    $.__views.View_Datos1 = Ti.UI.createView({
        layout: "vertical",
        width: "49%",
        height: "100%",
        top: "2%",
        id: "View_Datos1"
    });
    $.__views.View_DatosEjercicio.add($.__views.View_Datos1);
    $.__views.Lbl_Serie = Ti.UI.createLabel({
        width: "90%",
        top: "3%",
        height: "30%",
        color: "#888888",
        right: "3%",
        font: {
            fontSize: 15
        },
        id: "Lbl_Serie"
    });
    $.__views.View_Datos1.add($.__views.Lbl_Serie);
    $.__views.Lbl_Repetecion = Ti.UI.createLabel({
        width: "90%",
        top: "3%",
        height: "30%",
        right: "3%",
        color: "#888888",
        font: {
            fontSize: 15
        },
        id: "Lbl_Repetecion"
    });
    $.__views.View_Datos1.add($.__views.Lbl_Repetecion);
    $.__views.Lbl_Peso = Ti.UI.createLabel({
        width: "90%",
        top: "3%",
        height: "30%",
        right: "3%",
        color: "#888888",
        font: {
            fontSize: 15
        },
        id: "Lbl_Peso"
    });
    $.__views.View_Datos1.add($.__views.Lbl_Peso);
    $.__views.View_Datos2 = Ti.UI.createView({
        layout: "vertical",
        width: "49%",
        height: "100%",
        top: "2%",
        id: "View_Datos2"
    });
    $.__views.View_DatosEjercicio.add($.__views.View_Datos2);
    $.__views.Lbl_Descanso = Ti.UI.createLabel({
        width: "90%",
        height: "30%",
        right: "3%",
        top: "3%",
        color: "#888888",
        font: {
            fontSize: 15
        },
        id: "Lbl_Descanso"
    });
    $.__views.View_Datos2.add($.__views.Lbl_Descanso);
    $.__views.Lbl_Duracion = Ti.UI.createLabel({
        width: "90%",
        top: "3%",
        height: "30%",
        right: "3%",
        color: "#888888",
        font: {
            fontSize: 15
        },
        id: "Lbl_Duracion"
    });
    $.__views.View_Datos2.add($.__views.Lbl_Duracion);
    $.__views.Bt_Video = Ti.UI.createButton({
        width: "90%",
        right: "5%",
        left: "5%",
        height: "15%",
        bottom: "2%",
        color: "white",
        borderRadius: 10,
        backgroundColor: "#424242",
        title: "Ver video del Ejercicio",
        id: "Bt_Video",
        image: "/images/Icon_Youtube.png"
    });
    $.__views.Window_Ejercicio_Especifico.add($.__views.Bt_Video);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.NavigationBar.setBackgroundColor("#35ABFF");
    $.NavigationBar.showRight({
        image: "/images/Icon_Facebook.png",
        callback: function() {
            publicar();
        }
    });
    $.NavigationBar.showBack(function() {
        $.Window_Ejercicio_Especifico.close();
    });
    var id;
    Ti.UI.createWindow();
    var nombre;
    var video = "https://www.youtube.com/watch?v=";
    $.Bt_Video.addEventListener("click", function() {
        var youtubePlayer = require("titutorial.youtubeplayer");
        youtubePlayer.playVideo(id);
    });
    exports.cargarinfo = cargarinfo;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;