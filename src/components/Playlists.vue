<template>
    <div>
        <slot></slot>
        <ul v-if="!isFullScreen" class="not-fullscreen">
            <li v-for="playlist in playlists">
                <button v-on:click="launchPlaylist(playlist)">{{ playlist.title }}</button>
            </li>
        </ul>

        <div v-if="isFullScreen">
            <h1>Playlists</h1>

            <ul>
                <li v-for="playlist in playlists">
                    <button v-on:click="launchPlaylist(playlist)">{{ playlist.title }}</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: 'Playlists',

        props: ['isFullScreen'],

        data() {

            this.getPlaylists();
            return {};
        },

        computed: {
            ...mapGetters([
                'playlists',
            ]),
        },

        methods: {

            getPlaylists() {
                const miaSonerezehApi = "http://92.222.34.194:2612";

                fetch(`${miaSonerezehApi}/playlists`, {
                    method: 'GET',
                })
                .then(res => res.json())
                .then(res => {

                    this.$store.dispatch('getPlaylistsSuccess', res);
                });
            },

            launchPlaylist(playlist) {
                this.$store.dispatch('launchPlaylist', playlist.id);
            },
        },
    };

</script>

<style scoped>

    ul {
        padding: 10px;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }

    li {
        list-style: none;
        margin-left: 15px;
        margin-top: 15px;
    }

    button {
        border: none;
        width: 150px;
        padding: 10px 0;
        cursor: pointer;
    }

    .not-fullscreen button {
        width: 100px;
        height: 50px;
    }

</style>
