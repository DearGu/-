import React,{ Component } from "react";
import axios from "axios";
import "../../scss/artList.scss";
import Scroll from "../scroll";
import SongList from "../songList";
import PlaySong from "../playSong/playSong";
import { connect } from "react-redux";

class ArtList extends Component{
	constructor(props){
		super(props);
		this.state = {
			cover_url:"",  //封面图片地址
			singer_name:"",  //歌手名字
			msg:"",  //歌手信息
			isSpread:false,  //是否展开歌手信息
			songList:[]  //歌曲列表
		}

		// 初始化事件
		this.handleDesc = this.handleDesc.bind(this);
	}

	componentDidMount() {
		axios.get("/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",{
			params:{
				"singermid":`${this.props.match.params.id}`,
				"g_tk":5381,
				"uin":0,
				"format":"json",
				"inCharset":"utf-8",
				"outCharset":"utf-8",
				"notice":0,
				"platform":"h5page",
				"needNewCode":1,
				"order":"listen",
				"from":"h5",
				"num":50,
				"begin":0
			}
		})
		.then(res => {
			this.setState({
				cover_url:res.data.data.albumlist[0].pic,
				singer_name:res.data.data.singer_name,
				msg:res.data.data.SingerDesc,
				songList:[...res.data.data.list.slice(0,50)],
			});
		})
		.catch(err => {
			console.log(err);
		})
	}

	// 展开或省略歌手信息
	handleDesc(){
		this.setState({isSpread:!this.state.isSpread});
	}

	render(){
		let {isSpread} = this.state;
		return (
			<div className="artList_warp">
				<Scroll isTop={true}>
					<div className="artList_cover">
						<img src={this.state.cover_url}/>
						<p className="artist_name">{this.state.singer_name}</p>
					</div>
					<div className="artList_msg">
						<div className="desc_wrap">
							<div className={isSpread? "":"desc"} ref="desc">{this.state.msg}</div>
							<div className={isSpread? "omit_btn":"spread_btn"} onTouchEnd={this.handleDesc}></div>
						</div>
					</div>
					<p className="hotSong">热门50单曲</p>
					<SongList songList={this.state.songList} hasMusicData={true} showRank={true}></SongList>
				</Scroll>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		artListState:state
	}
}

export default connect(mapStateToProps)(ArtList);