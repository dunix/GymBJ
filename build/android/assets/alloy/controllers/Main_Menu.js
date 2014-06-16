function Controller() {
    function setToken(codigo) {
        token = codigo;
    }
    function Change_Win_Chart() {
        var Grafica_Window = Alloy.createController("Grafica_Progreso");
        Grafica_Window.llamarServicioGrafica(token);
        Grafica_Window.getView().open();
    }
    function Change_Win_Diet() {
        var Diet_Window = Alloy.createController("Nutricion").getView();
        Diet_Window.open();
    }
    function Change_Win_Profile() {
        var Profile_Window = Alloy.createController("Profile");
        Profile_Window.setTokenProfile(token);
        Profile_Window.getView().open();
    }
    function Change_Win_Notification() {
        var Notification_Window = Alloy.createController("Notification");
        Notification_Window.llamarServicioNotificaciones(token);
        Notification_Window.getView().open();
    }
    function Change_Win_Routine() {
        var Routine_Window = Alloy.createController("Routine");
        Routine_Window.llamarServicioRutina(token);
        Routine_Window.getView().open();
    }
    function Change_Win_Acerca() {
        var Acerca_Window = Alloy.createController("Acerca");
        Acerca_Window.getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Main_Menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.Win_Main_Menu = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "#000000",
        id: "Win_Main_Menu"
    });
    $.__views.Win_Main_Menu && $.addTopLevelView($.__views.Win_Main_Menu);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        text: "Opciones:",
        __parentSymbol: $.__views.Win_Main_Menu
    });
    $.__views.NavigationBar.setParent($.__views.Win_Main_Menu);
    $.__views.__alloyId6 = Ti.UI.createView({
        layout: "horizontal",
        height: "30%",
        width: "100%",
        id: "__alloyId6"
    });
    $.__views.Win_Main_Menu.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "vertical",
        height: "50%",
        width: "50%",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.Img_Map = Ti.UI.createImageView({
        id: "Img_Map",
        image: "/images/Icon_Chart.png"
    });
    $.__views.__alloyId7.add($.__views.Img_Map);
    Change_Win_Chart ? $.__views.Img_Map.addEventListener("click", Change_Win_Chart) : __defers["$.__views.Img_Map!click!Change_Win_Chart"] = true;
    $.__views.__alloyId8 = Ti.UI.createLabel({
        text: "Grafico",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        height: "50%",
        width: "50%",
        id: "__alloyId9"
    });
    $.__views.__alloyId6.add($.__views.__alloyId9);
    $.__views.Img_Map = Ti.UI.createImageView({
        id: "Img_Map",
        image: "/images/Icon_Routine.png"
    });
    $.__views.__alloyId9.add($.__views.Img_Map);
    Change_Win_Routine ? $.__views.Img_Map.addEventListener("click", Change_Win_Routine) : __defers["$.__views.Img_Map!click!Change_Win_Routine"] = true;
    $.__views.__alloyId10 = Ti.UI.createLabel({
        text: "Rutina",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "horizontal",
        height: "30%",
        width: "100%",
        id: "__alloyId11"
    });
    $.__views.Win_Main_Menu.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createView({
        layout: "vertical",
        height: "50%",
        width: "50%",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.Img_Map = Ti.UI.createImageView({
        id: "Img_Map",
        image: "/images/Icon_Profile.png"
    });
    $.__views.__alloyId12.add($.__views.Img_Map);
    Change_Win_Profile ? $.__views.Img_Map.addEventListener("click", Change_Win_Profile) : __defers["$.__views.Img_Map!click!Change_Win_Profile"] = true;
    $.__views.__alloyId13 = Ti.UI.createLabel({
        text: "Perfil",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        layout: "vertical",
        height: "50%",
        width: "50%",
        id: "__alloyId14"
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    $.__views.Img_Map = Ti.UI.createImageView({
        id: "Img_Map",
        image: "/images/Icon_Info.png"
    });
    $.__views.__alloyId14.add($.__views.Img_Map);
    Change_Win_Acerca ? $.__views.Img_Map.addEventListener("click", Change_Win_Acerca) : __defers["$.__views.Img_Map!click!Change_Win_Acerca"] = true;
    $.__views.__alloyId15 = Ti.UI.createLabel({
        text: "Acerca de",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createView({
        layout: "horizontal",
        height: "30%",
        width: "100%",
        id: "__alloyId16"
    });
    $.__views.Win_Main_Menu.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        layout: "vertical",
        height: "50%",
        width: "50%",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.Img_Map = Ti.UI.createImageView({
        id: "Img_Map",
        image: "/images/Icon_Diet.png"
    });
    $.__views.__alloyId17.add($.__views.Img_Map);
    Change_Win_Diet ? $.__views.Img_Map.addEventListener("click", Change_Win_Diet) : __defers["$.__views.Img_Map!click!Change_Win_Diet"] = true;
    $.__views.__alloyId18 = Ti.UI.createLabel({
        text: "Alimentacion",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "vertical",
        height: "50%",
        width: "50%",
        id: "__alloyId19"
    });
    $.__views.__alloyId16.add($.__views.__alloyId19);
    $.__views.Img_Map = Ti.UI.createImageView({
        id: "Img_Map",
        image: "/images/Icon_Notification.png"
    });
    $.__views.__alloyId19.add($.__views.Img_Map);
    Change_Win_Notification ? $.__views.Img_Map.addEventListener("click", Change_Win_Notification) : __defers["$.__views.Img_Map!click!Change_Win_Notification"] = true;
    $.__views.__alloyId20 = Ti.UI.createLabel({
        text: "Notificaciones",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var token;
    $.NavigationBar.setBackgroundColor("#35ABFF");
    $.NavigationBar.showBack(function() {
        $.Win_Main_Menu.close();
    });
    exports.setToken = setToken;
    __defers["$.__views.Img_Map!click!Change_Win_Chart"] && $.__views.Img_Map.addEventListener("click", Change_Win_Chart);
    __defers["$.__views.Img_Map!click!Change_Win_Routine"] && $.__views.Img_Map.addEventListener("click", Change_Win_Routine);
    __defers["$.__views.Img_Map!click!Change_Win_Profile"] && $.__views.Img_Map.addEventListener("click", Change_Win_Profile);
    __defers["$.__views.Img_Map!click!Change_Win_Acerca"] && $.__views.Img_Map.addEventListener("click", Change_Win_Acerca);
    __defers["$.__views.Img_Map!click!Change_Win_Diet"] && $.__views.Img_Map.addEventListener("click", Change_Win_Diet);
    __defers["$.__views.Img_Map!click!Change_Win_Notification"] && $.__views.Img_Map.addEventListener("click", Change_Win_Notification);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;