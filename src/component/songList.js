import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../redux/actions/action";

// 歌曲列表组件
class SongList extends Component{
	static defaultProps = {
		hasData:false,
		songList:[],  //歌曲列表的数据
		showRank:false  //是否显示排行
	}

	handleStartSong(id,coverId,songName,singerName){
		this.props.songAction.startSong(id,coverId,songName,singerName);
	}

	render(){
		return (
			<ul className={this.props.songState.isShowPlayer? "songList_wrap mb60":"songList_wrap"}>
			{
				this.props.songList.map((item,idx) => {
					this.props.hasData? item = item.data : item;
					return <li className="songList_item" key={idx} onClick={this.handleStartSong.bind(this,item.songmid,item.albummid,item.songname,item.singer[0].name)}>
								{
									this.props.showRank? <div className="song_rank">{idx<9? "0"+(idx+1):(idx+1)}</div>:""
								}
								<div className="song_msg">
									<div className="song_name" dangerouslySetInnerHTML={{__html:item.songname}}></div>
									<div className="song_author" dangerouslySetInnerHTML={{__html:`${item.singer[0].name} - ${item.songname}`}}></div>
									<div className="play_btn_wrap">
										<span className="play_btn"></span>
									</div>
								</div>
							</li>
				})
			}
			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		songState:state
	}
}

const mapDispatchToProps = (dispatch)  => {
	return {
		songAction:bindActionCreators(action,dispatch)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SongList);