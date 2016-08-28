import {LayaGame} from './LayaInterface';

export interface AbstractSupportObjectConstructor {
    $$require: Array<string>;
    $$optional: Array<string>;
    new(game: LayaGame, require: any, optional: any): AbstractSupportObject;
}

export abstract class AbstractSupportObject {
    //
}
