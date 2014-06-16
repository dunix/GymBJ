function Controller() {
    function procesarJson(json) {
        var sections = [];
        for (var i = 0; json.hits.length > i; i++) {
            var fruitSection = Ti.UI.createListSection({
                headerTitle: json.hits[i].fields.item_name
            });
            var fruitDataSet = [ {
                properties: {
                    title: "Calorias: " + json.hits[i].fields.nf_calories,
                    color: "white"
                }
            }, {
                properties: {
                    title: "Grasa : " + json.hits[i].fields.nf_total_fat + "g",
                    color: "white"
                }
            } ];
            fruitSection.setItems(fruitDataSet);
            sections.push(fruitSection);
        }
        $.activityIndicator.hide();
        $.list_Resultados.visible = true;
        $.list_Resultados.sections = sections;
    }
    function obtenerInfo() {
        var alimento = $.textFieldAlimento.getValue();
        var patt = new RegExp("[a-zA-Z\\s']+");
        var res = patt.test(alimento);
        $.textFieldAlimento.blur();
        if (true == res && " " != alimento) {
            $.activityIndicator.show();
            var url = "https://nutritionix-api.p.mashape.com/v1_1/search/" + alimento + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat";
            var client = Ti.Network.createHTTPClient({
                onload: function() {
                    procesarJson(JSON.parse(this.responseText));
                    $.textFieldAlimento.value = "";
                },
                onerror: function(e) {
                    $.activityIndicator.hide();
                    Ti.API.debug(e.error);
                    alert("error");
                },
                timeout: 5e3
            });
            client.open("GET", url);
            client.setRequestHeader("X-Mashape-Authorization", "Baw0ZOo4SgdbRrxhKsv2DQFeA65pDbDc");
            client.send();
        } else {
            $.textFieldAlimento.value = "";
            alert("Debe ingresar un alimento");
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Nutricion";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.ContainerNutri = Ti.UI.createWindow({
        backgroundColor: "#000000",
        layout: "vertical",
        id: "ContainerNutri"
    });
    $.__views.ContainerNutri && $.addTopLevelView($.__views.ContainerNutri);
    $.__views.NavigationBar = Alloy.createWidget("com.mcongrove.navigationBar", "widget", {
        id: "NavigationBar",
        __parentSymbol: $.__views.ContainerNutri
    });
    $.__views.NavigationBar.setParent($.__views.ContainerNutri);
    $.__views.View_NutriConsulta = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "40%",
        id: "View_NutriConsulta"
    });
    $.__views.ContainerNutri.add($.__views.View_NutriConsulta);
    $.__views.LabelNutricion = Ti.UI.createLabel({
        width: "100%",
        left: "5%",
        height: "24%",
        top: 10,
        color: "white",
        font: {
            fontSize: 25
        },
        text: "Nutrición",
        id: "LabelNutricion"
    });
    $.__views.View_NutriConsulta.add($.__views.LabelNutricion);
    $.__views.LabelNutriConsulta = Ti.UI.createLabel({
        width: "95%",
        left: "5%",
        height: "24%",
        color: "white",
        font: {
            fontSize: 25
        },
        text: "Consulta Alimento",
        id: "LabelNutriConsulta"
    });
    $.__views.View_NutriConsulta.add($.__views.LabelNutriConsulta);
    $.__views.textFieldAlimento = Ti.UI.createTextField({
        borderColor: "#424242",
        left: "4%",
        width: "80%",
        top: "1%",
        height: "24%",
        id: "textFieldAlimento"
    });
    $.__views.View_NutriConsulta.add($.__views.textFieldAlimento);
    $.__views.View_Busqueda = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: "24%",
        top: "1%",
        id: "View_Busqueda"
    });
    $.__views.View_NutriConsulta.add($.__views.View_Busqueda);
    $.__views.buttonBuscar = Ti.UI.createButton({
        width: "55%",
        height: "90%",
        left: "5%",
        backgroundColor: "#424242",
        id: "buttonBuscar",
        title: "Buscar"
    });
    $.__views.View_Busqueda.add($.__views.buttonBuscar);
    obtenerInfo ? $.__views.buttonBuscar.addEventListener("click", obtenerInfo) : __defers["$.__views.buttonBuscar!click!obtenerInfo"] = true;
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "white",
        left: "5%",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 20,
            fontWeight: "bold"
        },
        id: "activityIndicator",
        message: "Loading"
    });
    $.__views.View_Busqueda.add($.__views.activityIndicator);
    $.__views.View_Resultados = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        height: "60%",
        id: "View_Resultados"
    });
    $.__views.ContainerNutri.add($.__views.View_Resultados);
    $.__views.LabelResultados = Ti.UI.createLabel({
        width: "100%",
        height: "60",
        color: "white",
        font: {
            fontSize: 25
        },
        text: "Resultados",
        id: "LabelResultados",
        left: "5%"
    });
    $.__views.View_Resultados.add($.__views.LabelResultados);
    $.__views.list_Resultados = Ti.UI.createListView({
        width: "90%",
        color: "#000",
        font: {
            fontSize: 10
        },
        backgroundColor: "#black",
        id: "list_Resultados",
        visible: "false"
    });
    $.__views.View_Resultados.add($.__views.list_Resultados);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.NavigationBar.setBackgroundColor("#35ABFF");
    $.NavigationBar.showBack(function() {
        $.ContainerNutri.close();
    });
    __defers["$.__views.buttonBuscar!click!obtenerInfo"] && $.__views.buttonBuscar.addEventListener("click", obtenerInfo);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;