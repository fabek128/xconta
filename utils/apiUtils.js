var utils = {};

utils.getUrl = function(app, recurso, opcional){
	opcional = typeof opcional !== 'undefined' ? opcional : '';
	recurso = replaceAll(recurso, '/', '');
	return 'http://' + app.url + '/' + recurso + '/' + opcional;
}

function replaceAll(text, search, newstring ){
    var out = text.replace(new RegExp(search, 'g'), newstring);
    return out;
}

module.exports = utils;