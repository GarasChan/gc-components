const _Util = {
    isString: (value) => {
        return Object.prototype.toString.call(value) === '[object String]';
    },

    isArray: (value) => {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
}

export default _Util;