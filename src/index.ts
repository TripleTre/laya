import {Bind,
        Ref} from './decorators/directive/index';
import Application from './ctrl/Application';
import {data,
        sence} from './decorators/index';

let app = new Application();

app.setupDirective(Bind);
app.setupDirective(Ref);

export default app;

export {
    data,
    sence
};
