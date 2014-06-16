function Controller() {
    function cargarHorario(json, dia) {
        tableData = [];
        for (var i = 0; json.d.Result.length > i; i++) {
            var name = Ti.UI.createTableViewRow({
                title: json.d.Result[i][0],
                leftImage: "KS_nav_ui.png",
                backgroundColor: "#535353",
                font: {
                    fontSize: 25
                }
            });
            tableData.push(name);
        }
        $.Lb_DiaSemana.text = dia;
        $.Lb_DiaSemana.color = "white";
        $.Table_Horario_por_dia.data = tableData;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Horario_por_dia";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Horario_por_dia = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "#000000",
        id: "Horario_por_dia"
    });
    $.__views.Horario_por_dia && $.addTopLevelView($.__views.Horario_por_dia);
    $.__views.Lb_DiaSemana = Ti.UI.createLabel({
        font: {
            fontSize: 48
        },
        text: "",
        id: "Lb_DiaSemana",
        top: "10%"
    });
    $.__views.Horario_por_dia.add($.__views.Lb_DiaSemana);
    $.__views.Table_Horario_por_dia = Ti.UI.createTableView({
        id: "Table_Horario_por_dia",
        top: "20%",
        borderRadius: "10"
    });
    $.__views.Horario_por_dia.add($.__views.Table_Horario_por_dia);
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.cargarHorario = cargarHorario;
    $.Horario_por_dia.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;