import {defineComponent, ref, Ref, nextTick} from "vue"
import veoplayer from 'veoplayer'
import { MessagePlugin } from 'tdesign-vue-next';
export default defineComponent({

    setup() {

        let winWidth: Ref<Number> = ref(0)
        let winHeight: Ref<Number> = ref(0)
        window.addEventListener("resize", () => {
            winWidth.value = window.innerWidth
            winHeight.value = window.innerHeight - 150
        })
        nextTick(() => {
            winWidth.value = window.innerWidth
            winHeight.value = window.innerHeight - 150
            initPlayer()
            // https://m3u8.wolongcdnm3u8.com:65/20230616/2c6f8edc/index.m3u8
        })
        let playUrl: Ref<string> = ref("https://s.xlzys.com/play/RdGQ2yaD/index.m3u8")
        let player = null
        const handleBtn = ()=>{
            if(!playUrl.value){
                MessagePlugin.warning({ content: '播放源不能为空' })
                return
            }
            player.veoDestroy()
            player = null
            initPlayer()
        }
        function initPlayer() {
           player = new veoplayer({
                id: "veo",
                url: playUrl.value,
                poster: "",
                width: winWidth.value,
                height: winHeight.value,
                muted: false,
                style: {
                    themeColor: "#91CB40",
                    processColor: "#91CB40",
                    animation: true,
                    processHeight: 8,
                },
                speed: [5, 2, 1.5, 1,1.25, 0.75],
                setting: ["loop", "pip"],
                plugins: ["speed", "download", "setting", "capture"]
            });
        }

        return () => (
            <>
                <div id="veo" style={{width: winWidth.value + 'px', height: winHeight.value + 'px'}}></div>
                <div class="index_row">
                        <t-input v-model={playUrl.value} placeholder="输入播放源地址"/>
                        <t-button onClick={handleBtn.bind(this)}>播放</t-button>
                </div>
            </>
        )
    }
})



