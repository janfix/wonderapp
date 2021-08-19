import $ from "jquery";
import Konva from "konva";

export function tick() {
    var tick = new Konva.Line({
        points: [15, 27, 3, 3, 15, 15, 27, 7, 15, 27],
        fill: $("#pic5").css("background-color"),
        stroke: $("#pic5").css("background-color"),
        strokeWidth: 0,
        closed: true,
        visible: true,
        name: "tick",
        type: "coche"
    });

    return tick
}

export function tickCross() {
    var tick = new Konva.Star({
        x: 15,
        y: 15,
        numPoints: 4,
        innerRadius: 3,
        outerRadius: 12,
        fill: $("#pic5").css("background-color"),
        //stroke: $("#pic5").css("background-color"),
        type: "cross",
        name: "tick",
        visible: true
    });

    return tick
}

export function tickRound() {
    var tick = new Konva.Circle({
        x: 15,
        y: 15,
        radius: 13,
        fill: $("#pic5").css("background-color"),
        stroke: $("#pic5").css("background-color"),
        strokeWidth: 0,
        closed: true,
        visible: true,
        name: "tick",
        type: "round"
    });
    return tick
}

export function tickSquare() {
    var tick = new Konva.Rect({
        x: 3,
        y: 3,
        width: 23,
        height: 23,
        fill: $("#pic5").css("background-color"),
        stroke: $("#pic5").css("background-color"),
        strokeWidth: 0,
        cornerRadius: 5,

        closed: true,
        visible: true,
        name: "tick",
        type: "scribble"
    });

    return tick
}

export function tickStar() {
    var star = new Konva.Star({
        x: 15,
        y: 15,
        numPoints: 5,
        innerRadius: 5,
        outerRadius: 12,
        fill: $("#pic5").css("background-color"),
        //stroke: $("#pic5").css("background-color"),
        type: "star",
        name: "tick",
        visible: true
    });

    return star
}