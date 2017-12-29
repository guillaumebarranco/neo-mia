export const test = "";

const miaSonerezehApi = "http://92.222.34.194:2612";
const miaMangaApi = "http://92.222.34.194:2812";

export const apiCommands = {

    'Quels sont mes mangas favoris ?': {
        apiUrl: `${miaMangaApi}/mangas/all`,
        method: 'GET',
        data: { },
        successMessage: "Vos mangas favoris sont ",
        dispatcher: "getFavouritesMangasSuccess",
    },

    'Musique': {
        apiUrl: `${miaSonerezehApi}/playlist`,
        method: 'POST',
        data: {
            playlistId: 12,
            userId: 4,
            title: 'Stories',
        },
        successMessage: "Votre playlist a bien été lancée.",
        dispatcher: null,
    },
};

export const getSonerezhCommands = () =>

    fetch(`${miaSonerezehApi}/playlists`, {
        method: 'GET',
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
                successMessage: `Votre playlist ${el.title} a bien été lancée.`,
                dispatcher: null,
            };
        });

        return commands;
    })
;
