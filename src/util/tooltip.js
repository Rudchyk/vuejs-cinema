import { addClass, removeClass } from './helpers.js';

let mouseOverHandler = (e) => {
        let span = e.target.parentNode.getElementsByTagName('span')[0];
        addClass(span, 'tooltip-show');
    },
    mouseOutHandler = (e) => {
        let span = e.target.parentNode.getElementsByTagName('span')[0];
        removeClass(span, 'tooltip-show');
    };

export default {
    install(Vue) {
        Vue.directive('tooltip', {
            bind(el, bindings) {
                let span = document.createElement('span'),
                    text = document.createTextNode(`Seats available: ${bindings.value.seats}`);
                span.appendChild(text);
                addClass(span, 'tooltip');
                el.appendChild(span);
                let div = el.getElementsByTagName('div')[0];
                div.addEventListener('mouseover', mouseOverHandler);
                div.addEventListener('mouseout', mouseOutHandler);
                div.addEventListener('touchstart', mouseOverHandler);
                div.addEventListener('touchend', mouseOutHandler);
            },
            undind(el) {
                let div = el.getElementsByTagName('div')[0];
                div.removeEventListener('mouseover', mouseOverHandler);
                div.removeEventListener('mouseout', mouseOutHandler);
                div.removeEventListener('touchstart', mouseOverHandler);
                div.removeEventListener('touchend', mouseOutHandler);
            }
        });
    }
}