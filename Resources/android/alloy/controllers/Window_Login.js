function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Window_Login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Window_Login = Ti.UI.createWindow({
        layout: "vertical",
        id: "Window_Login"
    });
    $.__views.Window_Login && $.addTopLevelView($.__views.Window_Login);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        text: "Bienvenido a la segunda Ventana",
        id: "__alloyId21"
    });
    $.__views.Window_Login.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        text: "Bienvenido a la segunda Ventana222",
        id: "__alloyId22"
    });
    $.__views.Window_Login.add($.__views.__alloyId22);
    $.__views.fbButton = Alloy.Globals.Facebook.createLoginButton({
        id: "fbButton",
        ns: "Alloy.Globals.Facebook"
    });
    $.__views.Window_Login.add($.__views.fbButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var facebook = Alloy.Globals.Facebook;
    $.fbButton.style = facebook.BUTTON_STYLE_WIDE;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;