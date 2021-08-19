import $ from "jquery";
import addHint from "./Kmod/hint";
import addresetBT from "./Kmod/resetBT";


export default function activateItemParam(stage, layer) {
    // Count Down
    $(".KonvaContainer").append('<div id="chronoBox"><span id="ChronoContainer" style="font-size: 50px;">120</span><br/>Remaining time<br/>in seconds</div>');

    //Kill CountDown alert message if preview mode button is pressed
    var GoCountDown = true;
    var timerStopper;
    $(".action").on("click", function() {
        clearTimeout(timerStopper);
        $(".sp-hidden").remove();
        $(".modal-backdrop").remove()
        GoCountDown = false;
    })
    $(".backToEditor").on("click", function() {
        clearTimeout(timerStopper);
        GoCountDown = true;
        $(".sp-hidden").remove();
        $(".modal-backdrop").remove()
    })

    // CountDown decrementer 
    function decrementer() {
        if (parseInt($("#ChronoContainer").html()) > 0) {
            ChronoContainer.innerHTML--;
            timerStopper = setTimeout(decrementer, 1000);
        } else {
            var TimeOverMessage = $("#timeLimitMessage").val();
            if (TimeOverMessage == "") {
                TimeOverMessage = "The time is over. Next question."
            }
            var CDownModal = new bootstrap.Modal(document.getElementById('timeOver'))
            $(".CountDownOverMessage").html(TimeOverMessage)


            if (GoCountDown) { CDownModal.toggle() }

        }
    }
    var countDown /* = setTimeout(decrementer, 1000) */ ;


    $("#timeLimit").on("change", function() {
        console.log("fffffffffffffffffffff")
        if ($(this).prop("checked")) {
            $("#chronoBox").show();
            var timeLimit = 120;
            if ($("#timeLimitValue").val() == "") {
                $("#ChronoContainer").html(timeLimit);
                //countDown = setTimeout(decrementer, 1000);

            } else {
                $("#ChronoContainer").html($("#timeLimitValue").val());
                //countDown = setTimeout(decrementer, 1000);
            }


        } else {
            console.log("Stop countdown")
            $("#chronoBox").hide()
            clearTimeout(countDown);
        }

    })

    $("#timeLimitValue").on("change", function() {
        $("#ChronoContainer").html($(this).val())
    })

    $("#chronometer").on("change", function() {
        alert("Your choice has been saved. This functionnality is effective only in preview and delivery mode")
    })

    // Shuffle : sympa effect but not real in Edit mode

    $("#ShuffleChoice").on("change", function() {
        var allIgroup = stage.find(".inputGroup");
        alert("Your choice has been saved. This functionnality is effective only in preview and delivery mode.")

        for (let i = 0; i < allIgroup.length; i++) {
            var tween = new Konva.Tween({
                node: allIgroup[i],
                duration: 1,
                rotation: allIgroup[i].rotation() + 360,
                easing: Konva.Easings.BackEaseOut,
                onFinish: function() {
                    allIgroup[i].rotation(0);
                },

            });
            tween.play();
        }
    })


    $("#elimination").on("click", function() {
        if ($(this).prop("checked") == false) {
            stage.find(".bin").visible(false)
        } else {
            stage.find(".bin").visible(true);
            stage.find(".bin").on("click", function() {
                alert("effect only visible in preview/delivery mode");
            })
        }

        layer.batchDraw()
    })


    addHint(stage, layer);
    $("#hintactivate").on("change", function() {
        if (stage.findOne("#hint").visible() == true) {
            stage.findOne("#hint").visible(false);
            layer.batchDraw();
        } else {
            stage.findOne("#hint").visible(true);
            layer.batchDraw();
        }
    })


    $(".resetBTActivate").on("click", function() {
        console.log($(this).prop("checked"))
        if ($(this).prop("checked")) {
            stage.find(".resetBT").destroy();
            var resetGroup = addresetBT();
            layer.add(resetGroup);
        } else {
            stage.find(".resetBT").destroy();
        }

        layer.draw();
        //Not necessary for this interaction but more relevant for makepairs

    });



}