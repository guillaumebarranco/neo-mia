import { apiCommands, getSonerezhCommands } from './api';
import { audioCommands, customAudioCommands } from './audio';

export const test = '';

const commands: any[] = [];

function generateCommand(
  content: any,
  userSaid: any,
  type = 'audio',
  emotion = false
) {
  return {
    content,
    userSaid,
    type,
    emotion,
  };
}

function addCommandsFromObject(
  commandsObject: any,
  type = 'audio',
  emotion = false
) {
  Object.keys(commandsObject).forEach(key => {
    commands.push(generateCommand(commandsObject[key], key, type, emotion));
  });
}

export const getCommands = () =>
  new Promise(resolve => {
    addCommandsFromObject(audioCommands);
    addCommandsFromObject(customAudioCommands, 'audio', true);
    addCommandsFromObject(apiCommands, 'api');

    const promises = [getSonerezhCommands()];

    Promise.all(promises).then(response => {
      const sonerezhCommands = response[0];

      addCommandsFromObject(sonerezhCommands, 'api');

      resolve(commands);
    });
  });
