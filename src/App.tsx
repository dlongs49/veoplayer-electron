import {defineComponent} from "vue";
import Head from './components/Head.tsx'
import Index from './views/index.tsx';

export default defineComponent({
    setup() {
        return () => (
            <>
                <Head/>
                <Index/>
            </>

        )
    }
})
