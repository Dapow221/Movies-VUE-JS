<template>
    <br/>
    <section>
          <div class="col-12 table-responsive">
            <table class="table table-striped">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col" width="180px">Image</th>
                  <th scope="col" width="100px">Synopsis</th>
                  <th scope="col">Trailer</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Author</th>
                  <th scope="col" width="50px">Status</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(movie, index) in dataMovies">
                <TableRow :movie="movie" :index="index" page = 'movies' @changeStatus="changeStatus" @addEdit="addEdit"/>
              </tr>
              </tbody>
            </table>
          </div>
        </section>
</template>

<script>
    import TableRow from './tableRow.vue';

    export default {
        props: {
          dataMovies: String, 
        },
        components: {
            TableRow
        },
        methods: {
            changeStatus(status, id) {
                this.$emit('changeStatus', status, id)
            },

            addEdit(page, id) {
                this.$emit('addEdit', page, id)
            }

        }
    }
</script>

<style scoped>

</style>