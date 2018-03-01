const toDo = (state = {songUrl:"",songCover:"",songName:"",singerName:""},action) => {
	switch(action.type){
		case "start_song":
			return Object.assign({},state,{
						songUrl:action.songUrl,
						isShowPlayer:action.isShowPlayer,
						isPlay:action.isPlay,
						isOpenPlayer:action.isOpenPlayer,
						isChangeSong:action.isChangeSong,
						songCover:action.songCover,
						songName:action.songName,
						singerName:action.singerName,
						duration:action.duration
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
		case "upadte_songTime":
			return Object.assign({},state,{currentTime:action.currentTime});
			break;
		case "not_changeSong":
			return Object.assign({},state,{isChangeSong:action.isChangeSong});
			break;
		default:
			return state;
	}
}

export default toDo;