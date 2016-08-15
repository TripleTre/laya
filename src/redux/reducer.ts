import {AbstractComponent, AbstractComponentConstructor} from '../component/AbstractComponent';

declare var require;
var objectAssign = require('object-assign');

function convert(map: Map<string, Map<AbstractComponent, any>>): any {
    
}

export function initState(state = Object.create(null), action: {type: string, initValue: any}): any {
    switch (action.type) {
        case 'init-state':
            return objectAssign(action.initValue);
        default:
            return state;
    }
}
