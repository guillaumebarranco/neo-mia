import { audioCommands, customAudioCommands } from './audio';
import { apiCommands } from './api';

const commands = [];

Object.keys(audioCommands).forEach((key) => {

    commands.push({
        content: audioCommands[key],
        userSaid: key,
        type: 'audio',
        emotion: false,
    });
});

Object.keys(customAudioCommands).forEach((key) => {

    commands.push({
        content: customAudioCommands[key],
        userSaid: key,
        type: 'audio',
        emotion: true,
    });
});

Object.keys(apiCommands).forEach((key) => {

    commands.push({
        content: apiCommands[key],
        userSaid: key,
        type: 'api',
        emotion: false,
    });
});

export default commands;
