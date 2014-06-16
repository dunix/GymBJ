function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Informacion";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Informacion = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "black",
        id: "Informacion"
    });
    $.__views.Informacion && $.addTopLevelView($.__views.Informacion);
    $.__views.Lbl_Informacion = Ti.UI.createLabel({
        font: {
            fontSize: 30
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Informacion general:",
        id: "Lbl_Informacion"
    });
    $.__views.Informacion.add($.__views.Lbl_Informacion);
    $.__views.Lbl_Informacion_text = Ti.UI.createLabel({
        font: {
            fontSize: 20
        },
        width: "100%",
        height: "20%",
        color: "white",
        text: "Gimnasio B.J su mejor opción para mantenerse en forma",
        id: "Lbl_Informacion_text"
    });
    $.__views.Informacion.add($.__views.Lbl_Informacion_text);
    $.__views.Lbl_Informacion_Subtitle = Ti.UI.createLabel({
        font: {
            fontSize: 20
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Contáctenos:",
        id: "Lbl_Informacion_Subtitle"
    });
    $.__views.Informacion.add($.__views.Lbl_Informacion_Subtitle);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        font: {
            fontSize: 15
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Correo Eletronico: gymbj@gmail.com",
        id: "__alloyId3"
    });
    $.__views.Informacion.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        font: {
            fontSize: 15
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Teléfono: 22559635",
        id: "__alloyId4"
    });
    $.__views.Informacion.add($.__views.__alloyId4);
    $.__views.Lbl_Informacion_Lema = Ti.UI.createLabel({
        font: {
            fontSize: 20
        },
        width: "100%",
        height: "20%",
        color: "white",
        text: "EL dolor es temporal ... la gloria es eterna",
        id: "Lbl_Informacion_Lema"
    });
    $.__views.Informacion.add($.__views.Lbl_Informacion_Lema);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;