import {defineComponent, ref, Ref, nextTick} from "vue"
import veoplayer from 'veoplayer'
import {MessagePlugin} from 'tdesign-vue-next';

export default defineComponent({

    setup() {

        let winWidth: Ref<Number> = ref(1200)
        let winHeight: Ref<Number> = ref(850)
        window.addEventListener("resize", () => {
            winWidth.value = window.innerWidth
            winHeight.value = window.innerHeight - 150
        })
        nextTick(() => {
            winWidth.value = window.innerWidth
            winHeight.value = window.innerHeight - 150
            initPlayer()
        })
        let list = ref([
            {title: "一个人的武林", url: "https://s.xlzys.com/play/RdGQ2yaD/index.m3u8"},
            {title: "长空之王", url: "https://m3u8.wolongcdnm3u8.com:65/20230616/2c6f8edc/index.m3u8"},
        ])
        let playUrl: Ref<string> = ref(list.value[0].url)
        let player = null
        let input:Ref<string>  = ref("")
        const handleBtn = () => {
            if (!input.value) {
                MessagePlugin.warning({content: '播放源不能为空'})
                return
            }
            playUrl.value = input.value
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
                speed: [5, 2, 1.5, 1, 1.25, 0.75],
                setting: ["loop", "pip"],
                plugins: ["speed", "download", "setting", "capture"]
            });
        }

        interface listInter {
            title: string,
            url: string
        }

        const active = ref(0)

        const handleItem = (item) => {
            active.value = item.index
            playUrl.value = item.url
            player.veoDestroy()
            player = null
            initPlayer()
        }
        const isShow = ref(false)
        const handleFlag = ()=>{
            isShow.value = !isShow.value
        }
        return () => (
            <>
                <div class="middlecon" style={{height:winHeight.value}}>
                    <div class="playList"  style={{width:isShow.value ? '240px' : 0}}>
                        {
                            list.value.map((item: listInter, index: number) => {
                                return <>
                                    <a href="javascript:void(0)" onclick={handleItem.bind(this, {...item, index})}
                                       class={active.value === index ? "play_item active" : "play_item"}>
                                        <span>{item.title}</span>
                                        <i style={active.value === index ? 'opacity:1' : 'opacity:0'}
                                           class="icon i_play"></i>

                                    </a>
                                </>
                            })
                        }
                        <div class="opear" onclick={handleFlag.bind(this)}>
                            <i class="icon i_kai"></i>
                        </div>
                    </div>
                    <div id="veo" style={{width: winWidth.value + 'px', height: winHeight.value + 'px'}}></div>
                </div>
                <div class="index_row">
                    <t-input v-model={input.value} placeholder="输入播放源地址"/>
                    <t-button onClick={handleBtn.bind(this)}>播放</t-button>
                </div>
            </>
        )
    }
})



