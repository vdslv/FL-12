import {currentPlayer, human1, human2} from './game';

function underline() {
    if (currentPlayer) {
        human2.parentElement.style.textDecoration = 'underline';
        human1.parentElement.style.textDecoration = 'none';
    } else {
        human1.parentElement.style.textDecoration = 'underline';
        human2.parentElement.style.textDecoration = 'none';
    }
}

underline();

export {underline}
