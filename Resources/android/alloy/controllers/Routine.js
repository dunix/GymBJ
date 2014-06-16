function Controller() {
    function llamarServicioRutina(Id_Usuario) {
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                Rjson = json = JSON.parse(this.responseText);
                var json = JSON.parse(this.responseText);
                alert(json.d.Result[0][0]);
                cargarRutina(json);
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
        xhr.open("GET", "http://gymservicio.cloudapp.net/Service1.svc/json/Rutina?a=" + Id_Usuario);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send();
    }
    function cargarRutina(argument) {
        tableData = [];
        for (var i = 0; argument.d.Result.length > i; i++) {
            var name = Ti.UI.createTableViewRow({
                title: argument.d.Result[i][0],
                color: "white",
                rightImage: "/images/next.png",
                backgroundColor: "#535353",
                font: {
                    fontSize: 25
                }
            });
            alert(name.title);
            tableData.push(name);
        }
        $.TV_Rutina.data = tableData;
    }
    function FindRow(json, nameRow) {
        for (var i = 0; json.d.Result.length > i; i++) if (nameRow == json.d.Result[i][0]) return json.d.Result[i];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Routine";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Routine = Ti.UI.createWindow({
        backgroundColor: "#000000",
        layout: "vertical",
        id: "Routine"
    });
    $.__views.Routine && $.addTopLevelView($.__views.Routine);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Routine
    });
    $.__views.NavigationBar.setParent($.__views.Routine);
    $.__views.View_titulo = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "15%",
        id: "View_titulo"
    });
    $.__views.Routine.add($.__views.View_titulo);
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
    $.__views.Lbl_Rutina = Ti.UI.createLabel({
        width: "100%",
        height: "10%",
        color: "#888888",
        font: {
            fontSize: 25
        },
        text: "Programa de ejercicios:",
        id: "Lbl_Rutina"
    });
    $.__views.Routine.add($.__views.Lbl_Rutina);
    $.__views.TV_Rutina = Ti.UI.createTableView({
        backgroundColor: "#black",
        id: "TV_Rutina"
    });
    $.__views.Routine.add($.__views.TV_Rutina);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Rjson;
    exports.llamarServicioRutina = llamarServicioRutina;
    $.TV_Rutina.addEventListener("click", function(e) {
        if (e.rowData) {
            var Window_Ejercicio_por_dia = Alloy.createController("Ejercicio_Especifico");
            var Row = FindRow(Rjson, e.source.title);
            Window_Ejercicio_por_dia.cargarinfo(Row);
            Window_Ejercicio_por_dia.getView().open();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;