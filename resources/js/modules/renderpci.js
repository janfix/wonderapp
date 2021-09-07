import $ from "jquery";
import Konva from "konva";
import addTrash from "./Kmod/trash";
import { Timer } from "easytimer.js";


export default function createRender(jsonStage, param) {
    /*  console.log(jsonStage)
     console.log(param) */

    // Preview Stage Creation


    var stage = Konva.Node.create(jsonStage, 'previewKonva');

    $("#previewKonva").css("border", "1px solid" + param.canvasBorderColor);

    // then create layer
    var layer = new Konva.Layer();

    // add the layer to the stage
    stage.add(layer);


    stage.find('Image').forEach(imageNode => {
        console.log(imageNode)
        const nativeImage = new window.Image();
        nativeImage.onload = () => {
            imageNode.image(nativeImage);
            imageNode.getLayer().batchDraw();
        }
        nativeImage.src = imageNode.getAttr('source');
    })

    //No drag for all
    stage.find('.inputGroup').draggable(false);
    stage.find('.freeText').draggable(false);
    stage.find('.freeImage').draggable(false);
    stage.find('.question').draggable(false);
    stage.find('.resetBT').draggable(false);
    stage.find('.bin').draggable(false);
    stage.find('.labelCk').draggable(false);
    stage.find('#hint').draggable(false);
    stage.find('.richContent').draggable(false);
    stage.find('.feedBack').draggable(false);
    stage.find('.indexCk').draggable(false);
    stage.find('.freeShape').draggable(false);
    stage.find('.lineHandler').destroy();
    //Back to visible
    //stage.find('.rightAnswer').visible(false);
    //stage.find('.tick').visible(true);
    stage.find("#hintContent").opacity(1);
    stage.find("#hintContent").visible(false);
    stage.find('.scoreDot').visible(false);
    stage.find('.tick').visible(false);
    stage.findOne("#grido").clearCache().draw();
    if (!param.gridVisible) { stage.find(".grid").visible(false); }

   

    stage.find('.feedBack').visible(false);
    stage.find('.locker').destroy();

    // stage.find(".freeImage").visible(true);

    // draw the image        
    console.log(stage)
    stage.find("Layer").batchDraw(); //Grid Layer has no attrs!
    layer.batchDraw();

    stage.find("#hint").on("click", function() {
        this.cache();
        this.filters([Konva.Filters.RGBA]);
        this.red(247)
        this.green(202);
        this.blue(24);


        /*         var light = new Konva.Circle({
                    x: this.x() + 15 * (1 + this.scaleX()),
                    y: this.y() + 12 * (1 + this.scaleY()),
                    radius: (this.width() / 10) * (1 + this.scaleX()),
                    fill: 'yellow',
                    opacity: 0.8
                });
                this.parent.add(light);
                light.moveToBottom(); */
        stage.findOne("#hintContent").visible(true);
        this.parent.batchDraw();
        $(".HintRevealed").html("hint revealed!") //Response encoding
    })


    // Elimination mode

    var clickCounter = 0;
    var PenaltyItem = 0;
    var EliminateItem = 0;
    var responses = [];
    var eliminates = []
    var score = 0;
    var allRight = [];
    var allElim = [];
    var allPeno = [];


    //SCORING
    //1. Elimination mode ON OR OFF//
    if (param.itemElimination) {
        var trashCan = addTrash();
        trashCan.scaleX(0.65);
        trashCan.scaleY(0.65);

        var allIGroup = stage.find(".inputGroup");

        stage.find(".bin").visible(true);
        stage.find(".bin").draggable(false);
        layer.batchDraw();

        /* stage.find(".bin").on("click", function() {
            if (this.attrs.status == "on") {
                this.parent.children[0].opacity(0.3);
                this.parent.children[1].opacity(0.3);
                this.parent.children[3].opacity(0); //TICK
                this.parent.children[1].textDecoration("line-through");
                this.parent.children[2].textDecoration("line-through");
                this.parent.children[2].opacity(0.3);
                this.parent.find(".indexCk").opacity(0.3);
                this.attrs.status = "off";
                eliminates.push(this.parent.id())
                $(".respElim").html(eliminates.join('|'))
                for (let i = 0; i < responses.length; i++) {
                    if (responses[i] == this.parent.id()) {
                        responses.splice(i, 1);
                        $(".response").html(responses.join("|"))
                    }
                }


            } else {
                this.parent.children[0].opacity(1);
                this.parent.children[3].visible(true);
                this.parent.children[3].opacity(1); //TICK
                this.parent.children[1].opacity(1);
                this.parent.children[1].textDecoration("none");
                this.parent.children[2].textDecoration("none");
                this.parent.children[2].opacity(1);
                this.parent.find(".indexCk").opacity(1);
                this.attrs.status = "on";
                for (let i = 0; i < eliminates.length; i++) {
                    if (eliminates[i] == this.parent.id()) {
                        eliminates.splice(i, 1);
                    }
                }
                $(".respElim").html(eliminates.join('|'))
            }
            this.parent.parent.draw();
            buildScore()
        }) */

        stage.find(".bin").on("mouseenter", function() {

            this.children[0].y(-19).rotate(10);
            this.children[2].y(-23).rotate(10);
            this.parent.parent.draw();
        });
        stage.find(".bin").on("mouseleave", function() {

            this.children[0].y(-6).rotate(-10);
            this.children[2].y(-10).rotate(-10);
            this.parent.parent.draw();
        })
    } else {
        $(".respElim").html("Not active");
    }

    var allIGroup = stage.find(".inputGroup");
    var ItemCorrection = []
    for (let i = 0; i < allIGroup.length; i++) {
        ItemCorrection.push([allIGroup[i].id(), allIGroup[i].findOne(".scoreDot").attrs.type]);
        if (allIGroup[i].findOne(".scoreDot").attrs.type == "right") {
            allRight.push(allIGroup[i].id());
        } else if (allIGroup[i].findOne(".scoreDot").attrs.type == "eliminate") {
            allElim.push(allIGroup[i].id())
        } else if (allIGroup[i].findOne(".scoreDot").attrs.type == "penalty") {
            allPeno.push(allIGroup[i].id())
        }
    }
    $(".correction").html(ItemCorrection.join("|"))

    stage.find(".inputGroup").on('mouseenter', function() {
        stage.container().style.cursor = 'pointer';

    })
    stage.find(".inputGroup").on('mouseleave', function() {
        stage.container().style.cursor = 'default';
        var box = this.findOne(".inputBox");
    });

    stage.find(".inputGroup").on("click", function(e) {
        clickCounter++
        if (e.target.attrs.name == "trashbin") {
            if (typeof this.attrs.status == "undefined" || this.attrs.status == "on") {
                this.children[0].opacity(0.3);
                this.children[1].opacity(0.3);
                this.children[3].opacity(0); //TICK
                this.children[1].textDecoration("line-through");
                this.children[2].textDecoration("line-through");
                this.children[2].opacity(0.3);
                this.find(".indexCk").opacity(0.3);
                this.attrs.status = "off";
                eliminates.push(this.id())
                $(".respElim").html(eliminates.join('|'))
                for (let i = 0; i < responses.length; i++) {
                    if (responses[i] == this.id()) {
                        responses.splice(i, 1);
                        $(".response").html(responses.join("|"))
                    }
                }
            } else {
                this.children[0].opacity(1);
                this.children[3].visible(false); //Tick
                this.children[3].opacity(1); //TICK
                this.children[1].opacity(1);
                this.children[1].textDecoration("none");
                this.children[2].textDecoration("none");
                this.children[2].opacity(1);
                this.find(".indexCk").opacity(1);
                this.attrs.status = "on";
                for (let i = 0; i < eliminates.length; i++) {
                    if (eliminates[i] == this.id()) {
                        eliminates.splice(i, 1);
                    }
                }
                $(".respElim").html(eliminates.join('|'))

            }

        } else {
            if (this.attrs.type == "checkbox") {
                if (this.findOne(".tick").visible()) {
                    this.findOne(".tick").visible(false);
                    for (let i = 0; i < responses.length; i++) {
                        if (responses[i] == this.id()) {
                            responses.splice(i, 1)
                        }
                    }
                    $(".response").html(responses.join("|"))

                } else {
                    this.find(".tick").visible(true)
                    if (typeof responses !== "undefined") {}
                    responses.push(this.id())
                    $(".response").html(responses.join("|"))
                }


            } else {
                console.log(e)
                var allTicks = stage.find(".tick");
                var scopeActif = this.attrs.scope;
                //console.log(scopeActif)
                var inputScoped = []
                var allInputGroups = stage.find(".inputGroup");
                if (scopeActif !== "none") {
                    console.log("IN SCOPE ACTIF")
                    for (let i = 0; i < allInputGroups.length; i++) {
                        if (allInputGroups[i].attrs.scope == scopeActif) {
                            inputScoped.push(allInputGroups[i]);
                        }

                    }
                    var Ctick = this.findOne(".tick")
                    if (Ctick.visible()) {
                        Ctick.hide();
                    } else {
                        Ctick.show()
                        for (let i = 0; i < inputScoped.length; i++) {
                            //console.log(inputScoped[i].attrs.scope)
                            var Ctock = inputScoped[i].findOne(".tick");
                            if (Ctock.parent.id() !== Ctick.parent.id()) {
                                Ctock.hide();
                            }
                        }
                    }

                } else {
                    console.log("Single Choice no scope case")
                    for (let i = 0; i < allTicks.length; i++) {
                        allTicks[i].visible(false)
                    }
                    this.find(".tick").visible(true);
                }
                // Fill the answer for single choice
                $(".response").html(this.id())
            }



        }
        var tickState = this.findOne(".tick");
        var boxState = this.findOne(".inputBox");
        var allFeedBacks = stage.find(".feedBack");
        console.log(allFeedBacks)
        $(".clickCounter").html(clickCounter)

        for (let i = 0; i < allFeedBacks.length; i++) {
            
            if (allFeedBacks[i].attrs.belongTo == this.id() && tickState.visible() && !param.itemElimination) {
                // console.log("ELIM DESACTIVE")
                allFeedBacks[i].visible(true);
                allFeedBacks[i].opacity(1)
            } else {
                console.log("ELIM ACTIF")
                allFeedBacks[i].visible(false);
            }

        }

        clickEffect(tickState, boxState)

        function clickEffect(tickState, boxState) {
            tickState.scaleX(0);
            tickState.scaleY(0);
           // boxState.fill("#eacccc")
            tickState.tween = new Konva.Tween({
                node: tickState,
                scaleX: 1,
                scaleY: 1,
                easing: Konva.Easings.EaseIn,
                duration: 0.15,
            });

            tickState.tween.play()

            boxState.tween = new Konva.Tween({
                node: boxState,
               // fill: "#ffffff",
                easing: Konva.Easings.EaseIn,
                duration: 0.15,
            });

            boxState.tween.play()

        }

        this.parent.batchDraw();
        buildScore()
    })

    $(".itemReady").fadeOut(3000)

    //Choice Limiter
    if (param.itemChoiceLimit !== "") {
        console.log("Limiter actif")
        stage.find(".inputGroup").on("click", function() {
            var countTicks = 0;
            var allTicks = stage.find(".tick")
            for (let i = 0; i < allTicks.length; i++) {
                if (allTicks[i].visible() == true) {
                    countTicks = countTicks + 1;
                    console.log("One visible")
                }
            }

            if (countTicks > parseInt(param.itemChoiceLimit)) {
                this.find(".tick").visible(false);
                $(".choiceLimitWarning").html(param.itemChoiceLimit);
                $(".choiceLimiterMessage").show().fadeOut(6000);
            }
        })

    }


    //Shuffle
    if (param.itemShuffle) {
        console.log("shuffle is active")
        var allInputGroup = stage.find(".inputGroup");
        var originalPosition = []
        for (let i = 0; i < allInputGroup.length; i++) {
            allInputGroup[i].x()
            originalPosition.push([allInputGroup[i].x(), allInputGroup[i].y(), i + 1])
        }

        let shuffled = originalPosition
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
            //Avec ou sans index! Attention

        if (param.labelIndex == "noIndex") {
            for (let i = 0; i < allInputGroup.length; i++) {
                allInputGroup[i].x(shuffled[i][0]);
                allInputGroup[i].y(shuffled[i][1]);


            }
        } else {
            stage.find(".indexCk").hide()
            for (let i = 0; i < allInputGroup.length; i++) {
                var NewIndex = new Konva.Circle({
                    x: -15,
                    y: 15,
                    radius: 5,
                    fill: 'gainsboro',
                    stroke: 'grey',
                    strokeWidth: 1,
                    name: "noRIndex",
                    visible: true,
                    mode: "none" // numeric, alphabetic
                })
                allInputGroup[i].add(NewIndex);
                allInputGroup[i].x(shuffled[i][0]);
                allInputGroup[i].y(shuffled[i][1]);
            }
        }
        layer.draw()

    }

    //Reset Button
    if (param.itemResetBT) {
        stage.findOne(".resetBT").on("click", function() {
            console.log(this)
            stage.find(".tick").visible(false);
            this.parent.batchDraw();
        });
        stage.findOne(".resetBT").on("mouseenter", function() {

            stage.findOne(".resetBTBox").fill("#f9cf7a");
            this.parent.batchDraw();
        })
        stage.findOne(".resetBT").on("mouseleave", function() {
            console.log(this)
            stage.findOne(".resetBTBox").fill("#FFF875");
            this.parent.batchDraw();
        })
    }

    //CountDown
    var chronoStopper1, chronoStopper2;
    $(".backToEditor").on("click", function() {
        clearTimeout(chronoStopper1);
    })
    if (param.itemShowCountDown) {
        $(".ChronoPreview").html('<div class="chronoBox"><span id="ChronoContainerPreview" style="font-size: 50px;">120</span><br/>Remaining time<br/>in seconds</div>');

        function decrementer() {
            if (ChronoContainerPreview.innerHTML > 0) {
                ChronoContainerPreview.innerHTML--;
                chronoStopper1 = setTimeout(decrementer, 1000);
            } else {
                clearTimeout(chronoStopper1);
                var TimeOverMessage = param.itemTimeLimitMessage;
                if (TimeOverMessage == "") {
                    TimeOverMessage = "The time is over. Next question."
                }
                var CDownModal = new bootstrap.Modal(document.getElementById('timeOver'))
                $(".CountDownOverMessage").html(TimeOverMessage)
                $(".closeModalChrono").on("click", function() {
                    $(".modal-backdrop").removeClass("show");
                    clearTimeout(chronoStopper1);
                })
                CDownModal.toggle()

            }
        }
        var countDownPreview /* = setTimeout(decrementer, 1000) */ ;
        var timeLimit = param.itemTimeLimitValue;
        console.log(timeLimit)
        if (timeLimit == "") { timeLimit = 120 }
        $("#ChronoContainerPreview").html(timeLimit);
        chronoStopper1 = setTimeout(decrementer, 1000);
    } else {
        $(".ChronoPreview").empty();
        clearTimeout(chronoStopper1);
    }


    //Chronometer
    //console.log(param)
    if (param.itemChronoActive) {
        const timer = new Timer();
        timer.start();

        timer.addEventListener('secondsUpdated', function(e) {
            $('#chronotime').html(timer.getTimeValues().toString());
        });

        $('.backToEditor').on("click", function() {
            timer.stop();
        });
    }


    function buildScore() {
        var score = 0;
        var scoreValue = 10;
        var penaltyValue = -1;
        //scan the stage to verify the score state ! 
        //Correction => ItemCorrection
        var allTicks = stage.find(".tick")
        for (let i = 0; i < allTicks.length; i++) {
            if (allTicks[i].visible()) {
                //console.log(allTicks[i].parent.id())
                for (let y = 0; y < ItemCorrection.length; y++) {
                    if (ItemCorrection[y][0] == allTicks[i].parent.id() && ItemCorrection[y][0] == "Right") {
                        score = scoreValue + score;

                    } else if (ItemCorrection[y][0] == allTicks[i].parent.id() && ItemCorrection[y][0] == "Penalty") {
                        score = penaltyValue
                    }
                }
            };

        }



        $(".Respscore").html(score);
        return score
    }



    return stage;
}