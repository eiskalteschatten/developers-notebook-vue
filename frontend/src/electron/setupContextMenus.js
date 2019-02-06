import {ipcRenderer} from 'electron';


export default () => {
    document.oncontextmenu = event => {
        const tagName = event.target.tagName.toLowerCase();

        if (tagName === 'input' || tagName === 'textarea') {
            ipcRenderer.send('show-input-context-menu');
        }
    };
};
