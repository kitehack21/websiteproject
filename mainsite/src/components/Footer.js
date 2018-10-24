import React, {Component} from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import swal from "sweetalert";
import FaHeadphones from "react-icons/lib/fa/headphones";
import { createRandomNum } from "../assets/utils.js";
import {connect} from 'react-redux'
import Cookies from 'universal-cookie'
import {addQueueCookie} from '../actions'

const options = {
    // //audio lists model
    // audioLists: [],
  
    //default play index of the audio player  [type `number` default `0`]
    defaultPlayIndex: 0,
  
    //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
    theme: "dark",
  
    // Specifies movement boundaries. Accepted values:
    // - `parent` restricts movement within the node's offsetParent
    //    (nearest node with position relative or absolute), or
    // - a selector, restricts movement within the targeted node
    // - An object with `left, top, right, and bottom` properties.
    //   These indicate how far in each direction the draggable
    //   can be moved.
    bounds: "body",
  
    //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
    //"auto|metadata|none" "true| false"
    preload: "false",
  
    //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
    glassBg: false,
  
    //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
    remember: true,
  
    //The Audio Can be deleted  [type `Boolean`, default `true`]
    remove: true,
  
    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition: {
      top: 620,
      left: 1300
    },
  
    // play mode text config of the audio player
    playModeText: {
      order: "Order",
      orderLoop: "Loop",
      singleLoop: "Single Loop",
      shufflePlay: "Shuffle"
    },
  
    //audio controller open text  [ type `String | ReactNode` default 'open']
    openText: "open",
  
    //audio controller close text  [ type `String | ReactNode` default 'close']
    closeText: "close",
  
    //audio theme switch checkedText  [ type `String | ReactNode` default '-']
    checkedText: "-",
  
    //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
    unCheckedText: "-",
  
    // audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
    notContentText: "No Music",
  
    panelTitle: "Queue",
  
    defaultPlayMode: "order",
  
    //audio mode        mini | full          [type `String`  default `mini`]
    mode: "full",
  
    /**
     * [ type `Boolean` default 'false' ]
     * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
     */
    once: true,
  
    //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
    autoPlay: false,
  
    //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
    toggleMode: true,
  
    //audio cover is show of the "mini" mode [type `Boolean` default 'true']
    showMiniModeCover: true,
  
    //audio playing progress is show of the "mini"  mode
    showMiniProcessBar: true,
  
    //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
    drag: true,
  
    //drag the audio progress bar [type `Boolean` default `true`]
    seeked: true,
  
    //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
    controllerTitle: <FaHeadphones />,
  
    //Displays the audio load progress bar.  [type `Boolean` default `true`]
    showProgressLoadBar: true,
  
    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,
  
    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,
  
    //download button display of the audio player panel   [type `Boolean` default `true`]
    showDownload: true,
  
    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showPlayMode: true,
  
    //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
    showThemeSwitch: false,
  
    //Extensible custom content       [type 'Array' default '[]' ]
    extendsContent: [],
  
    //default volume of the audio player [type `Number` default `100` range `0-100`]
    defaultVolume: 100,
  
    //playModeText show time [type `Number(ms)` default `700`]
    playModeShowTime: 600,
  
    //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
    loadAudioErrorPlayNext: true,
  
    //Music is downloaded handle
    onAudioDownload(audioInfo) {
      alert("download successfully", "", "success");
      console.log("audio download", audioInfo);
    },
  
    //audio play handle
    onAudioPlay(audioInfo) {
      console.log("audio playing", audioInfo);
    },
  
    //audio pause handle
    onAudioPause(audioInfo) {
      console.log("audio pause", audioInfo);
    },
  
    //When the user has moved/jumped to a new location in audio
    onAudioSeeked(audioInfo) {
      console.log("audio seeked", audioInfo);
    },
  
    //When the volume has changed  min = 0.0  max = 1.0
    onAudioVolumeChange(currentVolume) {
      console.log("audio volume change", currentVolume);
    },
  
    //The single song is ended handle
    onAudioEnded(audioInfo) {
      // swal("Song has ended!", "", "success");
      console.log("audio ended", audioInfo);
      console.log(audioInfo.trackId)
    },
  
    //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
    onAudioAbort(e) {
      console.log("audio abort", e);
    },
  
    //audio play progress handle
    onAudioProgress(audioInfo) {
      console.log('audio progress',audioInfo);
    },
  
    //audio reload handle
    onAudioReload(audioInfo) {
      console.log("audio reload:", audioInfo);
    },
  
    //audio load failed error handle
    onAudioLoadError(e) {
      swal("audio load error", "", "error");
      console.log("audio load err", e);
    },
  
    //theme change handle
    onThemeChange(theme) {
      console.log("theme change:", theme);
    },
  
    onAudioListsChange(currentPlayIndex, audioLists, audioInfo) {
      console.log("audio lists change:", currentPlayIndex);
      console.log("audio lists change:", audioLists);
      console.log("audio lists change:", audioInfo);
      var json_str = JSON.stringify(audioLists)
        cookies.set('queueCookie', json_str, {path: "/"})
        console.log("Make cookie")
    },
  
    onAudioPlayTrackChange(currentPlayIndex, audioLists, audioInfo) {
      console.log(
        "audio play track change:",
        currentPlayIndex,
        audioLists,
        audioInfo
      );
    },
  
    onPlayModeChange(playMode) {
      console.log("play mode change:", playMode);
    },
  
    onModeChange(mode) {
      console.log("mode change:", mode);
    },
  
    onAudioListsPanelChange(panelVisible) {
      console.log("audio lists panel visible:", panelVisible);
    },
  
    onAudioListsDragEnd(fromIndex, endIndex) {
      console.log("audio lists drag end:", fromIndex, endIndex);
    }
  };

