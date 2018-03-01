import React,{ Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as action from "../redux/actions/action";

// 歌曲列表组件
class SongList extends Component{
	constructor(props){
		super(props);
		this.state = {
			isMove:false  //判断是否正在滑动
		}

		// 初始化事件
		this.handldStart = this.handldStart.bind(this);
		this.handleMove = this.handleMove.bind(this);
	}

	static defaultProps = {
		hasData:false,
		hasMusicData:false,
		songList:[],  //歌曲列表的数据
		showRank:false  //是否显示排行
	}

	// 开始播放音乐
	handleStartSong(id,coverId,songName,singerName,duration){
		!this.state.isMove? this.props.songAction.startSong(id,coverId,songName,singerName,duration) : "";
	}

	handldStart(){
		this.setState({isMove:false});
	}

	handleMove(){
		this.setState({isMove:true});
	}

	render(){
		return (
			<ul className={this.props.songState.isShowPlayer? "songList_wrap mb60":"songList_wrap"}>
			{
				this.props.songList.map((item,idx) => {
					this.props.hasData? item = item.data : this.props.hasMusicData? item = item.musicData : item;
					return <li className="songList_item" key={idx} onTouchEnd={this.handleStartSong.bind(this,item.songmid,item.albummid,item.songname,item.singer[0].name,item.interval)} onTouchStart={this.handldStart} onTouchMove={this.handleMove}>
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