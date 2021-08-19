<div class="topMenuBar">
<button type="button" class="btn btn-sm btn-outline-warning clearAll">Clear</button>

            <div class="btn-group layout" role="group" aria-label="LayoutGroup">
            <button type="button" class="btn btn-sm btn-outline-info matrix HLayout" data-type="matrixDir" title="Automatic Layout: Horizontal">&nbsp; <img class="layoutIcon" src="images/HMatrix.svg"></button>
            <button type="button" class="btn btn-sm btn-outline-info matrix VLayout" data-type="matrixDir" title="Automatic Layout: Vertical">&nbsp; <img class="layoutIcon" src="images/VMatrix.svg"></button>
            </div>

            <div class="btn-group" role="group" aria-label="InputGroup">
            <button type="button" class="btn btn-sm btn-outline-info addQuestion type" data-type="Qprompt" title="Question prompt">&nbsp;<img class="tbIcon" src="images/question.svg"></button>
            <button type="button" class="btn btn-sm btn-outline-info addCkGroup type" data-type="ckbox" title="Multiple Choice">&nbsp;<img class="tbIcon" src="images/cksolo.svg"></button>
            <button type="button" class="btn btn-sm btn-outline-info addRadioGroup type" data-type="btRadio" title="Unique Choice">&nbsp; <img class="tbIcon" src="images/radiosolo.svg"></button>
            <button type="button" class="btn btn-sm btn-outline-info addChoiceGroup type" data-type="choiceGroup" title="Create a single Choice Group limited to its members">&nbsp; <img style="width:25px; margin-left:-5px" src="images/RadioR.png"></button>
            </div>



            <button type="button" class="btn btn-sm btn-outline-success m-1 parameterBT"  data-toggle="collapse" data-target="#parameterPanel">
            Parameters <img src="images/setting2.svg" width="20px" title="Input options"> 
            </button>




            <div class="btn-group WchoiceButton" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-sm btn-outline-info richEditor richEditorBT " >Rich Editor <img src="images/edit.svg" width="20px" title="Open/close editor"></button>
            <button type="button" class="btn btn-sm btn-outline-info editorAction snapshot" ><img src="images/camera.svg" width="20px" title="Snapshot and insert"></button>
            <button type="button" class="btn btn-sm btn-outline-info editorAction listInjection" ><img src="images/injectlist.svg" width="20px" title="Quick List Injection to Multichoice"></button>
            <button type="button" class="btn btn-sm btn-outline-info editorAction listInjectionRadio" ><img src="images/injectlistRadio.svg" width="20px" title="Quick List Injection to SingleChoice"></button>            
            <button type="button" class="btn btn-sm btn-outline-info editorAction parseItems" ><img src="images/printer.svg" width="20px" title="Apply template to all questions"> Parser</button>
            <label title="Add image to Canvas" class="filebutton">
            <span><input type="file" id="myfile" name="myfile"></span>
            </label>
            <button type="button" class="btn btn-sm btn-outline-info addFreeText">Free Text</button>
            <div class="btn-group" role="group">
             <button id="freeShapeBT" type="button" class="btn btn-sm btn-outline-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
               <img class="FreeShapeInfoColor" src="images/shape3.svg" width="60px" title="Add shapes">
              {{--  <img class="complementColor" src="images/shape3white.svg" width="60px" title="Add shapes"> --}}
             </button>
             <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1"> 
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-diagonal-line.svg" class="freeLine" width="20px" title="Line"></a>
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-circle.svg" class="freeCircle" width="20px" title="Circle"></a>
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-rectangle.svg" class="freeRectangle" width="20px" title="Rectangle"></a>
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-rectangle-arrondi.svg" class="freeRoundRectangle" width="20px" title="Rectangle with rounded corner"></a>
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-ring.svg" width="20px" class="freeRing" title="Ring"></a>
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-etoile.svg" width="20px" class="freeStar" title="Star"></a>
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-right-arrow.svg" width="20px" class="freeArrow" title="Arrow"></a>
               <li><a class="shapeSwitch dropdown-item" href="#"><img src="images/FShape-triangle.svg" width="20px" class="freeTriangle" title="Triangle"></a>
             </ul>
            </div>
</div>
</div>