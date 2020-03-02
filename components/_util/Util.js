const _Util = {
    isString: (value) => {
        return Object.prototype.toString.call(value) === '[object String]';
    },

    isArray: (value) => {
        return Object.prototype.toString.call(value) === '[object Array]';
    },

    isObject: (value) => {
        return Object.prototype.toString.call(value) === '[object Object]';
    },

    isFunction: (value) => {
        return Object.prototype.toString.call(value) === '[object Function]';
    },

    filterProps: (props = {}, filter = []) => {
        let newProps = {...props};
        filter.forEach(item => {
            delete newProps[item];
        });
        return newProps;
    }
}

export default _Util;