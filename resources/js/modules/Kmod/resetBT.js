import Konva from "konva";
export default function addresetBT() {
    var resetBT = new Konva.Group({
        x: 10,
        y: 300,
        draggable: true,
        name: "resetBT",
        id:"resetBT"
    })

    var resetBTLabel = new Konva.Text({
        x: 20,
        y: 15,
        fontSize: 20,
        fontFamily: "Verdana",
        fill: "grey",
        text: "reset",
        name: "ResetBTLabel",
        fontVariant: "small-caps"
    })

    var resetBTBox = new Konva.Rect({
        cornerRadius: 7,
        width: 100,
        height: 50,
        fill: '#fff875',
        stroke: 'orangered',
        strokeWidth: 3,
        name: "resetBTBox"


    })

    resetBT.add(resetBTBox, resetBTLabel)
    return resetBT
}