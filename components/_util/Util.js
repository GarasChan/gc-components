const _Util = {
    isString: (value) => {
        return Object.prototype.toString.call(value) === '[object String]';
    },

    isArray: (value) => {
        return Object.prototype.toString.call(value) === '[object Array]';
    },

    isObject: (value) => {
        return Object.prototype.toString.call(value) === '[object Object]';
    }
}

export default _Util;