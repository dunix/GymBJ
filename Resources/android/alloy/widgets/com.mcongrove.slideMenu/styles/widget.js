function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.slideMenu/" + s : s.substring(0, index) + "/com.mcongrove.slideMenu/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "Wrapper",
    style: {
        width: "200dp",
        top: "0dp",
        left: "-200dp",
        backgroundColor: "#000"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "Nodes",
    style: {
        top: "0dp",
        backgroundColor: "#111",
        separatorColor: "#222",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE
    }
} ];