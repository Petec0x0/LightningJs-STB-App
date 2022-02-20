import { Lightning, Utils } from '@lightningjs/sdk';
import AssetListItem from './AssetListItem';

export default class AssetList extends Lightning.Component {
    static _template() {
        return {
          w: 1200,
          flex: { direction: 'row', padding: 20, wrap: true }, rect: true, color: 0xFF2D2D2D, paddingLeft: 200,
        }
    }
    _init() {
        this.index = 0;
        // Fetch data based on the current screen
        if(this.screen == 'TvScreenWrapper'){
            this.url = 'data/tv.json';
        }else if(this.screen == 'MoviesScreenWrapper'){
            this.url = 'data/movies.json';
        }else if(this.screen == 'SportsScreenWrapper'){
            this.url = 'data/sports.json';
        }
        // 
        fetch(Utils.asset(this.url))
          .then(response => response.json())
          .then(data => this.setItems(data.results)).catch(()=>{
          ///Exception occured do something
        })
    }

    setItems = (items) => {
        this.children = items.map((item, index) => {
            return {
                flexItem: { margin: 10 }, 
                ref: 'AssetItem-' + index, //optional, for debug purposes
                type: AssetListItem,
                // x: index * 150, //item width + 20px margin
                item //passing the item as an attribute
            }
        })
    }
  
    _getFocused() {
        return this.children[this.index]
    }
    _handleLeft() {
        if(this.index > 0) {
            this.index--
        }
    }
    _handleRight() {
        // we don't know exactly how many items the list can have
        // so we test it based on this component's child list
        if(this.index < this.children.length - 1) {
            this.index++
        }
    }

    _handleUp() {
        if((this.index - 4) > 0) {
            this.index = this.index - 5
        }
    }

    _handleDown() {
        // we don't know exactly how many items the list can have
        // so we test it based on this component's child list
        if((this.index + 5) < this.children.length) {
            this.index = this.index + 5
        }
    }
  
    _handleEsc() {
        // Send a signal to the parent component to exit the current screen
        this.signal('exitScreen', this.screen);
    }

    _handleEnter() {
        // Send a signal to the parent component to play video
        this.signal('playVideo', this.screen);
    }

}
  
  
  
  