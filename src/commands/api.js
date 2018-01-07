import { makeCommandsFromMultipleText } from './resources';

export const test = "";

const miaSonerezehApi = "http://92.222.34.194:2612";
const miaMangaApi = "http://localhost:2812";

export const apiCommands = makeCommandsFromMultipleText({

    'Quels sont mes mangas (favoris|préférés) ? && Donne-moi mes mangas (favoris|préférés)': {
        apiUrl: `${miaMangaApi}/favourites`,
        method: 'GET',
        data: { },
        successMessage: "Vos mangas favoris sont ",
        dispatcher: "getFavouritesMangasSuccess",
    },
    'Quels sont les mangas au-dessus de {{min}}': {
        apiUrl: `${miaMangaApi}/highscores?min={{min}}`,
        method: 'GET',
        data: { },
        successMessage: "Les mangas au-dessus de {{min}} sont ",
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
});

function getMultipleSonerezhCommandText(title) {

    let text = `Playlist ${title}`;
    const playText = '(Mets|Envoies) (moi|nous)';

    switch(title.toLowerCase()) {

    case 'rap lourd': {
        text += ` && ${playText} du lourd !`;
        break;
    }

    case 'rap fun': {
        text += ` && ${playText} de la musique marrante !`;
        break;
    }

    case 'sexy': {
        text += ` && ${playText} quelque chose de sexy !`;
        break;
    }

    case 'golden age': {
        text += ` && ${playText} du bon [vieux] rap !`;
        break;
    }

    case 'rap posé': {
        text += ` && ${playText} du rap (posé|tranquille) !`;
        break;
    }

    default: {
        return text;
    }
    }

    return text;
}

export const getSonerezhCommands = () =>

    fetch(`${miaSonerezehApi}/playlists`, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {

        const commands = {};

        res.forEach(el => {

            const commandText = getMultipleSonerezhCommandText(el.title);

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

        return makeCommandsFromMultipleText(commands);
    })
;
