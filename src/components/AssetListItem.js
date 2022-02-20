import { Lightning, Utils } from '@lightningjs/sdk';

export default class AssetListItem extends Lightning.Component {
    static _template() {
        return {
            w: 200, h: 250, alpha: 0.5, src: '',
            Label: {
                x: 2, y: 150,
                color: 0xffffffff, visible: false,
                texture: lng.Tools.getRoundRect(180, 100, 4),
                flex: { direction: 'column'},
                TitleText: {
                    flexItem: { margin: 5, grow: 1  },
                    color: 0xff1f1f1f, text: { fontSize: 18,  wordWrapWidth: 80, maxLines: 3,}
                },
                LengthText: {
                    flexItem: { margin: 5},
                    color: 0xff1f1f1f, text: { fontSize: 15,}
                }
            }
        }
    }
    _init() {
        this.src = Utils.asset(this.item.poster_path);
        this.tag('Label').patch({ TitleText: { text: { text: this.item.title}}});
        this.tag('Label').patch({ LengthText: { text: { text: this.item.duration}}});
    }
    _focus() {
        this.patch({ smooth: { alpha: 1, scale: 1.2 }});
        this.tag('Label').visible = true;
    }
    _unfocus() {
        this.patch({ smooth: { alpha: 0.5, scale: 1 }});
        this.tag('Label').visible = false;
    }

    // Mouse Events
    _handleClick() {
        this.patch({ smooth: { alpha: 1, scale: 1.2 }});
        this.tag('Label').visible = true;
    }
    
    _handleHover() {
        console.log('INNER');
        this.patch({ smooth: { alpha: 1, scale: 1.2 }});
        this.tag('Label').visible = true;
    }
    
    _handleUnhover() {
        this.patch({ smooth: { alpha: 0.5, scale: 1 }});
        this.tag('Label').visible = false;
    }

}