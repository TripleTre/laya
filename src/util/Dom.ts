import Is from './Is';

export default{
    getChildren(ele: Element): Array<Element> {
        let child = ele.firstElementChild;
        let res   = [];
        if (Is.isAbsent(child)) {
            return res;
        }
        while (child !== ele.lastElementChild) {
            res.push(child);
            child = child.nextElementSibling;
        }
        res.push(child);
        return res;
    }
};
