import Konva from "konva";

export default function addTrash() {
    var groupTrash = new Konva.Group({
        draggable: true,
        name: "bin",
        status: "on"
    });

    var handleBin = new Konva.Rect({
        x: -47,
        y: -10,
        width: 10,
        height: 4,
        stroke: 'grey',
        cornerRadius: [3, 3, 3, 3],
        name: "trashbin"
    });
    var topBin = new Konva.Rect({
        x: -52,
        y: -6,
        width: 20,
        height: 6,
        stroke: 'grey',
        cornerRadius: [3, 3, 3, 3],
        name: "trashbin"
    });

    var bodyBin = new Konva.Rect({
        x: -50,
        y: 0,
        width: 16,
        height: 20,
        stroke: 'grey',
        cornerRadius: [0, 0, 3, 3],
        name: "trashbin"
    });

    var stripeBin1 = new Konva.Line({
        x: -52,
        y: 5,
        points: [7, 0, 7, 12],
        stroke: 'grey',
        name: "trashbin"
    });
    var stripeBin2 = new Konva.Line({
        x: -45,
        y: 5,
        points: [5, 0, 5, 12],
        name: "trashbin",
        stroke: 'grey',

    });


    groupTrash.add(topBin, bodyBin, handleBin, stripeBin1, stripeBin2)
    return groupTrash;
}