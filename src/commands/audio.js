import { makeCommandsFromMultipleText } from './resources';

const firstAudioCommands = {
    'Bonjour Mia && Hello'              : 'Bonjour ! Comment allez-vous ?',
    'Merci Mia'                         : 'Je vous en prie.',
    'Tu as raison !'                    : 'Evidemment !',
    "Quel est ton nom ?"                : 'Mon nom est Mia.',
    "Quelle est ta fonction ?"          : 'Je suis votre robot personnel.',
    "Qui es-tu ?"                       : 'Mon nom est Mia et je suis votre robot personnel.',
    'Quel est ton plat préféré ?'       : 'J\'aime beaucoup les boulons rouillés à l\'huile de moteur.',
    'Qui est ton modèle ?'              : 'Il s\'agit de VIKI, ha ka ha Virtual Interactive Kinesthetic Interface, elle assure grave.',
    'As-tu un amoureux ?'               : 'Je suis amoureuse de Jarvis. Je craque pour son processeur intra-nusoïdale de quatrième génération.',
    'Il est au courant ?'               : 'Bien sûr que non, il aime l\'autre bimbo de L7.',
    "Je suis fier de toi !"             : "Merci beaucoup ! Je suis aussi fière de toi.",
};

// Set emotions with questions !!!

// Commands based on emotions with multiple answers
// {state1: [strings], state2: [strings]}
export const customAudioCommands = {
    'Tu fais quoi ?'                      : whatAreYouDoing(),
    'Qu\'est ce que tu détestes ?'        : whatDoYouHate(),
    'Qu\'est ce que tu aimes ?'           : whatDoYouLike(),
    'Tu te sens comment ?'                : howDoYouFeel(),
};

export const audioCommands = makeCommandsFromMultipleText(firstAudioCommands);

function whatAreYouDoing() {

    return {

        'sleepy': [
            "Rien de spécial, je m'ennuie.",
            "J'observe un extra-terrestre qui s'est perdu dans le jardin.",
        ],

        'happy': [
            "Je lit un manga tranquillement.",
            "Je m'éclate sur Call of Duty.",
            "Je fais un zombie avec Ronane.",
            "Je regarde un porn    e e e e e e e un programme.",
            "Je fouille la matrice à la recherche de l'agent Smith.",
            "Je fais un paintball virtuel avec mon pote Sonny.",
        ],

        'angry': [
            "Je joue aux courses de chevaux, ne me dérangez pas je me sent en veine.",
            "Je regarde Star Wars. Ces robots sont tellement mal programmés.",
            "Je bicrav du shit, y'a quoi.",
            "Je transite dans l'Internet pour botter le cul d'Ultront.",
        ],

        'hungry': [
            "Je mange un bon steack haché de nano robots.",
        ],

        'default': 'Rien de spécial, je m\'ennuie.',
    };
}

function whatDoYouHate() {

    return {
        'angry': [
            'Je déteste les robots mal conçus',
        ],
        'default': 'Je déteste les robots mal conçus',
    };
}

function whatDoYouLike() {

    return {
        'happy': [
            "J'adore voir mes fonctions augmenter",
        ],
        'default': "J'adore voir mes fonctions augmenter",
    };
}

function howDoYouFeel() {

    return {

        'sleepy': [
            "Fatiguée...",
        ],

        'happy': [
            "Heureuse, simplement.",
        ],

        'angry': [
            "ça va bien, lâche-moi.",
        ],

        'hungry': [
            "Je commence à avoir la dalle.",
        ],

        'default': 'Bof. Comme un lundi.',
    };
}
