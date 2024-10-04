import { defineComponent, ref, onMounted, nextTick } from 'vue';
import styles from './index.module.css';
import { config, NavbarItem } from '@/base/config';
import { setStyle } from '@/utils/css';
import Popule from '@/components/popule/index';
export default defineComponent({
  name: 'HomeNav',
  props: {
    scrollDom: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let preScollTop = ref(0);
    let isShowPopule = ref(false);
    let { scrollDom } = props;
    const handlePopuleShow = () => {
      isShowPopule.value = true;
    };
    onMounted(() => {
      const header = document.querySelector('header');
      let dom = document.querySelector(scrollDom);

      dom?.addEventListener('scroll', (e) => {
        let scrollTop = dom?.scrollTop || 0;
        if (header) {
          if (scrollTop > 100) {
            setStyle(header, {
              transition: 'all 0.3s ease-in-out',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: 'rgb(76, 73, 72)'
            });
            if (preScollTop.value > scrollTop) {
              setStyle(header, {
                transform: `translateY(0px)`
              });
            } else {
              setStyle(header, {
                transform: `translateY(-100px)`
              });
            }
          } else {
            setStyle(header, {
              backgroundColor: 'transparent',
              color: 'white',
              transition: 'all 0.3s ease-in-out',
              transform: `translateY(0px)`
            });
          }
        }
        preScollTop.value = scrollTop;
      });
    });

    return () => (
      <>
        <Popule
          message="This is a popule message"
          show={isShowPopule}
          onClose={() => {
            isShowPopule.value = false;
          }}
        >
          <div class={['popule-content', 'w-full', 'h-full', 'bg-[rgb(246,248,250)]']}>
            <div class={['w-full', 'flex', , 'justify-center', 'mt-6', 'mb-5']}>
              <div class={['w-20', 'h-20']}>
                <img
                  src="https://static.renzs.top/config/c6c12713d6c06baf73b6bb7c585f4fcb.jpg"
                  style="width:100%;height:100%;border-radius:50%;"
                  alt=""
                />
              </div>
            </div>
            <div class={['blog-info-wrapper', 'flex']}>
              <div class={[' blog-info-data', 'flex-1', 'flex', 'flex-col', 'items-center']}>
                <span class={['leading-7']}>文章</span>
                <span class={['leading-9']}>14</span>
              </div>
              <div class={[' blog-info-data', 'flex-1', 'flex', 'flex-col', 'items-center']}>
                <span class={['leading-7']}>分类</span>
                <span class={['leading-9']}>14</span>
              </div>

              <div class={[' blog-info-data', 'flex-1', 'flex', 'flex-col', 'items-center']}>
                <span class={['leading-7']}>标签</span>
                <span class={['leading-9']}>14</span>
              </div>
            </div>
            <hr class={['border-dashed', 'border-2', 'border-[#d2ebfd]', 'mt-5', 'mb-5']} />
            <div class={['menu-container', 'pl-2.5', 'pr-2.5', 'pb-10']}>
              <div class={['menu-item', 'h-11', 'pt-1.5', 'pb-1.5', 'pl-7', 'pr-7']}>
                <a href="#" class={['flex', 'items-center', 'w-full', 'h-full']}>
                  <i class={['iconfont', `icon-home`, 'mr-8']}></i>
                  <span>首页 </span>
                </a>
              </div>
              <div class={['menu-item', 'h-11', 'pt-1.5', 'pb-1.5', 'pl-7', 'pr-7']}>
                <a href="#" class={['flex', 'items-center', 'w-full', 'h-full']}>
                  <i class={['iconfont', `icon-home`, 'mr-8']}></i>
                  <span>首页 </span>
                </a>
              </div>
              <div class={['menu-item', 'h-11', 'pt-1.5', 'pb-1.5', 'pl-7', 'pr-7']}>
                <a href="#" class={['flex', 'items-center', 'w-full', 'h-full']}>
                  <i class={['iconfont', `icon-home`, 'mr-8']}></i>
                  <span>首页 </span>
                </a>
              </div>
              <div class={['menu-item', 'h-11', 'pt-1.5', 'pb-1.5', 'pl-7', 'pr-7']}>
                <a href="#" class={['flex', 'items-center', 'w-full', 'h-full']}>
                  <i class={['iconfont', `icon-home`, 'mr-8']}></i>
                  <span>首页 </span>
                </a>
              </div>
              <div class={['menu-item', 'h-11', 'pt-1.5', 'pb-1.5', 'pl-7', 'pr-7']}>
                <a href="#" class={['flex', 'items-center', 'w-full', 'h-full']}>
                  <i class={['iconfont', `icon-home`, 'mr-8']}></i>
                  <span>首页 </span>
                </a>
              </div>
              <div class={['menu-item', 'h-11', 'pt-1.5', 'pb-1.5', 'pl-7', 'pr-7']}>
                <a href="#" class={['flex', 'items-center', 'w-full', 'h-full']}>
                  <i class={['iconfont', `icon-home`, 'mr-8']}></i>
                  <span>首页 </span>
                </a>
              </div>
            </div>
          </div>
        </Popule>
        <header class={['bg-transparent', 'fixed', 'top-0', 'left-0', 'z-[999]', 'w-[100%]', 'text-white']}>
          <div class={['px-8', 'py-8', 'h-16', 'flex', 'items-center', 'justify-between']}>
            <span class={['font-[600]', 'text-xl', 'font-mono', 'align-middle']}>miraitowa</span>
            <div class={['flex', 'items-center', 'max-xl:flex', 'lg:hidden']}>
              <a
                href="#"
                class={['text-sm', 'ml-6', 'relative', 'flex', 'items-center', styles['nav-item'], 'font-sans']}
              >
                <i class={['iconfont', `icon-sousuo`]}></i>

                <i class={['iconfont', `icon-icon-hanbao`, 'ml-2.5']} onClick={() => handlePopuleShow()}></i>
              </a>
            </div>
            <div class={['flex', 'items-center', 'xl:flex', 'max-lg:hidden']}>
              {config.navbar.map((item: NavbarItem, index: number) => (
                <a
                  href="#"
                  class={['text-sm', 'ml-6', 'relative', 'flex', 'items-center', styles['nav-item'], 'font-sans']}
                >
                  <div class={['absolute', '-bottom-1.5', 'h-1', 'bg-[#80c8f8]', styles['nav-line-item']]}></div>
                  <i class={['iconfont', `icon-${item.icon}`, 'mr-1']}></i>
                  {item.text}
                  {item.children && item.children.length > 0 ? (
                    <i class={['iconfont', `icon-xia`, 'mr-1', 'ml-0.5']}></i>
                  ) : (
                    ''
                  )}

                  <div
                    class={[
                      'absolute',
                      'flex',
                      'flex-col',
                      'left-1/2',
                      '-translate-x-1/2',
                      'min-w-[100%]',
                      'top-[150%]',
                      'items-center',
                      'bg-white',
                      styles['nav-dropdown'],
                      'before:block',
                      'before:absolute',
                      'before:-top-[0.63rem]',
                      'before:left-0',
                      'before:h-[0.63rem]',
                      'before:w-[100%]'
                    ]}
                  >
                    {item.children &&
                      item.children.length > 0 &&
                      item.children.map((child: NavbarItem) => (
                        <a
                          href="#"
                          class={[
                            'text-[#000000]',
                            ,
                            'text-sm',
                            'relative',
                            'flex',
                            'items-center',
                            'justify-center',
                            'w-[100%]',
                            'leading-[2]',
                            'py-1.5',
                            'px-3.5',
                            'hover:bg-sky-300'
                          ]}
                        >
                          <i class={['iconfont', `icon-${child.icon}`, 'mr-1']}></i>
                          {child.text}
                        </a>
                      ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </header>
      </>
    );
  }
});
