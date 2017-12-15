import { audioCommands, customAudioCommands } from './audio';

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

export default commands;
