import type { BytemdPlugin } from 'bytemd'
import themeList from "./theme/themeList";

// export interface BytemdPluginHighlightOptions {
//   init?(hljs: typeof H): void | Promise<void>
// }


export default function highlight(): BytemdPlugin {

  return {
    viewerEffect({markdownBody}) {
      console.log(markdownBody, 777777777777);

    },
  }
}
