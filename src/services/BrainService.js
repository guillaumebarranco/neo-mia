import { getCommands } from '../commands/index';
import store from '../store/index';

export const test = 'test';

export function cleanCommand(text) {

    let commandFormated = text.toLowerCase();
    commandFormated = commandFormated.replace(/-/g, ' ');
    commandFormated = commandFormated.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // remove accents
    commandFormated = commandFormated.replace(/!/g, '');
    commandFormated = commandFormated.replace(/\?/g, '');
    commandFormated = commandFormated.trim();

    return commandFormated;
}

function handleApiResponse(options) {

    return new Promise((resolve, reject) => {

        const fetchOptions = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            method: options.method,
        };

        if(options.method === 'POST') {
            fetchOptions.body = JSON.stringify(options.data);
        }

        fetch(options.apiUrl, fetchOptions)
        .then(res => res.json())
        .then(res => {

            if(res.status === 'success') {

                if(options.dispatcher) {

                    store.dispatch(options.dispatcher, {
                        successMessage: options.successMessage,
                        data: res.data,
                    });

                    reject('Tout va bien, don\'t worry !');

                } else {

                    resolve({
                        content: options.successMessage,
                        type: 'audio',
                    });
                }

            } else if(res.status && res.message) {

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

function rand(min, max) {
    return (Math.floor((max - min) * Math.random()) + min);
}

function returnRandomCommandFromArray(answers) {
    return answers[rand(0, answers.length)];
}

export function searchForMatchingAnswers(instructions, currentEmotion) {

    return new Promise((resolve, reject) => {

        getCommands().then(commands => {

            let commandFound = {
                userSaid: '',
                content: '',
                type: '',
            };

            // emotionless commands
            commands.filter(command => !command.emotion).forEach(command => {

                const commandMatch = cleanCommand(command.userSaid);

                if(instructions.includes(commandMatch)) {
                    commandFound = command;
                }
            });

            // emotionfull commands
            commands.filter(command => command.emotion).forEach(command => {

                const commandMatch = cleanCommand(command.userSaid);

                if(instructions.includes(commandMatch)) {

                    let content = "";

                    const emotionAnswers = command.content[currentEmotion];
                    console.log('emotionAnswers', emotionAnswers);

                    if(!emotionAnswers.length) {
                        content = command.content.default;
                    } else {
                        content = returnRandomCommandFromArray(emotionAnswers);
                    }

                    console.log(content);
                    commandFound = command;
                    commandFound.content = content;
                }
            });

            if(commandFound.type === 'api') {

                const options = commandFound.content;

                handleApiResponse(options)
                    .then(res => resolve(res))
                    .catch(err => reject(err));

            } else {
                resolve(commandFound);
            }
        });
    });
}
