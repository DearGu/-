import React,{ Component } from "react";
import "../../scss/playSong.scss";
import Player from "./player";
import FullPlayer from "./fullPlayer";
import { connect } from "react-redux";

// 音乐播放器组件
class PlaySong extends Component{
	render(){
		let {songUrl} = this.props.playSongState;
		return(
			<div>
				<FullPlayer></FullPlayer>
				<Player audio={this.refs}></Player>
				<audio src={`${songUrl}`} ref="songPlayer" autoPlay></audio>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		playSongState:state
	}
}

export default connect(mapStateToProps)(PlaySong);