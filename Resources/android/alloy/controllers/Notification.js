function Controller() {
    function llamarServicioNotificaciones(Id_Usuario) {
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var json = JSON.parse(this.responseText);
                cargarNotificacion(json);
            },
            onerror: function() {
                activityIndicator.hide();
                alert("Revise su conexion a Internet");
            },
            onsendstream: function() {},
            ondatastream: function() {},
            onreadystatechange: function() {
                switch (this.readyState) {
                  case 0:                }
            },
            timeout: 5e3
        });
        xhr.open("GET", "http://gymservicio.cloudapp.net/Service1.svc/json/GetNotificaciones?Id_Usuario=" + Id_Usuario);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send();
    }
    function cargarNotificacion(argument) {
        for (var i = 0; argument.d.Result.length > i; i++) {
            var name = Ti.UI.createTableViewRow({
                title: argument.d.Result[i][0] + "  " + argument.d.Result[i][1],
                leftImage: "KS_nav_ui.png",
                backgroundColor: "black",
                color: "white",
                font: {
                    fontSize: 20
                }
            });
            tableData.push(name);
        }
        $.Lb_Dia_Pago.text = argument.d.Result[0][2] >= 0 ? "Su mebresia de vence en " + argument.d.Result[0][2] + " dias" : "Su mebresia está vencida";
        $.TV_Avisos.data = tableData;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Notification";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Window_Avisos = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "black",
        id: "Window_Avisos"
    });
    $.__views.Window_Avisos && $.addTopLevelView($.__views.Window_Avisos);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Window_Avisos
    });
    $.__views.NavigationBar.setParent($.__views.Window_Avisos);
    $.__views.View_titulo = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "15%",
        id: "View_titulo"
    });
    $.__views.Window_Avisos.add($.__views.View_titulo);
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
    $.__views.View_Avisos = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        id: "View_Avisos"
    });
    $.__views.Window_Avisos.add($.__views.View_Avisos);
    $.__views.Lbl_Aviso = Ti.UI.createLabel({
        width: "100%",
        height: "10%",
        color: "#888888",
        font: {
            fontSize: 25
        },
        id: "Lbl_Aviso",
        text: "Avisos:"
    });
    $.__views.View_Avisos.add($.__views.Lbl_Aviso);
    $.__views.Lb_Dia_Pago = Ti.UI.createLabel({
        id: "Lb_Dia_Pago"
    });
    $.__views.View_Avisos.add($.__views.Lb_Dia_Pago);
    $.__views.TV_Avisos = Ti.UI.createTableView({
        width: "100%",
        height: "80%",
        color: "#white",
        backgroundColor: "black",
        id: "TV_Avisos"
    });
    $.__views.View_Avisos.add($.__views.TV_Avisos);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.NavigationBar.setBackgroundColor("#35ABFF");
    $.NavigationBar.showBack(function() {
        $.Window_Avisos.close();
    });
    tableData = [];
    exports.llamarServicioNotificaciones = llamarServicioNotificaciones;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;