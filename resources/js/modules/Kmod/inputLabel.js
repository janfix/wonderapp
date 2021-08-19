import $ from "jquery";
import Konva from "konva";

export default function addInputLabel() {
    var labelCk = new Konva.Text({
        x: 35,
        y: 2,
        text: 'Choice 1',
        fontFamily: $(".fontLabel").val(),
        fontSize: parseInt($(".labelFontSize").val()),
        padding: 5,
        fill: $("#color-picker7").val(),
        stroke: $("#color-picker7").val(),
        draggable: true,
        name: "labelCk",
        visible: $(".LabelVisib").prop("checked"),
        strokeEnabled: false,
    });
    return labelCk
}