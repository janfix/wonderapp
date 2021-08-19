import './bootstrap';
import $ from "jquery";
import './modules/quillEditor';
import toolBarController from './modules/toolBarController';
import parameters from "./modules/paramController";
import Stage from "./modules/Kmod/stage";
import multiSelection from "./modules/Kmod/mselector";
import Cmenu from "./modules/Cmenu";
import Cmenu_CF from "./modules/CmenuFreeContent";

import addSingleActivate from './modules/addSingle';


app();

export default function app() {
    //This is the core module the stage must be injected from here as a unique entry point
    var stage = Stage();
    var gridLayer = stage.children[0];
    var lockLayer = stage.children[1];
    var layer = stage.children[2];
    var $container = $(".appContainer");


    toolBarController(stage, layer, lockLayer, gridLayer);
    parameters(stage, layer, gridLayer);
    multiSelection(stage, layer)
    Cmenu($container, stage, layer);
    Cmenu_CF($container, stage, layer, lockLayer);

    $(".addSingle").on("click", function() {
        addSingleActivate(stage);
    })


    $("#previewContainer").hide();
    // Reveal /hide parameter panel
    $(".parameterBT").on("click", function() {
        $("#parameterPanel").toggleClass("collapse")
    });


    // QTI Generator
    $(".qtiGenerator").on("click", function() {
        const timestamp = Math.floor(Date.now() / 1000);
        console.log(timestamp);
        /* qtiPack.createRoot();
        qtiPack.createQTIFolders(allItems.length);
        qtiPack.createManifest(allItems);
        console.log(jsonStageGenerated)
        qtiPack.createQTIXML(allItems, jsonStageGenerated);
        qtiPack.createZIP(); */
    });

}