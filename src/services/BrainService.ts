import { Command, CommandContent } from '@/models/command';

import { getCommands } from '../commands/index';
import { customIncludes } from '../commands/resources';
import store from '../store/index';

export const test = 'test';

export function cleanCommand(text: string): string {
  let commandFormated = text.toLowerCase();
  commandFormated = commandFormated.replace(/-/g, ' ');
  commandFormated = commandFormated
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // remove accents
  commandFormated = commandFormated.replace(/!/g, '');
  commandFormated = commandFormated.replace(/\?/g, '');
  commandFormated = commandFormated.trim();

  return commandFormated;
}

function handleApiResponse(options: any) {
  return new Promise((resolve, reject) => {
    const fetchOptions: any = {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: options.method,
    };

    if (options.method === 'POST') {
      fetchOptions.body = JSON.stringify(options.data);
    }

    fetch(options.apiUrl, fetchOptions)
      .then((res: any) => res.json())
      .then((res: any) => {
        if (res.status === 'success') {
          if (options.dispatcher) {
            store.dispatch(options.dispatcher, {
              successMessage: options.successMessage,
              data: res.data,
            });

            reject("Tout va bien, don't worry !");
          } else {
            resolve({
              content: options.successMessage,
              type: 'audio',
            });
          }
        } else if (res.status && res.message) {
          resolve({
            content: res.message,
            type: 'audio',
          });
        } else {
          reject({
            content: 'Un problème est survenu.',
            type: 'audio',
          });
        }
      });
  });
}

function rand(min: number, max: number) {
  return Math.floor((max - min) * Math.random()) + min;
}

function returnRandomCommandFromArray(answers: any[]): any {
  return answers[rand(0, answers.length)];
}

export function searchForMatchingAnswers(
  instructions: string[],
  currentEmotion: string
): Promise<Command> {
  return new Promise((resolve, reject) => {
    getCommands().then((commands: any) => {
      console.log('commands', commands);

      let commandFound: Command = {
        userSaid: '',
        content: {
          apiUrl: '',
          successMessage: '',
        },
        type: '',
      };

      // emotionless commands
      commands
        .filter((command: any) => !command.emotion)
        .forEach((command: any) => {
          const commandMatch: any = cleanCommand(command.userSaid);
          const response: any = customIncludes(instructions, commandMatch);

          if (response) {
            commandFound = command;

            if (response !== true && commandFound.type === 'api') {
              commandFound.content.apiUrl = commandFound.content.apiUrl.replace(
                response.variableToReplace,
                response.value
              );

              commandFound.content.successMessage = commandFound.content.successMessage.replace(
                response.variableToReplace,
                response.value
              );
            }
          }
        });

      // emotionfull commands
      commands
        .filter((command: any) => command.emotion)
        .forEach((command: any) => {
          const commandMatch = cleanCommand(command.userSaid);
          const response = customIncludes(instructions, commandMatch);

          if (response) {
            let content: CommandContent;

            const emotionAnswers = command.content[currentEmotion];

            if (!emotionAnswers.length) {
              content = command.content.default;
            } else {
              content = returnRandomCommandFromArray(emotionAnswers);
            }

            commandFound = command;
            commandFound.content = content;
          }
        });

      if (commandFound.type === 'api') {
        const options = commandFound.content;

        handleApiResponse(options)
          .then((res: any) => resolve(res))
          .catch((err: any) => reject(err));
      } else {
        resolve(commandFound);
      }
    });
  });
}

export function playPlaylist(playlistId: number) {
  return new Promise((resolve: any) => {
    getCommands().then((commands: any) => {
      let launched = false;

      commands.forEach((command: any) => {
        if (
          command.type === 'api' &&
          command.content.data &&
          command.content.data.playlistId &&
          command.content.data.playlistId === playlistId &&
          !launched
        ) {
          launched = true;

          handleApiResponse(command.content).then((res: any) => resolve(res));
        }
      });
    });
  });
}
