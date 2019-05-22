function dropdown() {
    var x = document.getElementById("nav");
    if (x.className === "topNav") {
        x.className += " responsive";
    } else {
        x.className = "topNav";
    }
}
