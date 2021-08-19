import Konva from "konva";

export function shapeMenu() {
    /* The menu */

    var tooler = new Konva.Group({
        x: width - 50,
        y: height / 3,
        draggable: true,
    })

    var menuFrame = new Konva.Rect({
        width: 30,
        height: 250,
        fill: 'white',
        stroke: 'grey',
        strokeWidth: 1,
        cornerRadius: 5,
    })

    var button = new Konva.Rect({
        width: 20,
        height: 20,
        fill: 'grey',
        stroke: "darkgrey",
        cornerRadius: 3,

    })

    button.on('mouseenter', function() {
        stage.container().style.cursor = 'pointer';
    });

    button.on('mouseleave', function() {
        stage.container().style.cursor = 'default';
    });

    var strokeButton = button.clone();
    strokeButton.x(5)
    strokeButton.y(10)
    strokeButton.stroke("red")
    strokeButton.fill("transparent")

    var fillButton = button.clone();
    fillButton.x(5)
    fillButton.y(38)
    fillButton.stroke("transparent")
    fillButton.fill("red")

    var shadowButton = button.clone();
    shadowButton.fill("transparent");
    shadowButton.x(5);
    shadowButton.y(65);
    shadowButton.shadowColor("black");
    shadowButton.shadowBlur(3);
    shadowButton.shadowOffset({
        x: 2,
        y: 2
    });
    shadowButton.shadowOpacity(0.5)
}

export function addCircle() {

    var freeCircle = new Konva.Circle({
        x: 300,
        y: 300,
        radius: 70,
        fill: 'transparent',
        stroke: 'grey',
        strokeWidth: 2,
        draggable: true,
        name: "freeShape",
        type: "circle",
        legend: "Circle shape"
    });

    return freeCircle;
}

export function addLine(stage, layer) {

    var freeLine = new Konva.Group({
        draggable: 'true',
        name: "freeShape",
        type: "line",
        legend: "Line shape"
    })

    var redLine = new Konva.Line({
        points: [100, 50, 500, 60],
        stroke: 'red',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        hitStrokeWidth: 20,
        name: "freeShape",
        legend: "line"
    });

    var C1Handler = new Konva.Circle({
        x: redLine.attrs.points[0],
        y: redLine.attrs.points[1],
        radius: 5,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        name: "lineHandler",
        visible: true
    });

    var C2Handler = new Konva.Circle({
        x: redLine.attrs.points[2],
        y: redLine.attrs.points[3],
        radius: 5,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true,
        name: "lineHandler",
        visible: true
    });

    /* var freeLine = new Konva.Line({
        x: 300,
        y: 300,
        radius: 70,
        points: [73, 70, 320, 320],
        stroke: 'blue',
        strokeWidth: 2,
        draggable: true,
        name: "freeShape",
        hitStrokeWidth: 20,
        type: "line",
        legend: "Line shape"
    }); */

    freeLine.add(redLine, C1Handler, C2Handler)
    layer.add(freeLine);
    layer.draw();

    redLine.on("dblclick", function() {
        console.log(this.parent)
            //console.log(stage.findOne(".lineHandler").visible())
        if (this.parent.findOne(".lineHandler").visible()) {
            this.parent.find(".lineHandler").visible(false);
        } else {
            this.parent.find(".lineHandler").visible(true);
        }
        layer.draw()
    })


    C1Handler.on("dragstart", function() {
        redLine.points([C1Handler.x(), C1Handler.y(), C2Handler.x(), C2Handler.y()])
        layer.draw();
    })
    C2Handler.on("dragstart", function() {
        redLine.points([C1Handler.x(), C1Handler.y(), C2Handler.x(), C2Handler.y()])
        layer.draw();
    })

    C1Handler.on("dragmove", function() {
        redLine.points([C1Handler.x(), C1Handler.y(), C2Handler.x(), C2Handler.y()])
        layer.draw();
    })
    C2Handler.on("dragmove", function() {
        redLine.points([C1Handler.x(), C1Handler.y(), C2Handler.x(), C2Handler.y()])
        layer.draw();
    })

    C1Handler.on("dragend", function() {
        redLine.points([C1Handler.x(), C1Handler.y(), C2Handler.x(), C2Handler.y()])
        layer.draw();
    })

    C2Handler.on("dragend", function() {
        redLine.points([C1Handler.x(), C1Handler.y(), C2Handler.x(), C2Handler.y()])
        layer.draw();
    })

    stage.find(".lineHandler").on("mouseenter", function() {
        this.fill("yellow")
        layer.draw();
    })

    stage.find(".lineHandler").on("mouseout", function() {
        this.fill("red")
        layer.draw();
    })

    return freeLine;

}

export function addRectangle() {
    var freeRectangle = new Konva.Rect({
        x: 300,
        y: 300,
        width: 100,
        height: 50,
        fill: 'transparent',
        stroke: 'grey',
        strokeWidth: 2,
        draggable: true,
        name: "freeShape",
        type: "rectangle",
        legend: "Rectangle shape"
    });

    return freeRectangle;
}

export function addRoundRect() {
    var freeRoundRectangle = new Konva.Rect({
        x: 300,
        y: 300,
        cornerRadius: [10, 10, 10, 10],
        width: 100,
        height: 50,
        fill: 'transparent',
        stroke: 'grey',
        strokeWidth: 2,
        draggable: true,
        name: "freeShape",
        type: "roundRectangle",
        legend: "Rounded rectangle shape"

    });

    return freeRoundRectangle;
}

export function addRing() {
    var freeRing = new Konva.Ring({
        x: 300,
        y: 300,
        innerRadius: 40,
        outerRadius: 70,
        fill: 'transparent',
        stroke: 'grey',
        strokeWidth: 2,
        draggable: true,
        name: "freeShape",
        type: "ring",
        legend: "Ring shape"
    });

    return freeRing;
}

export function addStar() {
    var freeStar = new Konva.Star({
        x: 300,
        y: 300,
        numPoints: 5,
        innerRadius: 30,
        outerRadius: 70,
        fill: 'transparent',
        stroke: 'grey',
        strokeWidth: 2,
        draggable: true,
        name: "freeShape",
        type: "star",
        legend: "Star shape"
    });

    return freeStar;
}

export function addArrow() {
    var freeArrow = new Konva.Arrow({
        x: 200,
        y: 300,
        points: [100, 100, 0, 0],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: 3,
        draggable: true,
        name: "freeShape",
        type: "arrow",
        legend: "Arrow shape"
    });

    return freeArrow;

}

export function addTriangle() {
    var freeTriangle = new Konva.RegularPolygon({
        x: 380,
        y: 120,
        sides: 3,
        radius: 80,
        fill: 'transparent',
        stroke: 'grey',
        strokeWidth: 3,
        draggable: true,
        name: "freeShape",
        type: "triangle",
        legend: "Triangle shape"
    });

    return freeTriangle;
}