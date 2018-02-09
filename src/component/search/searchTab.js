import React,{ Component } from "react";

// 热门搜索标签组件
class SearchTab extends Component{
	constructor(props){
		super(props);
	}

	// 把点击内容返回到父组件
	handleTouchTab(content){
		this.props.handleTouchTab(content);
	}

	render(){
		const {tabList} = this.props;
		return(
			<div className="hot_tab_list">
				<h3>热门搜索</h3>
				<ul className="hot_tab_wrap">
				{
					tabList.map((item,idx) => <li key={idx} className="search_tab" onTouchStart={this.handleTouchTab.bind(this,item.k)}>{item.k}</li>)
				}
				</ul>
			</div>
		)
	}
}

export default SearchTab;
