function Controller() {
    function setTokenProfile(codigo) {
        token = codigo;
        llamarServicio();
    }
    function validaTF() {
        "" == $.Tf_New_Email_User.getValue() && (Email = $.Lb_Email_User.text);
        "" == $.Tf_New_Phone_User.getValue() && (Telefono = $.Lb_Phone_User.text);
        "" == $.Tf_New_Ocupacion_User.getValue() && (Ocupacion = $.Lb_Ocupacion_User.text);
    }
    function llamarServicio() {
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                var json = JSON.parse(this.responseText);
                $.Lb_Name_User.text = json.d.Result[0][0];
                $.Lb_Phone_User.text = json.d.Result[0][1];
                $.Lb_Ocupacion_User.text = json.d.Result[0][2];
                $.Lb_Email_User.text = json.d.Result[0][3];
                var imagen = json.d.Result[0][4];
                var imageBlob = Ti.Utils.base64decode(imagen);
                $.Img_User.image = imageBlob;
            },
            onerror: function() {
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
        xhr.open("GET", "http://gymservicio.cloudapp.net/Service1.svc/json/Perfil?NUMERO_CLIENTE=" + token);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send();
    }
    function Update() {
        Id_Usuario = token;
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                JSON.parse(this.responseText);
                alert("Cambios realizados exitosamente");
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
        Telefono = $.Tf_New_Phone_User.getValue();
        Email = $.Tf_New_Email_User.getValue();
        Ocupacion = $.Tf_New_Ocupacion_User.getValue();
        validaTF();
        var text2 = "http://gymservicio.cloudapp.net/Service1.svc/json/UpdatePerfil?Id_Usuario=" + Id_Usuario + "&Telefono=" + Telefono + "&Ocupacion=" + Ocupacion + "&Email=" + Email;
        xhr.open("GET", text2);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send();
        $.Win_Profile.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Profile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.Win_Profile = Ti.UI.createWindow({
        backgroundColor: "#000000",
        layout: "vertical",
        id: "Win_Profile"
    });
    $.__views.Win_Profile && $.addTopLevelView($.__views.Win_Profile);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Win_Profile
    });
    $.__views.NavigationBar.setParent($.__views.Win_Profile);
    $.__views.View_titulo = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "15%",
        id: "View_titulo"
    });
    $.__views.Win_Profile.add($.__views.View_titulo);
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
    $.__views.View_Top = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: "45%",
        id: "View_Top"
    });
    $.__views.Win_Profile.add($.__views.View_Top);
    $.__views.View_Photo_User = Ti.UI.createView({
        layout: "vertical",
        width: "40%",
        height: "100%",
        id: "View_Photo_User"
    });
    $.__views.View_Top.add($.__views.View_Photo_User);
    $.__views.Img_User = Ti.UI.createImageView({
        layout: "vertical",
        width: "100%",
        height: "70%",
        borderRadius: 20,
        id: "Img_User"
    });
    $.__views.View_Photo_User.add($.__views.Img_User);
    $.__views.View_Info_User = Ti.UI.createView({
        layout: "vertical",
        width: "55%",
        height: "100%",
        left: "5%",
        id: "View_Info_User"
    });
    $.__views.View_Top.add($.__views.View_Info_User);
    $.__views.Lb_Name_User = Ti.UI.createLabel({
        layout: "vertical",
        width: "100%",
        height: "15%",
        font: {
            fontSize: 20
        },
        text: "Nombre:",
        id: "Lb_Name_User"
    });
    $.__views.View_Info_User.add($.__views.Lb_Name_User);
    $.__views.Lb_Phone = Ti.UI.createLabel({
        layout: "vertical",
        width: "100%",
        height: "15%",
        font: {
            fontSize: 20
        },
        id: "Lb_Phone",
        text: "Teléfono:"
    });
    $.__views.View_Info_User.add($.__views.Lb_Phone);
    $.__views.Lb_Phone_User = Ti.UI.createLabel({
        layout: "vertical",
        width: "100%",
        height: "15%",
        font: {
            fontSize: 15
        },
        id: "Lb_Phone_User"
    });
    $.__views.View_Info_User.add($.__views.Lb_Phone_User);
    $.__views.Lb_Ocupacion = Ti.UI.createLabel({
        layout: "vertical",
        width: "100%",
        height: "15%",
        font: {
            fontSize: 20
        },
        id: "Lb_Ocupacion",
        text: "Ocupación:"
    });
    $.__views.View_Info_User.add($.__views.Lb_Ocupacion);
    $.__views.Lb_Ocupacion_User = Ti.UI.createLabel({
        layout: "vertical",
        width: "100%",
        height: "15%",
        font: {
            fontSize: 15
        },
        id: "Lb_Ocupacion_User"
    });
    $.__views.View_Info_User.add($.__views.Lb_Ocupacion_User);
    $.__views.Lb_Email = Ti.UI.createLabel({
        layout: "vertical",
        width: "100%",
        height: "15%",
        font: {
            fontSize: 20
        },
        id: "Lb_Email",
        text: "Email:"
    });
    $.__views.View_Info_User.add($.__views.Lb_Email);
    $.__views.Lb_Email_User = Ti.UI.createLabel({
        layout: "vertical",
        width: "100%",
        height: "15%",
        font: {
            fontSize: 15
        },
        id: "Lb_Email_User",
        text: "les9217@gmail.com"
    });
    $.__views.View_Info_User.add($.__views.Lb_Email_User);
    $.__views.View_Edit_Info = Ti.UI.createView({
        layout: "vertical",
        height: "25%",
        width: "100%",
        id: "View_Edit_Info"
    });
    $.__views.Win_Profile.add($.__views.View_Edit_Info);
    $.__views.Lb_Title_Edit = Ti.UI.createLabel({
        height: "15%",
        width: "100%",
        font: {
            fontSize: 15
        },
        id: "Lb_Title_Edit",
        text: "Editar Información"
    });
    $.__views.View_Edit_Info.add($.__views.Lb_Title_Edit);
    $.__views.View_Edit_Phone = Ti.UI.createView({
        layout: "horizontal",
        height: "25%",
        width: "100%",
        id: "View_Edit_Phone"
    });
    $.__views.View_Edit_Info.add($.__views.View_Edit_Phone);
    $.__views.Lb_Edit_Phone = Ti.UI.createLabel({
        height: "100%",
        width: "25%",
        left: "5%",
        font: {
            fontSize: 15
        },
        id: "Lb_Edit_Phone",
        text: "Teléfono"
    });
    $.__views.View_Edit_Phone.add($.__views.Lb_Edit_Phone);
    $.__views.Tf_New_Phone_User = Ti.UI.createTextField({
        height: "100%",
        width: "60%",
        left: "5%",
        right: "5%",
        id: "Tf_New_Phone_User"
    });
    $.__views.View_Edit_Phone.add($.__views.Tf_New_Phone_User);
    $.__views.View_Edit_Email = Ti.UI.createView({
        layout: "horizontal",
        height: "25%",
        width: "100%",
        id: "View_Edit_Email"
    });
    $.__views.View_Edit_Info.add($.__views.View_Edit_Email);
    $.__views.Lb_Edit_Email = Ti.UI.createLabel({
        height: "100%",
        width: "25%",
        left: "5%",
        font: {
            fontSize: 15
        },
        id: "Lb_Edit_Email",
        text: "Email"
    });
    $.__views.View_Edit_Email.add($.__views.Lb_Edit_Email);
    $.__views.Tf_New_Email_User = Ti.UI.createTextField({
        height: "100%",
        width: "60%",
        left: "5%",
        right: "5%",
        id: "Tf_New_Email_User"
    });
    $.__views.View_Edit_Email.add($.__views.Tf_New_Email_User);
    $.__views.View_Edit_Ocupacion = Ti.UI.createView({
        layout: "horizontal",
        height: "25%",
        width: "100%",
        font: {
            fontSize: 15
        },
        id: "View_Edit_Ocupacion"
    });
    $.__views.View_Edit_Info.add($.__views.View_Edit_Ocupacion);
    $.__views.Lb_Edit_Ocupacion = Ti.UI.createLabel({
        height: "100%",
        width: "25%",
        left: "5%",
        font: {
            fontSize: 15
        },
        id: "Lb_Edit_Ocupacion",
        text: "Ocupación"
    });
    $.__views.View_Edit_Ocupacion.add($.__views.Lb_Edit_Ocupacion);
    $.__views.Tf_New_Ocupacion_User = Ti.UI.createTextField({
        height: "100%",
        width: "60%",
        left: "5%",
        right: "5%",
        id: "Tf_New_Ocupacion_User"
    });
    $.__views.View_Edit_Ocupacion.add($.__views.Tf_New_Ocupacion_User);
    $.__views.Bt_Save_Change = Ti.UI.createButton({
        height: "10%",
        width: "50%",
        bottom: "5%",
        left: "25%",
        right: "25%",
        borderRadius: 20,
        id: "Bt_Save_Change",
        title: "Guardar Cambios"
    });
    $.__views.Win_Profile.add($.__views.Bt_Save_Change);
    Update ? $.__views.Bt_Save_Change.addEventListener("click", Update) : __defers["$.__views.Bt_Save_Change!click!Update"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var token;
    var Telefono;
    var Email;
    var Ocupacion;
    exports.setTokenProfile = setTokenProfile;
    __defers["$.__views.Bt_Save_Change!click!Update"] && $.__views.Bt_Save_Change.addEventListener("click", Update);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;