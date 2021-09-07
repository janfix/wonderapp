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
import { addToItemPack, getItemPack, getPItem, deleteItem } from "./modules/itemPack";
import {insertMetaTemplate}  from "./modules/metadata";



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
       
    var PName = "Pack_"+new Date().valueOf();    
    var itempack = getItemPack();
    console.log(itempack);

    createRoot() ;
    function createRoot() {
        var formData = {
            length : itempack.length,
            packName : PName
        };        
        
        $.ajax({
            url: 'ajax-request',
            type:"GET",
            data:formData,
            success: function() {
                console.log("Root Folder created", "Calling HERE The second STEP : Manifest");
                console.log(itempack);
                createManifest(itempack);
            }, error : function(data){
                console.log("ERROR", data.length)
            }
        });

    }

    function createManifest(allItems) {
        var manifestHeader = '<?xml version="1.0"?><manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/qti/qtiv2p2/qtiv2p2_imscpv1p2_v1p0.xsd" identifier="MANIFEST-tao5d00c8c5328165-86024961"><metadata><schema>QTIv2.2 Package</schema><schemaversion>1.0.0</schemaversion></metadata><organizations/><resources>';
        var manifestRessource
        var manifestAllRessources = '';
        var manifestFooter = ' </resources></manifest>';
        var manifest;
        for (var i = 0; i < allItems.length; i++) {
            //console.log("Checkos");
            var Qindex = "i156033232889859" + (i+1);
           if (i == allItems.length) {
                //console.log("last Set");
                manifestRessource =
                    '<resource identifier="' + Qindex + '" type="imsqti_item_xmlv2p2" href="' + Qindex + '/qti.xml">' +
                    '<file href="' + Qindex + '/qti.xml"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/wonderpci.amd.js"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/js/renderer.js"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/css/base.css"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/css/wonderpci.css"/>' +
                    '</resource>';
                manifestAllRessources = manifestAllRessources + '\n' + manifestRessource;
            } else {
                manifestRessource =
                    '<resource identifier="' + Qindex + '" type="imsqti_item_xmlv2p2" href="' + Qindex + '/qti.xml">' +
                    '<file href="' + Qindex + '/qti.xml"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/wonderpci.amd.js"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/js/renderer.js"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/css/base.css"/>' +
                    '  <file href="' + Qindex + '/wonderpci/runtime/css/wonderpci.css"/>' +
                    '</resource>';
                manifestAllRessources = manifestAllRessources + '\n' + manifestRessource;
            }
            /*
            	console.log(ObjItemSerie[i]);// Get All items
            	console.log(Qindex); // Q Index
            	console.log(ObjItemSerie[i][Qindex]); // Item Object
            	console.log(ObjItemSerie[i][Qindex].Ans); // Item Good Response
            	console.log(Object.keys(ObjItemSerie[i][Qindex])[0]); // Item intitulé
            	var Intitulex = Object.keys(ObjItemSerie[i][Qindex])[0]; // Item intitulé
            	console.log(ObjItemSerie[i][Qindex][Intitulex]); // Item Set Response Array
            	console.log(ObjItemSerie[i][Qindex][Intitulex][0]); // Item First Response in Array
            	for (var j = 0; j < ObjItemSerie[i][Qindex][Intitulex].length; j++) {
            		console.log(ObjItemSerie[i][Qindex][Intitulex][j]);
            	}*/
        }
        manifest = manifestHeader + manifestAllRessources + manifestFooter;

        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        //Send To Php create Manifest File
        $.ajax({
            type: "POST",
            data: ({ 
                data: manifest,
                packName : PName
              }),
            url: 'ajax-request',
            success: function(data) {
                console.log("SUCCESS for MAnifest");
                for (let i = 0; i < allItems.length; i++) {
                    console.log(allItems[i])
                    createQTIXML(allItems[i], i+1); 
                }
                setTimeout(() => {
                    createZip(PName);  
                }, 3000);
            }
        });

    function createZip(PName){
        $.ajax({
            type: "POST",
            data: ({packName : PName }),
            url: 'download-zip',
            success: function(data) {
                console.log("Go to create ZIP File");
                DownloadFile("myzip.zip");
            }, error : function(data){
                console.log("ERROR", data)
            }
        });
    }

    }
    
    
    
    function createQTIXML(oneItem, index) {
    console.log(oneItem); 
        var Qindex = oneItem.item.itemID;
        console.log(Qindex);
        var shortQ = oneItem.item.question.substring(0, 20);
        var QTIXML ='<?xml version="1.0" encoding="UTF-8"?>' +
            '<assessmentItem xmlns="http://www.imsglobal.org/xsd/imsqti_v2p2" xmlns:m="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:html5="html5" xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqti_v2p2 http://www.imsglobal.org/xsd/qti/qtiv2p2/imsqti_v2p2.xsd" identifier="' + Qindex + '"' +
            ' title="' + Qindex + '-' + shortQ + '" label="' + Qindex + '" xml:lang="en-US" adaptive="false" timeDependent="false" toolName="TAO" toolVersion="3.3.0-RC2">' +
            '<responseDeclaration identifier="RESPONSE" cardinality="single" baseType="string"/>' +
            '<outcomeDeclaration identifier="SCORE" cardinality="single" baseType="float"/>' +
            '<itemBody>' +
            '<div class="grid-row">' +
            '<div class="col-12">' +
            '<customInteraction responseIdentifier="RESPONSE">' +
            '<portableCustomInteraction xmlns="http://www.imsglobal.org/xsd/portableCustomInteraction" customInteractionTypeIdentifier="wonderpci" hook="wonderpci/runtime/wonderpci.amd.js" version="1.0.0">' +
            ' <resources>' +
            '<libraries><lib id="IMSGlobal/jquery_2_1_1"/><lib id="wonderpci/runtime/js/renderer"/></libraries><stylesheets><link href="wonderpci/runtime/css/base.css" type="text/css" title="base"/><link href="wonderpci/runtime/css/wonderpci.css" type="text/css" title="wonderpci"/></stylesheets></resources>' +
            '<properties>' +
            '   <property key="stage">' + oneItem.jsonGen[index-1] + '</property>' +
            '   <property key="item">{"param" : {' + JSON.stringify(oneItem.item.param) + '}</property>' +
            '   </properties>' +
            '   <markup xmlns="http://www.w3.org/1999/xhtml">' +
            '       <div class="wonderpci">' +
            '       <div class="prompt"/>' +
            '       <div class="KonvaContainer"/>' +
            '       </div>' +
            '    </markup>' +
            '</portableCustomInteraction>' +
            '</customInteraction>' +
            '</div>' +
            '</div>' +
            '</itemBody>' +
            '<responseProcessing template="http://www.imsglobal.org/question/qti_v2p2/rptemplates/match_correct"/>' +
            '</assessmentItem>';

            //console.log(QTIXML);

        return  $.ajax({
            type: "POST",
            data: ({ name: index, data: QTIXML, packName : PName }),
            url: 'ajax-request-content',
            success: function(data) {
               console.log("Succes ecriture XML in QTI file");
               console.log(index);
            }, error : function(data){
                console.log("ERROR", data)
            }
        });
    
   
   

    

 

    }

        function DownloadFile(fileName) {
            //Set the File URL.
            var url =  fileName;
            console.log(url);
 
            $.ajax({
                url: url,
                cache: false,
                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 2) {
                            if (xhr.status == 200) {
                                xhr.responseType = "blob";
                            } else {
                                xhr.responseType = "text";
                            }
                        }
                    };
                    return xhr;
                },
                success: function (data) {
                    //Convert the Byte Data to BLOB object.
                    var blob = new Blob([data], { type: "application/octetstream" });
 
                    //Check the Browser type and download the File.
                    var isIE = false || !!document.documentMode;
                    if (isIE) {
                        window.navigator.msSaveBlob(blob, fileName);
                    } else {
                        var url = window.URL || window.webkitURL;
                        var link = url.createObjectURL(blob);
                        var a = $("<a />");
                        a.attr("download", fileName);
                        a.attr("href", link);
                        $("body").append(a);
                        a[0].click();
                        $("body").remove(a);
                    }
                }
            });
        
        

    }
        
    });


    insertMetaTemplate();
}