import { audioCommands, customAudioCommands } from './audio';
import { apiCommands, getSonerezhCommands } from './api';

export const test = "";

const commands = [];

function generateCommand(content, userSaid, type = 'audio', emotion = false) {

    return {
        content,
        userSaid,
        type,
        emotion,
    };
}

function addCommandsFromObject(commandsObject, type = 'audio', emotion = false) {

    Object.keys(commandsObject).forEach((key) => {
        commands.push(generateCommand(commandsObject[key], key, type, emotion));
    });
}

export const getCommands = () =>

    new Promise(resolve => {

        addCommandsFromObject(audioCommands);
        addCommandsFromObject(customAudioCommands, 'audio', true);
        addCommandsFromObject(apiCommands, 'api');

        const promises = [
            getSonerezhCommands(),
        ];

        Promise.all(promises).then(response => {

            const sonerezhCommands = response[0];

            addCommandsFromObject(sonerezhCommands, 'api');

            resolve(commands);
        });
    })
;
