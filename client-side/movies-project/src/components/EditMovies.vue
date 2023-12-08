<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h3 class="mx-5" style="color: white;">Edit Current Movies</h3>
    </div>
    <div class="md-5">
      <div class="col-12 col-md-6">
        <Form :dataMoviesEdit="dataMoviesEdit" :dataGenres="dataGenres" @submitMovies="submitMovies"/>
      </div>
    </div>
</template>

<script>
    import Form from './Form.vue';
    
    export default {
        components: {
            Form
        },
        props: ['dataGenres', 'dataMoviesEdit'],
        methods: {
          submitMovies(dataMovies) {
            this.$emit('submitMovies', dataMovies, this.dataMoviesEdit.id)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>