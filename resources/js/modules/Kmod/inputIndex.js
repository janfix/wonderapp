import $ from "jquery";
import Konva from "konva";

export default function addInputIndex() {
    var indexCk = new Konva.Text({
        x: -30,
        y: 2,
        text: '1.',
        fontFamily: $(".fontLabel").val(),
        fontSize: parseInt($(".labelFontSize").val()),
        padding: 5,
        fill: $("#color-picker7").val(),
        draggable: true,
        name: "indexCk",
        visible: true,
        mode: "none" // numeric, alphabetic
    })
    return indexCk
}