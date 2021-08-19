import $ from "jquery";
import inputGroup from "./inputGroup";

var posX = 0;
var posY = 0;
export default function addCloneinputGroup(Stage, inputType, GroupChoice, layer, OriginText) {

    console.log(GroupChoice);

    var Stage, Layer;
    var VOffsetCoef = 0;
    var Noreactivation = false;
    var nbID = Stage.find(".inputGroup").length;
    //Update Layer for reactivation
    if (typeof layer !== "undefined" || layer !== '') {
        Noreactivation = false
        Layer = layer;
    }


    $("canvas").on("click", function() {
        Stage.find(".transformers").hide();
        Layer.draw();
    });

    var trLabel = new Konva.Transformer({
        visible: false,
        name: "transformers",
        anchorSize: 13
    });

    if (Noreactivation) { //Recover element from historic state Find a
        console.log("Reactivation Mode")
            //console.log(layer);
    } else { //Creation Case
        nbID++;
        var dalle = parseInt($(".gridUnit").val());

        var offSet = 90;

        var PreviousGroup = Stage.findOne("#G" + (nbID - 1))
        if (typeof PreviousGroup === "undefined") {
            //console.log("CAS 1")
            posX = dalle + offSet;
            posY = dalle + offSet;

        } else {
            //console.log("CAS 4")
            if ($(".HLayout").hasClass("active")) {
                posX = PreviousGroup.x() + 180;
            } else {
                posX = PreviousGroup.x();
                posY = PreviousGroup.y() + 60;
            }

        }
        var cloneCk = inputGroup().clone();
        cloneCk.id("G" + nbID);
        cloneCk.attrs.scope = GroupChoice;
        var Ctext = cloneCk.findOne(".labelCk").text("Choice " + nbID);
        cloneCk.findOne(".labelCk").id("Choice" + nbID);
        if (typeof OriginText !== "undefined") {
            cloneCk.findOne(".labelCk").x(OriginText.x());
            cloneCk.findOne(".labelCk").y(OriginText.y());
        }

        const toAlpha = (num) => {
            if (num < 1 || num > 26 || typeof num !== 'number') {
                return -1;
            }
            const leveller = 64;
            //since actually A is represented by 65 and we want to represent i twith one

            return String.fromCharCode(num + leveller);
        };
        if ($('.indexAN').val() == "noIndex") {
            cloneCk.findOne(".indexCk").visible(false)

        } else if ($('.indexAN').val() == "IAlpha") {
            cloneCk.findOne(".indexCk").visible(true)
            var indexAN = toAlpha(nbID);
            cloneCk.findOne(".indexCk").text(indexAN + ".");
            cloneCk.findOne(".indexCk").attrs.mode = "alphabetic";
        } else if ($('.indexAN').val() == "INum") {
            cloneCk.findOne(".indexCk").visible(true)
            cloneCk.findOne(".indexCk").text(nbID + ".");
            cloneCk.findOne(".indexCk").attrs.mode = "numeric";
        } else {
            cloneCk.findOne(".indexCk").attrs.mode = "noIndex";
        }



        cloneCk.findOne(".indexCk").id("index" + nbID);


        if ($(".HLayout").hasClass("active")) {
            autoHorizontal()
        };
        if ($(".VLayout").hasClass("active")) {
            autoVertical(Layer)
        };


        function autoHorizontal() {
            //Layer = layer;
            if (posX < Stage.width() - 120) {
                cloneCk.x(posX);
                cloneCk.y(posY);
                layer.add(cloneCk);
            } else {
                //console.log("casA")
                cloneCk.x(offSet + 30);
                posY = PreviousGroup.y() + 90;
                if (posY > Stage.height() - dalle) {
                    alert("Redimension Canvas to contain all elements")

                } else {
                    // console.log("casB")
                    //;
                    cloneCk.y(posY);
                    //cloneCk.x(posX);
                    layer.add(cloneCk);
                }
            }
        }

        function autoVertical(Layer) {
            if (posY < Stage.height() - 120) {
                cloneCk.x(posX);
                cloneCk.y(posY);
                Layer.add(cloneCk);
            } else {
                // console.log("casA")
                cloneCk.x(offSet + 30);
                posY = PreviousGroup.y() + 60;
                if (posY > Stage.height() - dalle) {
                    // console.log("casB")
                    VOffsetCoef = VOffsetCoef + 1;
                    cloneCk.y(120);
                    cloneCk.x(PreviousGroup.x() + (180));
                    Layer.add(cloneCk);
                    // alert("Redimension Canvas to contain all elements")

                } else {
                    cloneCk.y(posY);
                    cloneCk.x(PreviousGroup.x());
                    Layer.add(cloneCk);
                }
            }
        }

        //Drag adjust to grid following blockSnapSize

        var blockSnapSize;
        cloneCk.on('dragstart', (e) => {
            dalle = parseInt($(".gridUnit").val());
            blockSnapSize = dalle
            cloneCk.moveToTop();
        });
        cloneCk.on('dragend', (e) => {

            cloneCk.position({
                x: Math.round(cloneCk.x() / blockSnapSize) * blockSnapSize,
                y: Math.round(cloneCk.y() / blockSnapSize) * blockSnapSize
            });
            Stage.batchDraw();

        });



        // Transformers Handlers
        trLabel.nodes([cloneCk])
        trLabel.id("CG" + nbID);

        //CtrCK.nodes([ck, tick])
        Layer.add(trLabel)
        trLabel.forceUpdate();
        Layer.draw();
        if (inputType == "checkbox") {
            ckboxBehaviour(cloneCk, Stage) // Specific behaviour
            Layer.draw()
        } else if (inputType == "radio") {
            var Ctick = cloneCk.findOne(".tick");
            Ctick.visible(false);
            Ctick.fill("#79BAEC");
            radioBehaviour(cloneCk, Stage);
            Layer.draw()
        }



        //Listening only in Edition Mode
        Ctext.on("dblclick", function() {
            //console.log("Edition simple text")
            this.hide();
            Layer.draw();
            var textPosition = this.absolutePosition();
            var stageBox = Stage.container().getBoundingClientRect();
            var areaPosition = {
                x: stageBox.left + textPosition.x,
                y: stageBox.top + textPosition.y,
            };
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
            textarea.value = Ctext.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 4 + 'px';
            textarea.style.left = areaPosition.x + 6 + 'px';
            textarea.style.width = Ctext.width() - Ctext.padding() * +'px';
            textarea.style.height = Ctext.height() - Ctext.padding() * 2 + 5 + 'px';
            textarea.style.fontSize = Ctext.fontSize() + 'px';
            textarea.style.border = 'none';
            textarea.style.padding = '0px';
            textarea.style.margin = '0px';
            textarea.style.overflow = 'hidden';
            textarea.style.background = 'none';
            textarea.style.outline = 'none';
            textarea.style.resize = 'none';
            textarea.style.lineHeight = Ctext.lineHeight();
            textarea.style.fontFamily = Ctext.fontFamily();
            textarea.style.transformOrigin = 'left top';
            textarea.style.textAlign = Ctext.align();
            textarea.style.color = Ctext.fill();
            var rotation = Ctext.rotation();
            var transform = '';
            if (rotation) {
                transform += 'rotateZ(' + rotation + 'deg)';
            }

            var px = 0;
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isFirefox) {
                px += -10 + Math.round(Ctext.fontSize() / 20);
            }
            transform += 'translateY(-' + px + 'px)';

            textarea.style.transform = transform;

            // reset height
            textarea.style.height = 'auto';
            // after browsers resized it we can set actual value
            textarea.style.height = textarea.scrollHeight + 3 + 'px';

            textarea.focus();



            function removeTextarea() {
                textarea.parentNode.removeChild(textarea);
                window.removeEventListener('click', handleOutsideClick);
                Ctext.show();
                tr.show();
                tr.forceUpdate();
                layer.draw();
            }
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isFirefox) {
                px += 2 + Math.round(Ctext.fontSize() / 20);
            }
            transform += 'translateY(-' + px + 'px)';

            textarea.style.transform = transform;

            // reset height
            textarea.style.height = 'auto';
            // after browsers resized it we can set actual value
            textarea.style.height = textarea.scrollHeight + 3 + 'px';

            textarea.focus();

            function removeTextarea() {
                textarea.parentNode.removeChild(textarea);
                window.removeEventListener('click', handleOutsideClick);
                Ctext.show();
                //tr.show();
                //tr.forceUpdate();
                Layer.draw();
            }

            function setTextareaWidth(newWidth) {
                if (!newWidth) {
                    // set width for placeholder
                    newWidth = textNode.placeholder.length * textNode.fontSize();
                }
                // some extra fixes on different browsers
                var isSafari = /^((?!chrome|android).)*safari/i.test(
                    navigator.userAgent
                );
                var isFirefox =
                    navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isSafari || isFirefox) {
                    newWidth = Math.ceil(newWidth);
                }

                var isEdge =
                    document.documentMode || /Edge/.test(navigator.userAgent);
                if (isEdge) {
                    newWidth += 1;
                }
                textarea.style.width = newWidth + 'px';
            }
            textarea.addEventListener('keydown', function(e) {
                var scale = Ctext.getAbsoluteScale().x;
                setTextareaWidth(Ctext.width() * scale);
                textarea.style.height = 'auto';
                textarea.style.height =
                    textarea.scrollHeight + Ctext.fontSize() + 'px';
            });

            function handleOutsideClick(e) {
                if (e.target !== textarea) {
                    Ctext.text(textarea.value);
                    removeTextarea();
                }
            }
            setTimeout(() => {
                window.addEventListener('click', handleOutsideClick);
            });



        })



    }

    return cloneCk;
}



