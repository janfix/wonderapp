/* Licence  copyright 
Version : 1.0.0
Author : Janfix
Date : 23/05/2021
*/

/* -------- Chapters ---------------
1. Question
2. Input
3. Tick
4. Label
5. Item
6. Grid & Canvas
7. Metadata
*/
const AColorPicker = require('a-color-picker');
import $ from "jquery";
import {get } from "../wonderChoiceConfig";
import { tick, tickCross, tickRound, tickSquare, tickStar } from "./Kmod/allticks";
import gridBuilder from "./Kmod/gridBuilder";
import activateItemParam from "./itemParamController";
import multiSelection from "./Kmod/mselector"


export default function paramController(stage, layer, gridLayer) {


    activateItemParam(stage, layer)

    //Default value -> update panel
    //$('#pic3').css("background-color", get().inputStroke); // Input : Border/stroke color 
    //$('#color-picker4').val(get().inputfill); // Input : Fill color 
    $(".roundedAngle").val(get().RoundAngle) // Input: radius corner
        //$('#color-picker5').val(get().tickColor); // tick : stroke color
    $(".fontLabel").val(get().labelFont).change(); //Label font family
    $(".labelFontSize").val(parseInt(get().labelFontSize)).change(); //Label font family
    //$('#color-picker7').val(get().labelColor); // Label font color
    $(".LabelVisib").prop('checked', get().labelVisible);
    //$('#color-picker8').val(get().questionColor); // Question font color
    $("#QuestionFontSize").val(parseInt(get().QuestionFontSize)).change(); // Question font size
    $(".fontQuestion").val(get().fontQuestion) //Question font familly

    /* ---------------- Question TAB ------------ */

    //Question font-size
    $('#QuestionFontSize').on("change", function() {
        stage.find(".question").fontSize(parseInt(this.value));
        layer.draw();
    })

    //Question font-familly
    $(".fontQuestion").on("change", function() {
        stage.find(".question").fontFamily(this.value);
        layer.draw();
    })

    function activePicker(pic, defaultColor) {
        $("#" + pic).css("background-color", defaultColor);
        //Listener
        AColorPicker.from('.' + pic)
            .on('change', (picker, color) => {
                if (pic == "pic8") { //Qurstion font color
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

    activePicker("pic1", get().gridColor); // GRID
    activePicker("pic3", get().inputStroke); // INPUTBOX border
    activePicker("pic4", get().inputfill); // INPUTBOX BG
    activePicker("pic5", get().tickColor);
    activePicker("pic6", "gainsboro"); //Canvas border
    activePicker("pic7", get().labelColor);
    activePicker("pic8", get().questionColor);



    /*   $(".a-color-picker").on("mouseleave", function() {
          $(this).parent().fadeOut("slow")
      }); */


    /* ----------------- Input TAB ----------------*/
    $(".roundedAngle").on("change", function() {
        $("#defaultShape").prop('checked', false);
        stage.find(".inputBox").cornerRadius([$(this).val(), $(this).val(), $(this).val(), $(this).val()]);

        var allIbox = stage.find(".inputBox")
        for (let i = 0; i < allIbox.length; i++) {
            allIbox[i].attrs.defaultShape = false;
        }


        layer.draw();
    })

    /* ----------------- Tick TAB ----------------*/
    //Tick Changer
    $(".tickShape").find("button").on("click", function() {

        $("#tick").find("button").removeClass("active");
        $(this).addClass("active");
        var activeType = $(this).find("img").attr("data-type");
        var activeTick;
        if (activeType == "Cross") {
            activeTick = tickCross();
        } else if (activeType == "Round") {
            activeTick = tickRound()
        } else if (activeType == "Square") {
            activeTick = tickSquare()
        } else if (activeType == "Star") {
            activeTick = tickStar()
        } else { activeTick = tick() }
        var allGroups = stage.find(".inputGroup").toArray();
        stage.find(".tick").remove();
        for (let i = 0; i < allGroups.length; i++) {
            allGroups[i].add(activeTick.clone()); // VERY IMPORTANT !!!
        }
        if (activeType == "Cross") {
            stage.find(".tick").rotate(45);
        }
        layer.batchDraw();
    });

    //Label FontFamily
    $(".fontLabel").on("change", function() {
        stage.find(".labelCk").fontFamily($(this).val());
        layer.draw();
    });

    //Label FontSize
    $(".labelFontSize").on("change", function() {
        stage.find(".labelCk").fontSize(parseInt($(this).val()));
        layer.draw();
    })

    //Label Visibility
    $(".LabelVisib").on("change", function() {
        if ($(this).prop("checked")) { stage.find(".labelCk").show(); } else { stage.find(".labelCk").hide(); }
        layer.draw();
    });

    //Display Index : Numeric, Alphabetic, no-Index
    $(".indexAN").on("change", function() {
        var allIndex = stage.find(".indexCk");
        if ($(this).val() == "INum") {
            allIndex.each(function(shape, n) {
                shape.text((n + 1) + ". ");
                shape.visible(true);
                shape.attrs.mode = "numeric";
            });
        } else if ($(this).val() == "IAlpha") {
            allIndex.each(function(shape, n) {
                console.log("Alphabetic")
                shape.text(String.fromCharCode(n + (65)) + ". ");
                shape.visible(true);
                shape.attrs.mode = "alphabetic";
            });
        } else {
            allIndex.each(function(shape, n) { shape.visible(false); });
        }
        layer.draw()
    });




    /* ----------------- item TAB ----------------*/


    /* ----------------- Grid & Canvas TAB ----------------*/

    //Grid updater
    $(".gridSquare").html($(".gridUnit").val());
    $(".gridUnit").on("change", function() {
        gridBuilder($(this).val(), gridLayer);
        $(".gridSquare").html($(".gridUnit").val())
        gridLayer.draw();
        stage.children[2].moveToTop();
        multiSelection(stage, stage.children[2])
        stage.children[2].batchDraw();
    })


    function gridCleaner(gridLayer) {
        gridLayer.find("#grido").destroy()
        gridLayer.find(".grid").destroy()
        gridLayer.draw()
    }

    function gridBuilder(padding, gridLayer) {
        var width = stage.width();
        var height = stage.height();
        gridCleaner(gridLayer)
        var bgGrid = new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: 'transparent',
            id: "grido"
        });

        for (var i = 0; i < width / padding; i++) {
            gridLayer.add(bgGrid, new Konva.Line({
                points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
                stroke: $("#pic1").css("background-color"),
                strokeWidth: 1,
                name: "grid"
            }));
        }

        gridLayer.add(new Konva.Line({
            points: [0, 0, 10, 10]
        }));
        for (var j = 0; j < height / padding; j++) {
            gridLayer.add(new Konva.Line({
                points: [0, Math.round(j * padding), width, Math.round(j * padding)],
                stroke: '#ddd',
                strokeWidth: 0.5,
                name: "grid"
            }));
        }

    }
    $(".canvasWidth").on("change", function() {
        stage.width(parseInt(this.value));
        $(".Kwidth").html($(".canvasWidth").val())
    });
    $(".canvasHeight").on("change", function() {
        stage.height(parseInt(this.value))
        $(".Kheight").html(this.value)
    })




    /* ----------------- Metadata TAB ----------------*/




    /* Close Parameters */
    $(".closeParam").on("click", function() {
        $(this).parent().parent().addClass("collapse")
    })






}