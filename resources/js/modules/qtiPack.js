    function createRoot() {
        $.ajax({
            url: '../ajax/createRootDir.php',
            success: function(data) {
                console.log("Root Folder created");
            }
        });

    }

    function createQTIFolders(codeItem) {
        console.log(codeItem)
        $.ajax({
            type: "POST",
            data: ({ data: codeItem }),
            url: '../ajax/createDirs.php',
            success: function(data) {
                console.log("QTI Folders created -> " + codeItem);
            }
        });

    }

    function createManifest(allItems) {
        var manifestHeader = '<?xml version="1.0"?><manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 http://www.imsglobal.org/xsd/qti/qtiv2p2/qtiv2p2_imscpv1p2_v1p0.xsd" identifier="MANIFEST-tao5d00c8c5328165-86024961"><metadata><schema>QTIv2.2 Package</schema><schemaversion>1.0.0</schemaversion></metadata><organizations/><resources>';
        var manifestRessource
        var manifestAllRessources = '';
        var manifestFooter = ' </resources></manifest>';
        var manifest;
        for (var i = 1; i < allItems.length + 1; i++) {
            console.log("Checkos");
            var Qindex = "i156033232889859" + i;
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


        //Send To Php create Manifest File
        $.ajax({
            type: "POST",
            data: ({ data: manifest }),
            url: '../ajax/createManifest.php',
            success: function(data) {
                console.log("SUCCESS for MAnifest");
            }
        });
    }

    function createQTIXML(ObjItemSerie, jsonStages) {
        console.log(jsonStages);
        console.log(ObjItemSerie);
        for (var i = 0; i < ObjItemSerie.length; i++) {
            var Qindex = ObjItemSerie[i].itemID;
            var shortQ = ObjItemSerie[i].question.substring(0, 20);
            var QTIXML =
                '<?xml version="1.0" encoding="UTF-8"?>' +
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
                '   <property key="stage">' + jsonStages[i] + '</property>' +
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

            $.ajax({
                type: "POST",
                data: ({ name: Qindex, data: QTIXML }),
                url: '../ajax/writeQTIContent.php',
                success: function(data) {
                    console.log("Succes ecriture XML in QTI file")
                }
            });


        }

    }

    function createZIP() {
        $.ajax({
            url: '../ajax/qtizipper.php',
            success: function(data) {
                $("#confirm5").append('Zip Package folder').css("display", "inline");
            }
        });
    }

   