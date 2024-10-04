import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import styles from './index.module.css';

export default defineComponent({
  name: 'HomeCont',

  setup() {
    const navTitle = ref();
    let homeBanner = ref();
    let intervalId: any;
    let index = 0;
    const title = '花似伊。柳似伊。花柳青春人别离。';
    const scrollDown = () => {
      let home = document.getElementById('home');
      home &&
        home.scrollTo({
          top: homeBanner.value.getBoundingClientRect().height,
          behavior: 'smooth' // 设置平滑滚动
        });
    };

    const obsererArticleItem = () => {
      let obserer = new IntersectionObserver((entries) => {
        entries.forEach(
          (entry) => {
            let target = entry.target as HTMLElement;
            const rect = entry.boundingClientRect; // 获取元素的位置信息
            target.style.transition = 'all 0.3s ease-in-out';
            const onTransitionEnd = () => {
              target.style.transform = '';
              target.removeEventListener('transitionend', onTransitionEnd);
            };
            if (rect.top > 0) {
              if (entry.isIntersecting) {
                target.style.transform = 'scale(1)';
                // target.addEventListener('transitionend', onTransitionEnd);
              } else {
                target.style.transform = 'scale(0.75)';
              }
            }
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0
          }
        );
      });
      let target = document.querySelectorAll('.article');

      target.forEach((item) => {
        obserer.observe(item);
      });
    };
    const updateTitle = () => {
      intervalId = setInterval(() => {
        if (index < title.length) {
          navTitle.value.innerText = title.substring(0, index + 1);
          index++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            reduceTitle();
          }, 2000); // 完成后等待2秒再开始递减
        }
      }, 150); // 每400毫秒递增一个字符
    };

    const reduceTitle = () => {
      intervalId = setInterval(() => {
        if (index > 0) {
          index--;
          navTitle.value.innerText = title.substring(0, index);
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            updateTitle();
          }, 2000); // 减完后等待2秒再开始递增
        }
      }, 150); // 每400毫秒递减一个字符
    };
    onUnmounted(() => {
      clearInterval(intervalId);
    });
    onMounted(() => {
      obsererArticleItem();

      updateTitle(); // 初始化调用
    });
    let itemList = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53
    ];
    return () => (
      <main class={[`${styles.cont}`]}>
        <div
          ref={homeBanner}
          class={[
            'bg-[url("@/assets/bg.png")]',
            'h-screen',
            'bg-center',
            'text-white',
            'bg-cover',
            'overflow-hidden',
            'home-banner'
          ]}
        >
          <div class={['nav-title', 'mt-[35vh]', 'bg-transparent']}>
            <h1 class={['text-[2.5rem]', 'text-center']}>miraitowa</h1>
          </div>
          <div
            class={[
              'nav-title',
              'mt-[3.1rem]',
              'bg-transparent',

              'flex',
              'justify-center',
              'items-center',
              'lg:text-2xl',
              'max-lg:text-[1rem]'
            ]}
          >
            <h4 ref={navTitle}></h4>
            <span>|</span>
          </div>
          <div class={['absolute', 'bottom-[1rem]', 'left-[50%]', '-translate-x-1/2', styles.next]}>
            <i
              class={['iconfont', `icon-xia`]}
              onClick={() => {
                scrollDown();
              }}
            ></i>
          </div>
        </div>
        <div class={['flex', 'md:max-w-[1800px]', 'ml-auto', 'mr-auto', 'pl-1', 'pr-1', 'text-[#4c4948]']}>
          <div class={['cont-l', 'max-md:hidden', 'ml-[8%]', , 'mr-7', 'md:w-[18%]']}>
            <div class={['sticky', '-top-0', 'p-2']}>
              <div
                class={[
                  'blog-content',
                  'rounded-lg',
                  'card',
                  'h-[400px]',
                  'pl-6',
                  'pr-6',
                  'pt-5',
                  'pb-5',

                  'bg-gradient-to-b',
                  'from-[#fff1eb]',
                  'to-[#ace0f9]'
                ]}
              ></div>
              <div
                class={[
                  'rounded-lg',
                  'card',
                  'font-bold',
                  'pl-4',
                  'pr-4',
                  'pt-2.5',
                  'pb-2.5',
                  'mt-5',
                  'bg-gradient-to-b',
                  'from-[#fff1eb]',
                  'to-[#ace0f9]',
                  'text-sm'
                ]}
              >
                <a href="#" class={['h-[25px]', 'leading-[25px]', 'overflow-hidden', 'block']}>
                  <ul class={[styles['rollScreen-container'], 'text-center']}>
                    <li class={['overflow-hidden', 'whitespace-nowrap', 'text-ellipsis', 'h-[25px]', 'leading-[25px]']}>
                      <span class="item">爱是一把倾斜的伞</span>
                    </li>
                    <li class={['overflow-hidden', 'whitespace-nowrap', 'text-ellipsis', 'h-[25px]', 'leading-[25px]']}>
                      <span class="item"> 想要宴请童年的自己，却发现童年的自己更有力量且自由。</span>
                    </li>
                    <li class={['overflow-hidden', 'whitespace-nowrap', 'text-ellipsis', 'h-[25px]', 'leading-[25px]']}>
                      <span class="item"> 如果离别是尽头，那相遇的意义是什么</span>
                    </li>
                    <li class={['overflow-hidden', 'whitespace-nowrap', 'text-ellipsis', 'h-[25px]', 'leading-[25px]']}>
                      <span class="item">爱是一把倾斜的伞</span>
                    </li>
                    <li class={['overflow-hidden', 'whitespace-nowrap', 'text-ellipsis', 'h-[25px]', 'leading-[25px]']}>
                      <span class="item"> 想要宴请童年的自己，却发现童年的自己更有力量且自由。</span>
                    </li>
                    <li class={['overflow-hidden', 'whitespace-nowrap', 'text-ellipsis', 'h-[25px]', 'leading-[25px]']}>
                      <span class="item"> 如果离别是尽头，那相遇的意义是什么</span>
                    </li>
                  </ul>
                </a>
              </div>
              <div
                class={[
                  'p-4',
                  'rounded-lg',
                  'mt-5',
                  'card',
                  'text-white',
                  'bg-[linear-gradient(-227deg,rgb(60,140,231),rgb(0,234,255))]'
                ]}
              >
                <span class={['text-sm', 'font-bold']}>速览</span>
                <p class={['mb-4', 'text-xl', 'text-[#f0f8ff]', 'font-bold']}>学习人生（24）</p>
                <span class={['text-sm', 'font-bold']}>学习记录</span>
              </div>
              <div
                class={[
                  'p-4',
                  'rounded-lg',
                  'mt-5',
                  'card',
                  'text-white',
                  'bg-[linear-gradient(270deg,rgb(169,249,158),rgb(70,173,213))]'
                ]}
              >
                <span class={['text-sm', 'font-bold']}>速览</span>
                <p class={['mb-4', 'text-xl', 'text-[#f0f8ff]', 'font-bold']}>学习人生（24）</p>
                <span class={['text-sm', 'font-bold']}>学习记录</span>
              </div>
              <div
                class={[
                  'p-4',
                  'rounded-lg',
                  'mt-5',
                  'card',
                  'text-white',
                  'bg-[linear-gradient(83deg,rgb(253,110,106),rgb(255,198,0))]'
                ]}
              >
                <span class={['text-sm', 'font-bold']}>速览</span>
                <p class={['mb-4', 'text-xl', 'text-[#f0f8ff]', 'font-bold']}>学习人生（24）</p>
                <span class={['text-sm', 'font-bold']}>学习记录</span>
              </div>
              <div
                class={[
                  'p-4',
                  'rounded-lg',
                  'mt-5',
                  'card',
                  'text-white',
                  'bg-[linear-gradient(270deg,rgb(0,242,254),rgb(142,45,226))]'
                ]}
              >
                <span class={['text-sm', 'font-bold']}>速览</span>
                <p class={['mb-4', 'text-xl', 'text-[#f0f8ff]', 'font-bold']}>学习人生（24）</p>
                <span class={['text-sm', 'font-bold']}>学习记录</span>
              </div>
              <div
                class={[
                  'card',
                  'pl-6',
                  'pr-6',
                  'pt-5',
                  'pb-5',
                  'mt-5',
                  'bg-white',
                  'bg-[linear-gradient(rgba(99,216,255,.07),rgba(1,1,2,.07)100%)]'
                ]}
              >
                <div class={['text-center', 'font-bold', 'text-base', 'leading-8']}>屿你</div>
                <div class={['web-info', 'p-1']}>
                  <div class={['pt-1', 'font-bold', 'leading-[2]', 'text-[0.835rem]']}>
                    我听过最壮丽的诗句，是落霞与孤鹜齐飞。不过那是别人的景色，我的世界里，最壮丽的景色是卿笑与艳阳同媚
                  </div>
                  <div class={['mt-5', 'font-bold', 'leading-[2]', 'text-base', 'text-center']}>换一句</div>
                </div>
              </div>
              <div class={['h-8']}></div>
            </div>
          </div>
          <div class={['cont-c', 'md:w-[50%]', 'pl-2', 'pr-2', 'pt-2', 'pr-2']}>
            <div class={['p-2.5', 'rounded-lg', 'bg-white', 'mt-2.5', 'card']}>
              <div class={['text-center', 'mt-2.5']}>
                欢迎来自于<strong class={['text-[rgb(94,166,229)]']}>浙江省-杭州市</strong>的小伙伴🎉
              </div>
            </div>

            {itemList.map((item, index) =>
              item % 2 === 0 ? (
                <div
                  class={[
                    'article',
                    'lg:h-[280px]',
                    'rounded-lg',
                    'bg-white',
                    'mt-7',
                    'lg:flex',
                    'card',
                    'overflow-hidden'
                  ]}
                >
                  <div class={['lg:w-[45%]','max-md:w-[100%]', styles['article-img']]}>
                    <img
                      class={['lg:rounded-l-lg','max-md:rounded-t-lg']}
                      src="https://static.renzs.top/articles/dbd1966cc0f2e108423c7b60d063b904.jpg"
                      alt=""
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                  <div
                    class={['article-wrapper', 'w-[55%]', 'lg:pl-10', 'lg:pr-10', 'flex', 'justify-center', 'flex-col']}
                  >
                    <div>
                      <span class={['lg:text-[22px]', 'font-bold']}>网站的更新日志</span>
                    </div>

                    <div class={['article-info', 'text-[#858585]', 'leading-loose', 'mt-1.5', 'mb-1.5']}>
                      <span>网站的更新日志</span>
                    </div>
                    <div
                      class={[
                        styles['article-content'],
                        'lg:h-[84px]',
                        'lg:leading-[28px]',
                        'text-sm',
                        'overflow-hidden'
                      ]}
                    >
                      更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  class={[
                    'article',
                    'lg:h-[280px]',
                    'rounded-lg',
                    'bg-white',
                    'mt-7',
                    'lg:flex',
                    'card',
                    'overflow-hidden'
                  ]}
                >
                  <div
                    class={['article-wrapper', 'w-[55%]', 'lg:pl-10', 'lg:pr-10', 'flex', 'justify-center', 'flex-col']}
                  >
                    <div>
                      <span class={['lg:text-[22px]', 'font-bold']}>网站的更新日志</span>
                    </div>

                    <div class={['article-info', 'text-[#858585]', 'leading-loose', 'mt-1.5', 'mb-1.5']}>
                      <span>网站的更新日志</span>
                    </div>
                    <div
                      class={[
                        styles['article-content'],
                        'lg:h-[84px]',
                        'lg:leading-[28px]',
                        'text-sm',
                        'overflow-hidden'
                      ]}
                    >
                      更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定更新记录2024年5月19日 网站正式开始运营 2024年5月26日 ==功能更新==
                      页面footer添加自定
                    </div>
                  </div>
                  <div class={['lg:w-[45%]', styles['article-img']]}>
                    <img
                      class={['rounded-r-lg']}
                      src="https://static.renzs.top/articles/dbd1966cc0f2e108423c7b60d063b904.jpg"
                      alt=""
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
              )
            )}
          </div>
          <div class={['cont-r', 'max-md:hidden', 'md:w-[20%]']}>
            <div class={['sticky', '-top-0', 'ml-7']}>
              <div class={['p-2']}>
                <div
                  class={[
                    'card',
                    'pl-6',
                    'pr-6',
                    'pt-5',
                    'pb-5',
                    'mt-5',
                    'bg-white',
                    'bg-[linear-gradient(rgba(99,216,255,.07),rgba(1,1,2,.07)100%)]'
                  ]}
                >
                  <div class={['text-sm', 'leading-[2]']}>🧡💛💚 公告</div>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>
                    网站的更新记录：https://www.renzs.top/articles/66
                  </p>
                </div>
                <div
                  class={[
                    'card',
                    'pl-6',
                    'pr-6',
                    'pt-5',
                    'pb-5',
                    'mt-5',
                    'bg-white',
                    'bg-[linear-gradient(rgba(99,216,255,.07),rgba(1,1,2,.07)100%)]'
                  ]}
                >
                  <div class={['text-sm', 'leading-[2]']}>(❁´◡`❁)舔狗日记</div>
                  <div class={['web-info', 'p-1']}>
                    <div class={['pt-1', 'font-bold', 'leading-[2]', 'text-[0.835rem]']}>
                      今天晚上好冷，本来以为街上没人，结果剛剛偷电动车的時候被抓了，本來想反抗，警察說了一句老實點別動，我立刻就放棄了抵抗，因為我記得你說過，你喜歡老實人。
                    </div>
                    <div class={['mt-5', 'font-bold', 'leading-[2]', 'text-base', 'text-center']}>换一句</div>
                  </div>
                </div>
                <div
                  class={[
                    'card',
                    'pl-6',
                    'pr-6',
                    'pt-5',
                    'pb-5',
                    'mt-5',
                    'bg-white',
                    'bg-[linear-gradient(rgba(99,216,255,.07),rgba(1,1,2,.07)100%)]'
                  ]}
                >
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>日期：星期二</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>访客ip：125.120.165.110</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>位置：浙江省-杭州市</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>浏览器：Chrome</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>系统：Windows 10</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>当前气温：19°C-23°C</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>天气：小雨</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>风力：4-5级-北风</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>提示：现在的温度比较舒适~</p>
                </div>
                <div
                  class={[
                    'card',
                    'pl-6',
                    'pr-6',
                    'pt-5',
                    'pb-5',
                    'mt-5',
                    'bg-white',
                    'bg-[linear-gradient(rgba(99,216,255,.07),rgba(1,1,2,.07)100%)]'
                  ]}
                >
                  <div class={['text-sm', 'leading-[2]']}>🧡💛💚网站资讯</div>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>运行时间:135天15时14分2秒</p>
                  <p class={['text-sm', 'leading-[2]', 'font-bold']}>总访问量🎈:2650</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
});
