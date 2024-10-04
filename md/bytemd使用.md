市面上有很多的`md编辑器`，对于程序员而言，基本都离不开使用这类编辑器，使用过比较多频率的掘金编辑器，本着最近有**md编辑器**需求的前提下，看了看此类东西，发现掘金的编辑器已经开源了，[ByteMD](https://github.com/bytedance/bytemd "https://github.com/bytedance/bytemd")，点开之后文档较少，不过胜在简单，于是尝试很快的安装使用了。并且也带了很多的插件供使用，但是发现有很多掘金已经有的插件并没有开源，在使用上不是很方便，比如切换主题需要自己去编码切换，而且还需要去寻找主题等等，感觉不方便，于是为了复刻掘金的编辑器，我开发了这四个插件，同时也同步一些使用上的问题帮助大家很快搭建一个和掘金一样的编辑器出来。

-   [bytemd-plugin-theme](https://www.npmjs.com/package/bytemd-plugin-theme "https://www.npmjs.com/package/bytemd-plugin-theme") 编辑器工具栏的切换主题图标，可以点击切换主题
-   [bytemd-plugin-highlight](https://www.npmjs.com/package/bytemd-plugin-highlight "https://www.npmjs.com/package/bytemd-plugin-highlight") 编辑器工具栏的切换代码风格图标，可以点击切换代码风格。
-   [bytemd-plugin-align](https://www.npmjs.com/package/bytemd-plugin-align "https://www.npmjs.com/package/bytemd-plugin-align") 编辑器工具栏的文本对其图标，可以点击快速创建一个对其快捷文本
-   [bytemd-plugin-image](https://www.npmjs.com/package/bytemd-plugin-image "https://www.npmjs.com/package/bytemd-plugin-image") 编辑器工具栏的切换图片缩放比例，快速创建一个图片缩放指示。

这四个插件和掘金的编辑器实现一模一样的效果，让整体功能看起来更统一。 对应的图标便是这四个：

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c491e3f35b3a409da1e6460850debac8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=VC9FHWnEOUqAMI1o92JVJJMyAc4%3D)

#### 使用bytemd

使用bytemd非常简单，他分为两部分，一块儿是编辑器，一块儿是渲染器， 我们以**vue3**举例子看看。

```javascript
import { Editor, Viewer } from "@bytemd/vue-next"
```

使用上也很简单，就是一个组件, 绑定一个value，和一个插件列表。

```javascript
<Viewer :plugins="plugins" :value="value" class="editor" />
```

官方也提供了很多的插件，个人使用可以全部安装，这些是官方自带的。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7e6df52d73404dd38eebc19c8ad4739c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=pez8tkJB3FCzUn2JaEyhgQ6glVs%3D)

我们快速创建一个这样的页面

```javascript
<template>
  <div class="h-full w-full">
    <Editor
      id="d-Editor"
      class="editor"
      :locale="zhHans"
      :plugins="plugins"
      :uploadImages="uploadImages"
      :value="value"
      mode="split"
      placeholder="请输入内容..."
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { Editor } from "@bytemd/vue-next"
import gfm from "@bytemd/plugin-gfm"
import zhHans from "bytemd/locales/zh_Hans.json"
import footnotes from "@bytemd/plugin-footnotes"
import frontmatter from "@bytemd/plugin-frontmatter"
import highlight from "@bytemd/plugin-highlight"
import mediumZoom from "@bytemd/plugin-medium-zoom"
import gemoji from "@bytemd/plugin-gemoji"
import math from "@bytemd/plugin-math"
import breaks from "@bytemd/plugin-breaks"
import mermaid from "@bytemd/plugin-mermaid"
import externalLinks from "@bytemd/plugin-external-links"
import pluginMermaidZhHans from "@bytemd/plugin-mermaid/locales/zh_Hans.json"
import pluginGfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json"
import pluginMathZhHans from "@bytemd/plugin-math/locales/zh_Hans.json"

const plugins = [
  gfm({ locale: pluginGfmZhHans }),
  highlight(),
  mediumZoom(),
  gemoji(),
  math({ locale: pluginMathZhHans }),
  mermaid({ locale: pluginMermaidZhHans }),
  breaks(),
  footnotes(),
  frontmatter(),
  externalLinks({ test: href => true })
]

const value = ref("")

function handleChange(val: string) {
  value.value = val
}
function uploadImages() {}
</script>
```

加入所有插件并且引入即可。

##### 关于bytemd插件汉化问题

看到很多地方评论不知道为什么插件没有中文，因为文档较少，所以有些同学并不清楚，如果我们`import zhHans from "bytemd/locales/zh_Hans.json"`这样引入并且传入给`Editor`,这样只有前面的工具栏是中文后面的没有，因为这个语言包只是默认的编辑器部分，后面的都是插件，插件的语言包是需要单独传入的。

于是打开了源码查看，发现大多数的插件的文件格式是这样的。

```css
.
├── README.md
├── locales
│   ├── ar.json
│   ├── ca.json
│   ├── de.json
│   ├── en.json
│   ├── es.json
│   ├── fr.json
│   ├── id.json
│   ├── nb_NO.json
│   ├── pl.json
│   ├── pt_BR.json
│   ├── ru.json
│   ├── tr.json
│   └── zh_Hans.json
├── package.json
├── src
│   ├── icons.ts
│   ├── index.ts
│   └── locales -> ../locales
└── tsconfig.json
```

所有的语言包是放在了**locales目录**下面。所以参照上面的demo直接导出并且传入到配置即可，并且可以在中途复写修改都可以，这样就解决了多语言问题。

#### 对比掘金官方编辑器

在完成这些内容之后，我们的页面工具栏大概就是这样的了，对比一下官方

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/82f3f080b1c64077bd61aec16fc7f053~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=%2Fhe0gHraaay%2BiFxf6l4ifxVqfdk%3D)

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/856c4ce7b0c54edda22fb9b284e9d7c2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=%2BiMfaqYTBoqjWfeD24%2BxFJpkfrQ%3D)

我们发现，掘金官方的**icon图标**有21个，而我们用了所有官方插件也只有15个，发现我们少了六个图标，这里面除了文章开始的四个，还有两个分别是上传**西瓜视频**和**码上掘金**，这两个图标我们用不到，所以可以直接忽略，右侧的图标同理多了一个导入，但是都不属于标准功能，我们也忽略，因为个人开发者也用不了这三个功能，但是其他四个我们可以自己实现。

#### 复刻掘金编辑器（插件开发）

想要开发插件，一般需要文档，但是并没有找到插件相关的文档，于是翻开源码，发现其实只是简单的返回一个配置对象即可，于是就四个插件分别进行开发。在没有文档的情况下如果你也想开发自己的插件可以打开源码查看其**TS类型**，这样可以快速了解到插件的开发，我们打开源码可以看到其是一个基于**pnpm的monorepo**仓库开发。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fc2924b9272b4ab7a2ff4f71da41f573~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=H4N4gcb0MKD%2FwYxT0BXUALsnhkU%3D)

