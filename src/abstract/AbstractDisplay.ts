import {LayaGame} from './LayaInterface';

export interface AbstractDisplayObjectConstructor {
    $$require: Array<string>;
    $$optional: Array<string>;
    new(game: LayaGame, require: any, optional: any): AbstractDisplayObject;
}

export abstract class AbstractDisplayObject {
    abstract getRealObject<T>(): T;
    abstract destroy(): void;
}
