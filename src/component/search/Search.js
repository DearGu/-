import React,{ Component } from "react";
import axios from "axios";
import SearchTab from "./searchTab";
import SongList from "../songList";
import Loading from "../loading";
import Scroll from "../scroll";

// 搜索组件
class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchValue:"",  //搜索内容
			isShowClear:false,  //是否显示清空输入内容按钮
			tabList:[],  //热搜词列表
			isShowTab:true,  //是否显示热搜标签
			isShowSinger:false,  //是否显示歌手信息
			songList:[],  //歌曲列表
			singerMsg:{},  //歌手信息
			isLoading:false,   //是否显示加载图标
			maxPage:1,  //最大页数
			currentPage:1,  //当前页数
			isShowList:true,  //是否显示列表
			lock_scroll:true  //锁定滑动
		}

		// 初始化事件
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleloadMore = this.handleloadMore.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.hadleClearText = this.hadleClearText.bind(this);
		this.handleTouchTab = this.handleTouchTab.bind(this);
	}

	componentDidMount() {
		// 加载热搜词数据
		axios.get("/splcloud/fcgi-bin/gethotkey.fcg",{
			g_tk:5381,
			uin:0,
			format:"json",
			inCharset:"utf-8",
			outCharset:"utf-8",
			notice:0,
			platform:"h5",
			needNewCode:1
		})
		.then(res => {
			this.setState({
				tabList:[...res.data.data.hotkey.slice(0,9)]
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	// 搜索歌曲歌手
	handleSearch(page,isLoadMore,event){
		this.setState({
			isLoading:true,
			lock_scroll: true
		});

		// 请求搜索数据
		axios.get("/soso/fcgi-bin/search_for_qq_cp",{
			params:{
				g_tk:5381,
				uin:0,
				format:"json",
				inCharset:"utf-8",
				outCharset:"utf-8",
				notice:0,
				platform:"h5",
				needNewCode:1,
				w:this.state.searchValue,
				zhidaqu:1,
				catZhida:1,
				t:0,
				flag:1,
				ie:"utf-8",
				sem:1,
				aggr:0,
				perpage:20,
				n:20,
				p:page,
				remoteplace:"txt.mqq.all"
			}
		})
		.then(res => {
			if(res.data.data.zhida.type == 2){  //存在歌手信息
				// 加载更多
				if(isLoadMore){
					this.setState({
						songList:[...this.state.songList,...res.data.data.song.list],
						singerMsg:{...res.data.data.zhida},
						maxPage:res.data.data.song.curnum,
						isShowList:true,
						lock_scroll:false
					});
				}
				else{
					this.setState({
						songList:[...res.data.data.song.list],
						isShowSinger:true,
						singerMsg:{...res.data.data.zhida},
						maxPage:res.data.data.song.curnum,
						isShowList:true,
						lock_scroll:false
					});
				}
			}
			else{
				// 是否加载更多
				if(isLoadMore){
					this.setState({
						songList:[...this.state.songList,...res.data.data.song.list],
						maxPage:res.data.data.song.curnum,
						isShowList:true,
						lock_scroll:false
					});
				}
				else{
					this.setState({
						songList:[...res.data.data.song.list],
						isShowSinger:false,
						maxPage:res.data.data.song.curnum,
						isShowList:true,
						lock_scroll:false
					});
				}
				
			}
			// 点击搜索后失焦
			this.refs.searchInput.blur();
		})
		.catch(error => {
			console.log(error)
		});		
	}

	// 获取输入内容
	handleInput(){
		if(this.refs.searchInput.value){
			this.setState({
				searchValue:this.refs.searchInput.value,
				isShowClear:true,
				isShowTab:false,
				isShowList:false
			});
		}else{
			this.setState({
				searchValue:this.refs.searchInput.value,
				isShowTab:true,
				lock_scroll:true
			});
		}
	}

	// 清除输入内容
	hadleClearText(){
		this.refs.searchInput.value = "";
		// 点击清除后聚焦
		this.refs.searchInput.focus();
		this.setState({
			searchValue:this.refs.searchInput.value,
			isShowClear:false,
			isShowTab:true,
			lock_scroll:true
		});
	}

	// 点击热门标签
	handleTouchTab(content){
		this.refs.searchInput.value = content.trim();
		this.setState({
			searchValue:content.trim(),
			isShowClear:true,
			isShowTab:false,
			isShowList:false
		},() => {
			this.setState({currentPage:1});
			this.handleSearch(1,false);
		});	
	}

	// 上拉加载更多
	handleloadMore(){
		// 当前页数大于最大页数则不加载更多
		if(this.state.currentPage >= this.state.maxPage){
			this.setState({
				isLoading:false
			});
		}
		else{
			this.setState({currentPage:++this.state.currentPage},() => {
				this.handleSearch(this.state.currentPage,true);
			});
		}
		
	}

	// 提交表单
	handleSubmit(event){
		// 阻止页面跳转
		event.preventDefault();
		this.setState({currentPage:1});
		this.handleSearch(1,false);
	}

	render(){
		return(
			<div className="tab_item">
				<Scroll loadMore={this.handleloadMore} isLock={this.state.lock_scroll} isLoadMore={true}>
					<form action="#" method="get" className="searchForm" onSubmit={this.handleSubmit}>
						<div className="search_wrap">
							<i className="search_icon"></i>
							<input type="search" className="search_input" placeholder="搜索歌曲、歌手、专辑" onInput={this.handleInput} ref="searchInput"/>
							{
								this.state.isShowClear? <div className="clear_warp" onTouchStart={this.hadleClearText}>
															<i className="clear_btn" ></i>
														</div>:""
							}
						</div>			
					</form>
					{
						(() => {
							if(this.state.isShowTab){
								return <SearchTab tabList={this.state.tabList} handleTouchTab={this.handleTouchTab}></SearchTab>
							}
							else{
								// 如果有歌手信息就显示歌手信息
								if(this.state.isShowList){
									if(this.state.isShowSinger){
										return 	[
												 <div className="singer_msg" key="1">
												 	<h3>最佳匹配</h3>
												 	<div className="singer_wrap">
														<img src={`https://y.gtimg.cn/music/photo_new/T001R68x68M000${this.state.singerMsg.singermid}.jpg?max_age=2592000`} />
														<div className="singer_text">
															{`歌手：${this.state.singerMsg.singername}`}
														</div>
														<i className="right_arrow"></i>
													</div>
												 </div>,
												 <SongList songList={this.state.songList} key="2"></SongList>
												]
									}
									else{
										return <SongList songList={this.state.songList}></SongList>
									}
								}
							}	
						})()
					}
					{
						this.state.isLoading? <Loading></Loading> : ""
					}
				</Scroll>
			</div>
		)
	}
}

export default Search;