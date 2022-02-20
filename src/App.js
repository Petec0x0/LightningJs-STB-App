import { Lightning, Utils } from '@lightningjs/sdk'
import HomeButton from './components/HomeButton';
import AssetList from './components/AssetList';
import { MouseEvents } from './lib/MouseEvents';

export default class App extends Lightning.Component {

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        // color: 0xfffbb03b,
        src: Utils.asset('images/background.jpg')
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
          exitScreen: true,
        }
      },
      MoviesScreenWrapper: {
        x: 50, y: 50, visible: false, type: AssetList, screen: 'MoviesScreenWrapper',
        signals: {
          exitScreen: true,
        }
      },
      SportsScreenWrapper: {
        x: 50, y: 50, visible: false, type: AssetList, screen: 'SportsScreenWrapper',
        signals: {
          exitScreen: true,
        }
      }
    }
  }

  _init() {
    this.buttonIndex = 0;
    this._setState('BtnWrapper');
  }

  _active() {
    
  }

  enterScreen(screenName){
    this.tag('BtnWrapper').visible = false;
    this.tag(screenName).visible = true;
    this._setState(screenName);
  }

  exitScreen(screenName){
    this.tag(screenName).visible = false;
    this.tag('BtnWrapper').visible = true;
    this._setState('BtnWrapper');
  }

  static _states() {
    return [
      class BtnWrapper extends this {
        $enter(){
          MouseEvents.listen(this, 'click', (element, event) => {
            if (element && element.ref) {
              console.log(element.ref, event.clientX, event.clientY);
              // this.signal('enterScreen', this.screen);
              // TV X: 80 - 475, Y: 78 - 277
              // Movies X: 500 - 895, Y: 78 - 277
              // Sports X: 918 -1317, Y: 78 - 277
              
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
      }
    ]
  }
}