我们随意打开一个**packages**下的插件包打开入口文件，我们以**plugin-mermaid**为例，返回一个函数，接受一些入参配置对象，返回一个**BytemdPlugin类型**对象，我们通过观察这个类型可以知道，我们可以配置例如， `viewerEffect`,`editorEffect`,`remark`,`rehype`,`actions`,五个属性，除了**actions**是一个**BytemdAction\[\]**类型，其他都是函数，**actions**其实就是下拉列表，可以通过配置这个列表和icon配置一下下拉菜单出来，在这个下拉菜单中，配置单独项，里面会有一个**handler**配置是点击某一项的触发事件。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2c7865becb254eb19086aaf4598d32e7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=rIf6Q0qMIvclQk39liMDqH0mvYI%3D)

知道这个逻辑后，我们就可以开发我们的插件了。

#### bytemd-plugin-theme

我们知道掘金的编辑器主题同步也开源在了[juejin-markdown-themes](https://github.com/xitu/juejin-markdown-themes#readme "https://github.com/xitu/juejin-markdown-themes#readme")这个里面，查看这个库里面内容也很简单，就是不同的主题对应了不同的样式，我们只需要下载这个包，加载他的所有样式即可。

我们可以打开控制台看看掘金的样式切换发生了什么：

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/598080a58b6c48368b32c39c989b7437~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=uv%2FlY%2F4BJ5rkQ%2BGifd7jz1CK00I%3D)

