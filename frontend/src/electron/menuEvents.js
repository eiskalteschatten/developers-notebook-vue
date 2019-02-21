import {ipcRenderer} from 'electron';

import eventBus from '../eventBus';
import router from '../router';


export default () => {
    ipcRenderer.on('open-route-name', (event, name, { query, params }) => {
        router.push({ name, query, params });
    });

    ipcRenderer.on('open-modal', (event, modal) => {
        eventBus.$emit('open-modal', modal);
    });
};
