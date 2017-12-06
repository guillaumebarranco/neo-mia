<template>
    <div class="hello">
        <mia-header></mia-header>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>

    import Vue from 'vue';
    import MiaHeader from './MiaHeader';

    Vue.component('mia-header', MiaHeader);

    export default {
        name: 'HelloWorld',
        components: {
            MiaHeader,
        },

        data() {
            return {
                msg: 'Mia',
            };
        },
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

</style>
