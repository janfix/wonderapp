import $ from "jquery";

export function insertMetaTemplate() {
    
    $("#newMeta").on("click", function() {
       $(".ql-editor").html(
/*        '<li> Item ID: I'+ new Date().valueOf() + */
       '<li class="creationDate"> <strong>Creation</strong>: '+ new Date(Date.now()).toLocaleString() +
       '<li class="Author"> <strong>Author(s)</strong>: USERID'+
       '<li class="InteractionType"> <strong>Interaction</strong> type : Choices'+
       '<li class="InteractionDetail"> <strong>Interaction</strong> details : Select -> Multichoice | single Choice | complexe choice'+
       '<li class="Subject"> <strong>Subject</strong> : Select -> Mathematics | Physics | English'+
       '<li class="Domain"> <strong>Domain</strong> : _____________________ '+
       '<li class="Subdomain"> <strong>Subdomain</strong> : __________________'+
       '<li class="Skill"> <strong>Skill</strong> framework ref. : ___________________________'+
       '<li class="Task"> <strong>Task</strong> definition : "_________________________________________________________________________" '+
       '<li class="Keywords"> <strong>Keywords</strong> :"text", "_________________, _____________, _____________, ____________________"'+
/*        '<li> Grade/level :"Nationale Code"'+*/
       '<li> <strong>Test taker age</strong> :"__"'+
       '<li> <strong>Country</strong> :________________'+
       '<li> <strong>ISCED</strong> : ____________'+
       '<li> <strong>Complementary tool</strong> : __________, __________, _____________'+
       '<li> <strong>Response format</strong> : Alphanumeric | Boolean |'+
       '<li> <strong>Correction type</strong> : Automatic | Manual'+ 
       '<li> <strong>Correction guide</strong> :None | text content | url ')
/*        '<li> Text version : GENERATED'+ 
       '<li> version : 1.0.0'*/
    });
}