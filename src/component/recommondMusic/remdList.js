import React,{ Component } from "react";

class RemdList extends Component{
	render() {
		return (
			<ul className="remd_item_wrap">
			{
				this.props.remdList.map((item,idx) => {
					return <li className="remd_item" key={idx}>
							<div>
								<img className="remd_img" src={`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`}/>
								<span className="playCount">100万</span>
							</div>
							<p className="remd_msg">{item.album_name}</p>
						</li>
					
				})
			}
			</ul>
		);
	}	
}

export default RemdList;