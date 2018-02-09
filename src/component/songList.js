import React,{ Component } from "react";

// 歌曲列表组件
class SongList extends Component{
	static defaultProps = {
		hasData:false,
		songList:[],  //歌曲列表的数据
		showRank:false  //是否显示排行
	}

	render(){
		return (
			<ul className="songList_wrap">
			{
				this.props.songList.map((item,idx) => {
					this.props.hasData? item = item.data : item;
					return <li className="songList_item" key={idx}>
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

export default SongList;