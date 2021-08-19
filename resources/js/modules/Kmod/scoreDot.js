import Konva from "konva";

export default function addScoreDot() {
    var scoreDot = new Konva.Circle({
        x: 30,
        y: -1,
        radius: 5,
        fill: 'transparent',
        visible: false,
        name: "scoreDot",
        type: "none"
    })
    return scoreDot
}