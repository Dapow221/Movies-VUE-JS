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
                                    <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                                    <p class="text-center small">Enter your personal details to create account</p>
                                </div>

                                <form class="row g-3 needs-validation" novalidate @submit.prevent="submitRegist">
                                    <div class="col-12">
                                        <label for="username" class="form-label">Username</label>
                                        <input v-model="username" type="text" name="name" class="form-control" id="username" required>
                                        <div class="invalid-feedback">Please, enter your username!</div>
                                    </div>

                                    
                                    <div class="col-12">
                                        <label for="email" class="form-label">Your Email</label>
                                        <input v-model="email" type="email" name="email" class="form-control" id="email" required>
                                        <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                                    </div>
                                    
                                    <div class="col-12">
                                        <label for="password" class="form-label">Password</label>
                                        <input v-model="password" type="password" name="password" class="form-control" id="password"
                                            required>
                                        <div class="invalid-feedback">Please enter your password!</div>
                                    </div>

                                    <div class="col-12">
                                        <label for="phoneNumber" class="form-label">Phone Number</label>
                                        <div class="input-group has-validation">
                                            <input type="text" name="username" class="form-control" id="phoneNumber">

                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <label for="adress" class="form-label">Adress</label>
                                        <input type="password" name="password" class="form-control" id="adress">
                                    </div>


                                    <div class="col-12">
                                        <div class="form-check">
                                            <input class="form-check-input" name="terms" type="checkbox" value=""
                                                id="acceptTerms" required>
                                            <label class="form-check-label" for="acceptTerms">I agree and accept the <a
                                                    href="#">terms and conditions</a></label>
                                            <div class="invalid-feedback">You must agree before submitting.</div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button class="btn btn-primary w-100" type="submit">Create Account</button>
                                    </div>
                                    <div class="col-12">
                                        <p class="small mb-0">Already have an account? <a href="" @click.prevent="switchPage">Log in</a>
                                        </p>
                                    </div>
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
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
            address: ""
        }
    },

    methods: {
        submitRegist() {
            this.$emit('submitRegist', this.username, this.email, this.password, this.phoneNumber, this.address)
        },

        switchPage() {
            this.$emit('switchPage')
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