function Controller() {
    function llamarServicio(variable, dia) {
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var Window_Horario_por_dia = Alloy.createController("Horario_por_dia");
                Window_Horario_por_dia.getView().open();
                Window_Horario_por_dia.cargarHorario(JSON.parse(this.responseText), dia);
                $.activityIndicator.hide();
            },
            onerror: function() {
                $.activityIndicator.hide();
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
        xhr.open("GET", variable + dia);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Horario";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Horario = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "black",
        id: "Horario"
    });
    $.__views.Horario && $.addTopLevelView($.__views.Horario);
    $.__views.View_Horario_Titulo = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: "30%",
        id: "View_Horario_Titulo"
    });
    $.__views.Horario.add($.__views.View_Horario_Titulo);
    $.__views.Lbl_Horario = Ti.UI.createLabel({
        width: "50%",
        height: "90%",
        left: "0%",
        color: "white",
        font: {
            fontSize: 25
        },
        text: "Horario de las clases:",
        id: "Lbl_Horario"
    });
    $.__views.View_Horario_Titulo.add($.__views.Lbl_Horario);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 20,
            fontWeight: "bold"
        },
        message: "Loading...",
        left: "3%",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activityIndicator"
    });
    $.__views.View_Horario_Titulo.add($.__views.activityIndicator);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tableData = [ {
        title: "Lunes",
        backgroundColor: "#535353",
        font: {
            fontSize: 30
        },
        rightImage: "/images/next.png"
    }, {
        title: "Martes",
        backgroundColor: "#535353",
        font: {
            fontSize: 30
        },
        rightImage: "/images/next.png"
    }, {
        title: "Miercoles",
        backgroundColor: "#535353",
        font: {
            fontSize: 30
        },
        rightImage: "/images/next.png"
    }, {
        title: "Jueves",
        backgroundColor: "#535353",
        font: {
            fontSize: 30
        },
        rightImage: "/images/next.png"
    }, {
        title: "Viernes",
        backgroundColor: "#535353",
        font: {
            fontSize: 30
        },
        rightImage: "/images/next.png"
    }, {
        title: "Sabado",
        backgroundColor: "#535353",
        font: {
            fontSize: 30
        },
        rightImage: "/images/next.png"
    }, {
        title: "Domingo",
        backgroundColor: "#535353",
        font: {
            fontSize: 30
        },
        rightImage: "/images/next.png"
    } ];
    var table = Ti.UI.createTableView({
        width: "98%",
        height: "100%",
        left: 0,
        borderRadius: 10,
        top: "10%",
        data: tableData
    });
    table.data = tableData;
    $.Horario.add(table);
    table.addEventListener("click", function(e) {
        if (e.rowData) {
            $.activityIndicator.show();
            llamarServicio("http://gymservicio.cloudapp.net/Service1.svc/json/Horario?valor=", e.source.title);
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;