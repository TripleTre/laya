import {expressionVars} from '../../src/util/LayaParse';
import {expect} from 'chai';

describe('expressionVars 提取表达式中的变量:', () => {
    it('数字字面量', () => {
        let result = expressionVars('12');
        expect(result).to.be.instanceof(Array);
        expect(result).to.be.empty;
    });
    it('字符串字面量', () => {
        let result = expressionVars('"laya"');
        expect(result).to.be.instanceof(Array);
        expect(result).to.be.empty;
    });
    it('boolean', () => {
        let result = expressionVars('true || false');
        expect(result).to.be.instanceof(Array);
        expect(result).to.be.empty;
    });
    it('复杂表达式', () => {
        let exp = '"laya" + laya / NaN * Infinity === abc ? var$1 : var_2'
        let result = expressionVars(exp);
        expect(result).to.have.lengthOf(4);
        expect(result).to.include.members(['laya', 'abc', 'var$1', 'var_2']);
    });
});
