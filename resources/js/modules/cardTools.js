import $ from "jquery";
import Konva from "konva";
import buildParam from "./param";
import createRender from './renderpci';
import reactivateSingle from "./reactivateSingle";
import applyParam from "./applyParam";
import { addToItemPack, getItemPack, getPItem, deleteItem } from "./itemPack";
import addSingleActivate from "./addSingle";

export var itemPackMap = [];

/* ALL LISTENERS */
export function zoomInBT() {
    console.log("FROM ZoomINBT");
    $(".zoom").on("click", function() {
        $(this).parent().parent().find(".minipreview").css("width", "1000px");
        $(this).parent().parent().parent().parent().find(".dataLine").css("display", "none");
        $(this).hide();
        $(this).parent().find(".zoomOut").show();
    });
}

export function zoomOutBT() {
    $(".zoomOut").on("click", function() {
        $(this).parent().parent().find(".minipreview").css("width", "100%");
        $(this).parent().parent().parent().parent().find(".dataLine").css("display", "block");
        $(this).hide();
        $(this).parent().find(".zoom").show();
    })
}

export function activeCardPreview(jsonStageGenerated) {
    $(".activePreview").on("click", function() {
        var Pindex = parseInt($(this).parent().parent().find(".minipreview").attr("data-index")) - 1;
        /*  console.log(allItems[Pindex]);
         console.log(Pindex); */
        var param = buildParam();
        createRender(jsonStageGenerated[Pindex], param);
        $(".editContainer").hide();
        $("#parameterPanel").addClass("collapse");
        $(".GraphicEditor ").hide();
        $('.previewContainer').toggle();
    })
}


export function activeEditCardItem(allItems, CKType) {

    editItemBT();

    function editItemBT() {
        console.log("Inside editItemBT")
        $(".edit").off("click")
        $(".edit").on("click", function() {
            $("#KonvaContainer").empty();
            $(".backToEditor").trigger("click");
            //console.log(getItemPack())
                // Pindex identify which item is concerned
            //console.log($(this).attr("data-id"))
            var i2e = getPItem($(this).attr("data-id"))
            //console.log(i2e)

            var stage = Konva.Node.create(i2e.jsonGen[0], 'KonvaContainer');

            $(".clearAll").trigger("click");
            /* Callling here Reactivate : The new stage will have all functionalities back and the content will be the item content Recreated using the Wchoice utilites */

            reactivateSingle(stage, i2e.item);

            applyParam(stage, i2e.item);

            $("html, body").animate({
                scrollTop: 0
            }, 100);

            $(".editContainer").addClass("collapse");
            $("#parameterPanel").addClass("collapse");
            $(".GraphicEditor ").show();
            $('.previewContainer').addClass("collapse");


            //Edition mode :How  to Update... 1.Updata AllItems ARRAY : Content & aspect + 2.Update Interface 
            $(".updateSingle").prop("disabled", false)
                //console.log($(this).attr("data-itID"))
            $(".updateSingle").off("click")
            $(".updateSingle").on("click", function() {
                $(this).prop("disabled", true);
                console.log(i2e);
                addSingleActivate(stage, i2e.id);
                deleteSingle(i2e.id)
                i2e.item.param = buildParam();
                /* editItemBT(); */
                zoomInBT();
                zoomOutBT();
                //activPReviewBT(jsonStageGenerated[Pindex], param)

            });

        });
    }
}


export function deleteSingle(itemID) {

    $("#" + itemID).remove()
    deleteItem(itemID)

}