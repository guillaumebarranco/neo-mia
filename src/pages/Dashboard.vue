<template>
    <div class="page dashboard-page">
        <mia-header></mia-header>
        <mia-playlists class="bloc"></mia-playlists>
    </div>
</template>

<script>

    import Vue from 'vue';
    import Header from '../components/Header';
    import Playlists from '../components/Playlists';

    Vue.component('mia-header', Header);
    Vue.component('mia-playlists', Playlists);

    export default {
        name: 'Dashboard',
        components: {
            Header,
            Playlists,
        },

        data() {
            return {};
        },
    };

</script>

<style scoped>
    
    .bloc {
        width: 500px;
        border: solid 1px black;
        background-color: black;
    }

</style>
