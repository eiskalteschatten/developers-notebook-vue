'use strict';


const template = [
    {
        role: 'copy'
    }
];

if (process.platform === 'darwin') {
    template.push(
        {type: 'separator'},
        {
            label: 'Speech',
            submenu: [
                {role: 'startspeaking'},
                {role: 'stopspeaking'}
            ]
        }
    );
}

module.exports = template;
