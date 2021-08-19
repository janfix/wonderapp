import $ from "jquery";
import buildParam from "./param";
import itemReport_tpl from "./itemReport_TPL";
import { toDay } from "./tools";


export default function updateSingle(stage, i2e, CKType) {
    alert("DEPRECATED!!!!!")

    /*  
    console.log("Update Single")
    console.log(stage)
    console.log(currentItem)
    console.log(allItems[currentItem])
    var currentItem = i2e.index;
    var UpdateItem = i2e.item;
    var layer = stage.children[2];
    var today = toDay();
    var UDChoices, UDHint, UDQuestion;
    var param = buildParam();

    $(".monitor").show();

    //Update Item value 
    //Param
    UpdateItem.param = param;
    // Question content
    if (typeof stage.findOne(".question") !== "undefined") { UpdateItem.question = stage.findOne(".question").text(); }
    // Choices content
    UDChoices = stage.find(".labelCk");
    console.log(UDChoices)
    console.log(UpdateItem)
    for (let i = 0; i < UDChoices.length; i++) {
        console.log(UDChoices.text())
        console.log(UpdateItem.choices[i])
        UpdateItem.choices[i].text = UDChoices[i].text();
    }
    // Update Hint
    UDHint = stage.findOne("#hintContent");
    if (typeof UDHint !== "undefined" && UDHint.getClassName() == "Text") { UpdateItem.hint = stage.findOne("#hintContent").text(); }

    //Modify JSon Stage representation Card!!!!
    //jsonStageGenerated[currentItem] = stage.toJSON();

    //SCORE
    const UDScore = stage.find(".scoreDot");
    //console.log(UDScore)
    for (let i = 0; i < UDScore.length; i++) {
        //console.log(UDScore[i].fill())
        if (UDScore[i].visible()) {
            if (UDScore[i].fill() == "rgba(0,128,0,1)") {
                UDScore[i].attrs.type = "Right";
                UpdateItem.choices[i].rightAnswer = true;
            } else if (UDScore[i].fill() == "rgba(252,195,13,1)") {
                UDScore[i].attrs.type = "eliminate";
                UpdateItem.choices[i].eliminate = true
            } else if (UDScore[i].fill() == "rgba(255,0,0,1)") {
                UDScore[i].attrs.type = "penalty";
                UpdateItem.choices[i].penalty = true
            }
              else if (UDScore[i].fill() == 'transparent') {} 
} else {
    //console.log("CAS CLEAR SCORE")
    UDScore[i].attrs.type = "none";
    UpdateItem.choices[i].rightAnswer = false
    UpdateItem.choices[i].eliminate = false
    UpdateItem.choices[i].penalty = false
}
}

 // Timer Active
var timerSet, timeLimitValue;
if (UpdateItem.timerSet) {
    timerSet = "⏱️ ON";
    timeLimitValue = $("#timeLimitValue").val();
    if (timeLimitValue == "") { timeLimitValue = 120 }
} else {
    timerSet = "OFF";
    timeLimitValue = "--"
}

// execute the compiled template and print the output to the console
var dataURL = stage.toDataURL({ pixelRatio: 1 });
var update = {
    "pathToPreview": dataURL,
    "itemID": UpdateItem.itemID,
    "IndexChoice": currentItem + 1,
    "CDate": today,
    "question": UpdateItem.question,
    "choices": UpdateItem.choices,
    "authors": "JPR",
    "interactionType": "Choices",
    "Hint": UpdateItem.hint,
    "ATLimiter": $("#limiter").val(),
    "TSET": timerSet,
    "TimeLimit": timeLimitValue,
    "Shuffle": $("#ShuffleChoice").prop("checked"),
    "resetBT": $("#resetBTActivate").prop("checked"),
    "inputType": CKType
}
$(".row" + (currentItem + 1)).css({ "border": "1px gainsboro solid", "padding-top": "10px", "padding-bottom": "10px" });
var reportReformated = itemReport_tpl(update);
$(".row" + (currentItem + 1)).html(reportReformated);
$(".monitorList").find("#T" + update.IndexChoice).append(allChoicesBlock(UpdateItem.choices))
$(this).prop("disabled", true); 

function allChoicesBlock(allChoices) {
    var blockChoice = "",
        choiceLine = "";
    for (let y = 0; y < allChoices.length; y++) {
        allChoices[y];
        choiceLine = '<tr><td>' + allChoices[y].text + ' </td> <td>' + allChoices[y].rightAnswer + '</td><td>' + allChoices[y].feedback + '<td>' + allChoices[y].eliminate + ' </td><td>' + allChoices[y].penalty + ' </td></tr>'
        blockChoice = blockChoice + choiceLine
    }

    return blockChoice;
} */

}