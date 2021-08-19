import $ from "jquery";
import Konva from "konva";

export default function multiSelection(stage, layer) {

    stage.find("Transformer").destroy();
    stage.find(".Mselect").destroy();

    // MultiSelection explo -----------------------------------------------------------------------------
    var tr = new Konva.Transformer();
    tr.name("Mselect");
    console.log(tr)
    layer.add(tr);
    // add a new feature, lets add ability to draw selection rectangle
    var selectionRectangle = new Konva.Rect({
        stroke: 'rgba(0,0,195,0.2)'
    });
    layer.add(selectionRectangle);
    var x1, y1, x2, y2;
    stage.off('mousedown touchstart');
    stage.off('mousemove touchmove');
    stage.off('mouseup touchend');

    stage.on('mousedown touchstart', (e) => {
        // do nothing if we mousedown on any shape
        if (e.target.attrs.id !== stage.findOne("#grido").attrs.id) {
            selectionRectangle.visible(false);
            layer.draw()
            return;
        } else {
            console.log("Selector action")
            x1 = stage.getPointerPosition().x;
            y1 = stage.getPointerPosition().y;
            x2 = stage.getPointerPosition().x;
            y2 = stage.getPointerPosition().y;
            selectionRectangle.visible(true);
            selectionRectangle.width(0);
            selectionRectangle.height(0);
            layer.draw();
        }
    });

    var selected = [];
    stage.on('mousemove touchmove', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
            return;
        } else {
            x2 = stage.getPointerPosition().x;
            y2 = stage.getPointerPosition().y;

            selectionRectangle.setAttrs({
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1),
            });
            layer.batchDraw();
        }


    });




    stage.on('mouseup touchend', () => {
        // no nothing if we didn't start selection
        if (!selectionRectangle.visible()) {
            return;
        }
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
            selectionRectangle.visible(false);
            layer.batchDraw();
        });

        var shapes = stage.find('.inputGroup').toArray();
        var Imgs = stage.find('Image').toArray();
        var freeTXT = stage.find('.freeText').toArray();
        var FeedBackers = stage.find('.feedBack').toArray();
        var freeShapes = stage.find('.freeShape').toArray();

        for (let i = 0; i < freeShapes.length; i++) {
            if (!freeShapes[i].attrs.lock) {
                shapes.push(freeShapes[i]);
            }
        }

        for (let i = 0; i < FeedBackers.length; i++) {
            shapes.push(FeedBackers[i]);
        }
        for (let i = 0; i < freeTXT.length; i++) {
            if (!freeTXT[i].attrs.lock) {
                shapes.push(freeTXT[i]);
            }
        }
        for (let i = 0; i < Imgs.length; i++) {

            if (!Imgs[i].attrs.lock) {
                shapes.push(Imgs[i]);
            }
        }
        var box = selectionRectangle.getClientRect();

        selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect()),
            tr.visible(true)
        );
        tr.nodes(selected);
        layer.batchDraw();

        KeybAction();

        function KeybAction() {
            var Vmarge = 50;
            var Hmarge = 0;
            $("body").on("keyup", function(e) {
                if (e.keyCode == 46) {
                    for (let i = 0; i < selected.length; i++) {
                        if (selected[i].id() !== "hint") {
                            selected[i].destroy();
                        }

                        tr.visible(false)
                    }
                    layer.batchDraw();
                } else if (e.keyCode == 86) {
                    Vmarge = 30 + Vmarge
                    for (let i = 0; i < selected.length; i++) {
                        selected[i].x(180);
                        selected[i].y((60 * i) + Vmarge);
                    }
                } else if (e.keyCode == 72) {
                    Hmarge = 50 + Hmarge
                    for (let i = 0; i < selected.length; i++) {
                        selected[i].y(180);
                        selected[i].x((240 * i) + Hmarge);
                    }
                }
            });
        }

    });


    stage.fire("mouseup")


    // fin multiselection------------------------------------------------------------------------------------
}