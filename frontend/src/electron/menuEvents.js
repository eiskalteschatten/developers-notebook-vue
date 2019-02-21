import {ipcRenderer} from 'electron';

import eventBus from '../eventBus';
import router from '../router';


export default () => {
    ipcRenderer.on('open-route-name', (event, name, vars = {}) => {
        const route = router.app.$route;

        router.push({
            name,
            query: {
                ...route.query,
                ...vars.query
            },
            params: {
                ...route.params,
                ...vars.params
            }
        });
    });

    ipcRenderer.on('open-modal', (event, modal) => {
        eventBus.$emit('open-modal', modal);
    });
};
