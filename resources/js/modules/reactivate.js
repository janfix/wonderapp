import $ from "jquery";
import Konva from "konva";
import toolBarController from './toolBarController';
import parameters from "./paramController";
import multiSelection from "./Kmod/mselector";
import Cmenu from "./Cmenu";
import Cmenu_CF from "./CmenuFreeContent";
import addHint from "./Kmod/hint";
import editKcontent from "./Kmod/editKContent";
import cloneCk from "./Kmod/cloneCk";


export default function reactivate(stage, item) {

    /* Reactivation chapters
        The starting point : the stage is regenerated with etherogneous data coming form jsonStage and item-Object.
        This new stage is not connected to their interactive tool. The user must retreive a fully functional stage
    
        I - Rebuild a fully functional stage
        1. Reactivate toolbar
        2. Reactivate parameters
        3. Reactivate multiselection
        4. Reactivate ContextMenu 1
        5. Reactivate FreeContent context menu

        All elements of the editable Item must react as their rôle!
        II - Reactivate / Recreate Item Elements
        1. The title
        2. The choices
        3. The 
        */


    /* Passing layers */
    var gridLayer = stage.children[0];
    var lockLayer = stage.children[1];
    var layer = stage.children[2];
    var $container = $(".appContainer");

    /* I - Rebuild a fully functional stage  */
    toolBarController(stage, layer, lockLayer, gridLayer);
    parameters(stage, layer, gridLayer);
    multiSelection(stage, layer)
    Cmenu($container, stage, layer);
    Cmenu_CF($container, stage, layer);


    console.log(stage)
    console.log(item)

    /* II - Reactivate / Recreate Item Elements */

    /* The Hint */
    /* HINT problem Resolved here using B64 image + special width and height */
    var blightSRC = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDMyLjQgNDMyLjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQzMi40IDQzMi40OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMjMxRjIwOyIgZD0iTTIxNi41MjksOTMuMmMtNjEuMiwwLTExMS4yLDUwLTExMS4yLDExMS4yYzAsMzIsMTQsNjIuOCwzNy42LDgzLjZjMTcuNiwxNy42LDE2LDU1LjIsMTUuNiw1NS42DQoJCQkJYzAsMiwwLjQsMy42LDIsNS4yYzEuMiwxLjIsMy4yLDIsNC44LDJoMTAyYzIsMCwzLjYtMC44LDQuOC0yYzEuMi0xLjIsMi0zLjIsMi01LjJjMC0wLjQtMi0zOCwxNS42LTU1LjYNCgkJCQljMC40LTAuNCwwLjgtMC44LDEuMi0xLjJjMjMuMi0yMS4yLDM2LjgtNTEuMiwzNi44LTgyLjRDMzI3LjcyOSwxNDMuMiwyNzcuNzI5LDkzLjIsMjE2LjUyOSw5My4yeiBNMjgwLjUyOSwyNzcuNg0KCQkJCWMtMC40LDAuNC0xLjIsMS4yLTEuMiwxLjZjLTE1LjYsMTYuOC0xOC40LDQ0LjQtMTguOCw1Ny42aC04OC40Yy0wLjQtMTMuMi0zLjItNDItMjAtNTkuMmMtMjEuMi0xOC40LTMzLjYtNDUuMi0zMy42LTczLjYNCgkJCQljMC01NCw0My42LTk3LjYsOTcuNi05Ny42czk3LjYsNDMuNiw5Ny42LDk3LjZDMzEzLjcyOSwyMzIuNCwzMDEuNzI5LDI1OS4yLDI4MC41MjksMjc3LjZ6Ii8+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMjMxRjIwOyIgZD0iTTIxNi4xMjksMTIxLjZjLTMuNiwwLTYuOCwzLjItNi44LDYuOGMwLDMuNiwzLjIsNi44LDYuOCw2LjhjNDAuNCwwLDcyLjgsMzIuOCw3Mi44LDcyLjgNCgkJCQljMCwzLjYsMy4yLDYuOCw2LjgsNi44YzMuNiwwLDYuOC0zLjIsNi44LTYuOEMzMDIuOTI5LDE2MC40LDI2NC4xMjksMTIxLjYsMjE2LjEyOSwxMjEuNnoiLz4NCgkJCTxwYXRoIHN0eWxlPSJmaWxsOiMyMzFGMjA7IiBkPSJNMjYwLjUyOSwzNTguNGgtODguOGMtOS4yLDAtMTYuOCw3LjYtMTYuOCwxNi44czcuNiwxNi44LDE2LjgsMTYuOGg4OC40DQoJCQkJYzkuNi0wLjQsMTcuMi03LjYsMTcuMi0xNi44QzI3Ny4zMjksMzY2LDI2OS43MjksMzU4LjQsMjYwLjUyOSwzNTguNHogTTI2MC41MjksMzc4aC04OC44Yy0xLjYsMC0zLjItMS4yLTMuMi0zLjINCgkJCQlzMS4yLTMuMiwzLjItMy4yaDg4LjRjMS42LDAsMy4yLDEuMiwzLjIsMy4yUzI2Mi4xMjksMzc4LDI2MC41MjksMzc4eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGQ9Ik0yNDcuMzI5LDM5OC44aC02Mi40Yy05LjIsMC0xNi44LDcuNi0xNi44LDE2LjhzNy42LDE2LjgsMTYuOCwxNi44aDYyLjQNCgkJCQljOS4yLDAsMTYuOC03LjYsMTYuOC0xNi44QzI2NC4xMjksNDA2LDI1Ni41MjksMzk4LjgsMjQ3LjMyOSwzOTguOHogTTI0Ny4zMjksNDE4LjRoLTYyLjRjLTEuNiwwLTMuMi0xLjItMy4yLTMuMg0KCQkJCXMxLjItMy4yLDMuMi0zLjJoNjIuNGMxLjYsMCwzLjIsMS4yLDMuMiwzLjJTMjQ4LjkyOSw0MTguNCwyNDcuMzI5LDQxOC40eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGQ9Ik0yMTYuMTI5LDYwYzQsMCw2LjgtMy4yLDYuOC02LjhWNi44YzAtMy42LTMuMi02LjgtNi44LTYuOGMtMy42LDAtNi44LDMuMi02LjgsNi44djQ2LjQNCgkJCQlDMjA5LjMyOSw1Ni44LDIxMi41MjksNjAsMjE2LjEyOSw2MHoiLz4NCgkJCTxwYXRoIHN0eWxlPSJmaWxsOiMyMzFGMjA7IiBkPSJNMzI5LjMyOSwzNC40Yy0zLjItMi40LTcuMi0xLjItOS4yLDEuNmwtMjUuNiwzOC40Yy0yLjQsMy4yLTEuNiw3LjYsMS42LDkuNg0KCQkJCWMxLjIsMC44LDIuNCwxLjIsMy42LDEuMmMyLjQsMCw0LjQtMS4yLDUuNi0zLjJsMjUuNi0zOC40QzMzMy4zMjksNDAuOCwzMzIuNTI5LDM2LjQsMzI5LjMyOSwzNC40eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGQ9Ik0xMzQuOTI5LDgzLjZjMS4yLDAsMi40LTAuNCwzLjYtMS4yYzMuMi0yLDQtNi40LDItOS42bC0yNC44LTM4LjhjLTItMy4yLTYuNC00LTkuNi0yDQoJCQkJcy00LDYuNC0yLDkuNmwyNC44LDM4LjhDMTMwLjUyOSw4Mi44LDEzMi41MjksODMuNiwxMzQuOTI5LDgzLjZ6Ii8+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojMjMxRjIwOyIgZD0iTTg2LjUyOSwxMjZsLTQwLjQtMjJjLTMuMi0xLjYtNy42LTAuNC05LjIsMi44Yy0yLDMuMi0wLjgsNy42LDIuOCw5LjJsNDAuNCwyMg0KCQkJCWMxLjIsMC40LDIsMC44LDMuMiwwLjhjMi40LDAsNC44LTEuMiw2LTMuNkM5MC45MjksMTMyLDg5LjcyOSwxMjcuNiw4Ni41MjksMTI2eiIvPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGQ9Ik0zOTUuNzI5LDEwNi44Yy0xLjYtMy4yLTYtNC40LTkuMi0yLjhsLTQwLjgsMjJjLTMuMiwxLjYtNC40LDYtMi44LDkuMmMxLjIsMi40LDMuNiwzLjYsNiwzLjYNCgkJCQljMS4yLDAsMi40LTAuNCwzLjItMC44bDQwLjgtMjJDMzk2LjEyOSwxMTQuNCwzOTcuMzI5LDExMCwzOTUuNzI5LDEwNi44eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=';
    stage.find(".hintGroup").destroy() // Must be destroyed because of the image path.
    var imageObj = new Image();
    var hint;
    imageObj.onload = function() {
        hint = new Konva.Image({
            id: "hint",
            name: "hintGroup",
            x: 40,
            y: stage.height() - 115,
            image: imageObj,
            draggable: true,
            source: blightSRC,
            scaleX: 0.2,
            scaleY: 0.2
        });
        if (typeof item.hint == "undefined") {
            layer.add(hint);
            hint.visible(false);
        } else { layer.add(hint); }
        // add the shape to the layer


    };
    imageObj.src = blightSRC;


    var allFreeText = stage.find(".freeText")
    for (let i = 0; i < allFreeText.length; i++) {
        if (allFreeText[i].id() == "hintContent") {
            allFreeText[i].name("hintText")
            allFreeText[i].text(item.hint)
        }
        //editKcontent(stage, layer, allFreeText[i])
        layer.draw();
    }

    var hintContent = stage.find("#hintContent");
    hintContent.on("dblclick", function() {
        editKcontent(stage, layer, this)
        this.attrs.legend = this.text()
    })



    //addHint(stage, layer);
    //layer.draw()

    $("#hintactivate").on("change", function() {
        console.log("LISTEN TO HINT!")
        console.log(stage.find("#hint"));
        if (stage.findOne("#hint").visible()) {
            stage.findOne("#hint").visible(false);
            layer.batchDraw();
        } else {
            stage.findOne("#hint").visible(true);
            layer.batchDraw();
        }
    })





    // The Choices
    var oldChoices = stage.find(".inputGroup");
    var oldCKLabel = stage.find(".labelCk");
    var oldtrash = stage.find(".bin");
    var oldIndex = stage.find(".indexCk");
    stage.find(".inputGroup").destroy();
    //Items element are inactive
    for (let i = 0; i < item.choices.length; i++) {
        var GroupChoice = "todoFromReactivate1";
        if (item.type == "checkbox") {
            cloneCk(stage, "checkbox", GroupChoice, layer)
        } else if (item.type == "radio") {
            cloneCk(stage, "radio", GroupChoice, layer)
        } else { console.log(item.type) }
    }

    //console.log(item)
    //Grab all group ID
    var allIGroups = stage.find(".inputGroup");


    // All items element must retreive their position  & their Params! 
    for (let i = 0; i < oldChoices.length; i++) {
        const InputGroupPosition = [oldChoices[i].x(), oldChoices[i].y()];
        const labelCkPosition = [oldCKLabel[i].x(), oldCKLabel[i].y()];
        const binPosition = [oldtrash[i].x(), oldtrash[i].y()];
        const indexCkPosition = [oldIndex[i].x(), oldIndex[i].y()];
        console.log(allIGroups[i])
        allIGroups[i].x(InputGroupPosition[0])
        allIGroups[i].y(InputGroupPosition[1])

        allIGroups[i].findOne(".labelCk").x(labelCkPosition[0])
        allIGroups[i].findOne(".labelCk").y(labelCkPosition[1])
        allIGroups[i].findOne(".bin").x(binPosition[0])
        allIGroups[i].findOne(".bin").y(binPosition[1])
        allIGroups[i].findOne(".indexCk").x(indexCkPosition[0])
        allIGroups[i].findOne(".indexCk").y(indexCkPosition[1])

    }

    var allLabels = stage.find(".labelCk");
    var allNGroups = stage.find(".inputGroup");

    //ReBuild the GroupID for feeback!
    for (let i = 0; i < allIGroups.length; i++) {
        if (typeof allNGroups[i] !== "undefined" && typeof allIGroups[i] !== "undefined") {
            allNGroups[i].id(allIGroups[i].id())
        }

    }
    var allFeedBack = stage.find(".feedBack");
    for (let i = 0; i < allFeedBack.length; i++) {
        allFeedBack[i].attrs.legend = allFeedBack[i].text(); // Update legend
        $(".addFreeText").trigger("click")
        var updateFeedBack = stage.findOne(".freeText");
        updateFeedBack.name("feedBack");
        updateFeedBack.attrs.legend = allFeedBack[i].text();
        updateFeedBack.attrs.belongTo = allFeedBack[i].attrs.belongTo;
        updateFeedBack.text(allFeedBack[i].text());
        updateFeedBack.opacity(0.3);
        updateFeedBack.visible(true);
        updateFeedBack.x(allFeedBack[i].x())
        updateFeedBack.y(allFeedBack[i].y())
        allFeedBack[i].destroy()
    }

    // Loop on choices -> Feeback and scoring
    for (let i = 0; i < item.choices.length; i++) {
        var newLabel = item.choices[i].text;
        if (typeof allLabels[i] !== "undefined") { allLabels[i].text(newLabel); }

        if (typeof allNGroups[i] !== "undefined") {
            allNGroups[i].x(allIGroups[i].x());
            allNGroups[i].y(allIGroups[i].y());
        }

        //Scoring Right Answer, Eliminate, Penalty
        if (item.choices[i].rightAnswer) {
            //console.log("RightAnswer")
            allNGroups[i].findOne(".scoreDot").fill("green");
            allNGroups[i].findOne(".scoreDot").visible(true)
        }
        if (item.choices[i].eliminate) {
            //console.log("eliminate")
            allNGroups[i].findOne(".scoreDot").visible(true)
            allNGroups[i].findOne(".scoreDot").fill("#FFA500")
        }
        if (item.choices[i].penalty) {
            //console.log("Penalty")
            allNGroups[i].findOne(".scoreDot").visible(true);
            allNGroups[i].findOne(".scoreDot").fill("red")
        }
        if (!item.choices[i].rightAnswer && !item.choices[i].eliminate && !item.choices[i].penalty) {
            allNGroups[i].findOne(".scoreDot").visible(false);
            allNGroups[i].findOne(".scoreDot").fill("transparent")
        }

        //FeedBack Activation on EDIT !
        if (typeof item.choices[i].feedback !== "undefined") {
            var allFeedBack = stage.find(".feedBack");
            allNGroups[i].on("click", function() {

                for (let y = 0; y < allFeedBack.length; y++) {
                    if (allFeedBack[y].attrs.belongTo == allNGroups[i].id() && allNGroups[i].findOne(".tick").attrs.visible && !item.eliminationMode) {
                        allFeedBack[y].visible(true);
                        allFeedBack[y].opacity(1);
                        allFeedBack[y].attrs.legend = allFeedBack[y].text();
                    } else {
                        allFeedBack[y].opacity(0.3);
                    }

                    //console.log(allFeedBack[y])
                }
            });
        }
    }

    // Elimination mode
    $("#elimination").off("click")
    $("#elimination").prop("checked", false);
    if (item.eliminationMode) {
        $("#elimination").prop("checked", true)
        stage.find(".bin").visible(true)
        layer.batchDraw()
    } else {
        $("#elimination").prop("checked", false);
        stage.find(".bin").visible(false)
        layer.batchDraw()
    }
    $("#elimination").on("click", function() {
        if ($(this).prop("checked") == false) {
            stage.find(".bin").visible(false)
        } else {
            stage.find(".bin").visible(true);
            stage.find(".bin").on("click", function() {
                if (this.attrs.status == "on") {
                    this.parent.find(".inputBox").opacity(0.3);
                    this.parent.find(".tick").opacity(0);
                    this.parent.find(".labelCk").opacity(0.3);
                    this.parent.find(".labelCk").textDecoration("line-through");
                    this.parent.find(".indexCk").opacity(0.3);
                    this.attrs.status = "off"
                } else {
                    this.parent.find(".inputBox").opacity(1);
                    this.parent.find(".tick").opacity(1);
                    this.parent.find(".labelCk").opacity(1);
                    this.parent.find(".labelCk").textDecoration("none");
                    this.parent.find(".indexCk").opacity(1);
                    this.attrs.status = "on"
                }
            })
        }

        layer.batchDraw()
    })

    /* The Question */
    var questionNode = stage.find(".question");
    //console.log(questionNode)
    questionNode.on("dblclick", function() {
        editKcontent(stage, layer, this)
    })





    /* ----- ! Dev Tool !----------- */
    layer.batchDraw();
    stage.find("Text").on("click", function() {
        console.log(this)
    })

}