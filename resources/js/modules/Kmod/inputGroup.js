import $ from "jquery";
import Konva from "konva";
import inputBox from "./inputBox";
import inputLabel from "./inputLabel";
import { tick, tickStar, tickCross, tickRound, tickSquare } from "./allticks";
import scoreDot from "./scoreDot";
import inputIndex from "./inputIndex";
import trash from "./trash";

export default function addInputGroup() {
    var ckGroup = new Konva.Group({
        x: 100, //GckX,
        y: 100, //GckY,
        draggable: true,
        name: 'inputGroup',
        type: "unset",
        scope: "none"
    });
    var ck = inputBox();
    var indexCk = inputIndex();
    var labelck = inputLabel();


    var tickType = $(".tickShape").find(".active");
    if (tickType.find("img").attr("data-type") == "Star") {
        var Tick = tickStar();
    } else if (tickType.find("img").attr("data-type") == "Cross") {
        var Tick = tickCross();
        Tick.rotate(45)
    } else if (tickType.find("img").attr("data-type") == "Round") {
        var Tick = tickRound();
    } else if (tickType.find("img").attr("data-type") == "Square") {
        var Tick = tickSquare();
    } else {
        var Tick = tick();
    }

    //Repositioning and scaling of TrashCan
    var trashCan = trash();
    trashCan.scaleX(0.65);
    trashCan.scaleY(0.65);
    trashCan.x(-7);
    trashCan.y(10);

    if ($("#elimination").prop("checked")) {
        trashCan.visible(true);
        trashCan.on("click", function() {
            if (this.attrs.status == "on") {
                this.parent.find(".inputBox").opacity(0.3);
                this.parent.find(".tick").opacity(0);
                this.parent.find(".labelCk").opacity(0.3);
                this.parent.find(".labelCk").textDecoration("line-through");
                this.parent.find(".indexCk").opacity(0.3);
                this.attrs.status = "off"
            } else {
                this.parent.find(".inputBox").opacity(1);
                this.parent.find(".tick").opacity(1);
                this.parent.find(".labelCk").opacity(1);
                this.parent.find(".labelCk").textDecoration("none");
                this.parent.find(".indexCk").opacity(1);
                this.attrs.status = "on"
            }

        })

    } else {
        trashCan.visible(false)
    }

    var scoreDotAns = scoreDot();

    ckGroup.add(ck, indexCk, labelck, Tick, trashCan, scoreDotAns)
    return ckGroup
}