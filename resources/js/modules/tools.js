import $ from "jquery";

export function toDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today
}


export function toAlpha(num) {
    if (num < 1 || num > 26 || typeof num !== 'number') {
        return -1;
    }
    const leveller = 64;
    //since actually A is represented by 65 and we want to represent i twith one

    return String.fromCharCode(num + leveller);
};