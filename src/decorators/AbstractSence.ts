import {World} from '../abstract/index';

export interface AbstractSenceConstructor {
    new (): AbstractSence;
}

export interface AbstractSence {
    getId(): number;
    getWorld(): World;
    preload(): void;
    destroy?(): void; // todo 暂时问号
}
