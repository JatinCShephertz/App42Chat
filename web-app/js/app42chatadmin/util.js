/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */


//returns true if email is valid
function IsValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function parseResponse(obj){
    return eval(obj)
}

function arrayDifference(old_array,new_array){
	var diff = $(old_array).not(new_array).get();
	return diff;
}

function getPathInfo(path) {
    //  create a link in the DOM and set its href
    var link = document.createElement('a');
    link.setAttribute('href', path);
    var porT;
     if(link.protocol == "http:"){
        if(link.port == ""){
            porT = "80"
        }else{
            porT=  link.port
        }
    }else if(link.protocol == "https:"){
        if(link.port == ""){
            porT = "443"
        }else{
            porT=  link.port
        }
    }
    

    //  return an easy-to-use object that breaks apart the path
    return {
        host:     link.hostname,  //  'example.com'
        port:     porT,      //  12345
        //        search:   processSearchParams(link.search),  //  {startIndex: 1, pageSize: 10}
        path:     link.pathname,  //  '/blog/foo/bar'
        protocol: link.protocol   //  'http:'
    }
}
function processSearchParams(search, preserveDuplicates) {
    //  option to preserve duplicate keys (e.g. 'sort=name&sort=age')
    preserveDuplicates = preserveDuplicates || false;  //  disabled by default

    var outputNoDupes = {};
    var outputWithDupes = [];  //  optional output array to preserve duplicate keys

    //  sanity check
    if(!search) throw new Error('processSearchParams: expecting "search" input parameter');

    //  remove ? separator (?foo=1&bar=2 -> 'foo=1&bar=2')
    search = search.split('?')[1];

    //  split apart keys into an array ('foo=1&bar=2' -> ['foo=1', 'bar=2'])
    search = search.split('&');

    //  separate keys from values (['foo=1', 'bar=2'] -> [{foo:1}, {bar:2}])
    //  also construct simplified outputObj
    outputWithDupes = search.map(function(keyval){
        var out = {};
        keyval = keyval.split('=');
        out[keyval[0]] = keyval[1];
        outputNoDupes[keyval[0]] = keyval[1]; //  might as well do the no-dupe work too while we're in the loop
        return out;
    });

    return (preserveDuplicates) ? outputWithDupes : outputNoDupes;
}

function remove_duplicates(objectsArray) {
    var usedObjects = {};

    for (var i=objectsArray.length - 1;i>=0;i--) {
        var so = JSON.stringify(objectsArray[i]);

        if (usedObjects[so]) {
            objectsArray.splice(i, 1);

        } else {
            usedObjects[so] = true;          
        }
    }

    return objectsArray;

}