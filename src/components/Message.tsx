import { useBoolean, useCreateElement } from 'arhooks-vue';
import { defineComponent, ExtractDefaultPropTypes, render, Transition, watch } from 'vue';

export const messageProps = () => ({
  visible: Boolean,
  tips: String
})

export type MessageProps = Partial<ExtractDefaultPropTypes<ReturnType<typeof messageProps>>>

const message = (content: JSX.Element) => {
  const Message = defineComponent({
    name: 'Message',
    props: messageProps(),
    setup(props, { slots }) {
      return () => {
        return <Transition name="vue-preview__message" appear>{props.visible ? <div class="vue-preview__message__mask"><div class="vue-preview__message__content">
          {slots.content?.()}
        </div></div> : null}</Transition>
      }
    }
  })
  const div = document.getElementById('vue-preview-message') || useCreateElement('div', { id: 'vue-preview-message' });
  document.body.appendChild(div);
  const [visible, { setFalse }] = useBoolean(true)
  render(<Message visible={visible.value} v-slots={{ content: () => content }}></Message>, div)

  return () => {
    setFalse()
    render(<Message visible={visible.value} v-slots={{ content: () => content }}></Message>, div)
  }
}

export default message