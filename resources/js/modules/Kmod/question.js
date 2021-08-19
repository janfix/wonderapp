import $ from "jquery";
import Konva from "konva";
import editKcontent from "./editKContent";

export default function addQuestionLabel(Stage, Layer) {
    var labelQ = new Konva.Text({
        x: 35,
        y: 20,
        text: 'Q1. Write here your Instruction... Double-click to edit !',
        fontFamily: $("#fontQuestion").val(),
        fontSize: parseInt($("#QuestionFontSize").val()),
        padding: 5,
        fill: $("#color-picker8").val(),
        stroke: $("#color-picker8").val(),
        draggable: true,
        name: "question",
        shadowEnabled: false,
        fillEnabled: true,
        strokeEnabled: false,
        /*  stroke: $("#color-picker8").val(),
         strokeWidth: 0 */

    });

    //Listening only in Edition Mode
    labelQ.on("dblclick", function() {
        editKcontent(Stage, Layer, this)
    })


    return labelQ
}