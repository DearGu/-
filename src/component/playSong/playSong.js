import React,{ Component } from "react";
import "../../scss/playSong.scss";

class PlaySong extends Component{
	render(){
		return(
			<div className="playSong_wrap">
				<img src="https://y.gtimg.cn/music/photo_new/T001R150x150M000002XVZaw3X63Kp.jpg?max_age=2592000" />		
				<div className="playSong_msg">
					<p className="song_name">圆</p>
					<p className="singer_name">AGA</p>
					<div className="playSong_btn pause_icon"></div>
				</div>
			</div>
		)
	}
}

export default PlaySong;