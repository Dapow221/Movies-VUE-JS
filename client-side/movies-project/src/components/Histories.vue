<template>
    <div class="col-12 table-responsive">
            <table class="table table-striped">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Updated By</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(histories, index) in dataHistories">
                <TableRow :histories="histories" :index="index" page = 'histories'/>
              </tr>
              </tbody>  
            </table>
          </div>
</template>

<script>
    import TableRow from './tableRow.vue';
    export default {
        components: {
            TableRow,
        },

        props: {
            dataHistories: String
        },

        created() {
            this.$emit("fetchHistories")
        }
    }
</script>

<style lang="scss" scoped>

</style>