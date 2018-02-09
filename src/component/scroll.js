import React,{ Component } from "react";

// 滑动组件
class Scroll extends Component{
	constructor(props){
		super(props);

		// 初始化事件
		this.handleLoadMore = this.handleLoadMore.bind(this);
	}

	static defaultProps = {
		isLock:false,
		isLoadMore:false  //是否需要加载更多
	}

	// 上拉加载更多
	handleLoadMore(){
		if(this.props.isLoadMore){
			const ScrollHight = document.querySelector(".wrapper").scrollHeight;
	        const ScrollTop = document.querySelector(".wrapper").scrollTop;
	        const OffsetHeight = document.querySelector(".wrapper").offsetHeight;
	        if(ScrollHight-ScrollTop-OffsetHeight<=100 && !this.props.isLock){
	        	this.props.loadMore();
	        }
	    }
	}

	render(){
		return(
			<div className="wrapper" onTouchMove={this.handleLoadMore} onScroll={this.handleLoadMore}>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Scroll;