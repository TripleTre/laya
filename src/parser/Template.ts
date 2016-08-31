/**
 * 包含了解析 template 字符串的函数.
 */
import {ComponentNode} from '../ctrl/ComponentManager';
import {expToFunction, expressionVars} from './Expression';
import {ParsedDirective} from '../ctrl/DirectiveManager';
import Dom from '../util/Dom';

/**
 * 将Dom Elment 转换成 ComponentNode 
 */
export function elementToComponentNode(ele: Element): ComponentNode {
    let res:        ComponentNode    = Object.create(null);
    let attrs:      NamedNodeMap     = ele.attributes;
    let normals:    Array<{name: string,
                           value: (context) => any}>
                                     = Array.prototype.filter.call(attrs, (v) => !/^l-/.test(v.name))
                                          .map(({name: attrName, value: attrValue}) => {
                                              return {
                                                  name: attrName,
                                                  value: expToFunction(attrValue)
                                              };
                                          });
    let children:   Array<Element>   = Dom.getChildren(ele);
    let phaserCons: string           = ele.nodeName.replace(/^\w/, (a)        => a.toUpperCase())
                                                   .replace(/\-([a-z])/g, (a: string, b: string) => {
                                                        return b.toUpperCase();
                                                    });
    let directives: Array<ParsedDirective> = Array.prototype.filter.call(attrs, (v) => /^l-/.test(v.name))
                                          .map(({name, value}): ParsedDirective => {
                                              let directive = parseDirective(name);
                                              let vars = expressionVars(value).map(v => {
                                                  return v.replace(/\..*/, '');
                                              });
                                              return {
                                                  name: directive.name,
                                                  argument: directive.argument,
                                                  value: expToFunction(value, vars),
                                                  triggers: vars
                                              };
                                          });
    res.normals    = normals;
    res.children   = children.map(v => elementToComponentNode(v));
    res.directives = directives;
    res.name       = phaserCons;
    return res;
}

export function parseDirective(name: string): {name: string, argument: string} {
    let dn;
    let da;
    try {
        dn = name.match(/^l-([a-z]+)/)[1];
        da = name.replace(/^l-[a-z]+/, '')
                    .replace('-', '')
                    .replace(/\-([a-z])/g, (a: string, b: string) => {
                        return b.toUpperCase();
                    });
    } catch (e) {
        console.error('指令格式有誤: ', name, e);
    }
    return {name: dn, argument: da};
}
