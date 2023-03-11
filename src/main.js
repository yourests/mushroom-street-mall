import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import toast from './components/common/toast'

const app = createApp(App)
app.use(router)
app.use(store)
// app.use(toast)

app.mount('#app')