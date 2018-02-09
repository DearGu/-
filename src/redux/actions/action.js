// 播放音乐
export const startSong = (songId,albummId,songName,singerName) => {
	return {
		type:"start_song",
		isMargin:true,  //底部是否空留播放器的高度
		isShowPlayer:true,  //是否显示播放器
		isPlay:true,  //是否正在播放 true为播放 false为暂停
		songUrl:`http://isure.stream.qqmusic.qq.com/C100${songId}.m4a?fromtag=32`,
		songCover:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummId}.jpg?max_age=2592000`,
		songName,
		singerName
	}
}

// 播放/暂停音乐
export const changePlay = () => {
	return {
		type:"change_play"
	}
} 

// 转为全屏播放器
export const changeFullPlayer = () => {
	return {
		type:"chang_fullPlayer",
		isFullScreen:true
	}
}

//转为小播放器
export const shrinkPlayer = () => {
	return {
		type:"shrink_player",
		isFullScreen:false
	}
}