import Player from 'xgplayer'

let closeVideo = function (player) {
  const util = Player.util, // 内置工具函数
    root = player.root // 播放器实例根元素DOM
  const closeBtnHtml = `
        <div style="width: 36px;height: 36px;border-radius: 25px;background: rgba(175, 175, 175, 0.19);cursor: pointer;">
            <div style="width: 26px;height: 3px;background: #fff;border-radius: 10px;transform: rotate(45deg) translate(15px, 7px);"></div>
            <div style="width: 26px;height: 3px;background: #fff;border-radius: 10px;transform: rotate(-45deg) translate(-6px, 12px);"></div>
        </div>` // 关闭按钮样式
  const closeBtnDom = util.createDom('inphase-close', closeBtnHtml, {}, 'close-wrapper') // 创建按钮标签元素
  root.appendChild(closeBtnDom) // 加入根元素
  const closeWrappers = document.querySelectorAll('.close-wrapper')
  /*
  * 修改按钮位置样式
  * */
  closeWrappers.forEach(closeWrapper => {
    if (!closeWrapper.style.zIndex) closeWrapper.style.zIndex = '999'
    // 设置过的dom无需设置，节约性能
    if (closeWrapper.style.position !== 'absolute') {
      closeWrapper.style.position = 'absolute'
      closeWrapper.style.top = '10px'
      closeWrapper.style.right = '10px'
      closeWrapper.style.display = 'none'
    }
  })

  function handleMouseEvent(e, display) {
    e.preventDefault()
    e.stopPropagation()
    closeWrappers.forEach(closeWrapper => {
      // 仅针对当前关闭按钮
      if (e.target.id === closeWrapper.parentNode.id)
        closeWrapper.style.display = display
    })
  }

  // 鼠标移入时，按钮出现
  root.addEventListener('mouseenter', function (e) {
    handleMouseEvent(e, 'block')
  })
  // 鼠标移出时，按钮消失
  root.addEventListener('mouseleave', function (e) {
    handleMouseEvent(e, 'none')
  })
  // 点击按钮清除视频源
  closeBtnDom.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    player.src = ''
  })
  player.once('destroy', function () {
    // 组件销毁时移除事件
    root.removeEventListener('mouseenter', () => {
    })
    root.removeEventListener('mouseleave', () => {
    })
    closeBtnDom.removeEventListener('click', () => {
    })
    player.off('destroy', () => {})
  })
}
Player.install('closeVideo', closeVideo)
