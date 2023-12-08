<template>
    <form  class="mx-5" @submit.prevent="submitMovies">
          <div class="mb-3">
            <label for="product-name" style="color: white;"
              >Title <span class="text-danger fw-bold">*</span></label
            >
            <input
              v-model="title"
              type="text"
              class="form-control"
              id="product-name"
              placeholder="Enter movies title name"
              autocomplete="off"
              required
            />
          </div>
          <div class="mb-3">
            <label for="product-category" style="color: white;"
              >Genre <span class="text-danger fw-bold">*</span></label
            >
            <select 
            v-model="genreId" 
            class="form-select" 
            required
            >
              <option value="0" selected disabled>
                -- Select Genre --
              </option>
              <option v-for="genre in dataGenres" :value="genre.id">{{ genre.name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="product-desc" style="color: white;"
              >Synopsis
              <span class="text-danger fw-bold">*</span></label
            >
            <input
              v-model="synopsis"
              type="text"
              class="form-control"
              id="product-desc"
              placeholder="Enter movies synopsis"
              autocomplete="off"
              required
            />
          </div>
          <div class="mb-3">
            <label for="product-trailer" style="color: white;"
              >Trailer <span class="text-danger fw-bold">*</span></label
            >
            <input
              v-model="trailerUrl"
              type="text"
              class="form-control"
              id="product-trailer"
              placeholder="Enter movies trailer url"
              autocomplete="off"
              required
            />
          </div>
          <div class="mb-3">
            <label for="product-image" style="color: white;"
              >Image <span class="text-danger fw-bold">*</span></label
            >
            <input
              v-model="imgUrl"
              type="text"
              class="form-control"
              id="product-image"
              placeholder="Enter movies image url"
              autocomplete="off"
              required
            />
          </div>
          <div class="mb-3">
            <label for="product-image" style="color: white;"
              >Rating <span class="text-danger fw-bold">*</span></label
            >
            <input
              v-model="rating"
              type="text"
              class="form-control"
              id="product-rating"
              placeholder="Enter movies rating"
              autocomplete="off"
              required
            />
          </div>
          <div class="row mt-5 mb-3">
            <div class="col-6">
              <a
                class="btn btn-lg btn-light rounded-pill w-100 p-2"
                href=""
                >Cancel</a
              >
            </div>
            <div class="col-6">
              <button
                class="btn btn-lg btn-primary rounded-pill w-100 p-2"
                type="submit"
                href=""
              >
                Submit
              </button>
            </div>
          </div>
        </form>
</template>

<script>
    export default {
        props: ['dataGenres', 'dataMoviesEdit'],
        methods: {
          submitMovies() {
            const dataMovies = {
              title: this.title,
              synopsis: this.synopsis,
              genreId: this.genreId,
              trailerUrl: this.trailerUrl,
              imgUrl: this.imgUrl,
              rating: this.rating
            }
            this.$emit('submitMovies', dataMovies)
          }
        },

        data () {
          return {
            title: this.dataMoviesEdit.title,
            synopsis: this.dataMoviesEdit.synopsis,
            genreId: this.dataMoviesEdit.genreId,
            trailerUrl: this.dataMoviesEdit.trailerUrl,
            imgUrl: this.dataMoviesEdit.imgUrl,
            rating: this.dataMoviesEdit.rating
          }
        },
        
        created() {
            if(this.dataMoviesEdit.length === 0) {
                this.title = ""
                this.synopsis = ""
                this.genreId = 0
                this.trailerUrl = ""
                this.imgUrl = ""
                this.rating = null
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>