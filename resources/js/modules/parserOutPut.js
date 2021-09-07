import $ from "jquery";
import parser from "./parser";
import addFreeText from "./Kmod/freeText";
import buildParam from "./param";
import reactivate from "./reactivate";
import itemReport_tpl from "./itemReport_TPL";
import applyParam from "./applyParam";
import { zoomInBT, zoomOutBT, activeCardPreview, activeEditCardItem, deleteSingle } from "./cardTools";
import { addToItemPack } from "./itemPack";
//import updateSingle from "./updateSingle";
import { toDay } from "./tools";

export default function parserOutPut(stage, layer, allAlong) {

    /* This should call addSingle.Js using a for loop */

    //Get Today
    var today = toDay();
    var allItems = [];

    $(".monitor").show();
    var wsource = $(".ql-editor").html();

    if (wsource.substr(wsource.length - 11) == "<p><br></p>") {
        alert("An empty line was found at the end of your list, please remove all emplty lines at the end to proceed");
    } else {
        var myModal = new bootstrap.Modal(document.getElementById('parserModal'), {
            keyboard: false
        })
        $('input[name="choiceType"]').on("click", function() {
            var CKType = "radio";
            CKType = $(this).val();
            allItems = parser(wsource, CKType);
            parsingOut(allItems, CKType);
        })

        myModal.show()
    }

    function parsingOut(allItems, CKType) {
        $(".parserMessage").show();
        $(".howManyItems").html(" " + allItems.length + " ");
        //Item verification process--------------------------------
        var ErrorConversion = []
        if (typeof allItems[0] == "undefined") {
            ErrorConversion.push(["An error occured for item 1 and followers : empty or undefined, check your #tags!"])
        } else {
            for (let i = 0; i < allItems.length; i++) { // Error search at item level
                if (typeof allItems[i].choices == "undefined" ||
                    allItems[i].choices.length == 0 ||
                    allItems[i].choices.length == 1) {
                    ErrorConversion.push(["An error occured for item " + (i + 1) + ": empty or undefined"])
                } else {
                    for (let y = 0; y < allItems[i].choices.length; y++) { // Error search at choice level
                        if (allItems[i].choices[y].text == "" ||
                            allItems[i].choices[y].text == "undefined" ||
                            allItems[i].choices[y].text.length == 0
                        ) { ErrorConversion.push(["An error occured for item " + (i + 1) + "at choice:" + y]) }

                    }
                }
            }
        }
        for (let i = 0; i < ErrorConversion.length; i++) {
            $(".errorList").html("<li>" + ErrorConversion + "</li>")
        }

        $("html, body").animate({
            scrollTop: $('.monitor').offset().top
        }, 100);

        $(".monitorList").empty()


        var jsonStageGenerated = [];

        //Scan allItems
        for (let i = 0; i < allItems.length; i++) {
            // console.log(allItems.length);
            $(".clearAll").trigger("click");
            $(".addQuestion").trigger("click");

            for (let y = 0; y < allItems[i].choices.length; y++) {
                //console.log(allItems[i].choices[y]) //Here options by choices are visible
                if (CKType == "checkbox") {
                    $(".addCkGroup").trigger("click");
                    for (let y = 0; y < allItems[i].choices.length; y++) {
                        allItems[i].choices[y].type = "checkbox";;
                        
                    }
                } else {
                    $(".addRadioGroup").trigger("click");
                     for (let y = 0; y < allItems[i].choices.length; y++) {
                        allItems[i].choices[y].type = "radio";;  
                    } 
                }
                //console.log(stage.find("#Choice" + (y + 1)))
                var choiceLoaded = stage.findOne("#Choice" + (y + 1)).text(allItems[i].choices[y].text);
                //console.log(allItems[i].choices[y].feedback)

                //Identify orientation!!
                var OrientationDisplay;
                var testH = $(".HLayout").hasClass('active');
                //var testV = $(".VLayout").hasClass('active');
                if (testH) { OrientationDisplay = "horizontal" } else {
                    OrientationDisplay = "vertical"
                }
                // Right answer 
                if (allItems[i].choices[y].rightAnswer) {
                    //console.log(allItems[i].choices[y].text)
                    choiceLoaded.parent.findOne(".scoreDot").fill("green");
                    choiceLoaded.parent.findOne(".scoreDot").visible(true);

                }

                //Choice to Eliminate
                if (allItems[i].choices[y].eliminate) {
                    //console.log(allItems[i].choices[y].text)
                    choiceLoaded.parent.findOne(".scoreDot").visible(true);
                    choiceLoaded.parent.findOne(".scoreDot").fill("#FCC30D");

                }


                //Penalty mode
                if (allItems[i].choices[y].penalty) {
                    choiceLoaded.parent.findOne(".scoreDot").fill("red");
                    choiceLoaded.parent.findOne(".scoreDot").visible(true)
                }


                // FEEDBACK SOLVER
                if (typeof allItems[i].choices[y].feedback !== "undefined" && allItems[i].choices[y].feedback !== false) {
                    var feedbackText = addFreeText(stage, layer)
                    feedbackText.text(allItems[i].choices[y].feedback);
                    feedbackText.name("feedBack");
                    feedbackText.opacity(0.3);
                    feedbackText.attrs.belongTo = choiceLoaded.parent.id();
                    choiceLoaded.parent.add(feedbackText)
                    if (OrientationDisplay == "vertical") {
                        feedbackText.x(choiceLoaded.parent.x() + 600);
                        feedbackText.y(choiceLoaded.parent.y())
                    } else {
                        feedbackText.x(choiceLoaded.parent.x());
                        feedbackText.y(choiceLoaded.parent.y() + 60)
                    }

                    layer.add(feedbackText)
                        //console.log(feedbackText)
                } else {
                    //console.log("no Feedback")
                }
            }
            allAlong = allItems[i].choices.length + allAlong;
            stage.findOne(".question").text(allItems[i].question);

            //Elimination mode Solver
            if (allItems[i].eliminationMode) {
                stage.find(".bin").visible(true);
            } else {
                stage.find(".bin").visible(false);
            }


            // Hint SOLVER 
            if (typeof allItems[i].hint !== "undefined" && allItems[i].hint !== false) {
                allItems[i].param.itemHint = true;
                stage.find("#hint").visible(true);
                var freeTextHint = addFreeText(stage, layer);
                freeTextHint.text(allItems[i].hint)
                freeTextHint.x(90);
                freeTextHint.id("hintContent");
                freeTextHint.y(stage.height() - 90);
                layer.add(freeTextHint);
            } else {
                stage.find("#hint").visible(false);
            }

            //Update layer 
            layer.draw()
                //Snapshot for monitor
            var dataURL = stage.toDataURL({ pixelRatio: 1 });
            // Stage to JSON

            jsonStageGenerated.push(stage.toJSON());


            //Reset For One Item
            $(".clearAll").trigger("click")
            stage.find("#hint").visible(false);

            // console.log(allItems[i].choices)
            //Inject card Content
            var update = {
                "pathToPreview": dataURL,
                "itemID": allItems[i].itemID,
                "IndexChoice": i + 1,
                "CDate": today,
                "question": allItems[i].question,
                "choices": allItems[i].choices,
                "authors": "JPR",
                "interactionType": "Choices",
                "hint": allItems[i].hint,
                "ATLimiter": $("#limiter").val(),
                "chrono": chronoDisplay(),
                "TimeLimiter": timerDisplay(),
                "TimeLimit": $("#timeLimitValue").val(),
                "TimeLimitMessage": $("#timeLimitMessage").val(),
                "Shuffle": $("#ShuffleChoice").prop("checked"),
                "resetBT": $("#resetBTActivate").prop("checked"),
                "inputType": CKType
            }

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
                    //allChoices[y];
                    choiceLine = '<tr><td>' + allChoices[y].text + ' </td> <td>' + allChoices[y].rightAnswer + '</td><td>' + allChoices[y].feedback + '<td>' + allChoices[y].eliminate + ' </td><td>' + allChoices[y].penalty + ' </td></tr>'
                    blockChoice = blockChoice + choiceLine
                }

                return blockChoice;
            }

            /* TEMPLATE MODEL FOR 1 ITEM -> report item is now independant*/
            var reportItem_tpl = itemReport_tpl(update)

            $(".monitorList").append(reportItem_tpl);
            $(".monitorList").find("#T" + update.itemID).append(allChoicesBlock(allItems[i].choices))
       

        /* ALL LISTENERS */

         var nextItem = $(".itemRow");

         //CARDTOOLS Listeners
            zoomInBT();
            zoomOutBT();
            activeCardPreview(jsonStageGenerated);
            activeEditCardItem([allItems[i]], CKType);
            addToItemPack(allItems[i].itemID, nextItem.length + 1, allItems[i], jsonStageGenerated, allItems[i].param, dataURL);
            $(".deletor").on("click", function() {
                deleteSingle($(this).attr("data-ID"))

            }) 
        }    
    }
}