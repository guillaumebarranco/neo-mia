<template>
    <ul>
        <li v-for="playlist in playlists">
            <button v-on:click="launchPlaylist(playlist)">{{ playlist.title }}</button>
        </li>
    </ul>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        name: 'Playlists',

        data() {
            this.getPlaylists();
            return {
            };
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

</style>
