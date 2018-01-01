export const test = "";
export const makeCommandsFromMultipleText = (commands) => {

    const waysToSayPattern = ' && ';

    return Object.keys(commands).reduce((memo, key) => {

        const command = commands[key];

        if(key.includes(waysToSayPattern)) {
            const waysToSay = key.split(waysToSayPattern);
            waysToSay.forEach(way => { memo[way] = command; });
        } else {
            memo[key] = command;
        }

        return memo;
    }, {});
};
