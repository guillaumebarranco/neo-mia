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
    return (Math.floor((max-min)*Math.random())+min);
}

function returnRandomCommandFromArray(answers) {
    return answers[rand(0, answers.length)];
}

export function searchForMatchingAnswers(instructions, currentEmotion) {

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

    return commandFound;
}
