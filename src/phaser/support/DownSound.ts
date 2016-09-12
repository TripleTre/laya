import Sound from './Sound';
import support from '../../decorators/Support';

@support({
    require: ['key'],
    optional: ['volumn', 'loop'],
    name: 'DownSound'
})
export default class DownSound extends Sound {
}
