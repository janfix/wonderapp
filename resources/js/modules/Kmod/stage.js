import $ from "jquery";
import Konva from "konva";

export default function stage() {
    let dpi = 1;
    var width = parseInt($(".topMenuBar").css("width"));
    var height = window.innerHeight / 1.5;
    var stage = new Konva.Stage({
        container: 'KonvaContainer',
        width: width * dpi,
        height: height * dpi,
    });

    var layer = new Konva.Layer();
    var lockLayer = new Konva.Layer();
    var gridLayer = new Konva.Layer();
    gridBuilder(30, gridLayer)


    stage.add(gridLayer, lockLayer, layer);
    gridLayer.batchDraw();


    function gridCleaner(gridLayer) {
        gridLayer.find(".grid").destroy()
        gridLayer.draw()
    }

    function gridBuilder(padding, gridLayer) {
        var width = stage.width();
        var height = stage.height();
        gridCleaner(gridLayer)
        var bgGrid = new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            fill: 'transparent',
            id: "grido"
        });

        for (var i = 0; i < width / padding; i++) {
            gridLayer.add(bgGrid, new Konva.Line({
                points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
                stroke: '#ddd',
                strokeWidth: 1,
                name: "grid"
            }));
        }

        gridLayer.add(new Konva.Line({
            points: [0, 0, 10, 10]
        }));
        for (var j = 0; j < height / padding; j++) {
            gridLayer.add(new Konva.Line({
                points: [0, Math.round(j * padding), width, Math.round(j * padding)],
                stroke: '#ddd',
                strokeWidth: 0.5,
                name: "grid"
            }));
        }
    }
    return stage;
}