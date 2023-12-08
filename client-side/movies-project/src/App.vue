<script>
import LoginPage from './pages/loginPage.vue'
import RegisterPage from './pages/registerPage.vue';
import DashboardPage from './components/dashboardPage.vue';
import MoviesPage from './components/moviesPage.vue';
import Navbar from './components/navbar.vue';
import GenresPage from './components/genresPage.vue';
import AddEdit from './components/AddEdit.vue';
import Histories from './components/histories.vue';
import TableRow from './components/tableRow.vue';
import EditMovies from './components/EditMovies.vue';
import axios from 'axios'

export default {
  components: {
    LoginPage,
    RegisterPage,
    DashboardPage,
    MoviesPage,
    Navbar,
    GenresPage,
    Histories,
    AddEdit,
    TableRow,
    EditMovies
  },

  data() {
    return {
      baseUrl: "https://moviesproject.dapow.online",
      email: "",
      password: "",
      page: "LoginPage",
      movies: [],
      genres: [],
      histories: [],
      moviesDashboard: "",
      moviesEdit: []
    }
  },

  methods: {
    async handlerLogin(email, password) {
      try {
        const response = await axios({
          url: this.baseUrl + "/login",
          method: "post",
          data: {
            email,
            password
          }
        })
        localStorage.setItem("access_token", response.data.access_token)
        Toastify({
          text: "Congratulations, you have logged in",
          duration: 3000
        }).showToast()
        this.page = 'DashboardPage'
        this.fetchDashboard()
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    },

    async handlerRegist(username, email, password, phoneNumber, address) {
      console.log(username, email, password, phoneNumber, address)
      try {
        const response = await axios({
          url: this.baseUrl + "/register",
          method: "post",
          data: {
            username,
            email,
            password,
            phoneNumber,
            address
          }
        })
        this.page = 'LoginPage'
        Toastify({
          text: "Congratulations, you have registered",
          duration: 3000
        }).showToast()
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    },

    async fetchMovies() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "/movies",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.movies = data
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()

      }
    },

    async fetchGenres() {
      try {
        const { data } = await axios({
          url: this.baseUrl + "/genres",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })

        this.genres = data

      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    },

    async fetchHistories() {
      try {
        console.log("ini fetch")
        const { data } = await axios({
          url: this.baseUrl + "/histories",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.histories = data
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    },

    async changeStatus(status, id) {
      try {
        const response = await axios({
          url: this.baseUrl + "/movies/" + id,
          method: "patch",
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            status
          }
        })
        this.page = 'MoviesPage'
        this.fetchMovies()
        Toastify({
          text: `Done change status please check histories for new update status`,
          duration: 3000
        }).showToast()
      } catch (error) {
        Toastify({
          text: `Cannot update movie with id ${id} because you're not admin`,
          duration: 3000
        }).showToast()
      }
    },

    switchRegister() {
      this.page = 'RegisterPage'
    },

    switchLogin() {
      this.page = 'LoginPage'
    },

    switchPage(value) {
      if (value === 'AddEdit') {
        this.moviesEdit = []
      }
      this.page = value
    },

    async fetchDashboard() {
      try {
        const dataMovies = await axios({
          url: this.baseUrl + "/movies",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })

        const dataGenres = await axios({
          url: this.baseUrl + "/genres",
          method: "get",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })

        this.moviesDashboard = { movies: dataMovies.data.length, genres: dataGenres.data.length }
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    },

    async addMovies(dataMovies) {
      try {
        const addMovies = await axios({
          url: this.baseUrl + "/movies",
          method: "post",
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: dataMovies
        })
        Toastify({
          text: "Done add movies, please check movie list",
          duration: 3000
        }).showToast()
        this.fetchMovies()
        this.page = "MoviesPage"
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    },

    async putMovies(dataMovies, id) {
      console.log(dataMovies, id)
      try {
        const putMovies = await axios({
          url: this.baseUrl + "/movies/" + id,
          method: "put",
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: dataMovies
        })

        this.fetchMovies()
        this.page = "MoviesPage"
        Toastify({
          text: `done edit movies from id ${id}`,
          duration: 3000
        }).showToast()
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    },

    logouts() {
      localStorage.removeItem('access_token')
      Toastify({
          text: "you have logged out",
          duration: 3000
        }).showToast()
      this.page = 'LoginPage'
    },

    findMoviesById(page, id) {
      const movies = this.movies.find(el => {
        if (el.id === id) {
          return el
        }
      })
      this.moviesEdit = movies
      this.page = page
    },

    async loginGoogle(response) {
      try {
        const { data } = await axios({
          url: this.baseUrl + "/google-login",
          method: "post",
          headers: {
            google_token: response.credential
          }
        })
        localStorage.setItem("access_token", data)
        Toastify({
          text: "Congratulations, you have logged in",
          duration: 3000
        }).showToast()
        this.page = 'DashboardPage'
        this.fetchDashboard()
      } catch (error) {
        Toastify({
          text: `${error.response.data.message}`,
          duration: 3000
        }).showToast()
      }
    }

  },

  created() {
    if (localStorage.access_token) {
      this.page = 'DashboardPage'
      this.fetchDashboard()
      this.fetchMovies()
      this.fetchGenres()
      this.fetchHistories()
    }
  }

}

</script>

<template>
  <div>
    <Navbar v-if="page !== 'LoginPage' && page !== 'RegisterPage'" @clickAddMovies="switchPage" @logout="logouts"
      @MoviesPage="switchPage" @GenresPage="switchPage" @HistoriesPage="switchPage" @DashboardPage="switchPage"/>
    <LoginPage v-if="page === 'LoginPage'" @submitHandler="handlerLogin" @switchPage="switchRegister"
      @loginGoogle="loginGoogle" />
    <RegisterPage v-if="page === 'RegisterPage'" @submitRegist="handlerRegist" @switchPage="switchLogin" />
    <DashboardPage v-if="page === 'DashboardPage'" @MoviesPage="switchPage" :dataDashboard="moviesDashboard"
      @viewData="switchPage" />
    <MoviesPage v-if="page === 'MoviesPage'" :dataMovies="movies" @changeStatus="changeStatus"
      @addEdit="findMoviesById" />
    <GenresPage v-if="page === 'GenresPage'" :dataGenres="genres" />
    <Histories v-if="page === 'HistoriesPage'" :dataHistories="histories" @fetchHistories="fetchHistories" />
    <AddEdit v-if="page === 'AddEdit'" :dataGenres="genres" @submitMovies="addMovies" :dataMoviesEdit="moviesEdit" />
    <EditMovies v-if="page === 'EditMovies'" :dataGenres="genres" @submitMovies="putMovies"
      :dataMoviesEdit="moviesEdit" />
  </div>
</template>


<style lang="scss" scoped></style>
