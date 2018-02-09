import React,{ Component } from "react";
import axios from "axios";
import SongList from "../songList";
import Loading from "../loading";
import Scroll from "../scroll";

// 热歌榜组件
class HotMusic extends Component{
	constructor(props){
		super(props);
		this.state = {
			hotSongList:[],  //歌曲列表
			isLoading:true   //是否显示加载图标
		}
	}

	componentDidMount() {
		// 加载热歌榜数据
		axios.get("/v8/fcg-bin/fcg_v8_toplist_cp.fcg",{
			params:{
				g_tk:5381,
				uin:0,
				format:"json",
				inCharset:"utf-8",
				outCharset:"utf-8",
				notice:0,
				platform:"h5",
				needNewCode:1,
				tpl:3,
				page:"detail",
				type:"top",
				topid:26
			}
		})
		.then(res => {
			this.setState({
				hotSongList:[...res.data.songlist.slice(0,100)],
				isLoading:false
			});
		})
		.catch(error => {
			console.log(error);
		})
	}

	render(){
		return(
			<div className="tab_item">
				<Scroll>
					<div className="hot_top">
						<div className="hot_top_title"></div>
					</div>
					{
						this.state.isLoading? <Loading></Loading>:""
					}
					<SongList songList={this.state.hotSongList} hasData={true} showRank={true}></SongList>
				</Scroll>
			</div>
		)
	}
}

export default HotMusic;