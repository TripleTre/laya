import Bind from '../decorators/directive/Bind';
import Ref from '../decorators/directive/Ref';
import Application from './Application';

let app = window['_app'] = new Application();
app.setupDirective(Bind);
app.setupDirective(Ref);

export default app;
