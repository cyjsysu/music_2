<template>
    <div class="test">
        test!!!!!!!!!!
        <span :class=cl>{{abc}}</span>
    </div>
</template>

<script>
    export default {
        name: "Test",
        props:['abc', 'cl'],
    }
</script>

<style scoped>
    .test{
        background-color: red;
    }
    .ig{
        background-color: #42b983;
    }
</style>