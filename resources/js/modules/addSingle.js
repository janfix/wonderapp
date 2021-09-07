import $ from "jquery";
import buildParam from "./param";
import itemReport_tpl from "./itemReport_TPL";
import { toDay } from "./tools";
import { zoomInBT, zoomOutBT, activeCardPreview, activeEditCardItem, deleteSingle } from "./cardTools";
import { addToItemPack } from "./itemPack";
//import { Layer } from "konva/types/Layer";

export default function addSingleActivate(stage) {
    var layer = stage.children[2];
    $(".monitor").show();
    var param = buildParam();
    var ZeItem = new Object();
    ZeItem.itemID = "i" + Date.now();
    if (typeof stage.findOne(".question") !== "undefined") {
        ZeItem.question = stage.findOne(".question").text();
    }

    ZeItem.choices = [];
    ZeItem.eliminationMode = $("#elimination").prop("checked");
    ZeItem.timerSet = $("#timeLimit").prop("checked");
    ZeItem.timeLimit = $("#timeLimitValue").val();
    ZeItem.images = [];
    //Images process : Type are : richContent (already b64), freeImage (already ID unique)
    //Think to order test for images / shapes and content : minimum identify the Background !!!
    var allFImages = stage.find("Image")
    var allRichContents = stage.find(".richContent")
    for (let i = 0; i < allFImages.length; i++) {
        ZeItem.images.push(allFImages[i])
    }
    for (let i = 0; i < allRichContents.length; i++) {
        ZeItem.images.push(allRichContents[i])
    }
    //Choices process
    var allChoices = stage.find(".labelCk");
    for (let i = 0; i < allChoices.length; i++) {
        var ranswer = false,
            elim = false,
            peno = false;
        var scor = allChoices[i].parent.findOne(".scoreDot").attrs.type;
        if (scor == "Right") {
            ranswer = true;
        } else if (scor == "Elimination") {
            elim = true;
        } else if (scor == "Penalty") {
            peno = true;
        }


        ZeItem.choices.push({
            "type": allChoices[i].parent.attrs.type,
            "text": allChoices[i].text(),
            "rightAnswer": ranswer,
            "feedback": getFeedBackText(allChoices[i].parent),
            "eliminate": elim,
            "penalty": peno,
            "scope": allChoices[i].parent.attrs.scope,

        });
    }

    // Explore optionnal content
    var hintValue, hintContent;
    if (typeof stage.findOne("#hintContent") !== "undefined") {
        var allHintGroup = stage.find(".hintGroup");
        if(allHintGroup.length >1){
            console.log("DUPLICATION DU HINT")
            stage.findOne("#"+allHintGroup[0].id()).destroy();
        }

        hintContent = stage.findOne("#hintContent");

        ZeItem.hintBubblePosi = [stage.findOne("#hint").x(), stage.findOne("#hint").y()]
        console.log(stage.find(".hintGroup"))
        console.log(ZeItem.hintBubblePosi)

        if (hintContent.getClassName() == "Text") {
            ZeItem.hint = stage.findOne("#hintContent").text();
        } else if (hintContent.getClassName() == "Image") {
            //console.log(hintContent)
            ZeItem.hint = "image"
            ZeItem.hintIMGPosi = [hintContent.x(), hintContent.y()]
        }

        // ZeItem.feedBack = stage.findOne(".feedBack");
        if (hintContent.getClassName() == "Text") {
            hintValue = stage.findOne("#hintContent").text();
        } else if (hintContent.getClassName() == "Image") {
            hintValue = stage.findOne("#hintContent").attrs.legend;
        } else {
            hintValue = "--"
        }
    }
    // Timer Active
    var timerSet, timeLimitValue;
    if (ZeItem.timerSet) {
        timerSet = "⏱️ ON";
        timeLimitValue = $("#timeLimitValue").val();
        if (timeLimitValue == "") { timeLimitValue = 120 }
    } else {
        timerSet = "OFF";
        timeLimitValue = "--"
    }

    // SEND TO PACKAGE PROCESS
    var dataURL = stage.toDataURL({ pixelRatio: 1 });
    var jsonStageGenerated = [];


    jsonStageGenerated.push(stage.toJSON());
    var CKType;
    var inputTypes = stage.find(".inputGroup");
    var radioNB = 0,
        ckNB = 0;
    for (let i = 0; i < inputTypes.length; i++) {
        if (inputTypes[i].attrs.type == "radio") {
            radioNB++;
        } else {
            ckNB++;
        };
    }

    //console.log(radioNB, ckNB)
    if (radioNB === 0 && ckNB > 0) {
        CKType = "checkbox"
    } else if (ckNB === 0 && radioNB > 0) {
        CKType = "radio";
    } else {
        CKType = "composite : radio + checkbox"
    }



    //Reset For One Item
    $(".clearAll").trigger("click")
    stage.find("#hint").visible(false);
    layer.draw();
    ZeItem.param = param;
    var nextItem = $(".itemRow");

    var update = {
        "pathToPreview": dataURL,
        "itemID": ZeItem.itemID,
        "IndexChoice": nextItem.length + 1,
        "CDate": toDay(),
        "question": ZeItem.question,
        "choices": ZeItem.choices,
        "authors": "JPR",
        "interactionType": $("#metaInteraction").val(),
        "eliminationMode": $("#elimination").prop("checked"),
        "hint": hintValue,
        "ATLimiter": $("#limiter").val(),
        "chrono": chronoDisplay(),
        "TimeLimiter": timerDisplay(),
        "TimeLimit": $("#timeLimitValue").val(),
        "TimeLimitMessage": $("#timeLimitMessage").val(),
        "Shuffle": $("#ShuffleChoice").prop("checked"),
        "resetBT": $("#resetBTActivate").prop("checked"),
        "inputType": CKType,
        "version": "", //TODO
        "subject": $("#metaSubject").val(),
        "domain" : $("#metaDomain").val(),
        "subdomain" : $("#metaSubdomain").val(), 
        "skillfrm" : $("#metaSkill").val(), 
        "taskdef" : $("#metaTask").val(), 
        "keywords" : $("#metakeywords").val(), 
        "age" : $("#metaAge").val(), 
        "isced" : $("#metaISCED").val(), 
        "comptool" : $("#metaCtool").val(), 
        "responseformat" : $("#metaResponse").val(), 
        "corrtype" : $("#metaCorrType").val(), 
        "corrguide" : $("#metaCorrGuide").val(), 
        "textversion" : $("#metaTextLink").val(), 
        "grade":$("#metaGrade").val(),
        "comments" :  $("#floatingTextarea").val(),

    }
    
    ZeItem.param.metadata = {
        "subject": $("#metaSubject").val(),
        "domain" : $("#metaDomain").val(),
        "subdomain" : $("#metaSubdomain").val(), 
        "skillfrm" : $("#metaSkill").val(), 
        "taskdef" : $("#metaTask").val(), 
        "keywords" : $("#metakeywords").val(), 
        "age" : $("#metaAge").val(), 
        "isced" : $("#metaISCED").val(), 
        "comptool" : $("#metaCtool").val(), 
        "responseformat" : $("#metaResponse").val(), 
        "corrtype" : $("#metaCorrType").val(), 
        "corrguide" : $("#metaCorrGuide").val(), 
        "textversion" : $("#metaTextLink").val(), 
        "grade":$("#metaGrade").val(),
        "comments" :  $("#floatingTextarea").val(),
    }

    $("#metadata").find("input").val("");
    $("#floatingTextarea").val("");

    function chronoDisplay() {
        var chronoline
        if ($("#chronometer").prop("checked")) {
            chronoline = "⏱️ Chrono is ON"
        } else { chronoline = "❌ chrono is OFF" }
        return chronoline
    }

    function timerDisplay() {
        var timerLimit
        if ($("#timeLimit").prop("checked")) {
            timerLimit = "⌛ Count down is ON"
        } else { timerLimit = "❌ timer is OFF" }
        return timerLimit
    }

    function allChoicesBlock(allChoices) {
        var blockChoice = "",
            choiceLine = "";
        for (let y = 0; y < allChoices.length; y++) {
            allChoices[y];
            choiceLine = '<tr><td>' + allChoices[y].text + ' </td> <td>' + noFalse(allChoices[y].rightAnswer) + '</td><td>' + allChoices[y].feedback + '<td>' + noFalse(allChoices[y].eliminate) + ' </td><td>' + noFalse(allChoices[y].penalty) + ' </td></tr>'
            blockChoice = blockChoice + choiceLine
        }

        return blockChoice;
    }

    /* TEMPLATE MODEL FOR 1 ITEM -> report item is now independant*/
    var reportItem_tpl = itemReport_tpl(update)

    $(".monitorList").append(reportItem_tpl);
    $(".monitorList").find("#T" + update.itemID).append(allChoicesBlock(ZeItem.choices))

    function noFalse(bool) {
        if (!bool) {
            return "-"
        } else {
            return true
        }
    }

    //---
    function getFeedBackText(activGChoice) {
        var ChoiceText;
        var allFeedback = stage.find(".feedBack");
        for (let i = 0; i < allFeedback.length; i++) {
            if (allFeedback[i].attrs.belongTo == activGChoice.id()) {
                if (allFeedback[i].getClassName() == "Text") { ChoiceText = allFeedback[i].text(); }
            }
        }
        if (typeof ChoiceText == "undefined") {
            ChoiceText = "-"
        }
        return ChoiceText;
    }

    //CARDTOOLS Listeners
    zoomInBT();
    zoomOutBT();
    activeCardPreview(jsonStageGenerated);
    activeEditCardItem([ZeItem], CKType);
    addToItemPack(ZeItem.itemID, nextItem.length + 1, ZeItem, jsonStageGenerated, param, dataURL);
    $(".deletor").on("click", function() {
        deleteSingle($(this).attr("data-ID"))

    })

}