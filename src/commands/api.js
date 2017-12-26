export const test = "";

export const apiCommands = {

    'Musique': {
        apiUrl: 'http://92.222.34.194:2612/playlist',
        method: 'POST',
        data: {
            playlistId: 12,
            userId: 4,
            title: 'Stories',
        },
        successMessage: "Votre playlist a bien été lancée.",
    },
};
