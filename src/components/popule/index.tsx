import { defineComponent, Teleport, Transition, SetupContext, PropType } from 'vue';
import './index.css';

`
tsx中使用自定义事件，并且在tsx父组件中调用子组件


  <Popule message="Hello World" show={show} onClose={handleClose} />  // 父组件调用子组件


{
  props: {

    onClose:{
      type: Function as PropType<() => void>,
      required: true
    } // 定义onClose属性,否则 父组件调用子组件时，onClose属性会报不存在的错误

  },
  emits: ['close'], // 定义自定义事件
}
`

export default defineComponent({
  name: 'Popule',
  props: {
    message: {
      type: String,
      required: true
    },
    show: {
      type: true,
      required: true
    },
    onClose: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit, slots }: SetupContext) {
    return () => (
      <Teleport to="body">
        {props.show.value ? (
          <div
            class={['fixed', 'top-0', 'left-0', 'w-screen', 'h-screen', 'z-999', 'bg-[rgba(0,0,0,0.7)]']}
            onClick={() => {
              emit('close');
            }}
          ></div>
        ) : null}

        <Transition name="fade">
          {props.show.value ? (
            <div class={['popule', 'bg-white', 'w-60', 'h-screen', 'fixed', 'top-0', 'right-0', 'z-1000']}>
              {slots && slots.default && slots.default()}
            </div>
          ) : null}
        </Transition>
      </Teleport>
    );
  }
});
