import { Lightning, Utils } from '@lightningjs/sdk'

export default class HomeButton extends Lightning.Component {
    static _template() {
      return {
        w: 400, h: 200,
        flexItem: { margin: 10 }, rect: true,
        color: 0xff1f1f1f,
        collision: true,
        forceZIndexContext: true,
        Label: {
          x: 75, y: 22, mount: .5, color: 0xffffffff, text: { fontSize: 25 }
        },
        Icon: {
          x: 150, y: 75,
          src: '',
          w: 100, h: 100
        }
      }
    }
    _init() {
      this.tag('Label').patch({ text: { text: this.buttonText } });
      this.tag('Icon').patch({ src: Utils.asset(this.iconSrc) })
    }
    _focus() {
      this.color = 0xffffffff
      this.tag('Label').color = 0xff1f1f1f
    }
    _unfocus() {
      this.color = 0xff1f1f1f
      this.tag('Label').color = 0xffffffff
    }
    _handleEnter() {
      // Send a signal to the parent component to open the selected screen
      this.signal('enterScreen', this.screen);
    }

    _handleClick() {
      // Send a signal to the parent component to open the selected screen
      this.signal('enterScreen', this.screen);
    }
}