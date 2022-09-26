import { render } from 'solid-js/web';

import Application from './Application';
import '../css/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import $ from 'jquery';

if ($(document).bind != null) {
    $(document).bind("contextmenu", function(e) {
        return false;
    });
}

render(() => <Application />, document.getElementById('root'));
