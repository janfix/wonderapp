/** All the default data are stored here. It is possible to paste a json for defaultData */


export var defaultData = {
        "canvasWidth": 1200,
        "canvasHeight": 600,
        "gridUnit": 30,
        "gridColor": "#ddd",
        "StartGX": 300, //X position to insert
        "StartGY": 100, //Y position to insert
        "ChoiceNumber": 1, //Batch one click= n choice
        "blockSnapSize": 30,
        "CKShape": "Square",
        "RoundAngle": 3,
        "inputStroke": "grey",
        "inputfill": "transparent",
        "labelColor": "black",
        "questionColor": "black",
        "labelFont": "Arial",
        "labelFontSize": 20,
        "tickColor": "teal",
        "labelVisible": true,
        "layout": "vertical",
        "QuestionFontSize": 24,
        "fontQuestion": "Arial"
    }
    /* 
    modify the defaultConfig
    */
export function setData(key, value) {
    defaultData[key] = value;
}

export function get() {
    return defaultData;
}