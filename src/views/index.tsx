import { defineComponent, ref, Ref, nextTick } from "vue"
import veoplayer from 'veoplayer'
export default defineComponent({

    setup() {
        let winWidth: Ref<Number> = ref(0)
        let winHeight: Ref<Number> = ref(0)
        window.addEventListener("resize", () => {
            winWidth.value = window.innerWidth
            winHeight.value = window.innerHeight - 100
        })
        nextTick(() => {
            winWidth.value = window.innerWidth
            winHeight.value = window.innerHeight - 100
            initPlayer()

        })

        function initPlayer() {
            new veoplayer({
                id: "veo",
                // url: "https://s.xlzys.com/play/RdGQ2yaD/index.m3u8",
                url: "http://127.0.0.1/一个人的武林【国语】.mp4",
                // url: "https://gcalic.v.myalicdn.com/gc/wgw05_1/index.m3u8?contentid=2820180516001",
                poster: "",
                width: winWidth.value,
                height: winHeight.value,
                // islive: true,
                muted: true,
                style: {
                    themeColor: "#91CB40",
                    processColor: "#91CB40",
                    animation: true,
                    processHeight: 8,
                },
                // playTime: 500,
                // volume: 50,
                // autoplay: true,
                speed: [5, 2, 1.5, 1, 0.75],
                // setting: ["loop", "pip"],
                plugins: ["speed", "download", "setting", "capture"]
            });
        }
        return () => (
            <>
                <div id="veo" style={{ width: winWidth.value + 'px', height: winHeight.value + 'px' }}></div>
                <t-button>确定</t-button>
            </>
        )
    }
})



