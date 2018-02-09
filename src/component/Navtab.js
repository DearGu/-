import React,{ Component } from "react";
import "../scss/common.scss";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";

// 导航栏标签组件
class NavTab extends Component{
	constructor(props){
		super(props);
		this.state = {
			tabStatus:[],  //tab标签状态
			tabComponent:{}  //动态tab路由
		};
	}

	componentWillMount() {
		// 初始化tab标签状态
		this.props.tabList.map((item,idx) => {
			item.url == this.props.history.location.pathname? this.setState((prevState) => ({tabStatus:prevState.tabStatus.concat(true)})):this.setState((prevState) => ({tabStatus:prevState.tabStatus.concat(false)}));
			// 动态引入路由组件
			import(`${item.fileUrl}`).then((module) => {
				this.state.tabComponent[item.name] = module.default;
				this.setState((prevState) => ({tabComponent:prevState.tabComponent}));
			});
		});
	}

	// 网页后退时触发tab选中状态更新
	componentWillReceiveProps(nextProps) {
		nextProps.tabList.map((item,idx) => {
			item.url == nextProps.history.location.pathname? this.state.tabStatus.splice(idx,1,true):this.state.tabStatus.splice(idx,1,false);
		});
		this.setState({tabStatus:this.state.tabStatus});
	}
		

	// 导航栏tab转换
	handleTouchTab(currentIdx,url){
		this.props.tabList.map((item,idx) => {
			idx == currentIdx? this.state.tabStatus.splice(idx,1,true):this.state.tabStatus.splice(idx,1,false);
		});
		this.setState({tabStatus:this.state.tabStatus});
		this.props.history.push(url);  // 路由跳转
	}

	render(){

		return(
			<div>
				<ul className="m_nav">
				{
					// 根据配置表渲染
					this.props.tabList.map((item,idx) => {		
					return 	<li className="m_nav_item" key={idx} onTouchStart={this.handleTouchTab.bind(this,idx,item.url)} style={this.state.tabStatus[idx]? {pointerEvents:"none"}:{}}>
								
								<div className={this.state.tabStatus[idx]? "nav_tab active":"nav_tab"}>
									{item.name}										
								</div>
							</li>
					})
				}
				</ul>
				{
					// tab对应的路由
					this.props.tabList.map((item,idx) => {		
						return 	<Route key={idx} path={item.url} component={this.state.tabComponent[item.name]}/>
					})
				}
			</div>
		)
	}
}

export default NavTab;