import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../../redux/actions/action";
import axios from "axios";

class FullPlayer extends Component{
	constructor(props){
		super(props);
		this.state = {
			barWidth: 0,  //进度条总长
			progressWidth:0,  //当前进度条长度
			currentTime:0,  //当前拖拽到的时间
			startX:0,  //进度条按钮的当前位置
			currentProgress:0,
			isDraft:false
		}

		// 初始化事件
		this.handleShrink = this.handleShrink.bind(this);
		this.handleTogglePlay = this.handleTogglePlay.bind(this);
		this.fomatTime = this.fomatTime.bind(this);
		this.handleTouchBtn = this.handleTouchBtn.bind(this);
		this.handleMoveBtn = this.handleMoveBtn.bind(this);
		this.handleLeaveBtn = this.handleLeaveBtn.bind(this);
		this.handleTouchBar = this.handleTouchBar.bind(this);
		this.playSong = this.playSong.bind(this);
		this.pauseSong = this.pauseSong.bind(this);
	}

	componentDidMount() {
		// 获取播放条长度
		this.setState({barWidth:this.refs.progress_wrap.offsetWidth})
	}

	componentWillUpdate() {
		// 只有当不是拖拽时候才不断更新进度条
		if(!this.state.isDraft){
			this.refs.progress.style.width = `${this.props.progress}%`;
			this.refs.progress_block.style.transform = `translate3d(${this.props.progress/100*this.state.barWidth}px, 0px, 0px)`;
		}
	}

	// 缩小播放器
	handleShrink(){
		let {shrinkPlayer} = this.props.fullPlayerAction;
		shrinkPlayer();
	}

	// 播放暂停音乐
	handleTogglePlay(){
		let {isPlay} = this.props.fullPlayerState;
		isPlay? this.pauseSong() : this.playSong();
		this.props.fullPlayerAction.changePlay();
	}

	// 点击进度条按钮
	handleTouchBtn(e){
		e.stopPropagation();
		// 获取当前进度条位置
		this.setState({progressWidth:this.props.progress/100*this.state.barWidth,startX:e.touches[0].clientX,isDraft:true});
	}

	// 移动进度条按钮
	handleMoveBtn(e){
		e.stopPropagation();
		let currentRange = e.touches[0].clientX - this.state.startX + this.state.progressWidth;
		this.changRange(currentRange);
	}

	// 松开进度条按钮
	handleLeaveBtn(e){
		e.stopPropagation();
		let {updateSongTime} = this.props.fullPlayerAction;
		this.props.audio.songPlayer.currentTime = this.state.currentTime;
		this.props.fullPlayerAction.updateSongTime(this.state.currentTime);
		this.setState({isDraft:false});
	}

	// 点击进度条
	handleTouchBar(e){
		e.stopPropagation();
		let barOffsetLeft = this.refs.progress_wrap.offsetLeft;
		let currentRange = e.touches[0].clientX - barOffsetLeft;
		this.changRange(currentRange);
	}

	// 改变音乐进度条
	changRange(currentRange){
		let currentTime = (currentRange/this.state.barWidth) * this.props.fullPlayerState.duration;

		// 如果小于或大于总进度条长度则特殊处理
		if(currentRange < 0){
			currentRange = 0;
		}
		else if(currentRange > this.state.barWidth){
			currentRange = this.state.barWidth;
		}

		this.setState({currentTime:currentTime});
		this.refs.progress_block.style.transform = `translate3d(${currentRange}px, 0px, 0px)`;
		this.refs.progress.style.width = `${(currentRange/this.state.barWidth)*100}%`;
		this.refs.biginTime.innerHTML = this.fomatTime(currentTime);
	}

	// 格式化时间
	fomatTime(time){
		let min = parseInt(time/60);
	 	let sceond = parseInt(time%60);
	 	if(min<10){
	 		if(sceond<10){
	 			return `0${min}:0${sceond}`;
	 		}
	 		else{
	 			return `0${min}:${sceond}`;
	 		}
	 	}
	 	else{
	 		if(sceond<10){
	 			return `${min}:0${sceond}`;
	 		}
	 		else{
	 			return `${min}:${sceond}`;
	 		}
	 	}
	}

	// 播放歌曲
	playSong(){
		this.props.audio.songPlayer.play();
	}

	// 暂停歌曲
	pauseSong(){
		// 暂停动画
		let wrapper = this.refs.fullPlayer_wrap;
		let image = this.refs.fullPlayer_cover;
		let wTransform = getComputedStyle(wrapper).transform;
		let iTransform = getComputedStyle(image).transform;
		wrapper.style.transform = wTransform === 'none'? iTransform : iTransform.concat(' ', wTransform);
		this.props.audio.songPlayer.pause();
	}

	render() {
		let {isShowPlayer,isPlay,songCover,songName,singerName,isFullScreen,duration,currentTime} = this.props.fullPlayerState;
		return (
			<div className="fullPlayer_wrap">
				<img className="background_img" src={`${songCover}`}/>
				<div className="fullPlayer_top">
					<div className="shrink_wrap" onTouchStart={this.handleShrink}>
						<i className="shrink_btn"></i>
					</div>	
					<h1 className="fullPlayer_title">{songName}</h1>
					<h2 className="fullPlayer_singer">{singerName}</h2>
				</div>
				<div className="fullPlayer_cover" onTouchStart={this.handleTogglePlay}>
					<div className="fullPlayer_cover_wrap" ref="fullPlayer_wrap">
						<img className={isPlay? "cover_img play" : "cover_img"} src={`${songCover}`} ref="fullPlayer_cover"/>
					</div>
					<div className="fullPlayer_playBtn" style={isPlay? {display:"none"}:{display:"block"}}></div>
				</div>
				<div className="song_progress">
					<div className="biginTime" ref="biginTime">
					{
						this.fomatTime(currentTime)
					}
					</div>
					<div className="songProgress_wrap" ref="progress_wrap">				
						<div className="progress_inner" onTouchStart={this.handleTouchBar} onTouchEnd={this.handleLeaveBtn}>
							<div className="progress" ref="progress"></div>
							<div className="progress_btn_wrapper" ref="progress_block" onTouchStart={this.handleTouchBtn} onTouchMove={this.handleMoveBtn} onTouchEnd={this.handleLeaveBtn}>
								<div className="progress_btn"></div>
							</div>
						</div>
					</div>
					<div className="endTime">
					{
						 this.fomatTime(duration)
					}
					</div>
				</div>
				<div className="downloadBtn_wrap">
					<div className="download_btn">下载</div>
				</div>			
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		fullPlayerState:state
	}
}

const mapDispatchToProps = (dispatch)  => {
	return {
		fullPlayerAction:bindActionCreators(action,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(FullPlayer);