// Listening the group Only in Action mode
//Standard behaviour for all inputs
function inputBehaviour(Cnode, stage) {
    var inputCK = Cnode.findOne(".inputBox")

    inputCK.on('mouseenter', function() {
        stage.container().style.cursor = 'move';
    });

    inputCK.on('mouseleave', function() {
        stage.container().style.cursor = 'default';
    });

    Cnode.on("click", function() {
        var tickState = Cnode.findOne(".tick");
        var boxState = Cnode.findOne(".inputBox");
        /*  console.log(tickState.visible())
         console.log(tickState) */
        var allFeedBacks = stage.find(".feedBack");
        /*   console.log(allFeedBacks) */
        for (let i = 0; i < allFeedBacks.length; i++) {
            if (allFeedBacks[i].attrs.belongTo == Cnode.id() && !tickState.visible()) {
                allFeedBacks[i].visible();
                allFeedBacks[i].opacity(1);
            } else {
                //allFeedBacks[i].visible(false);
                allFeedBacks[i].opacity(0.2);
            }
        }
        clickEffect(tickState, boxState)

        function clickEffect(tickState, boxState) {
            tickState.scaleX(0);
            tickState.scaleY(0);
            //boxState.fill("#eacccc")

            //It is possible to force the center of tweening :
            /* tickState.x(tickState.width() / 2); // move the image top-left into the layer so it can grow and not get cut off
            tickState.y(tickState.height() / 2);
            tickState.offsetX(tickState.width() / 2); // Move the offset to the centre of the shape
            tickState.offsetY(tickState.height() / 2); */
            tickState.tween = new Konva.Tween({
                node: tickState,
                scaleX: 1,
                scaleY: 1,
                easing: Konva.Easings.EaseIn,
                duration: 0.15,
            });

            tickState.tween.play()

            /* boxState.tween = new Konva.Tween({
                node: boxState,
                stroke: "#ffffff",
                easing: Konva.Easings.EaseIn,
                duration: 0.15,
            });

            boxState.tween.play() */

        }



    })


}

