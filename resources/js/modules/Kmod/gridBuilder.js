export default function gridBuilder(stage, padding) {

    console.log("from GridBuilder")

    var gridLayer = stage.children[0];
    var width = stage.width();
    var height = stage.height();

    function gridCleaner(gridLayer) {
        gridLayer.find(".grid").destroy()
        gridLayer.draw()
    }

    //gridCleaner(gridLayer)
    var bgGrid = new Konva.Rect({
        x: 0,
        y: 0,
        width: stage.width(),
        height: stage.height(),
        fill: 'transparent',
        id: "grido"
    });



    //console.log(width, padding, width / padding);

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