function Controller() {
    function Change_Win_Main() {
        activityIndicator.show();
        var usuario = $.Tf_Usuario.getValue();
        var pass = $.Tf_Contrasena.getValue();
        llamarServicioLogin(usuario, pass);
    }
    function llamarServicioLogin(usuario, contraseña) {
        var args = {};
        args.A = usuario;
        args.B = contraseña;
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var result = JSON.parse(this.responseText);
                activityIndicator.hide();
                if (0 != result.d.Result[0].length) {
                    alert(result.d.Result[0][0].toString());
                    var Main_Window = Alloy.createController("Main");
                    Main_Window.setToken(result.d.Result[0][0]);
                    Main_Window.getView().open();
                } else alert("Nombre de usuario o contraseña incorrectos");
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
        xhr.open("GET", "http://gymservicio.cloudapp.net/Service1.svc/json/Login?a=" + usuario + "&b=" + contraseña);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.Login = Ti.UI.createWindow({
        backgroundColor: "#000000",
        layout: "vertical",
        id: "Login"
    });
    $.__views.Login && $.addTopLevelView($.__views.Login);
    $.__views.View_titulo = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "15%",
        id: "View_titulo"
    });
    $.__views.Login.add($.__views.View_titulo);
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
    $.__views.View_Usuario = Ti.UI.createView({
        width: "100%",
        height: "20%",
        id: "View_Usuario",
        layout: "vertical"
    });
    $.__views.Login.add($.__views.View_Usuario);
    $.__views.Lb_Usuario = Ti.UI.createLabel({
        width: "100%",
        height: "25%",
        color: "white",
        font: {
            fontSize: 20
        },
        text: "Usuario",
        id: "Lb_Usuario"
    });
    $.__views.View_Usuario.add($.__views.Lb_Usuario);
    $.__views.Tf_Usuario = Ti.UI.createTextField({
        borderRadius: 20,
        width: "96%",
        height: "50%",
        top: "10%",
        left: "2%",
        right: "2%",
        color: "#35ABFF",
        borderColor: "#35ABFF",
        id: "Tf_Usuario"
    });
    $.__views.View_Usuario.add($.__views.Tf_Usuario);
    $.__views.View_Contrasena = Ti.UI.createView({
        height: "20%",
        width: "100%",
        id: "View_Contrasena",
        layout: "vertical"
    });
    $.__views.Login.add($.__views.View_Contrasena);
    $.__views.Lb_Contrasena = Ti.UI.createLabel({
        width: "100%",
        height: "25%",
        color: "white",
        font: {
            fontSize: 20
        },
        text: "Contraseña",
        id: "Lb_Contrasena"
    });
    $.__views.View_Contrasena.add($.__views.Lb_Contrasena);
    $.__views.Tf_Contrasena = Ti.UI.createTextField({
        borderRadius: 20,
        width: "96%",
        height: "50%",
        top: "10%",
        left: "2%",
        right: "2%",
        color: "#35ABFF",
        borderColor: "#35ABFF",
        id: "Tf_Contrasena"
    });
    $.__views.View_Contrasena.add($.__views.Tf_Contrasena);
    $.__views.Bt_Logear = Ti.UI.createButton({
        height: "10%",
        width: "96%",
        top: "8%",
        borderRadius: 20,
        left: "2%",
        right: "2%",
        font: {
            fontSize: 20
        },
        backgroundColor: "#424242",
        id: "Bt_Logear",
        title: "Login"
    });
    $.__views.Login.add($.__views.Bt_Logear);
    Change_Win_Main ? $.__views.Bt_Logear.addEventListener("click", Change_Win_Main) : __defers["$.__views.Bt_Logear!click!Change_Win_Main"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "white",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 30,
            fontWeight: "bold"
        },
        message: "Loading...",
        top: 20,
        left: 30,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    $.Login.add(activityIndicator);
    __defers["$.__views.Bt_Logear!click!Change_Win_Main"] && $.__views.Bt_Logear.addEventListener("click", Change_Win_Main);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;