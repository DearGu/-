const toDo = (state = {songUrl:"",songCover:"",songName:"",singerName:""},action) => {
	switch(action.type){
		case "start_song":
			return Object.assign({},state,{
						songUrl:action.songUrl,
						isShowPlayer:action.isShowPlayer,
						isPlay:action.isPlay,
						songCover:action.songCover,
						songName:action.songName,
						singerName:action.singerName
					});
			break;
		case "change_play":
			return Object.assign({},state,{isPlay:!state.isPlay});
			break;
		case "chang_fullPlayer":
			return Object.assign({},state,{isFullScreen:action.isFullScreen});
			break;
		case "shrink_player":
			return Object.assign({},state,{isFullScreen:action.isFullScreen});
			break;
		default:
			return state;
	}
}

export default toDo;