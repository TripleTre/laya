export default {
    /**
     * @param obj 要测试的对象
     * @return 对象是否不为null并且不为undefined
     */
    isPresent(obj: Object): boolean {
        return obj !== undefined && obj !== null;
    },
    isAbsent(obj: Object): boolean {
        return obj === undefined || obj === null;
    },
    isEmpty(obj: Object): boolean {
        return Object.keys(obj).length === 0;
    },
    isNotEmpty(obj: Object): boolean {
        return Object.keys(obj).length !== 0;
    },
    isNumber(arg: any): boolean {
        return arg === +arg;
    }
};
