export const customIncludes = (userSaid, commandUserSaid) => {

    if(userSaid.includes(commandUserSaid)) {
        return true;
    }

    const waysToHaveVariables = /{{\s*[\w.]+\s*}}/g;
    const variablesInCommand = commandUserSaid.match(waysToHaveVariables);

    if(!variablesInCommand) {
        return false;
    }

    let finalValue = false;

    userSaid.forEach(sentence => {

        const words = sentence.split(' ');

        words.forEach(word => {

            if(sentence.replace(word, variablesInCommand[0]).includes(commandUserSaid)) {
                finalValue = {
                    variableToReplace: variablesInCommand[0],
                    value: word,
                };
            }
        });
    });

    return finalValue;
};

export const makeCommandsFromMultipleText = (commands) => {

    const waysToSayPattern = ' && ';

    const commands2 = Object.keys(commands).reduce((memo, key) => {

        const command = commands[key];

        if(key.includes(waysToSayPattern)) {
            const waysToSay = key.split(waysToSayPattern);
            waysToSay.forEach(way => { memo[way] = command; });
        } else {
            memo[key] = command;
        }

        return memo;
    }, {});

    const waysToHaveMultipleWords = /\((.*)\)\((.*)\)/;
    const patternToReplace = "adbc";

    const commands3 = Object.keys(commands2).reduce((memo, key) => {

        const command = commands2[key];
        const resultsFromRegex = key.match(waysToHaveMultipleWords);

        if(resultsFromRegex) {

            const toRemoveFromSentence = resultsFromRegex[0];
            const sentenceWithoutWords = key.replace(toRemoveFromSentence, patternToReplace);

            const waysToSay = [];

            for (let i = 0; i < resultsFromRegex.length; i++) {
                if(i !== 0) waysToSay.push(resultsFromRegex[i]);
            }

            waysToSay.forEach(way => {
                memo[sentenceWithoutWords.replace(patternToReplace, way)] = command;
            });
        } else {
            memo[key] = command;
        }

        return memo;
    }, {});

    return commands3;
};
