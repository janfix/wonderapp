export default function Itemreport_tpl(update) {
    var IDitem = update.itemID;
    var Itemreport_tpl =
        '<div id="' + update.itemID + '" class="row itemRow row ' + update.IndexChoice + '">' +
        '<div class="col-5">' +
        '<div class="previewImg">' +
        '    <img class="minipreview" data-index="' + update.IndexChoice + '" src="' + update.pathToPreview + '" width="100%" alt="filename" />' +
        '<div class="btn-group btn-group-sm mb-2" role="group" aria-label="action">' +
        '<button type="button" class="btn zoom  btn-outline-info">Zoom in</button>' +
        '<button type="button" class="btn zoomOut  btn-outline-info">Zoom out</button>' +
        '<button type="button" class="btn activePreview  btn-outline-info">Preview</button>' +
        '<button type="button" data-ID="' + update.itemID + '" class="btn edit  btn-outline-info">Edit</button>' +
        '<button type="button" class="btn toQTI  btn-outline-info">To QTI</button>' +
        '<button type="button" data-ID="' + update.itemID + '" class="btn deletor  btn-outline-info">Delete</button>' +
        '</div>' +
        '</div>' +
        '    </div>' +
        '    <div class="col-7 mt-2">' +

        '<ul class="nav nav-tabs" id="myTab" role="tablist">' +
        '  <li class="nav-item" role="presentation">' +
        '    <button class="nav-link active" id="IContent-tab" data-bs-toggle="tab" data-bs-target="#IContent' + IDitem + '" type="button" role="tab" aria-controls="IContent' + IDitem + '" aria-selected="true">Content</button>' +
        '  </li>' +
        '  <li class="nav-item" role="presentation">' +
        '    <button class="nav-link" id="IOption-tab" data-bs-toggle="tab" data-bs-target="#IOption' + IDitem + '" type="button" role="tab" aria-controls="IOption' + IDitem + '" aria-selected="false">Options</button>' +
        '  </li>' +
        '  <li class="nav-item" role="presentation">' +
        '    <button class="nav-link" id="IMeta-tab" data-bs-toggle="tab" data-bs-target="#IMeta' + IDitem + '" type="button" role="tab" aria-controls="IMeta' + IDitem + '" aria-selected="false">Metadata</button>' +
        '  </li>' +
        '</ul>' +
        '<div class="tab-content" id="myTabContent">' +
        '  <div class="tab-pane fade show active" id="IContent' + IDitem + '" role="tabpanel" aria-labelledby="IContent-tab">' +
        '        <div class="row">' +
        '            <div class="col">Question: ' + update.question + '</div>' +
        '        </div>' +
        '        <div class="row">' +
        '            <div class="col">' +
        '            <table id="T' + update.itemID + '">' +
        '             <tr><th>Proposition</th><th>Right Answer <img  width="15" src="images/greenSpot.svg"/></th><th>Feedback</th><th>Elminate <img  width="15" src="images/yellowSpot.svg"/></th><th>Penalty <img  width="15" src="images/redSpot.svg"/></th></tr>  ' +
        '            </table>' +
        '                </div>' +
        '        </div>' +
        '</div>' +
        '  <div class="tab-pane fade" id="IOption' + IDitem + '" role="tabpanel" aria-labelledby="IOption-tab">' +
        '        <div class="row">' +
        '            <div class="col">Elimination mode: ' + update.eliminationMode + '</div>' +
        '            <div class="col"></div>' +
        '        </div>' +
        '        <div class="row">' +
        '            <div class="col">Hint: ' + update.hint + '</div>' +
        '            <div class="col"></div>' +
        '        </div>' +
        '        <div class="row">' +
        '            <div class="col">choice limiter: ' + update.ATLimiter + '</div>' +
        '            <div class="col"></div>' +
        '        </div>' +
        '        <div class="row">' +
        '            <div class="col">Chronometer set : ' + update.chrono + ' </div>' +
        '            <div class="col"></div>' +
        '        </div>' +
        '        <div class="row">' +
        '            <div class="col-6">Time limit : ' + update.TimeLimiter + ' | Time limit: ' + update.TimeLimit + '| Time limit message: ' + update.TimeLimitMessage + '</div>' +
        '            <div class="col"></div>' +
        '        </div>' +
        '        <div class="row">' +
        '            <div class="col">Shuffle:' + update.Shuffle + '</div>' +
        '            <div class="col"></div>' +
        '        </div>' +
        '        <div class="row">' +
        '            <div class="col">Reset Button: ' + update.resetBT + '</div>' +
        '            <div class="col"></div>' +
        '        </div>' +
        '</div>' +
        '  <div class="tab-pane fade" id="IMeta' + IDitem + '" role="tabpanel" aria-labelledby="IMeta-tab">' +
        '        <div class="row">' +
        '<div class="col">' +
        '<ul>' +
        '        <li> Item ID: ' + update.itemID +
        '        <li> Creation date: ' + update.CDate +
        '        <li> Author(s): ' + update.authors +
        '        <li> Interaction type :' + update.interaction +
        '        <li> Choices :' + update.inputType +
        '        <li> Domain :' + update.domain +
        '        <li> Subject :' + update.subject +
        '        <li> version :' + update.version +
        '        <li> Subdomain :' + update.subdomain +
        '</ul>' +
        ' </div>' +
        '<div class="col">' +
        '<ul>' +
        '        <li>Skill framework ref. :' + update.skillfrm +
        '        <li>Task definition :' + update.taskdef +
        '        <li>Keywords :' + update.keywords +
        '        <li>Grade/level :' + update.grade +
        '        <li>Test taker age :' + update.age +
        '        <li>ISCED :' + update.isced +
        '        <li>Complementary tool :' + update.comptool +
        '        <li>Response format :' + update.responseformat +
        '        <li>Correction type :' + update.corrtype +
        '        <li>Correction guide :' + update.corrguide +
        '        <li>Text version :' + update.textversion +
        '</ul>' +
        ' </div>' +
        '        <div class="row">' +
        '            <div class="row">Comments :' + update.comments + '</div>' +
        '        </div>' +
        '</div>' +
        '</div>' +





        '    </div>' +
        '</div>'

    return Itemreport_tpl;
}