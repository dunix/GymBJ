function Controller() {
    function isRetina() {
        alert("golaaaa");
    }
    function isTall() {
        return 568 === intHeight;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "platform";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.Platform.displayCaps.platformWidth;
    var intHeight = Ti.Platform.displayCaps.platformHeight;
    Ti.Platform.displayCaps.density;
    Ti.Platform.displayCaps.dpi;
    exports.isRetina = isRetina;
    exports.isTall = isTall;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;