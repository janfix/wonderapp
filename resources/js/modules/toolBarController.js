/* Licence  copyright 
Version : 1.0.0
Author : Janfix
Date : 23/05/2021
*/

/* -------- Chapters ---------------
Top Toolbar controller 
1. Clear 
2. Vertical / horizontal Layout
3. Add question
4. Add Checkbox
5. Add SingleChoice
6. Add Scoped singleChoice
7. Show / hide Parameters
8. Show / hide Rich Editor (Quill)
9. SnapShot
10. List CK injection
11. List Radio injection
12. Parser
13. Add Image
14. Add free Text
15. Add Shapes
----bottom bar--------
16. Preview
17. Help
18. Import template
19. Export template
20. Add to Package builder
21. Update in package Builder -> Not here but in the parserOutput file ! 


*/


import $ from "jquery";
import addQuestion from "./Kmod/question";
import cloneCk from "./Kmod/cloneCk";
import html2canvas from "../libs/html2canvas.min";
import addFreeText from "./Kmod/freeText";
import { addCircle, addLine, addRectangle, addRoundRect, addRing, addStar, addArrow, addTriangle } from "./Kmod/freeShape";
import parserOutPut from "./parserOutPut";
import createRender from "./renderpci";
import buildParam from "./param";

export default function toolBarController(stage, layer, lockLayer, gridLayer) {
    /* 1. - Clear  */
    $(".clearAll").on("click", function() {
        //console.log("MAIN -Reaction of clear all")
        stage.find(".inputGroup").destroy();
        stage.find(".question").destroy();
        stage.find(".freeShape").destroy();
        stage.find(".freeText").destroy();
        stage.find(".freeImage").destroy();
        stage.find(".richContent").destroy();
        stage.find(".feedBack").destroy();
        stage.find("#hintContent").destroy();
        stage.find("#hint").visible(false);
        stage.find("#resetBT").destroy();
        $(".updateSingle").prop("disabled", true)
        layer.draw()
    });

    /* 2. Vertical / horizontal Layout */
    //-------- Layout Update Horizontal or Vertical Persistance display (look only where active class is present)
    $(".VLayout").addClass("active");
    $(".HLayout").on("click", function() {
        $(this).addClass("active");
        $(".VLayout").removeClass("active");
    });
    $(".VLayout").on("click", function() {
        $(this).addClass("active");
        $(".HLayout").removeClass("active");
    });


    /* 3. Add question */
    $(".addQuestion ").on("click", function() {
        stage.find(".question").destroy();
        var questionPrompt = addQuestion(stage, layer);
        layer.add(questionPrompt);
        layer.draw()
    })

    /* 4. Add Checkbox */
    var defaultChoiceNumber = 1
    var GroupChoice;
    $(".addCkGroup").on("click", function() {
        $(this).addClass("active");
        $(".addRadioGroup").removeClass("active");
        for (let index = 0; index < defaultChoiceNumber; index++) {
            GroupChoice = "none";
            cloneCk(stage, "checkbox", GroupChoice, layer);
        }
    });

    /* 5. Add SingleChoice  */
    $(".addRadioGroup").on("click", function() {
        $(this).addClass("active");
        $(".addCkGroup").removeClass("active");
        for (let index = 0; index < defaultChoiceNumber; index++) {
            GroupChoice = "none";

            cloneCk(stage, "radio", GroupChoice, layer);
        }
    });

    /* 6. Add Scoped singleChoice */
    var GCID = 0; //Start counterID from 0 
    $(".addChoiceGroup").on("click", function() {
        GCID = GCID + 1;
        for (let index = 0; index < 5; index++) {
            GroupChoice = "GroupChoice" + GCID;
            cloneCk(stage, "radio", GroupChoice, layer);
        }
    });


    /* 7. Rich editor Call button */
    $(".richEditor").on("click", function() {
        $(".editContainer").toggleClass("collapse");
        $(".editorAction").toggle()
    })

    /* 8. Snapshot from editor to Canvas */
    $(".snapshot").on("click", function() {
        const SnapShot = new Konva.Image({
            name: "richContent",
            x: 10,
            y: 10,
            draggable: true,
            legend: ""
        });
        layer.add(SnapShot);
        //console.log($(".ql-editor").text());
        SnapShot.attrs.legend = $(".ql-editor").text();

        $(".ql-editor").css({ "width": "fit-content" });
        var Ewidth = parseInt($(".ql-editor").css("width")) + 20;

        //var Capt = $(".ql-editor").css("width", Ewidth + "px");
        var Capt = $(".ql-editor").css({ "width": "fit-content", "min-height": "min-content" });

        var dataUrl;
        console.log(window.devicePixelRatio)
        html2canvas(Capt[0], {
            backgroundColor: "transparent",
            scale: 3
        }).then(canvas => {
            dataUrl = canvas.toDataURL();
            // show it inside Konva.Image
            SnapShot.image(canvas);
            SnapShot.scaleX(0.5)
            SnapShot.scaleY(0.5)
            SnapShot.setAttr('source', dataUrl);
            layer.batchDraw();
        });
        $(".ql-editor").css({ "width": "max-content", "min-height": "250px" });
    })

    /* 9. List injection for Multichoice mode */
    $(".listInjection").on("click", function() {
        var allElements = [];
        $(".ql-editor").find("li").each(function(index) {
            //console.log(index + ": " + $(this).text());
            allElements.push($(this).text())
        });
        for (let i = 0; i < allElements.length; i++) {
            $(".addCkGroup").trigger("click")
        }

        var allCK = stage.find(".inputGroup");
        for (let i = 0; i < allCK.length; i++) {
            allCK[i].findOne(".labelCk").text(allElements[i]);
        }

    })

    /* 10. List injection for singleChoice mode */
    $(".listInjectionRadio").on("click", function() {
        var allElements = [];
        $(".ql-editor").find("li").each(function(index) {
            allElements.push($(this).text())
        });
        for (let i = 0; i < allElements.length; i++) {
            $(".addRadioGroup").trigger("click")
        }

        var allCK = stage.find(".inputGroup");
        for (let i = 0; i < allCK.length; i++) {
            allCK[i].findOne(".labelCk").text(allElements[i]);
        }

    })

    /* 11. Parser Mode */
    $(".parseItems").on("click", function() { //Launch the parser and build the monitor list
        //call Parser files !!
        var allAlong = 0; // this variable keep the memory of choices numbers
        parserOutPut(stage, layer, allAlong);
    })


    /* 12. Inject image to Canvas */
    var Counter = 0;
    // listen for the file input change event and load the image.
    $("#myfile").on("change", function(e) {
        //console.log(e.currentTarget.files[0].name)
        var URL = window.webkitURL || window.URL;
        var url = URL.createObjectURL(e.target.files[0]);
        var img = new Image();
        img.src = url;
        var that = this;
        img.onload = function() {
            console.log("ONLOAD STEP")

            var img_width = img.width;
            var img_height = img.height;

            // calculate dimensions to get max 300px
            var max = 300;
            var ratio = (img_width > img_height ? (img_width / max) : (img_height / max))

            // now load the Konva image
            Counter = Date.now();
            //console.log(Counter)

            var theImg = new Konva.Image({
                id: "FreeIMG" + Counter,
                image: img,
                x: 50,
                y: 30,
                /*  width: img_width / ratio,
                 height: img_height / ratio ,*/
                draggable: true,
                name: 'freeImage',
                legend: e.currentTarget.files[0].name
            });
            layer.add(theImg);
            layer.draw();
            var url = theImg.toDataURL();
            theImg.setAttr('source', url);
            $(that).val("");
        }
       
       
    });

    /* 13. Add freeText */
    $(".addFreeText").on("click", function() {
        var freeTextPrompt = addFreeText(stage, layer);
        layer.add(freeTextPrompt);
        layer.draw()
    })

    /* 14. All Shapes */
    //Free shape button

    $(".freeCircle").on("click", function() {
        var FreeCircle = addCircle();
        FreeCircle.setAttr("source", FreeCircle.toDataURL());
        layer.add(FreeCircle);
        layer.draw();
    });

    $(".freeLine").on("click", function() {
        var FreeLine = addLine(stage, layer);
        FreeLine.setAttr("source", FreeLine.toDataURL());
        //layer.add(FreeLine);
        //layer.draw();
    });

    $(".freeRectangle").on("click", function() {
        var FreeRectangle = addRectangle();
        FreeRectangle.setAttr("source", FreeRectangle.toDataURL());
        layer.add(FreeRectangle);
        layer.draw();
    });

    $(".freeRoundRectangle").on("click", function() {
        var FreeRoundRectangle = addRoundRect();
        FreeRoundRectangle.setAttr("source", FreeRoundRectangle.toDataURL());
        layer.add(FreeRoundRectangle);
        layer.draw();
    });

    $(".freeRing").on("click", function() {
        var FreeRing = addRing();
        FreeRing.setAttr("source", FreeRing.toDataURL());
        layer.add(FreeRing);
        layer.draw();
    });

    $(".freeStar").on("click", function() {
        var FreeStar = addStar();
        FreeStar.setAttr("source", FreeStar.toDataURL());
        layer.add(FreeStar);
        layer.draw();
    });

    $(".freeArrow").on("click", function() {
        var FreeArrow = addArrow();
        FreeArrow.setAttr("source", FreeArrow.toDataURL());
        layer.add(FreeArrow);
        layer.draw();
    });

    $(".freeTriangle").on("click", function() {
        var FreeTriangle = addTriangle();
        FreeTriangle.setAttr("source", FreeTriangle.toDataURL());
        layer.add(FreeTriangle);
        layer.draw();
    });

    /* 16. Preview */

    $(".action").off("click")
    $(".action").on("click", function() {
        stage.find(".tick").visible(false); //Avoid the visible /invisible effect!
        stage.find(".scoreDot").visible(false); //Avoid the visible /invisible effect!
        var jsonStage = stage.toJSON();
        var param = buildParam();
        //console.log(param)
        createRender(jsonStage, param);
        $(".editContainer").addClass("collapse");;
        $("#parameterPanel").addClass("collapse");
        $(".GraphicEditor ").hide();
        $('.previewContainer').show();
        $(".topMenuBar").hide();
        $('.bottomMenuBar').hide();
        // $('.monitor').hide();
    });

    $(".backToEditor").off("click");
    $(".backToEditor").on("click", function() {
        //Grab element from the canvas 
        //Rebuilt the interface
        $(".GraphicEditor ").show();
        $('.previewContainer').hide();
        $(".itemReady").fadeIn("fast");
        $(".topMenuBar").show();
        $('.bottomMenuBar').show();
        //$('.monitor').show();
        //
    })
    $(".checkResultBT").off("click");
    $(".checkResultBT").on("click", function() {
        console.log("Checlresult");
        $(".checkResult").toggle()
    });






}