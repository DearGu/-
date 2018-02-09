import React,{ Component } from "react";
import RemdList from "./remdList";
import SongList from "../songList";
import Loading from "../loading";
import Scroll from "../scroll";
import axios from "axios";

// 推荐歌曲组件
class RecommondMusic extends Component{
	constructor(props){
		super(props);
		this.state = {
			remdList:[],
			newSongList:[],
			isLoading:true
		}
	}

	componentDidMount() {
		// 读取推荐歌单数据
		axios.get('/v8/fcg-bin/album_library',{
			params:{
				g_tk:414276976,
				format:"json",
				inCharset:"utf8",
				outCharset:"utf-8",
				notice:0,
				platform:"yqq",
				needNewCode:0,
				cmd:"firstpage",
				page:0,
				pagesize:6,
				sort:2,
				language:-1,
				genre:0,
				year:1,
				pay:0,
				type:-1,
				company:-1
			}
		})
	    .then(res => {
	    	this.setState({
	    		remdList:[...res.data.data.albumlist],
	    		isLoading:false
	    	});
	    })
	    .catch(error => {
	        console.log(error);
	    });

	    // 读取最新歌曲
	    axios.get('/v8/fcg-bin/fcg_v8_album_info_cp.fcg',{
	    	params:{
	    		albummid:"002aKNvP1jyW2C",
	    		g_tk:414276976,
	    		format:"json",
	    		inCharset:"utf8",
	    		outCharset:"utf-8",
	    		notice:0,
	    		platform:"yqq",
	    		needNewCode:0
	    	}
	    })
	    .then(res => {
	    	this.setState({newSongList:[...res.data.data.list.slice(0,10)]});
	    })
	    .catch(error => {
	    	console.log(error);
	    });
	}

	render(){
		return(
			<div className="tab_item">
				<Scroll>
					<div className="tab_item_title">推荐歌单</div>
					<RemdList remdList={this.state.remdList}></RemdList>
					<div className="tab_item_title">最新音乐</div>
					{
						this.state.isLoading? <Loading></Loading>:""
					}
					<SongList songList={this.state.newSongList}></SongList>
				</Scroll>
			</div>
		)
	}
}

export default RecommondMusic;