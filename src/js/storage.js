/**
 * Created by bruce zhang on 2016/12/5.
 */
export default {
  notZero (val) {
    if (val != undefined && val != null && val.length != 0) {
      return true;
    } else {
      console.warn('the key is undefined or null');
      return false;
    }
  },
  hasVal (val) {
    if (val != undefined && val != null) {
      return true;
    } else {
      console.warn('the value is undefined or null');
      return false;
    }
  },
  setL (key, val) {
    if (this.notZero(key) && this.hasVal(val)) {
      l.setItem(key, toStr(val));
    }
  },
  getL (key) {
    if (this.notZero(key)) {
      return toJson(l.getItem(key));
    }
    return null;
  },
  cleanL (key) {
    if (this.notZero(key)) {
      l.removeItem(key);
    }
  },
  setS (key, val) {
    if (this.notZero(key) && this.hasVal(val)) {
      s.setItem(key, toStr(val));
    }
  },
  getS (key) {
    if (this.notZero(key)) {
      return toJson(s.getItem(key));
    }
    return null;
  },
  cleanS (key) {
    if (this.notZero(key)) {
      s.removeItem(key);
    }
  }
}
let l = window.localStorage;
let s = window.sessionStorage;
let toJson = JSON.parse;
let toStr = JSON.stringify;
