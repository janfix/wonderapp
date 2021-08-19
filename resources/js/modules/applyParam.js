import $ from "jquery";
import gridBuilder from "./Kmod/gridBuilder";
import { toDay, toAlpha } from "./tools";
import { tick, tickCross, tickRound, tickSquare, tickStar } from "./Kmod/allticks";
import multiSelection from "./Kmod/mselector";
import {get } from "../wonderChoiceConfig";
const AColorPicker = require('a-color-picker');

export default function applyParam(stage, item) {
    var layer = stage.children[2];
    var gridLayer = stage.children[0];
    console.log(item)

    //Canvas 
    $("canvas").css({
        "border": item.param.canvasBorderColor,
        "height": item.param.canvasHeight + "px",
        "width": item.param.canvasWidth + "px",
    })

    //Grid
    stage.find(".grid").stroke(item.param.gridColor);
    gridBuilder(stage, item.param.gridUnit);
    //stage.find(".grid").visible(item.param.gridVisible);
    stage.find(".grid").visible(true);
    multiSelection(stage, stage.children[2])

    // Tick
    stage.find(".tick").fill(item.param.tickColor);

    var activeTick, activeType = item.param.tickShape;
    if (activeType == "Cross") {
        activeTick = tickCross();
    } else if (activeType == "Round") {
        activeTick = tickRound()
    } else if (activeType == "Square") {
        activeTick = tickSquare()
    } else if (activeType == "Star") {
        activeTick = tickStar()
    } else { activeTick = tick() }
    /*var allGroups = stage.find(".inputGroup").toArray();
    stage.find(".tick").remove();
    for (let i = 0; i < allGroups.length; i++) {
       allGroups[i].add(activeTick.clone()); // VERY IMPORTANT !!!
    } */
    if (activeType == "Cross") {
        stage.find(".tick").rotate(45);
    }


    //Input 
    stage.find(".inputBox").fill(item.param.inputBGColor);
    stage.find(".inputBox").stroke(item.param.inputBorderColor);
    var allInputBox = stage.find(".inputBox");
    for (let i = 0; i < allInputBox.length; i++) {
        console.log(allInputBox[i].attrs.defaultShape)
        if (item.param.defaultShape) {
            if (allInputBox[i].parent.attrs.type == "radio") {
                allInputBox[i].cornerRadius(25);
                allInputBox[i].getParent().find(".tick").fill("#79BAEC");
            } else {
                allInputBox[i].cornerRadius(parseInt(item.param.inputRoundAngle))

            }
        } else {

            stage.find(".inputBox").cornerRadius(parseInt(item.param.inputRoundAngle));
        }

    }


    //Choice label
    stage.find(".labelCk").fill(item.param.labelFontColor);
    stage.find(".labelCk").stroke(item.param.labelFontColor);
    stage.find(".labelCk").fontFamily(item.param.labelFontFamily)
    stage.find(".labelCk").fontSize(parseInt(item.param.labelFontSize));
    if (!item.param.labelVisible) {
        stage.find(".labelCk").visible(false)
    } else {
        stage.find(".labelCk").visible(true)
    }

    //Index on choice!

    if (item.param.labelIndex == "noIndex") {
        stage.find(".indexCk").visible(false)
    } else if ($('.indexAN').val() == "IAlpha") {
        var allIndex = stage.find(".indexCk");
        stage.find(".indexCk").visible(true)
        for (let i = 0; i < allIndex.length; i++) {
            var indexAN = toAlpha(i + 1);
            allIndex[i].text(indexAN + ".");
            allIndex[i].id("index" + i);
        }
        stage.find(".indexCk").attrs.mode = "alphabetic";
    } else if ($('.indexAN').val() == "INum") {
        var allIndex = stage.find(".indexCk");
        stage.find(".indexCk").visible(true)
        for (let i = 0; i < allIndex.length; i++) {
            allIndex[i].text(i + ".");
        }
        stage.find(".indexCk").attrs.mode = "numeric";
    } else {
        stage.find(".indexCk").attrs.mode = "noIndex";
    }



    // Question 
    stage.find(".question").fill(item.param.questionFontColor);
    stage.find(".question").stroke(item.param.questionFontColor);
    stage.find(".question").fontFamily(item.param.questionFontFamily);
    stage.find(".question").fontSize(parseInt(item.param.questionFontSize));




    //Color Pickers
    function activePicker(pic, defaultColor) {
        $("#" + pic).css("background-color", defaultColor);
        //Listener
        AColorPicker.from('.' + pic)
            .on('change', (picker, color) => {
                if (pic == "pic8") { //Question font color
                    stage.find(".question").fill(color);
                } else if (pic == "pic3") {
                    stage.find(".inputBox").stroke(color);
                } else if (pic == "pic4") {
                    stage.find(".inputBox").fill(color);
                } else if (pic == "pic5") {
                    stage.find(".tick").fill(color);
                } else if (pic == "pic6") {
                    $(".KonvaContainer").css("border", "1px " + color + " solid")
                } else if (pic == "pic7") {
                    stage.find(".labelCk").fill(color);
                } else if (pic == "pic1") {
                    stage.find(".grid").stroke(color);
                    gridLayer.draw();
                }


                $("#" + pic).css("background-color", color)
                layer.draw();
            });

        $("." + pic).hide()

        $("#" + pic).on('click', function() {
            $("." + pic).toggle()
        })

    }
    $(".a-color-picker").remove()
    activePicker("pic1", item.param.gridColor); // GRID
    activePicker("pic3", item.param.inputBorderColor); // INPUTBOX border
    activePicker("pic4", item.param.inputBGColor); // INPUTBOX BG
    activePicker("pic5", item.param.tickColor);
    activePicker("pic6", item.param.canvasBorderColor); //Canvas border
    activePicker("pic7", item.param.labelFontColor);
    activePicker("pic8", item.param.questionFontColor);



    /* $(".a-color-picker").on("mouseleave", function() {
        $(this).parent().fadeOut("slow")
    }); */



    //layer.batchDraw();

    /*  Items parameter 
        1. Update/trigger the parameter panel to have the good response on preview call!
            item.param.itemChoiceLimit: ""
            item.param.itemChronoActive: false
            item.param.itemElimination: false
            item.param.itemHint: true
            item.param.itemResetBT: false
            item.param.itemShowCountDown: false
            item.param.itemShuffle: false
            item.param.itemTimeLimitMessage: ""
            item.param.itemTimeLimitValue: ""
            --------------------------------
            */


}