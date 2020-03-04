const _Util = {
    isString: (value: any) => {
        return Object.prototype.toString.call(value) === '[object String]';
    },

    isArray: (value: any) => {
        return Object.prototype.toString.call(value) === '[object Array]';
    },

    isObject: (value: any) => {
        return Object.prototype.toString.call(value) === '[object Object]';
    },

    isFunction: (value: any) => {
        return Object.prototype.toString.call(value) === '[object Function]';
    },

    filterProps: (props: any = {}, filter: string[] = []) => {
        let newProps = {...props};
        filter.forEach((item: string) => {
            delete newProps[item];
        });
        return newProps;
    }
}

export default _Util;