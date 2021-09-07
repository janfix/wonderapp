export default function editKcontent(Stage, Layer, that) {
    console.log("Edition simple text")
    that.hide();
    Layer.draw();
    var textPosition = that.absolutePosition();
    var stageBox = Stage.container().getBoundingClientRect();
    var areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
    };
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = that.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 4 + 'px';
    textarea.style.left = areaPosition.x + 6 + 'px';
    textarea.style.width = that.width() + "px";
    textarea.style.height = "auto";
    /*  textarea.style.width = that.width() - that.padding() + 'px';
    textarea.style.height = that.height() - that.padding() * 2 + 5 + 'px'; */
    textarea.style.fontSize = that.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = '#fcfcfc';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = that.lineHeight();
    textarea.style.fontFamily = that.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = that.align();
    textarea.style.color = that.fill();
    var rotation = that.rotation();
    var transform = '';
    if (rotation) {
        transform += 'rotateZ(' + rotation + 'deg)';
    }

    var px = 0;
    var isFirefox =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
        px += -10 + Math.round(that.fontSize() / 20);
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
        that.show();
        tr.show();
        tr.forceUpdate();
        layer.draw();
    }
    var isFirefox =
        navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
        px += 2 + Math.round(that.fontSize() / 20);
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
        that.show();
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
        var scale = that.getAbsoluteScale().x;
        setTextareaWidth(that.width() * scale);
        textarea.style.height = 'auto';
        textarea.style.height =
            textarea.scrollHeight + 'px';
    });

    function handleOutsideClick(e) {
        if (e.target !== textarea) {
            that.text(textarea.value);
            removeTextarea();
        }
    }
    setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
    });

}