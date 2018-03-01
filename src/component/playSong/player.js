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
		this.playSong = this.playSong.bind(this);
	}

	// componentWillUpdate(nextProps) {
	// 	// 兼容iphone不能自动播放
	// 	let {isPlay} = this.props.playerState;
	// 	isPlay? this.props.audio.songPlayer.play() : this.props.audio.songPlayer.pause();
	// }

	// 播放暂停音乐
	handlePlay(event){
		let {isPlay} = this.props.playerState;
		event.stopPropagation();
		isPlay? this.pauseSong() : this.playSong();
		this.props.playerAction.changePlay();
	}

	// 转为全屏播放器
	changeFullPlayer(){
		let {changeFullPlayer} = this.props.playerAction;
		changeFullPlayer();
	}

	// 播放歌曲
	playSong(){
		this.props.audio.songPlayer.play();
	}

	// 暂停歌曲
	pauseSong(){
		// 暂停动画
		let wrapper = this.refs.cover_wrap;
		let image = this.refs.cover_image;
		let wTransform = getComputedStyle(wrapper).transform;
		let iTransform = getComputedStyle(image).transform;
		wrapper.style.transform = wTransform === 'none'? iTransform : iTransform.concat(' ', wTransform);
		this.props.audio.songPlayer.pause();
	}

	render(){
		let {isShowPlayer,isPlay,songCover,songName,singerName,isFullScreen} = this.props.playerState;
		return (
				<div className="playSong_wrap" style={isShowPlayer? {display:"flex"}:{display:"none"}} onTouchStart={this.changeFullPlayer}>
					<div className="cover_wrap" ref="cover_wrap">
						<img src={`${songCover}`} className={isPlay? "play" : ""} ref="cover_image"/>
					</div>	
					<div className="playSong_msg">
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