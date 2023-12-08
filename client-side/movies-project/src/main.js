import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
    clientId: "408054119270-s8i9n0qpqr9muv4hr0g9tdujtc39d60l.apps.googleusercontent.com"
  })
  
app.mount('#app')
