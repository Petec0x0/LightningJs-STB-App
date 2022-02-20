import { Lightning, VideoPlayer, Utils } from '@lightningjs/sdk'
import HomeButton from './components/HomeButton';
import AssetList from './components/AssetList';
import Player from './components/Player';
import { MouseEvents } from './lib/MouseEvents';

export default class App extends Lightning.Component {

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        // color: 0xfffbb03b,
        src: Utils.asset('images/background.jpg'), 
        visible: true,
      },
      BtnWrapper: {
        x: 50, y: 50, visible: true,
        flex: { direction: 'column', padding: 20, wrap: true }, rect: true, color: 0xFF2D2D2D, paddingLeft: 200,
        
        TvButton: {
          type: HomeButton, buttonText: 'TV', iconSrc: 'images/tv.png', screen: 'TvScreenWrapper',
          signals: {
            enterScreen: true,
          }
        },
        MoviesButton: {
          type: HomeButton, buttonText: 'Movies', iconSrc: 'images/movies.png', screen: 'MoviesScreenWrapper',
          signals: {
            enterScreen: true,
          }
        },
        SportsButton: {
          type: HomeButton, buttonText: 'Sports', iconSrc: 'images/sports.png', screen: 'SportsScreenWrapper',
          signals: {
            enterScreen: true,
          }
        }
      },
      TvScreenWrapper: {
        x: 50, y: 50, visible: false, type: AssetList, screen: 'TvScreenWrapper',
        signals: {
          exitScreen: true, playVideo: true,
        }
      },
      MoviesScreenWrapper: {
        x: 50, y: 50, visible: false, type: AssetList, screen: 'MoviesScreenWrapper',
        signals: {
          exitScreen: true, playVideo: true,
        }
      },
      SportsScreenWrapper: {
        x: 50, y: 50, visible: false, type: AssetList, screen: 'SportsScreenWrapper',
        signals: {
          exitScreen: true, playVideo: true,
        }
      },
      VideoPlayer: {
        x: 50, y: 50, w: 1200, visible: false, type: Player,
        Label: {
          y: 750, x: 250, color: 0xffff0000, 
          text: { 
            text: 'Press the Return/Enter key to play/pause video \nPress the Esc key to exit video player', 
            fontSize: 20,
            maxLines: 3
          }
        }
      }
    }
  }


  _init() {
    this.buttonIndex = 0;
    this.prevScreen = '';
    this._setState('BtnWrapper');
    
  }

  playVideo(screenName){
    this.prevScreen = screenName;
    this.tag(screenName).visible = false;
    this.tag('Background').visible = false;
    this.tag('BtnWrapper').visible = false;
    this.tag('VideoPlayer').visible = true;
    this._setState('VideoPlayer');
  }

  enterScreen(screenName){
    this.tag('BtnWrapper').visible = false;
    this.tag('VideoPlayer').visible = false;
    this.tag('Background').visible = true;
    this.tag(screenName).visible = true;
    this._setState(screenName);
  }

  exitScreen(screenName){
    this.tag(screenName).visible = false;
    this.tag('Background').visible = true;
    this.tag('BtnWrapper').visible = true;
    this._setState('BtnWrapper');
  }

  static _states() {
    return [
      class BtnWrapper extends this {
        $enter(){
          MouseEvents.listen(this, 'onmouseover', (element, event) => {
            if ((element && element.ref)) {
              console.log(element.ref, event.clientX, event.clientY);
              // this.signal('enterScreen', this.screen);
              // TV X: 80 - 475, Y: 78 - 277
              // Movies X: 500 - 895, Y: 78 - 277
              // Sports X: 918 - 1317, Y: 78 - 277
              if((event.clientX > 80) && (event.clientX < 475)){
                this.buttonIndex = 0;
                this._refocus();
                // this.enterScreen('TvScreenWrapper');
              }else if((event.clientX > 500) && (event.clientX < 895)){
                this.buttonIndex = 1;
                this._refocus();
                // this.enterScreen('MoviesScreenWrapper');
              }else if((event.clientX > 918) && (event.clientX < 1317)){
                this.buttonIndex = 2;
                this._refocus();
                // this.enterScreen('SportsScreenWrapper');
              }
      
            }
            
          });
        }

        _handleLeft() {
          if (this.buttonIndex != 0) {
            this.buttonIndex--
          }
        }
        _handleRight() {
          if (this.buttonIndex != 2) {
            this.buttonIndex++
          }
        }

        _getFocused() {
          return this.tag('BtnWrapper').children[this.buttonIndex]
        }
      },

      class TvScreenWrapper extends this {
        _getFocused() {
            return this.tag('TvScreenWrapper')
        }
      },

      class MoviesScreenWrapper extends this {
        _getFocused() {
            return this.tag('MoviesScreenWrapper')
        }
      },

      class SportsScreenWrapper extends this {
        _getFocused() {
            return this.tag('SportsScreenWrapper')
        }
      },

      class VideoPlayer extends this {
        _getFocused() {
            return this.tag('VideoPlayer')
        }
      }
    ]
  }
}








