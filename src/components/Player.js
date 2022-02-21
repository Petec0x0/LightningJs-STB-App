import { Lightning, VideoPlayer, Utils } from '@lightningjs/sdk'

export default class Player extends Lightning.Component  {

    static _template () {
        return {
            collision: true,
            forceZIndexContext: true,
            // MediaPlayer: { type: VideoPlayer },
            // Loader: {type: Loader}
        };
    }

    _firstActive() {
        VideoPlayer.consumer(this);
        // resize VideoPlayer to half its normal size
        VideoPlayer.size(1900, 750);
        // move VideoPlayer 100 pixels down and 200 pixels to the right
        // VideoPlayer.position(100, 200)
        VideoPlayer.open(Utils.asset('videos/videoplayback.mp4'));
    }
    
    _focus() {
        VideoPlayer.seek(0);
    }

    _handleEnter(){
        VideoPlayer.playPause()
    }

    _handleEsc(){
        VideoPlayer.pause();
        this.parent.enterScreen(this.parent.prevScreen);
    }

    _handleClick() {
        VideoPlayer.playPause()
    }

}