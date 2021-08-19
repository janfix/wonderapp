        <div id="parameterPanel" class="parameterPanel container collapse">
            <div class="ParamPanel ">Parameter panel<i class="bi bi-x-circle Wicon closeParam"></i></div>
            <ul class="nav nav-tabs mt-2 adjustTab" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="question-tab" data-bs-toggle="tab" data-bs-target="#question" type="button" role="tab" aria-controls="question" aria-selected="true">Question</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="inputck-tab" data-bs-toggle="tab" data-bs-target="#inputck" type="button" role="tab" aria-controls="inputck" aria-selected="false">Input box</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="tick-tab" data-bs-toggle="tab" data-bs-target="#tick" type="button" role="tab" aria-controls="tick" aria-selected="false">Tick</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ckLabel-tab" data-bs-toggle="tab" data-bs-target="#ckLabel" type="button" role="tab" aria-controls="ckLabel" aria-selected="false">Choice Label</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="ckitem-tab" data-bs-toggle="tab" data-bs-target="#ckitem" type="button" role="tab" aria-controls="ckitem" aria-selected="false">Item</button>
                </li>
                <!--  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="richContent-tab" data-bs-toggle="tab" data-bs-target="#richContent" type="button" role="tab" aria-controls="richContent" aria-selected="false">Rich Content</button>
                </li> -->
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="grid-tab" data-bs-toggle="tab" data-bs-target="#grid" type="button" role="tab" aria-controls="grid" aria-selected="false">Grid & Canvas</button>
                </li>
                <!--  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="score-tab" data-bs-toggle="tab" data-bs-target="#score" type="button" role="tab" aria-controls="score" aria-selected="false">Score builder</button>
                </li> -->
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="metadata-tab" data-bs-toggle="tab" data-bs-target="#metadata" type="button" role="tab" aria-controls="metadata" aria-selected="false">Metadata</button>
                </li>

            </ul>
            <div class="tab-content adjustTab" id="myTabContent">
                <div class="tab-pane fade show active" id="question" role="tabpanel" aria-labelledby="question-tab">
                    <div class="row">
                        <div class="col-2">
                            Font family :
                        </div>
                        <div class="col">
                            <select name="fontQuestion" id="fontQuestion" class="fontQuestion">
                                        <option value="Arial" style="font-family: arial">Arial</option>
                                        <option value="Times New Roman" style="font-family: 'Times New Roman'">Times New Roman</option>
                                        <option value="Verdana" style="font-family: Verdana">Verdana</option>
                                        <option value="Cursive" style="font-family: Cursive">Cursive</option>
                                        <option value="Trebuchet MS" style="font-family: 'Trebuchet MS'">Trebuchet MS</option>
                                    </select>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-2">
                            Font color :
                        </div>
                        <div class="col">
                           <div class="col">
                               {{-- <input id="color-picker8"  value="#276cb8" /> --}}
                               <div  class="CPButton" id="pic8"><i class="bi bi-caret-down-fill"></i></div> 
                               <div class="pic8"  
                                acp-color="#EFE9E7" 
                                acp-show-alpha
                                acp-show-rgb="no"
                                acp-show-hsl="no"
                                acp-show-hex="no">
                                </div>
                            </div>
                           
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-2">
                            Font size :
                        </div>
                        <div class="col">
                            <input class="form-control form-control-sm" id="QuestionFontSize" type="number" min="12" max="100" />
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="inputck" role="tabpanel" aria-labelledby="inputck-tab">

                    <div class="row mt-4">
                        <div class="col-2">Input Shape:</div>
                        <div class="col-2 slideCont">Square<span class="circleLegend">Circle</span>
                            <br><input type="range" min="0" max="20" value="0" class="form-range roundedAngle">
                        </div>
                        <div hidden>Default Shape<input type="checkbox" name="defaultShape" id="defaultShape" checked></div>
                    </div>
                   {{--  <div class="row air">
                        <div class="col-2">Effect on click:</div>
                        <div class="col">
                            <select name="effectOnClick" id="effectOnClick">
                                            <option value="0">None</option>
                                            <option value="1">Boom</option>
                                            <option value="2">Fade away</option>
                                        </select>
                        </div>
                    </div> --}}
                    <div class="row air">
                        <div class="col-2">Input border color:</div>
                        <div class="col">
                        {{--     <input id="color-picker3" value="#276cb8" /> --}}
                            <div  class="CPButton" id="pic3"><i class="bi bi-caret-down-fill"></i></div> 
                            <div class="pic3"  
                            acp-color="#bdbdbd" 
                            acp-show-alpha
                            acp-show-rgb="no"
                            acp-show-hsl="no"
                            acp-show-hex="yes">
                            </div>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-2">Input background color :</div>
                        <div class="col">
                        {{--     <input id="color-picker4" value="#276cb8" /> --}}
                        <div  class="CPButton" id="pic4"><i class="bi bi-caret-down-fill"></i></div> 
                               <div class="pic4"  
                                acp-color="#bdbdbd" 
                                acp-show-alpha
                                acp-show-rgb="no"
                                acp-show-hsl="no"
                                acp-show-hex="yes">
                                </div>
                        </div>
                    </div>


                </div>
                <div class="tab-pane fade" id="tick" role="tabpanel" aria-labelledby="tick-tab">
                    <div class="row">
                        <div class="col-1">Shapes:
                        </div>
                        <div class="col">
                             <div class="btn-group btn-group-sm tickShape" role="group" aria-label="...">
                                <button class="btn btn-outline-warning"><img data-type ="Star" class="tck tckStar" src="images/tick_star.svg" width="20px"></button>
                                <button class="btn btn-outline-warning active"><img data-type ="Marck" class="tck tckMarck" src="images/tick_ckMarck.svg" width="20px"></button>
                                <button class="btn btn-outline-warning"><img data-type ="Cross" class="tck tckCross" src="images/tick_cross.svg" width="20px"></button>
                                <button class="btn btn-outline-warning"><img data-type ="Round" class="tck tckRound" src="images/tick_circle.svg" width="20px"></button>
                                <button class="btn btn-outline-warning"><img data-type ="Square" class="tck tckSquare" src="images/tick_square.svg" width="20px"></button>
                                <!--  <button class="btn btn-outline-warning"><img data-type ="Custom" class="tck tckCustom" src="img/tick_custom.svg" width="20px"></button> -->
                            </div>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-1">Tick color:</div>
                        <div class="col">
                            {{-- <input id="color-picker5" value="#276cb8" /> --}}
                            <div  class="CPButton" id="pic5"><i class="bi bi-caret-down-fill"></i></div> 
                            <div class="pic5"  
                            acp-color="#008080" 
                            acp-show-alpha
                            acp-show-rgb="no"
                            acp-show-hsl="no"
                            acp-show-hex="yes">
                            </div>
                        </div>
                    </div>
                    {{-- <div class="row air">
                        <div class="col"> Custom tick-> image</div>

                    </div> --}}

                </div>
                <div class="tab-pane fade" id="ckLabel" role="tabpanel" aria-labelledby="ckLabel-tab">

                    <div class="row">
                        <div class="col-1">
                            Font family :
                        </div>
                        <div class="col">
                            <select name="fontLabel" id="fontLabel" class="fontLabel">
                                        <option value="Arial" style="font-family: arial">Arial</option>
                                        <option value="Times New Roman" style="font-family: 'Times New Roman'">Times New Roman</option>
                                        <option value="Verdana" style="font-family: Verdana">Verdana</option>
                                        <option value="Comic Sans Serif" style="font-family: 'Comic Sans Serif'">Comic Sans Serif</option>
                                        <option value="Trebuchet MS" style="font-family: 'Trebuchet MS'">Trebuchet MS</option>
                                    </select>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-1">
                            Font color :
                        </div>
                        <div class="col">
                            {{-- <input id="color-picker7" value="#276cb8" /> --}}
                            <div  class="CPButton" id="pic7"><i class="bi bi-caret-down-fill"></i></div> 
                            <div class="pic7"  
                            acp-color="black" 
                            acp-show-alpha
                            acp-show-rgb="no"
                            acp-show-hsl="no"
                            acp-show-hex="yes">
                            </div>
                        </div>
                    </div>

                    <div class="row air">
                        <div class="col-1">
                            Font size :
                        </div>
                        <div class="col">
                            <input type="number" min="6" max="50" value="20" class='labelFontSize' />
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-1">Visibility: </div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input LabelVisib" type="checkbox" id="LabelVisib">
                                <label class="form-check-label" for="LabelVisib"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-1">
                            Index :
                        </div>
                        <div class="col">
                            <select name="indexAN" id="indexAN" class="indexAN">
                                        <option value="noIndex">none</option>
                                        <option value="IAlpha">Alphabetic</option>
                                        <option value="INum">Numeric</option>
                                    </select>
                        </div>
                    </div>

                </div>
                <div class="tab-pane fade" id="ckitem" role="tabpanel" aria-labelledby="ckitem-tab">
                    <div class="row">
                        <div class="col-2">Shuffle choice:</div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="ShuffleChoice">
                                <label class="form-check-label" for="ShuffleChoice"> The active shuffle is not compatible with the index. The index will be replaced by a dot in render mode.</label>
                            </div>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-2">Choice limiter: </div>
                        <div class="col"><input type="number" name="limiter" id="limiter" min="1" max="100" placeholder="5"></div>
                    </div>
                    <div class="row air">
                        <div class="col-2">Elimination mode:</div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="elimination">
                                <label class="form-check-label" for="elimination"> - Watch out! Not compatible with feedback!</label>
                            </div>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-2">Reset button:</div>

                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input resetBTActivate" type="checkbox" id="resetBTActivate">
                                <label class="form-check-label" for="resetBTActivate"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-2">Activate hint:</div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input disabled class="form-check-input" type="checkbox" id="hintactivate">
                                <label class="form-check-label" for="hintactivate"> To build the hint, use a Rich content, text or image ->context menu->hint message. The use of the hint is store in the response field. </label>
                            </div>
                        </div>
                    </div>
                    <!--  <div class="row air">
                        <div class="col-2">Activate FeedBack:</div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="feedBackactivate">
                                <label class="form-check-label" for="feedBackactivate"> This display a feedBack message after a click. To build the message, use the context menu on checkbox and write the message or add an image (emoticon). </label>
                            </div>
                        </div>
                    </div> -->
                    <div class="row air">
                        <div class="col-2">Time chrono and count down:</div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="chronometer">
                                <label class="form-check-label" for="chronometer">Activate the chronometer (valid only in preview / delivery mode)</label>
                            </div>
                            <!-- <div class="form-check form-switch air">
                                <input class="form-check-input" type="checkbox" id="showChrono">
                                <label class="form-check-label" for="showChrono">Show Chronometer</label>
                            </div> -->
                        </div>
                        <div class="col">
                            <div class="form-check form-switch air">
                                <input class="form-check-input" type="checkbox" id="timeLimit">
                                <label class="form-check-label" for="timeLimit">Show Countdown (default value: 120 seconds)</label>
                                <input id="timeLimitValue" class="form-control form-control-sm timeLimit air" type="number" width="200" placeholder="add a time limit in second.">
                                <input id="timeLimitMessage" class="form-control form-control-sm timeLimit air" type="text" width="200" placeholder="message to display when over.">
                            </div>




                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="richContent" role="tabpanel" aria-labelledby="richContent-tab">FFFFFF</div>
                <div class="tab-pane fade" id="grid" role="tabpanel" aria-labelledby="grid-tab">

                    <!-- <div class="row air">
                        <div class="col-2">Magnetic grid:</div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="magneticGrid">
                                <label class="form-check-label" for="magneticGrid"></label>
                            </div>

                        </div>
                    </div> -->
                    <div class="row air">
                        <div class="col-2">Display grid in Preview:</div>
                        <div class="col">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="GridAction">
                                <label class="form-check-label" for="GridAction"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row air">
                        <div class="col-2">Grid Color:</div>
                        <div class="col">
                            {{-- <input id="color-picker" value="#276cb8" /> --}}
                            <div  class="CPButton" id="pic1"><i class="bi bi-caret-down-fill"></i></div> 
                            <div class="pic1"  
                            acp-color="black" 
                            acp-show-alpha
                            acp-show-rgb="no"
                            acp-show-hsl="no"
                            acp-show-hex="yes">
                            </div>
                        </div>
                    </div>
                    <div class="row air mt-2">
                        <div class="col-2">Grid unit:</div>
                        <div class="col"><span class="gridSquare"></span><input type="range" class="gridUnit" id="gridUnit" name="gridUnit" min="1" max="60" value="30"></div>
                    </div>
                    <hr>
                    <div class="row ">
                        <div class="col-2">Canvas border-color:</div>
                        <div class="col">
                            {{-- <input id="color-picker6" value="gainsboro" /> --}}
                        <div  class="CPButton" id="pic6"><i class="bi bi-caret-down-fill"></i></div> 
                            <div class="pic6"  
                            acp-color="black" 
                            acp-show-alpha
                            acp-show-rgb="no"
                            acp-show-hsl="no"
                            acp-show-hex="yes">
                            </div>
                        </div>
                    </div>
                    <div class="row air mt-2">
                        <div class="col-2">Canvas Width:</div>
                        <div class="col"><span class="Kwidth"></span><input type="range" class="canvasWidth" id="canvasWidth" name="canvasWidth" min="200" max="1200" value="850"></div>
                    </div>
                    <div class="row air mt-2">
                        <div class="col-2">Canvas height:</div>
                        <div class="col"><span class="Kheight"></span><input type="range" class="canvasHeight" id="canvasHeight" name="canvasHeight" min="150" max="600" value="550"></div>
                    </div>

                </div>
                <!--                 <div class="tab-pane fade show" id="score" role="tabpanel" aria-labelledby="score-tab">

                    <table>
                        <tr>
                            <th>Choice ID </th>
                            <th>Choice label </th>
                            <th>Clicks</th>
                            <th>Right choice <img width="15" src="img/greenSpot.svg" /></th>
                            <th>Right Elimination <img width="15" src="img/yellowSpot.svg" /></th>
                            <th>Penalty <img width="15" src="img/redSpot.svg" /></th>
                        </tr>
                        <tr>
                            <td>ID1</td>
                            <td>Choice 1</td>
                            <td>true</td>
                            <td></td>
                            <td>10</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ID2</td>
                            <td>Choice 2</td>
                            <td>true</td>
                            <td>5</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ID3</td>
                            <td>Choice 3</td>
                            <td>false</td>
                            <td>10</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>ID4</td>
                            <td>Choice 4</td>
                            <td>false</td>
                            <td></td>
                            <td></td>
                            <td>-25</td>
                        </tr>
                    </table>
                    <hr>
                    <div class="row mt-2">
                        <div class="col">Success Threshold :</div>
                        <div class="col">
                            <input id="Threshold" class="form-control form-control-sm numberInput" type="number">
                        </div>
                    </div>
                    <hr>
                    <div class="row mt-2">
                        <div class="col">Hint value:</div>
                        <div class="col">
                            <input id="hintValue" class="form-control form-control-sm numberInput hintValue" type="number">
                        </div>
                    </div>


                    <hr> notes for me:
                    <div>Performance map : {"ID1":["choice1",true],"ID2":["choice2",false],"ID3":["choice3",true],"ID4":["choice4",true], "hint":["revealed":true]}</div>
                    <div>Global score : 5/25</div>
                    <div>Success Threshold : 15 -> success = false</div>

                </div> -->
                <div class="tab-pane fade" id="metadata" role="tabpanel" aria-labelledby="metadata-tab">


                    <div class="row">
                        <div class="col">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Wonder-ID</span>
                                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group input-group-sm mb-3">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Version</span>
                                <input type="text" class="form-control" placeholder="1.0.0" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                            </div>
                        </div>

                    </div>
                    <div class="row">
                        *To fill metadata faster : use the Wonder Metadata Generator, paste it in the Rich Editor and press the FMeta button.
                    </div>
                    <div class="row mt-3">
                        <h1 style="font-size: 1.2em; font-weight: bold;">Didactical description</h1>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaSubject" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaSubject">Subject</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaDomain" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaDomain">Domain</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaSubdomain" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaSubdomain">Subdomain</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaSkill" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaSkill">Skill framework ref.</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaTask" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaTask">Task definition</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metakeywords" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metakeywords">Keywords</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <h1 style="font-size: 1.2em; font-weight: bold;">Target information</h1>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaGrade" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaGrade">Grade/level</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaAge" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaAge">Test taker age</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaISCED" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaISCED">ISCED</label>
                            </div>
                        </div>


                    </div>

                    <div class="row">
                        <h1 style="font-size: 1.2em; font-weight: bold;">Additional information</h1>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaCtool" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaCtool">Complementary tool</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" value="Choice" class="form-control" id="metaInteraction" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaInteraction">Interaction type</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaResponse" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaResponse">Response format</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaCorrType" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaCorrType">Correction type</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaCorrGuide" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaCorrGuide">Correction guide</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="metaTextLink" placeholder="add here metadata" style="font-size: 0.9em;">
                                <label for="metaTextLink">text version link</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                            <label for="floatingTextarea" class="p-3"> Comments</label>
                        </div>
                    </div>



                </div>
            </div>




        </div>