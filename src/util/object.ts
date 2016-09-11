export default {
    deepSet(obj: Object, path: string, value: any) {
        let cpy = obj;
        let nodes = path.split('.');
        for (let i = 0, len = nodes.length; i < len; i++) {
            let attr = nodes[i];
            if (i === len - 1) {
                cpy[attr] = value;
            } else {
                cpy = cpy[attr];
            }
        }
    },

    createByProperties(props: Array<string>): any {
        let ret = Object.create(null);
        props.forEach((v) => {
            Object.defineProperty(ret, v, {});
        });
        return ret;
    },

    deepGet(obj: any, path: string): any {
        let nodes = path.split('.');
        return nodes.reduce((cur, node) => cur[node], obj);
    }
};
