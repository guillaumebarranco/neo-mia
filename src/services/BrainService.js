import commands from '../commands/index';

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

function rand(min, max) {
    return (Math.floor((max - min) * Math.random()) + min);
}

function returnRandomCommandFromArray(answers) {
    return answers[rand(0, answers.length)];
}

export function searchForMatchingAnswers(instructions, currentEmotion) {

    return new Promise((resolve, reject) => {

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

            console.log('options', options);

            fetch(options.apiUrl, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                method: options.method,
                body: JSON.stringify(options.data),
            })
            .then(res => res.json())
            .then(res => {

                if(res.status === 'success') {

                    resolve({
                        content: options.successMessage,
                        type: 'audio',
                    });

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

        } else {
            resolve(commandFound);
        }
    });
}
