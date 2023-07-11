import { defineComponent,ref } from "vue";
import "../style/Head.less"
const {ipcRenderer} = require("electron")
export default defineComponent({
    name: "Head",
    setup() {
        const isMaximized = ref(true)
        ipcRenderer.on("minimize",()=>{
            isMaximized.value = true
        })
        ipcRenderer.on("maximized",()=>{
            isMaximized.value = false
        })
        const handleItem = (params:string)=>{
            ipcRenderer.send(params)
        }
        return () => (
            <div class="head">
                <div class="logobox">
                    <img src="./static/images/veoplayer_logo.png" />
                    <span>veoplayer</span>
                </div>
                <div class="middle"></div>
                <div class="control">
                    <div class="winItem" onClick={handleItem.bind(this,"minimize")}>
                        <i class="icon i_minimize"></i>
                    </div>
                    <div class="winItem">
                        <i class={isMaximized.value ? "icon i_maximize" : "icon i_reduction"} onClick={handleItem.bind(this,"maximize")}></i>
                    </div>
                    <div class="winItem" onClick={handleItem.bind(this,"close")}>
                        <i class="icon i_close"></i>
                    </div>
                </div>
            </div>
        )
    }
})
