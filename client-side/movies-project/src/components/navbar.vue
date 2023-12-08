<template>
     <nav
        class="navbar navbar-expand-lg navbar-dark bg-dark text-light sticky-top"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="" @click="clickHomePage('DashboardPage')">Dapow Movies</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="" @click.prevent="clickListMovies('MoviesPage')">Movie List</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="" @click.prevent="clickListGenres('GenresPage')">Genres List</a>
              </li>
              <li class="nav-item">
                <a  class="nav-link" href="" @click.prevent="clickAddMovies('AddEdit')">Add Movies</a>
              </li>
              <li class="nav-item">
                <a  class="nav-link" href="" @click.prevent="clickHistories('HistoriesPage')">Histories</a>
              </li>
                <li class="nav-item ml-auto">
                  <a type="button" class="btn btn-info" href="" @click.prevent="logout">Logout</a>
                </li>
              </ul>
          </div>
        </div>
      </nav>
</template>

<script>
    export default {
        emits: [
          'MoviesPage', 'clickAddMovies', 'logout', 'HistoriesPage', 'GenresPage'
        ],
        methods: {
            clickListMovies(value) {
                this.$emit('MoviesPage', value)
            },
            clickAddMovies(value) {
                this.$emit('clickAddMovies', value)
            },
            clickListGenres(value) {
                this.$emit('GenresPage', value)
            },
            clickHistories(value) {
                this.$emit('HistoriesPage', value)
            },
            clickHomePage(value) {
                this.$emit('DashboardPage', value)
            },
            logout() {
                this.$emit('logout')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>