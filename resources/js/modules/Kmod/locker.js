import Konva from "konva";

export default function locker() {
    var groupLocker = new Konva.Group({
        draggable: false,
        name: "locker",
        status: "on",
        scaleX: 0.5,
        scaleY: 0.5
    });

    var lockerBody = new Konva.Rect({
        x: 0,
        y: 0,
        width: 16,
        height: 17,
        stroke: 'red',
        cornerRadius: [0, 0, 3, 3],
        name: "trashbin"
    });

    var lockerArc = new Konva.Arc({
        x: 8,
        innerRadius: 6,
        outerRadius: 8,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        angle: 180,
        rotation: 180
    });


    groupLocker.add(lockerBody, lockerArc)
    return groupLocker;
}