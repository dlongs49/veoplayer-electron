import { createApp } from 'vue'
import './style.css'
import App from './App.tsx'
const app = createApp(App)
import { Button as TButton } from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
app.use(TButton);
app.mount('#app')
