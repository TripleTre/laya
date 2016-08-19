import {World} from '../abstract/index';

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export interface AbstractSence {
    refs: Map<string, any>;
    getWorld(): World;
    preload(): void;
    destroy?(): void; // todo 暂时问号
}
