import $ from "jquery";
import cloneCk from "./Kmod/cloneCk";

export default function Cmenu($container, stage, layer) {

    var currentShape = "NONE";

    stage.on('contextmenu', function(e) {
        // prevent default behavior
        e.evt.preventDefault();
        //Close Quill Editor and parameter Panel
        $("#parameterPanel").addClass("collapse");
        $(".editContainer").addClass("collapse");
        $(".editorAction").hide();
        if (e.target === stage || e.target.parent.attrs.name == "grid") {
            // if we are on empty place of the stage we will do nothing
            return;
        } else if (e.target.attrs.name === "inputBox" || e.target.attrs.name === "labelCk" || e.target.attrs.name === "tick") {

            currentShape = e.target;

            //Show menu
            $(".Cmenu").show();
            var containerRect = stage.container().getBoundingClientRect();

            $(".Cmenu").css("top", containerRect.top + stage.getPointerPosition().y + 4 + 'px');
            $(".Cmenu").css("left", containerRect.left + stage.getPointerPosition().x + 4 + 'px');
            $('.add-button').off("click");
            $(".clone-button").off("click");
            $(".hideLb-button").off("click");
            $(".delete-button").off("click");
            $(".transform-button").off("click");
            $(".score-button").off("click");
            $(".setScore").off("click");
            $("#scoreModal input").off("change");

            activateCM(currentShape)
        }

        function activateCM(currentShape) {

            //Context menu : define action and Setup 
            //Action : Add new choice
            $('.add-button').on('click', () => {
                var GroupChoice = "none";
                if ($(".addCkGroup").hasClass("active")) {
                    cloneCk(stage, "checkbox", GroupChoice, layer)
                } else { cloneCk(stage, "radio", GroupChoice, layer) }

            });

            //Clone : Add new choice but cloning type of CK and text position and aspect.
            $(".clone-button").on('click', () => {
                var OriginCKGroup = currentShape.parent;
                var orginalTextPosition = [OriginCKGroup.findOne(".labelCk").x(), OriginCKGroup.findOne(".labelCk").y()]
                var orginalGroupScale = [OriginCKGroup.scaleX(), OriginCKGroup.scaleY()]
                var originalBinPosi = [OriginCKGroup.findOne(".bin").x(), OriginCKGroup.findOne(".bin").y()]
                var newClone;
                var GroupChoice = OriginCKGroup.attrs.scope;
                if (OriginCKGroup.attrs.type == "checkbox") {
                    newClone = cloneCk(stage, "checkbox", GroupChoice, layer);
                } else {
                    newClone = cloneCk(stage, "radio", GroupChoice, layer);
                }
                //CloneGroup position
                newClone.x(OriginCKGroup.x() + 100)
                newClone.y(OriginCKGroup.y())

                //Clone fix all Group details
                newClone.findOne(".labelCk").x(orginalTextPosition[0])
                newClone.findOne(".labelCk").y(orginalTextPosition[1])
                newClone.findOne(".bin").x(originalBinPosi[0])
                newClone.findOne(".bin").y(originalBinPosi[1])
                newClone.scaleX(orginalGroupScale[0])
                newClone.scaleY(orginalGroupScale[1])


            });


            //Score and Modal form Define Scoring
            $('.score-button').on('click', () => {
                console.log("SETSCORE")
                $("#scoreModal input[type='radio']").prop("checked", false);

            });
            $("#scoreModal input[type='radio']").on("change", function() {
                var markScore = $("#scoreModal input[type='radio']:checked").val()
                if (markScore == "RIGHT") {
                    console.log("RIGHT");
                    //console.log(currentShape)
                    var groupCont = currentShape.findAncestors('.inputGroup');
                    var Ranswer = groupCont[0].findOne(".scoreDot");
                    var ckr = groupCont[0];
                    Ranswer.visible(true)
                    Ranswer.to({
                        opacity: 0.3,
                        scaleX: 2,
                        scaleY: 2,
                        fill: "green",
                        onFinish: () => {
                            Ranswer.to({ scaleX: 1, scaleY: 1, opacity: 1 });
                        },
                    });
                    currentShape.to({
                        scaleX: 2,
                        scaleY: 2,
                        onFinish: () => {
                            currentShape.to({ scaleX: 1, scaleY: 1 });
                        },
                    });
                    Ranswer.attrs.type = "Right";
                } else if (markScore == "ELIMIN") {
                    console.log("ELIMIN");
                    var groupCont = currentShape.findAncestors('.inputGroup');
                    var Ranswer = groupCont[0].findOne(".scoreDot");
                    var ckr = groupCont[0];
                    Ranswer.visible(true)
                    Ranswer.to({
                        opacity: 0.3,
                        scaleX: 2,
                        scaleY: 2,
                        fill: "#FCC30D",

                        onFinish: () => {
                            Ranswer.to({ scaleX: 1, scaleY: 1, opacity: 1 });
                        },
                    });
                    currentShape.to({
                        scaleX: 2,
                        scaleY: 2,
                        onFinish: () => {
                            currentShape.to({ scaleX: 1, scaleY: 1 });
                        },
                    });

                    Ranswer.attrs.type = "Elimination";

                } else if (markScore == "PENALTY") {
                    console.log("PENALTY")
                    var groupCont = currentShape.findAncestors('.inputGroup');
                    var Ranswer = groupCont[0].findOne(".scoreDot");
                    var ckr = groupCont[0];
                    Ranswer.visible(true)
                    Ranswer.to({
                        opacity: 0.3,
                        scaleX: 2,
                        scaleY: 2,
                        fill: "red",
                        onFinish: () => {
                            Ranswer.to({ scaleX: 1, scaleY: 1, opacity: 1 });
                        },
                    });
                    currentShape.to({
                        scaleX: 2,
                        scaleY: 2,
                        onFinish: () => {
                            currentShape.to({ scaleX: 1, scaleY: 1 });
                        },
                    });
                    Ranswer.attrs.type = "Penalty";

                } else if (markScore == "CLEAR") {
                    console.log("CLEAR")
                    var groupCont = currentShape.findAncestors('.inputGroup');
                    var Ranswer = groupCont[0].findOne(".scoreDot");
                    var ckr = groupCont[0];
                    Ranswer.visible(false)
                    Ranswer.to({
                        opacity: 0.3,
                        scaleX: 2,
                        scaleY: 2,
                        fill: "transparent",
                        onFinish: () => {
                            Ranswer.to({ scaleX: 1, scaleY: 1, opacity: 1 });
                        },
                    });
                    currentShape.to({
                        scaleX: 2,
                        scaleY: 2,
                        onFinish: () => {
                            currentShape.to({ scaleX: 1, scaleY: 1 });
                        },
                    });
                    Ranswer.attrs.type = "none";
                }
            })

            //Action : transform
            $('.transform-button').on('click', () => {
                var groupCont = currentShape.findAncestors('.inputGroup');
                stage.find("#C" + groupCont[0].id()).show()
                layer.draw()
            });


            //Action : hide Label
            $('.hideLb-button').on('click', () => {
                var groupCont = currentShape.findAncestors('.inputGroup');
                var labelFound = groupCont[0].findOne(".labelCk");
                if (labelFound.visible()) {
                    labelFound.visible(false);
                } else { labelFound.visible(true); }

                layer.draw()
            });

            //Action : Associate to Click

            $(".closeSub").on("mouseover", function() {
                $(".Cmenu").find(".subMenu").hide();
            })

            $('.FeedBack').on('mouseover', () => {
                $(".subMenu").empty();
                $(".Cmenu").find(".subMenu").show();
                //Stop All listeners
                $(".BTCT").off("click")


                // Automatic Grab all Labels to create the context menu choice link!
                var allFeedback = stage.find(".feedBack");
                console.log(allFeedback)
                if (allFeedback.length > 0) {
                    $(".noChoice").hide();
                    for (let i = 0; i < allFeedback.length; i++) {
                        $(".subMenu").append("<button data-groupID='" + allFeedback[i].parent.id() + "' class='BTCT BtCtID" + i + "'>" + allFeedback[i].attrs.legend + "</button>");
                        $(".BtCtID" + i).on("click", function() {
                            allFeedback[i].opacity(0.2);
                            allFeedback[i].attrs.belongTo = currentShape.parent.id();
                            layer.draw();

                        })
                    }


                }
                $('.contextMenu').off("mouseout")
            });


            //Action : delete group
            $('.delete-button').on('click', () => {
                var groupToDelete = currentShape.findAncestors('.inputGroup');
                groupToDelete[0].destroy();
                layer.draw();
            });

        }

        $(window).on('click', () => {
            // hide menu
            $(".Cmenu").hide();
        });


    });

}