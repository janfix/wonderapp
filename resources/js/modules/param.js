import $ from "jquery";

export default function buildParam() {
    var parameters = new Object();
    parameters.canvasWidth = parseInt($("#KonvaContainer").find("canvas").css("width"));
    parameters.canvasHeight = parseInt($("#KonvaContainer").find("canvas").css("height"));
    parameters.canvasBorderColor = $("#pic6").css("background-color");
    parameters.questionFontFamily = $("#fontQuestion").val();
    parameters.questionFontColor = $("#pic8").css("background-color");
    parameters.questionFontSize = $("#QuestionFontSize").val();
    parameters.inputRoundAngle = $(".roundedAngle").val();
    parameters.inputClickEffect = $("#effectOnClick").val();
    parameters.inputBorderColor = $("#pic3").css("background-color");
    parameters.inputBGColor = $("#pic4").css("background-color");;
    parameters.tickShape = $(".tickShape").find(".active>img").attr("data-type");
    parameters.tickColor = $("#pic5").css("background-color");;
    parameters.labelFontFamily = $("#fontLabel").val();
    parameters.labelFontColor = $("#pic7").css("background-color");;
    parameters.labelVisible = $("#LabelVisib").prop("checked");
    parameters.labelFontSize = parseInt($(".labelFontSize").val());
    parameters.labelIndex = $("#indexAN").val();
    parameters.itemShuffle = $("#ShuffleChoice").prop("checked");
    parameters.itemChoiceLimit = $("#limiter").val();
    parameters.itemElimination = $("#elimination").prop("checked");
    parameters.itemResetBT = $("#resetBTActivate").prop("checked");
    parameters.itemHint = $("#hintactivate").prop("checked");
    parameters.itemChronoActive = $("#chronometer").prop("checked");
    parameters.itemShowChrono = $("#showChrono").prop("checked");
    parameters.itemShowCountDown = $("#timeLimit").prop("checked");
    parameters.itemTimeLimitValue = $("#timeLimitValue").val();
    parameters.itemTimeLimitMessage = $("#timeLimitMessage").val();
    parameters.gridVisible = $("#GridAction").prop("checked");
    parameters.gridColor = $("#color-picker").val();
    parameters.gridUnit = $("#gridUnit").val();
    parameters.scoreThreshold = $("#Threshold").val();
    parameters.scoreHintValue = $("#hintValue").val();
    parameters.metadata = $("#metadataContent").val();
    parameters.defaultShape = $("#defaultShape").prop('checked');
    return parameters
}