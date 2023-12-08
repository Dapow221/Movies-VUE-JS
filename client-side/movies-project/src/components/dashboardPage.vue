<template>
    <div class="container-fluid text-light" style="height: 75vh">
              <div
                id="carouselExampleCaptions"
                class="carousel slide"
                data-bs-ride="carousel"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src="https://www.pcworld.pl/g1/news/thumb/4/0/401746"
                      class="d-block w-100"
                      alt="image"
                      style="height: 500px; object-fit: cover"
                    />
                    <div class="carousel-caption d-md-block">
                      <h5>Strangers Things</h5>
                      <p>
                        When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img
                      src="https://media.unboxholics.com/media/source/Articles/102477/images/socialMediaImage/you-netflix.webp"
                      class="d-block w-100"
                      alt="image2"
                      style="height: 500px; object-fit: cover"
                    />
                    <div class="carousel-caption d-md-block">
                      <h5>YOU</h5>
                      <p>
                        The series follows a dangerously charming, intensely obsessive young man who goes to extreme measures to insert himself into the lives of those he is transfixed by.
                      </p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img
                      src="https://arynews.tv/wp-content/uploads/2022/03/peaky-blinders.jpg"
                      class="d-block w-100"
                      alt="image3"
                      style="height: 500px; object-fit: cover"
                    />
                    <div class="carousel-caption d-md-block">
                      <h5>Peaky Blinders</h5>
                      <p>
                        A notorious gang in 1919 Birmingham, England, is led by the fierce Tommy Shelby, a crime boss set on moving up in the world no matter the cost.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
        </div>
        <div class="container mt-2">
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">{{ dataDashboard.movies }}</h6>
                  <p class="card-text">Total Movies</p>
                </div>
                <div class="card-footer" @click="viewData('MoviesPage')">
                  <Button reusableButton="View Movies"/>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card">
                <div class="card-body">
                  <h6 class="card-title">{{ dataDashboard.genres }}</h6>
                  <p class="card-text">Total Genres</p>
                </div>
                <div class="card-footer" @click="viewData('GenresPage')">
                  <Button reusableButton="View Genres"/>
                </div>
              </div>
            </div>
          </div>
        </div>
<FooterPage/>
</template>

<script>
    import FooterPage from './footerPage.vue';
    import Button from './button.vue';

    export default {
        props: {
          dataDashboard: String,
        },
        components: {
            FooterPage,
            Button
        },
        methods: {
          viewData(value) {
            this.$emit('viewData', value)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>