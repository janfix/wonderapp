import Konva from "konva";

export default function addFreeText(Stage, Layer) {

    var crazymode = parseInt(Math.random() * 130);
    var labelQ = new Konva.Text({
        x: 800 + crazymode,
        y: 50 + crazymode,
        text: 'New free text...',
        //fontFamily: $(".fontLabel").val(),
        fontSize: 20,
        padding: 5,
        //fill: $("#color-picker7").val(),
        draggable: true,
        name: "freeText",
        belongTo: "",
        legend: ""
            //visible: $(".LabelVisib").prop("checked"),
    });
    labelQ.attrs.legend = labelQ.text();

    //Listening only in Edition Mode
    labelQ.on("dblclick", function() {
        console.log("Edition simple text")
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
        textarea.value = labelQ.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 4 + 'px';
        textarea.style.left = areaPosition.x + 6 + 'px';
        textarea.style.width = labelQ.width() - labelQ.padding() + 'px';
        textarea.style.height = labelQ.height() - labelQ.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = labelQ.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = labelQ.lineHeight();
        textarea.style.fontFamily = labelQ.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = labelQ.align();
        textarea.style.color = labelQ.fill();
        var rotation = labelQ.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += -10 + Math.round(labelQ.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';
        textarea.focus();
        /*         function removeTextarea() {
                    textarea.parentNode.removeChild(textarea);
                    window.removeEventListener('click', handleOutsideClick);
                    labelQ.show();
                    tr.show();
                    tr.forceUpdate();
                    layer.draw();
                } */
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(labelQ.fontSize() / 20);
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
            labelQ.show();
            //tr.show();
            //tr.forceUpdate();
            labelQ.attrs.legend = labelQ.text();
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
            var scale = labelQ.getAbsoluteScale().x;
            setTextareaWidth(labelQ.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + labelQ.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                labelQ.text(textarea.value);
                removeTextarea();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });



    })


    return labelQ
}