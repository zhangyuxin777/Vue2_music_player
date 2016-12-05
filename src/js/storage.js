/**
 * Created by bruce zhang on 2016/12/5.
 */

var l = window.localStorage;
var s = window.sessionStorage;
var toJson = JSON.parse;
var toStr = JSON.stringify;

module.exports.setL = function (key, val) {
    if (allow(key, val)) {
        l.setItem(key, toStr(val));
    }
};
module.exports.getL = function (key) {
    if (notZero(key)) {
        return toJson(l.getItem(key));
    }
    return null;
};
module.exports.cleanL = function (key) {
    if (notZero(key)) {
        l.removeItem(key);
    }
};
module.exports.setS = function (key, val) {
    if (allow(key, val)) {
        s.setItem(key, toStr(val));
    }
};
module.exports.getS = function (key) {
    if (notZero(key)) {
        return toJson(s.getItem(key));
    }
    return null;
};
module.exports.cleanS = function (key) {
    if (notZero(key)) {
        s.removeItem(key);
    }
};

function notZero(val) {
    if (val != undefined && val != null && val.length != 0) {
        return true;
    } else {
        console.warn('the key is undefined or null');
        return false;
    }
}
function hasVal(val) {
    if (val != undefined && val != null) {
        return true;
    } else {
        console.warn('the value is undefined or null');
        return false;
    }
}
function allow(key, val) {
    return notZero(key) && hasVal(val);
}