export function fetchProp(obj, prop:string){
    //property not found
    if(typeof obj === 'undefined') return false;
    
    //index of next property split
    var _index = prop.indexOf('.')

    //property split found; recursive call
    if(_index > -1){
        //get object at property (before split), pass on remainder
        return fetchProp(obj[prop.substring(0, _index)], prop.substr(_index+1));
    }
    
    //no split; get property
    return obj[prop];
}