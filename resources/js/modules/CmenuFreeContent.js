    import $ from "jquery";
    import hint from "./Kmod/hint";
    import locker from "./Kmod/locker";


    export default function Cmenu_CF($container, stage, layer, lockLayer) {

        //Context menu : define action and Setup 
        var currentShape;


        //Action1 : Link to Choice
        $('.linkToChoice').on('mouseover', () => {
            $(".subMenu").empty();
            $(".Cmenu_FC").find(".subMenu").show();
            //Stop All listeners
            $(".BTCT").off("click")


            // Automatic Grab all Labels to create the context menu choice link!
            var AllInputLabel = stage.find(".labelCk");
            if (AllInputLabel.length > 0) {
                $(".noChoice").hide();
                for (let i = 0; i < AllInputLabel.length; i++) {
                    $(".subMenu").append("<button data-groupID='" + AllInputLabel[i].parent.id() + "' class='BTCT BtCtID" + i + "'>" + AllInputLabel[i].text() + "</button>");
                    $(".BtCtID" + i).on("click", function() {
                        var GroupInput = $(this).attr("data-groupID");
                        stage.findOne("#" + GroupInput).add(currentShape)
                        currentShape.x(0);
                        currentShape.y(0);
                        layer.draw();
                    })
                }

            }
            $('.contextMenu').off("mouseout")
        });

        $('.contextMenu').on('mouseout', () => {
            $(".subMenu").hide();
        });

        $('.linkToChoice').on('click', () => {
            $(".subMenu").hide();
        });

        $(".ModifyShape").on("mouseover", function() {
            $(".subMenu").hide();
        })



        //Action2 : Join to Hint Symbol
        $('.JoinToHint').on("mouseover", function() {
            $(".subMenu").hide();
        })
        $('.JoinToHint').on('click', () => {
            console.log(currentShape);
            console.log(stage.find("#hint"))
            if (stage.find("#hint").length == 0) {
                var hintos = hint(stage, layer);
                console.log(hintos)
                stage.find("#hint").visible(true)
            }
            currentShape.attrs.id = "hintContent";
            if (currentShape.getClassName() == 'Text') { currentShape.text("Your hint message"); }
            currentShape.opacity(0.3);
            if ($("#hintactivate").prop("checked") == false) {
                $("#hintactivate").prop("disabled", false)
                $("#hintactivate").on("change", function() {
                    if (stage.findOne("#hint").visible() == true) {
                        stage.findOne("#hint").visible(false);
                        layer.batchDraw();
                    } else {
                        stage.findOne("#hint").visible(true);
                        layer.batchDraw();
                    }
                })
                $("#hintactivate").trigger("click");
            }
            stage.find("#hint").visible(true);

            stage.find("#hint").on("click", function() {
                stage.find("#hintContent").visible(true);
                stage.find("#hintContent").opacity(1);

            })
            layer.draw();

        });
        //Action3 : Legend
        $('.legend').on("mouseover", function() {
            $(".subMenu").hide();
        })
        $('.legend').on('click', () => {
            //console.log("Legend the FC")
        });

        //Action : mark FeeBack
        $('.markFeeBack').on('click', () => {
            currentShape.name("feedBack");
        });

        //Action : Lock shape
        $('.lock').on("mouseover", function() {
            $(".subMenu").hide();
        })
        $('.lock').on('click', () => {
            var lockit = locker();
            lockit.x(currentShape.x())
            lockit.y(currentShape.y())
            if (!currentShape.attrs.lock) {
                layer.add(lockit);
                currentShape.draggable(false);
                currentShape.setAttr("lock", true);
                lockit.setAttr("lockedEl", currentShape.id())
            } else {
                var allLocks = stage.find(".locker")
                for (let i = 0; i < allLocks.length; i++) {
                    if (allLocks[i].attrs.lockedEl == currentShape.id()) {
                        allLocks[i].destroy();
                    }
                }
                currentShape.draggable(true);
                currentShape.setAttr("lock", false);
            }

            layer.draw();
        });

        //Action : Bring Up
        $('.ToUp').on("mouseover", function() {
            $(".subMenu").hide();
        })
        $('.ToUp').on('click', () => {
            currentShape.moveUp();
            layer.draw()
        });

        //Action : send Down
        $('.ToDown').on("mouseover", function() {
            $(".subMenu").hide();
        })

        $('.ToDown').on('click', () => {
            currentShape.moveDown();
            layer.draw()
        });

        //Action : Bring to Front
        $('.bringToFront').on("mouseover", function() {
            $(".subMenu").hide();
        })
        $('.bringToFront').on('click', () => {
            currentShape.moveToTop();
            layer.draw()
        });

        //Action : send to background
        $('.SendToBG').on("mouseover", function() {
            $(".subMenu").hide();
        })
        $('.SendToBG').on('click', () => {
            currentShape.moveToBottom();
            layer.draw()
        });

        //Action : Join to Hint Symbol
        $('.deleteFC').on('click', () => {
            currentShape.destroy();
            layer.draw()
        });

        $(window).on('click', () => {
            // hide menu
            $(".Cmenu_FC").hide();
            $(".subMenu").hide();
        });

        //ModifyShape
        $('.modifyShape').on('click', () => {
            console.log("Call the modal modifyShapeModal")
        });

        $(window).on('click', () => {
            // hide menu
            $(".Cmenu").hide();
        });


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
            } else if (e.target.attrs.name === "richContent" ||
                e.target.attrs.name === "freeText" ||
                e.target.attrs.name === "freeImage" ||
                e.target.attrs.name === "feedBack" ||
                e.target.attrs.name === "freeShape" ||
                e.target.attrs.id === "hintContent"
            ) {
                console.log(e.target)
                currentShape = e.target;
                if (e.target.attrs.name === "freeShape") {
                    console.log("REACT FREESHAPE")
                    $(".ModifyShape").show();
                } else {
                    $(".ModifyShape").hide();
                }
                //Show menu
                $(".Cmenu_FC").show();
                var containerRect = stage.container().getBoundingClientRect();
                $(".Cmenu_FC").css("top", containerRect.top + stage.getPointerPosition().y + 4 + 'px');
                $(".Cmenu_FC").css("left", containerRect.left + stage.getPointerPosition().x + 4 + 'px');
                return;
            }

        });


    }