import {defineComponent} from "vue"
import MyEditor from "@/components/editor/editor.vue";
export default defineComponent({
  name: "Editor",

 setup(){

  return ()=>(<MyEditor></MyEditor>)
 }
}
)
