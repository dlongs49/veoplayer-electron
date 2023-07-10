import { createApp } from 'vue'
import './style.less'
import App from './App.tsx'
const app = createApp(App)
import { Button as TButton,Input as TInput,Row as TRow,Col as TCol } from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';
app.use(TButton);
app.use(TInput);
app.use(TRow);
app.use(TCol);
app.mount('#app')
