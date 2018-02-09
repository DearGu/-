import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../../redux/actions/action";

// 小音乐播放器组件
class Player extends Component{
	constructor(props){
		super(props);

		// 初始化事件
		this.handlePlay = this.handlePlay.bind(this);
		this.changeFullPlayer = this.changeFullPlayer.bind(this);
	}

	// 播放暂停音乐
	handlePlay(event){
		let {isPlay} = this.props.playerState;
		event.stopPropagation();
		isPlay? this.props.audio.songPlayer.pause() : this.props.audio.songPlayer.play();
		this.props.playerAction.changePlay();
	}

	// 转为全屏播放器
	changeFullPlayer(){
		let {changeFullPlayer} = this.props.playerAction;
		changeFullPlayer();
	}

	render(){
		let {isShowPlayer,isPlay,songCover,songName,singerName,isFullScreen} = this.props.playerState;
		return (
				<div className="playSong_wrap" style={isShowPlayer && !isFullScreen? {display:"flex"}:{display:"none"}} onTouchStart={this.changeFullPlayer}>
					<img src={`${songCover}`} key="cover"/>,		
					<div className="playSong_msg" key="msg">
						<p className="song_name">{songName}</p>
						<p className="singer_name">{singerName}</p>
						<div className={isPlay? "playSong_btn pause_icon":"playSong_btn play_icon"} onTouchStart={this.handlePlay}></div>
					</div>
				</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		playerState:state
	}
}

const mapDispatchToProps = (dispatch)  => {
	return {
		playerAction:bindActionCreators(action,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Player);