// Give the behaviour of Checkbox
function ckboxBehaviour(Cnode, stage) {
    //EXAMPLE Effect on Click = underline the label
    // var labelState = Cnode.findOne(".labelCk");

    Cnode.attrs.type = "checkbox";
    inputBehaviour(Cnode, stage);
    Cnode.on("click", function() {
        //Tick behaviour
        //console.log("CK BEHAVIOUR")
        var Ctick = Cnode.findOne(".tick")
        if (Ctick.visible()) {
            Ctick.hide();
            // labelState.textDecoration("");
        } else {
            Ctick.show();
            // labelState.textDecoration("underline");
        }
    });
}
//Give the behaviour of Radio
function radioBehaviour(Cnode, stage) {
    Cnode.attrs.type = "radio";
    var inputCK = Cnode.findOne(".inputBox")
    inputCK.attrs.cornerRadius = 25;
    inputBehaviour(Cnode, stage);
    Cnode.on("click", function() {
        var scopeActif = this.attrs.scope;
        var inputScoped = []
        var allInputGroups = stage.find(".inputGroup");
        if (scopeActif !== "none") {
            //console.log("IN SCOPE ACTIF")
            for (let i = 0; i < allInputGroups.length; i++) {
                if (allInputGroups[i].attrs.scope == scopeActif) {
                    inputScoped.push(allInputGroups[i]);
                }

            }
            var Ctick = Cnode.findOne(".tick")
            if (Ctick.visible()) {
                Ctick.hide();
            } else {
                Ctick.show()
                for (let i = 0; i < inputScoped.length; i++) {

                    var Ctock = inputScoped[i].findOne(".tick");
                    if (Ctock.parent.id() !== Ctick.parent.id()) {
                        Ctock.hide();
                    }
                }
            }

        } else { // console.log(allInputGroups)
            var Ctick = Cnode.findOne(".tick")
            if (Ctick.visible()) {
                Ctick.hide();
            } else {
                Ctick.show()
                for (let i = 0; i < allInputGroups.length; i++) {

                    var Ctock = allInputGroups[i].findOne(".tick");
                    if (Ctock.parent.id() !== Ctick.parent.id()) {
                        Ctock.hide();
                    }
                }
            }
        }

    })


}