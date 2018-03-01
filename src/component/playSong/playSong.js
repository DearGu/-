import React,{ Component } from "react";
import "../../scss/playSong.scss";
import Player from "./player";
import FullPlayer from "./fullPlayer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../../redux/actions/action";

// 音乐播放器组件
class PlaySong extends Component{
	constructor(props){
		super(props);
		this.state = {
			progress:0
		}

		// 初始化事件
		this.handleUpateTime = this.handleUpateTime.bind(this);
	}

	componentDidMount() {
		let {songUrl} = this.props.playSongState;
		songUrl? this.refs.songPlayer.play() : "";
	}

	componentDidUpdate() {
		let {isPlay,songUrl,isChangeSong} = this.props.playSongState;
		isChangeSong? this.refs.songPlayer.load() : "";
		isPlay? this.refs.songPlayer.play() : this.refs.songPlayer.pause();
	}

	// 更新当前播放时间
	handleUpateTime(){
		let {isChangeSong} = this.props.playSongState;
		this.props.playSongAction.updateSongTime(this.refs.songPlayer.currentTime);
		isChangeSong? this.props.playSongAction.notChangSong() : ""
		// 进度条百分比
		this.setState({progress:(this.refs.songPlayer.currentTime/this.props.playSongState.duration)*100});
	}

	render(){
		let {songUrl,isFullScreen} = this.props.playSongState;
		return(
			<div>
				{
					isFullScreen? <FullPlayer audio={this.refs} progress={this.state.progress}></FullPlayer> : <Player audio={this.refs}></Player>
				}	
				<audio src={`${songUrl}`} ref="songPlayer" loop onTimeUpdate={this.handleUpateTime}></audio>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		playSongState:state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		playSongAction:bindActionCreators(action,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaySong);