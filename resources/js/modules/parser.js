import $ from "jquery";
import buildParam from "./param";

export default function parser(chain, CKType) {

    // Parser
    var codeItem = 1;
    var choice, choiceBlock = {},
        choices;
    var question = [];
    var item = {};
    var itemClone;
    var items = [];

    // Item-Block identification in HTML format

    var sourceBlock = chain.split("<p><br></p>");
    parsing(CKType)

    function parsing(CKType) {
        for (var i = 0; i < (sourceBlock.length); i++) {
            //Cleaning HTML
            var rawItem = $(sourceBlock[i]).text();
            choiceBlock = {};
            console.log("_____________")
                //Saving the parameters state
            item.param = buildParam();
            //Targeting the question
            if (rawItem.search("#Q_") > -1) {
                question = rawItem.split("#");
                item.itemID = 'i156033232889859' + codeItem;
                item.question = question[1].replace("Q_", "");
                codeItem = codeItem + 1;
            }
            //Targeting the Hint
            if (rawItem.search("#H") > -1) {
                var hint = rawItem.split("#H_");
                item.hint = hint[1];
            } else {
                item.hint = false;
            }
            //Targeting the Choices
            item.choices = [];
            if (rawItem.search("#C_") > -1) {
                choices = rawItem.split("#C_");
                item.question = choices[0].replace("#Q_", "");
                item.eliminationMode = false;
                item.type = CKType;

                for (let i = 0; i < choices.length; i++) {
                    if (choices[i].search("#Q_") == -1) { //Exclude Residual Question
                        choice = choices[i].split("#")
                        choiceBlock.text = choices[i].split("#")[0];
                        choiceBlock.feedback = choiceOptions(choice, "FB_");
                        choiceBlock.rightAnswer = choiceOptions(choice, "R_");
                        choiceBlock.eliminate = choiceOptions(choice, "E_");
                        if (choiceBlock.eliminate) { item.eliminationMode = true };
                        choiceBlock.penalty = choiceOptions(choice, "P_");
                    }
                    var choiceBlockClone = JSON.parse(JSON.stringify(choiceBlock))
                    if (typeof choiceBlockClone.text !== "undefined") { item.choices.push(choiceBlockClone) }
                    var itemClone = JSON.parse(JSON.stringify(item))

                }
            }
            items.push(itemClone);
        }

    }
    // Here the parser RESULT : items
    console.log(items)
    return items

}



function choiceOptions(choice, type) {
    var choiceOption = false;
    for (let i = 0; i < choice.length; i++) {
        if (choice[i].search(type) > -1) {
            if (type == "FB_") {
                var cleanFB = choice[i].replace("FB_", "");
                choiceOption = cleanFB;
            } else if (i == 0) {
                choiceOption = choice[i];
            } else {
                choiceOption = true;
            }
        }
    }

    return choiceOption
}

function ClearLine(lineToClean) {
    lineToClean = lineToClean.replace("<p>")
    return lineToClean.replace(/[^a-zA-Z ]/g, "")
}