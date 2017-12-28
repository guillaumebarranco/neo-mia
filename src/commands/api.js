export const test = "";

const miaSonerezehApi = "http://92.222.34.194:2612"

export const apiCommands = {

    'Musique': {
        apiUrl: `${miaSonerezehApi}/playlist`,
        method: 'POST',
        data: {
            playlistId: 12,
            userId: 4,
            title: 'Stories',
        },
        successMessage: "Votre playlist a bien été lancée.",
    },
};

export const getSonerezhCommands = () => {

    fetch(`${miaSonerezehApi}/playlists`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(res => {

        const commands = {};

        res.forEach(el => {

            const commandText = `Playlist ${el.title}`;

            commands[commandText] = {
                apiUrl: `${miaSonerezehApi}/playlist`,
                method: 'POST',
                data: {
                    playlistId: el.id,
                    userId: el.user_id,
                    title: 'Stories',
                },
                successMessage: "Votre playlist a bien été lancée.",
            };
        });

        return commands;
    })
};