我们可以发现**Head头**里面在切换主题的时候发生了变化，有两部分内容，上面是**md内容的样式**，下面是**highLight代码高亮**语法相关的样式，并且他们有两部分，而且需要注意的是，**highLight样式**位于下方，它需要更高的权重，因为我们打开[juejin-markdown-themes](https://github.com/xitu/juejin-markdown-themes#readme "https://github.com/xitu/juejin-markdown-themes#readme")可以看到这个下面导出了一个对象，里面包含了主题名称，样式，还有部分同时携带了**highlight**，也就是说有的主题的样式是包含了代码高亮的，如果将代码高亮放在上面，则可能被主题的样式覆盖掉，我们切换主题和切换代码高亮其实本质上就是动态修改这块儿的样式（同时保证他们的顺序即可），所以我们引入所有的样式，将其整理为一个动态列表。

```javascript
import * as themeMap from "juejin-markdown-themes/dist"

export const themeList: ThemeListItem[]  = Object.keys(themeMap).filter(key => key !== "default").map( key => ({
  title: key,
  style: "",
  rewrite: "",
  theme: key,
  highlight: themeMap[key]?.highlight,
}))

```

我们初始化创建菜单的时候并不需要拿到里面的具体样式，否则可能过多，而是在后续的时候动态去加载里面的样式比较合理。拿到了所有主题之后就很简单了，一个是配置**icon**图标，图标的配置是一个**svg**参考源码，配置一个图标即可，我们去构建一个下拉的列表渲染所有主题之后，点击不同主题，就可以拿到对应配置，然后执行方法动态的切换这块儿的主题样式即可。

```javascript
export async function changeTheme(theme: ThemeListItem | string): Promise<void> {
  let str = ""
  if(typeof theme === 'string') {
    str = theme
  }else{
    const {title, style } = theme;
    if(themeNames.includes(title)) {
      str = themeMap[title]?.style
    }else{
      str = style
    }
  }

  let markdownThemeStyleElement = document.querySelector('#markdownTheme')
  if (markdownThemeStyleElement) {
    markdownThemeStyleElement.innerHTML = str
  } else {
    markdownThemeStyleElement = document.createElement('style')
    markdownThemeStyleElement.id = 'markdownTheme'
    markdownThemeStyleElement.innerHTML = str
    document.head.appendChild(markdownThemeStyleElement)
  }
}
```

我们通过点击主题获取到不同主题的样式并且动态插入到**head头**即可，当然，为了避免上述我们说到的优先级问题，我们可以使用**insertBefore**方法将样式插入到顶部，而**highLight样式**使用**appendChild**插入到底部用来区分他们的优先级。此时我们就可以动态切换主题了，当然还可以扩展功能，可以用于删减一些不需要不想要的主题，或者自定义主题，我们可以导出主题列表，让用户自定义即可，再传入进来，类似多语言，这个插件就完成了，使用也非常简单

```javascript
import theme from "bytemd-plugin-theme"
import { changeTheme, themeList } from "bytemd-plugin-theme"

const plugins = [
  theme()
]
```

和其他插件一样，导出然后放入**plugins**列表即可。如果你想减少一些主题或者新增一些主题，那么可以从里面导出**themeList**主题列表，移除自己不想要的，加入一些自己新增的然后传回去即可，如果外层你需要拿到动态修改的这些样式或者主题之类信息，可以在配置项传入**cb**回调函数，在点击按钮修改的时候会将这些信息暴露出来，如果你想微调样式，对一些主题进行一些小的修改则可以在导出的配置主题中的单项**rewrire**项写入需要修改的样式，插件将会对其追加到尾部用于覆盖重写样式。

至此发布插件，就完成了一个和掘金官方实现效果完全一样的插件了。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d994b80105614f4c9df42792581ff17c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=6bbksjOcoHilK5lLC8tUsyqkPhg%3D)

#### bytemd-plugin-highLight

开发切换主题我们依赖了[juejin-markdown-themes](https://github.com/xitu/juejin-markdown-themes#readme "https://github.com/xitu/juejin-markdown-themes#readme")这个库可以很轻松拿到所有样式，但是**highLight代码高亮**的样式并没有看到库，但是我们在上面看到切换高亮主题的时候可以看到**Head头**里面的**style标签**里面的样式，我们拿到其样式即可，但是一个个复制也显得比较慢了，第一时间我们想到可以使用爬虫来拿到这些样式，但是当我打开控制台的全局请求看到了这个：

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7f414eabe37f4ef587058a3d8b721e93~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=GMNg%2FW9OzlxhW7SdLkPjwteGXbU%3D)

可以看到网络请求包含了主题的所有样式，其实这也是[juejin-markdown-themes](https://github.com/xitu/juejin-markdown-themes#readme "https://github.com/xitu/juejin-markdown-themes#readme")库导出的默认文件，被打包进来了，于是我选择在网络请求上继续查找，但是发现虽然有主题的样式，没有高亮主题的样式，想着掘金是服务端渲染，并且在点击切换高亮主题的时候并没有发起新的网络请求，说明其样式被打包到了**js文件**当中，所以只需要搜索一个主题名称，在不同js文件搜索即可， 比如搜索第一个主题**a11y-dark**，但是我们需要先找到其加载的**js**文件，点击显示网页源代码即可。 在搜索一番之后在[lf-web-assets.juejin.cn/obj/juejin-…](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web_editor/js/chunk-vendors.e059ddb2.js "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web_editor/js/chunk-vendors.e059ddb2.js")这个文件之中搜索到了。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/eb9b9410bf9d4bb2a365537b1679f48a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=5i1%2FoF4O3KVIvE52y5SHwO5NMaE%3D)

虽然是压缩过得，但是只需要找到开始闭合标签，然后进行一个**json格式化即可**拿到结果。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e1ac99167a2f49c8a4f2e6732fe17606~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=50ccdHzLy253lm37%2FV53tI2JuEY%3D)

