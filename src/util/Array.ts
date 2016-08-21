export function remove(array: Array<any>, item: any) {
    let index = array.indexOf(item);
    if (index >= 0) {
       return array.slice(0, index).concat(array.slice(index + 1));
    }
    return array;
}
