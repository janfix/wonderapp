<!-- Modal -->
<div class="modal fade" id="parserModal" tabindex="-1" aria-labelledby="parserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="parserModalLabel">Parser options</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Choose the interaction type :
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="choiceType" id="parserSingleChoice" autocomplete="off"
                        checked value="radio">
                    <label class="btn btn-outline-primary" for="parserSingleChoice">Single Choice</label>

                    <input type="radio" class="btn-check" name="choiceType" id="parserMChoice" autocomplete="off"
                        value="checkbox">
                    <label class="btn btn-outline-primary" for="parserMChoice">Multiple Choice</label>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


<div id="timeOver" class="modal" tabindex="-1">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body CountDownOverMessage">
                <p>Time is over.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary closeModalChrono" data-bs-dismiss="modal">Next
                    question</button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" id="scoreModal" tabindex="-1" aria-labelledby="scoreModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="scoreModalLabel">Scoring parameters</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-2">Choose a scoring type, you can add a special value (positive or negative):</div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                        value="RIGHT">
                    <label class="form-check-label" for="flexRadioDefault1">
                        Right Answer <img width="15" src="images/greenSpot.svg" />
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                        value="ELIMIN">
                    <label class="form-check-label" for="flexRadioDefault2">
                        Choice to eliminate <img width="15" src="images/yellowSpot.svg" />
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3"
                        value="PENALTY">
                    <label class="form-check-label" for="flexRadioDefault3">
                        Penalty <img width="15" src="images/redSpot.svg" />

                </div> </label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4"
                        value="CLEAR">
                    <label class="form-check-label" for="flexRadioDefault4">
                        Clear score
                    </label>
                    <hr />
                    <div class="row">
                        <div class="col">Answer value (can be negative if it is a penalty) :</div>
                        <div class="col"> <input class="form-control form-control-sm numberInput" type="number"> </div>
                    </div>
                    <!-- <span class="infoScore">Go to parameters->score builder to retreive all item values</span> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary setScore" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>


</div>