那么此时我们就获取到了掘金所有的代码高亮主题样式，后面的内容就和上面的主题切换是一样的，没有区别，只需要按照插件格式完成这个工作即可，我们就实现了代码主题切换的功能了。

使用方式也和上面的主题切换一样：

```javascript
import highLightPlugin from "bytemd-plugin-highlight"

const plugins = [
  highLightPlugin()
]
```

包含配置对象也是一样，这样就完成了编辑器部分的扩展了。

#### bytemd-plugin-align | bytemd-plugin-image

这两个插件非常简单，其实就是单纯的创建了一个代码片段点击插入即可，就不过多介绍了，只是为了对其掘金编辑器来做的小东西。我们知道**bytemd**是配套的，有编辑端，也有渲染预览端，在那边也需要用到插件。

#### viewer 使用插件

在这一侧使用插件对于官方插件而言都是主动触发渲染的，或者是解析之类的，他们的生命周期和浏览器渲染无关，但我们的样式是需要使用到**documen**的，需要动态插入样式，而且可能还存在**服务端渲染**等情况，所以在**viewer**端显示的时候，我们都对外暴露了**setTheme**方法，传入主题名称即可手动更改样式，在编辑器端同理，渲染的时候如果包含主题则需要我们手动调用。

```javascript
import { setTheme } from "bytemd-plugin-theme"
import { setTheme as setHighLightTheme } from "bytemd-plugin-highlight"


watch(
  themeConfig,
  (val: any) => {
    nextTick(() => {
      const { theme, highlight } = val
      theme && setTheme(theme)
      highlight && setHighLightTheme(highlight)
    })
  },
  {
    immediate: true,
    deep: true
  }
)
```

那么如此就可以实现和掘金编辑器一模一样的功能了，这样使用就不会有什么割裂感。

我们插入我们刚刚开发的插件

```javascript
const plugins = [
  gfm({ locale: pluginGfmZhHans }),
  highlight(),
  mediumZoom(),
  gemoji(),
  math({ locale: pluginMathZhHans }),
  mermaid({ locale: pluginMermaidZhHans }),
  breaks(),
  footnotes(),
  frontmatter(),
  externalLinks({ test: href => true }),
  alignPlugin(),
  imagePlugin(),
  themePlugin({ cb: changeThemeCb }),
  highLightPlugin({ cb: changeHighlightCb })
]
```

就可以得到除了官方两个我们没办法使用的**icon**之外其他所有的**icon**了。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b19b079540684c29a803d13df1883022~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgX-Wwj-S5nQ==:q75.awebp?rk3s=f64ab15b&x-expires=1728386178&x-signature=G%2FviLs%2Bzv0DQlXjYNx1bbwstLg4%3D)

#### 扩展（掘金的yaml配置）

掘金编辑器还有一个配置就是在编辑器顶部通过---开合的区域去写入了主题配置，我们也可以轻松实现，本质就是解析出那块儿区域的内容，其实就是**ymal语法**，我们可以通过类似**js-yaml**这种库，一是在主题切换的时候自己写入到顶部主题和高亮主题配置，主题变动的时候都可以，我们可以在**change事件**的时候拿到内容进行解析，类似我们写博客，就不用存这些配置到**数据库**了，渲染的时候拿到内容，则可以直接解析出来主题之类的配置，然后调用**setTheme**设置主题，这样就可以完全实现掘金这些类似的功能了，

基于上面的内容，我们还可以开发很多自定义的好玩的东西，也可以完全实现和官方一样体验的编辑器，还可以介入自己的生态做一些好玩的东西，比如在我前段时间做了一个[在线编辑器 动画片段收藏](https://cool.mmmss.com/ "https://cool.mmmss.com/")网站。我可以写一个和**码上掘金**一样的功能出来，我可以将我的网站代码片段同理插入到自己的文档当中然后进行解析。

当然了，如果你对这个网站感兴趣可以看看[开发一个纯前端在线代码编辑器、制作一个炫酷动画收藏网站](https://juejin.cn/post/7405769445027594266 "https://juejin.cn/post/7405769445027594266")这篇文章，最后如果你看到了这里，说明你也爱好学习，可以通过我的主页添加我的vx加入到我们的**Coding交流群吧**~
