/* This represents the Pack as a logic mirror image of the dom
 and facilitate the itemPack management */
import $ from "jquery";
import { itemPackMap } from "./cardTools";



export function addToItemPack(id, index, item, jsonGen) {

    var itemInfo = new Object();
    itemInfo.id = id;
    itemInfo.index = index;
    itemInfo.item = item;
    itemInfo.jsonGen = jsonGen;
    itemPackMap.push(itemInfo)
    return itemPackMap
}
/* Send the all pack */
export function getItemPack() {
    return itemPackMap
}

/* Send only one item */
export function getPItem(id) {
    for (let i = 0; i < itemPackMap.length; i++) {
        if (itemPackMap[i].id == id) {
            return itemPackMap[i]
        }
    }
}

export function deleteItem(id) {
    for (let i = 0; i < itemPackMap.length; i++) {
        if (itemPackMap[i].id == id) {
            itemPackMap.splice(i, 1)
        }
    }
}