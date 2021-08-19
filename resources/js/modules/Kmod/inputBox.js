import $ from "jquery";
import Konva from "konva";
export default function addInputBox() {
    var ck = new Konva.Rect({
        width: 30,
        height: 30,
        stroke: $("#pic3").css("background-color"),
        fill: $("#pic4").css("background-color"),
        strokeWidth: 2,
        name: 'inputBox',
        cornerRadius: [$(".roundedAngle").val(), $(".roundedAngle").val(), $(".roundedAngle").val(), $(".roundedAngle").val()],
        defaultShape: true, // This fix the difference between ck and radio at the inital state !
    });
    return ck
}