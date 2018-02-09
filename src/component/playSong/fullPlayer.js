import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../../redux/actions/action";

class FullPlayer extends Component{
	constructor(props){
		super(props);

		// 初始化事件
		this.handleShrink = this.handleShrink.bind(this);
	}

	// 缩小播放器
	handleShrink(){
		let {shrinkPlayer} = this.props.fullPlayerAction;
		shrinkPlayer();
	}

	render() {
		let {isShowPlayer,isPlay,songCover,songName,singerName,isFullScreen} = this.props.fullPlayerState
		return (
			<div className="fullPlayer_wrap" style={isFullScreen? {display:"block"}:{display:"none"}}>
				<img className="background_img" src={`${songCover}`}/>
				<div className="fullPlayer_top">
					<div className="shrink_wrap" onTouchStart={this.handleShrink}>
						<i className="shrink_btn"></i>
					</div>	
					<h1 className="fullPlayer_title">{songName}</h1>
					<h2 className="fullPlayer_singer">{singerName}</h2>
				</div>
				<div className="fullPlayer_cover">
					<img className="cover_img" src={`${songCover}`}/>
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