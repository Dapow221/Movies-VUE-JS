<template>
   <section>
          <div class="col-12 table-responsive">
            <table class="table table-striped">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(genre, index) in dataGenres">
                <TableRow :genre="genre" :index="index" page = 'genres'/>
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
          dataGenres: String
        },

        components: {
            TableRow
        }
    }
</script>

<style lang="scss" scoped>

</style>