function Controller() {
    function Generar_Grafica() {
        setTimeout(function() {
            Ti.App.fireEvent("renderChart", options);
        }, 400);
    }
    function llamarServicioGrafica(Id_Usuario) {
        xhr = Titanium.Network.createHTTPClient({
            onload: function() {
                Rjson = json = JSON.parse(this.responseText);
                var json = JSON.parse(this.responseText);
                options.oldM = json.d.Result[0];
                options.newM = json.d.Result[1];
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
        xhr.open("GET", "http://gymservicio.cloudapp.net/Service1.svc/json/GetMedidas?Id_Usuario=" + Id_Usuario);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Grafica_Progreso";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.Win_Grafica_Progreso = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "black",
        id: "Win_Grafica_Progreso"
    });
    $.__views.Win_Grafica_Progreso && $.addTopLevelView($.__views.Win_Grafica_Progreso);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.Win_Grafica_Progreso
    });
    $.__views.NavigationBar.setParent($.__views.Win_Grafica_Progreso);
    $.__views.Lb_Title = Ti.UI.createLabel({
        layout: "vertical",
        height: "10%",
        top: "2%",
        bottom: "3%",
        width: "100%",
        color: "#888888",
        font: {
            fontSize: 25
        },
        text: "Gráfica de Progreso",
        id: "Lb_Title"
    });
    $.__views.Win_Grafica_Progreso.add($.__views.Lb_Title);
    $.__views.View_Grafica_Progreso = Ti.UI.createView({
        layout: "vertical",
        height: "55%",
        width: "100%",
        id: "View_Grafica_Progreso"
    });
    $.__views.Win_Grafica_Progreso.add($.__views.View_Grafica_Progreso);
    $.__views.Bt_Graficar = Ti.UI.createButton({
        layout: "vertical",
        height: "15%",
        top: "7%",
        width: "100%",
        bottom: "5%",
        color: "white",
        font: {
            fontSize: 20
        },
        id: "Bt_Graficar",
        title: "Graficar"
    });
    $.__views.Win_Grafica_Progreso.add($.__views.Bt_Graficar);
    Generar_Grafica ? $.__views.Bt_Graficar.addEventListener("click", Generar_Grafica) : __defers["$.__views.Bt_Graficar!click!Generar_Grafica"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.NavigationBar.setBackgroundColor("#35ABFF");
    $.NavigationBar.showBack(function() {
        $.Win_Grafica_Progreso.close();
    });
    var options = {};
    var chartView = Ti.UI.createWebView({
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        showScrollbars: true,
        touchEnabled: true,
        url: "/chart.html"
    });
    exports.llamarServicioGrafica = llamarServicioGrafica;
    $.View_Grafica_Progreso.add(chartView);
    __defers["$.__views.Bt_Graficar!click!Generar_Grafica"] && $.__views.Bt_Graficar.addEventListener("click", Generar_Grafica);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;