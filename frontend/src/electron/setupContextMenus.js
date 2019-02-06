import {ipcRenderer} from 'electron';

export default () => {
    document.oncontextmenu = event => {
        const tagName = event.target.tagName.toLowerCase();

        switch(tagName) {
            case 'input':
            case 'textarea':
                ipcRenderer.send('show-input-context-menu');
                break;
            default:
                ipcRenderer.send('show-general-context-menu');
        }
    };
};
