import {World} from '../abstract/index';

interface AbstractSenceConstructor {
    new (): AbstractSence;
}

interface AbstractSence {
    getWorld(): World;
    preload(): void;
    destroy?(): void; // todo 暂时问号
}

export {AbstractSenceConstructor, AbstractSence};
