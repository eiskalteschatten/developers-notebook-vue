import {ipcRenderer} from 'electron';

import eventBus from '../eventBus';
import router from '../router';


export default () => {
    ipcRenderer.on('open-route-name', (event, name) => {
        router.push({ name });
    });

    ipcRenderer.on('open-modal', (event, modal) => {
        eventBus.$emit('toggle-modal', modal);
    });
};
