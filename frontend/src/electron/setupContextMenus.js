import {ipcRenderer} from 'electron';


function generalCm() {
    const selection = window.getSelection().toString();
    ipcRenderer.send('toggle-copy-general-cm', selection !== '' ? true : false);
    ipcRenderer.send('show-general-context-menu');
}

export default () => {
    document.oncontextmenu = event => {
        const tagName = event.target.tagName.toLowerCase();

        switch(tagName) {
            case 'input':
            case 'textarea':
                ipcRenderer.send('show-input-context-menu');
                break;
            default:
                generalCm();
        }
    };
};
