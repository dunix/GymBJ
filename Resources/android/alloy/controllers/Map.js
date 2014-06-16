function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Window_Map = Ti.UI.createView({
        width: "98%",
        height: "90%",
        layout: "vertical",
        id: "Window_Map"
    });
    $.__views.Window_Map && $.addTopLevelView($.__views.Window_Map);
    $.__views.Lbl_Ubicacion = Ti.UI.createLabel({
        width: "50%",
        height: "6%",
        left: "0%",
        color: "white",
        font: {
            fontSize: 20
        },
        text: "Ubicación:",
        id: "Lbl_Ubicacion"
    });
    $.__views.Window_Map.add($.__views.Lbl_Ubicacion);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Map = Alloy.Globals.Map;
    var flag = Map.createAnnotation({
        latitude: 9.9935855,
        longitude: -83.9891481,
        title: "Aquí se encuentra el gimnasio"
    });
    var mapview = Map.createView({
        mapType: Map.NORMAL_TYPE,
        region: {
            latitude: 9.976406,
            longitude: -84.015299,
            latitudeDelta: .1,
            longitudeDelta: .1
        },
        animate: true,
        userLocation: true,
        top: 50,
        annotations: [ flag ]
    });
    $.Window_Map.add(mapview);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;