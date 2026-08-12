export function strReplaceAt(str, index, char) {
    return str.slice(0, index)+char+str.slice(index+1, str.length);
}