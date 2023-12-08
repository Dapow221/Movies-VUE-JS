<template>
<body>
  <div class="container">
<section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

        <div class="card mb-3">

          <div class="card-body">

            <div class="pt-4 pb-2">
              <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
              <p class="text-center small">Enter your username & password to login</p>
            </div>

            <form class="row g-3 needs-validation" novalidate @submit.prevent="submitHandler">

              <div class="col-12">
                <label for="yourUsername" class="form-label">Email</label>
                <div class="input-group has-validation">
                  <input v-model="email" type="text" name="username" class="form-control" id="yourUsername" required>
                  <div class="invalid-feedback">Please enter your email.</div>
                </div>
              </div>

              <div class="col-12">
                <label for="yourPassword" class="form-label">Password</label>
                <input v-model="password" type="password" name="password" class="form-control" id="yourPassword" required>
                <div class="invalid-feedback">Please enter your password!</div>
              </div>

              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
              </div>
              <div class="col-12">
                <button class="btn btn-primary w-100" type="submit">Login</button>
              </div>
              <div class="col-12">
                <p class="small mb-0">Don't have account? <a href="" @click.prevent="switchPage">Create an account</a></p>
              </div>
              <LoginGoogleVue @loginGoogle="loginGoogle"/>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
</body>
</template>

<script>
import LoginGoogleVue from '../components/LoginGoogle.vue'
export default {
  components: {
    LoginGoogleVue
  },

  data() {
    return {
      email: "",
      password: ""
    }
  },

  methods: {
    submitHandler() {
      this.$emit('submitHandler', this.email, this.password)
    },

    switchPage() {
      this.$emit('switchPage')
    },

    loginGoogle(response) {
      this.$emit('loginGoogle', response)
    }
  }
}
</script>

<style scoped>
body {
  background-image: url('https://w.forfun.com/fetch/3f/3f54ea50e0211f2d547d0a4177db208e.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}
</style>