const cookies = new Cookies();

class Footer extends Component{
  componentWillMount(){
    const theCookie = cookies.get('queueCookie');
    console.log(theCookie)
    
    if(theCookie !== undefined){
      this.props.addQueueCookie(theCookie)
    }
    else{
      console.log("No cookie")
    }
  }
  
  componentWillReceiveProps(newProps){
    const theCookie = cookies.get('queueCookie');
    console.log(theCookie)
    console.log(newProps.audioLists)
    if(newProps.audioLists !== undefined){
        var json_str = JSON.stringify(newProps.audioLists)
        cookies.set('queueCookie', json_str, {path: "/"})
        console.log("Make cookie")
    }
  }

    constructor(props) {
        super(props);
    }
    state = {
      params: options
    };
    onAddAudio = () => {
      const data = {
        ...this.state.params,
        audioLists: [
          ...this.state.params.audioLists,
          {
            name: "I'm new here",
            singer: "jack",
            cover: "http://www.lijinke.cn/music/1387583682387727.jpg",
            musicSrc: "http://www.lijinke.cn/music/201711082.mp3"
          }
        ]
      };
      this.setState({
        params: data
      });
    };
    extendsContent = () => {
      const data = {
        ...this.state.params,
        extendsContent: [
          <button key="button" onClick={() => swal("I extend content")}>
            button
          </button>
        ]
      };
      this.setState({
        params: data
      });
    };
    onShowGlassBg = () => {
      this.onChangeKey("glassBg");
    };
    onDrag = () => {
      this.onChangeKey("drag");
    };
    onToggleMode = () => {
      this.onChangeKey("toggleMode");
    };
    onSeeked = () => {
      this.onChangeKey("seeked");
    };
    onChangeKey = key => {
      const data = {
        ...this.state.params,
        [key]: !this.state.params[key]
      };
      this.setState({ params: data });
    };
    showMiniProcessBar = () => {
      this.onChangeKey("showMiniProcessBar");
    };
    showMiniModeCover = () => {
      this.onChangeKey("showMiniModeCover");
    };
    playModeShowTime = () => {
      const data = {
        ...this.state.params,
        playModeShowTime: createRandomNum(200, 2000)
      };
      this.setState({
        params: data
      });
    };
    
    render(){
      console.log(this.props.audioLists)
        const { params } = this.state;
        return(
            <ReactJkMusicPlayer {...params} audioLists={this.props.audioLists}/>
        )
    }
}

const mapStateToProps = (state) =>{
  var audioLists = state.queue
  return {audioLists}
}

export default connect(mapStateToProps, {addQueueCookie})(Footer);