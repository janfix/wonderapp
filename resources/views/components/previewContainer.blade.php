<div class="previewContainer" id="previewContainer">
            <div class="row">
                <div class="col mt-2">
                    <h2>Preview mode</h2>
                </div>
            </div>
            <div class="messages">
                <div class="alert alert-primary itemReady" role="alert">
                    Your item is ready, good test 😀!
                </div>
                <div class="alert alert-danger choiceLimiterMessage" role="alert">
                    Watch out, you reach the choice limit of <span class="choiceLimitWarning"></span>. To select a new choice, you must deselect one.
                </div>
            </div>
            <div id="previewKonva" class="previewKonva">here the canvas for Konva</div>
            <div class="ChronoPreview"></div>
            <div class=" checkResult">
                <div class="col ">
                    <div class="row m-2">Correction: <span class="correction respLine"></span></div>
                    <div class="row m-2">
                        Chosen responses: <span class="response respLine"></span>
                    </div>
                    <div class="row m-2">
                        Eliminated responses: <span class="respElim respLine"></span>
                    </div>
                    <div class="row m-2">Hint: <span class="HintRevealed respLine">No hint</span></div>
                  {{--   <div class="row m-2">Score: <span class="Respscore respLine"></span></div> --}}
                    <div class="row m-2">Clicks: <span class="clickCounter respLine"></span></div>
                    <div class="row m-2">Time:<span class="chronometer respLine">
                    <span id="chronotime">0:00:00:00</span> 
                    </span></div>
                </div>
            </div>
            <div class="pwToolBar m-2">
                <button type="button" class="btn btn-outline-info checkResultBT">Check Results</button>
                <button type="button" class="btn btn-outline-success SaveSingleQTI">Save Single QTI</button>
                <button type="button" class="btn btn-outline-success backToEditor">Close Preview</button>
            </div>
        </div>