function Controller() {
    function Change_Window_Login() {
        var Login_Window = Alloy.createController("Login").getView();
        Login_Window.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#000000",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.View_titulo = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "15%",
        id: "View_titulo"
    });
    $.__views.index.add($.__views.View_titulo);
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
    $.__views.Img_Login = Ti.UI.createImageView({
        height: "70%",
        top: 0,
        width: "100%",
        id: "Img_Login",
        image: "/images/Img_Login.png"
    });
    $.__views.index.add($.__views.Img_Login);
    $.__views.Bt_Login = Ti.UI.createButton({
        height: "12%",
        width: "96%",
        bottom: "3%",
        borderRadius: 20,
        left: "2%",
        right: "2%",
        font: {
            fontSize: 20
        },
        backgroundColor: "#424242",
        id: "Bt_Login",
        title: "Login"
    });
    $.__views.index.add($.__views.Bt_Login);
    Change_Window_Login ? $.__views.Bt_Login.addEventListener("click", Change_Window_Login) : __defers["$.__views.Bt_Login!click!Change_Window_Login"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.Bt_Login!click!Change_Window_Login"] && $.__views.Bt_Login.addEventListener("click", Change_Window_Login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;