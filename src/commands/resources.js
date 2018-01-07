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

function doThisAgain(commands) {
    return makeCommandsFromMultipleText(commands);
}

export const makeCommandsFromMultipleText = (commands) => {

    // First we create new commands for commands having multiple sentences possibles
    // First sentence && second sentence for command 'launch that'
    // Become First sentence => 'launch that'; Second sentence => 'launch that' (2 commands)
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

    // Then we create new commands for commands having optionnals words
    // Bring me a [good] tea will become
    // Bring me a good tea; Bring me a tea (2 commands)
    const waysToHaveOptionnalWord = /\[([^\]]+)]/;
    const patternToReplaceOptionnal = "pdbq";
    const commands3 = Object.keys(commands2).reduce((memo, key) => {

        const command = commands2[key];
        const resultsFromRegex = key.match(waysToHaveOptionnalWord);

        if(resultsFromRegex) {

            const toRemoveFromSentence = resultsFromRegex[0];
            const sentenceWithoutWord = key
                .replace(toRemoveFromSentence, patternToReplaceOptionnal);

            const simpleSentence = sentenceWithoutWord
                .replace(patternToReplaceOptionnal, '')
                .replace('  ', ' ');

            memo[simpleSentence] = command;

            const newSentence = sentenceWithoutWord
                .replace(patternToReplaceOptionnal, resultsFromRegex[1]);

            memo[newSentence] = command;

        } else {
            memo[key] = command;
        }

        return memo;
    }, {});

    // Then we create new commands for commands having multiple words in same sentence
    const waysToHaveMultipleWords = /\(([^)]+)\)/g;
    const patternToReplaceMultiple = "adbc";
    const commands4 = Object.keys(commands3).reduce((memo, key) => {

        const command = commands3[key];
        const resultsFromRegex = key.match(waysToHaveMultipleWords);

        if(resultsFromRegex) {

            resultsFromRegex.forEach(element => {

                const toRemoveFromSentence = element;
                const sentenceWithoutWords =
                    key.replace(toRemoveFromSentence, patternToReplaceMultiple);

                const waysToSay = element.replace('(', '').replace(')', '').split('|');

                waysToSay.forEach(way => {
                    memo[sentenceWithoutWords.replace(patternToReplaceMultiple, way)] = command;
                });
            });

        } else {
            memo[key] = command;
        }

        return memo;
    }, {});

    let needToDoThisAgain = false;

    Object.keys(commands4).forEach((key) => {
        if(key.match(waysToHaveMultipleWords) || key.match(waysToHaveOptionnalWord)) {
            needToDoThisAgain = true;
        }
    });

    if(needToDoThisAgain) {
        return doThisAgain(commands4);
    }

    const finalCommands = Object.keys(commands4).reduce((memo, key) => {
        memo[key] = commands4[key];
        memo[`Mia ${key}`] = commands4[key];
        return memo;
    }, {});

    return finalCommands;
};
