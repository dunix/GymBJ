function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Acerca";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Acerca = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "black",
        id: "Acerca"
    });
    $.__views.Acerca && $.addTopLevelView($.__views.Acerca);
    $.__views.Lbl_Informacion = Ti.UI.createLabel({
        font: {
            fontSize: 30
        },
        width: "100%",
        height: "20%",
        color: "white",
        text: "Informacion de la Aplicación:",
        id: "Lbl_Informacion"
    });
    $.__views.Acerca.add($.__views.Lbl_Informacion);
    $.__views.Lbl_Informacion_Version = Ti.UI.createLabel({
        font: {
            fontSize: 20
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Version:1.0",
        id: "Lbl_Informacion_Version"
    });
    $.__views.Acerca.add($.__views.Lbl_Informacion_Version);
    $.__views.Lbl_Informacion_Subtitle = Ti.UI.createLabel({
        font: {
            fontSize: 20
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Desarrollado por:",
        id: "Lbl_Informacion_Subtitle"
    });
    $.__views.Acerca.add($.__views.Lbl_Informacion_Subtitle);
    $.__views.Lbl_Informacion_Autor = Ti.UI.createLabel({
        font: {
            fontSize: 15
        },
        width: "100%",
        height: "20%",
        color: "white",
        text: "Braulio Alpizar \n Leslie Becerra \n José David Chaverri",
        id: "Lbl_Informacion_Autor"
    });
    $.__views.Acerca.add($.__views.Lbl_Informacion_Autor);
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
    $.__views.Acerca.add($.__views.Lbl_Informacion_Subtitle);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        font: {
            fontSize: 15
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Correo Eletronico: bjalpizar@gmail.com",
        id: "__alloyId0"
    });
    $.__views.Acerca.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        font: {
            fontSize: 15
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Correo Eletronico: jschaverri@gmail.com",
        id: "__alloyId1"
    });
    $.__views.Acerca.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        font: {
            fontSize: 15
        },
        width: "100%",
        height: "10%",
        color: "white",
        text: "Correo Eletronico: lbecerra@gmail.com",
        id: "__alloyId2"
    });
    $.__views.Acerca.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;