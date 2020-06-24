import Player from 'xgplayer'

let closeVideo = function (player) {
  const util = Player.util, // 内置工具函数
    root = player.root // 播放器实例根元素DOM
  root.style.position = 'relative' // 因为稍后要设置关闭按钮为绝对定位，先将父元素设为相对定位
  const closeBtnHtml = `
        <div style="width: 36px;height: 36px;border-radius: 25px;background: rgba(200, 200, 200, .4);">
            <div style="width: 26px;height: 3px;background: #fff;border-radius: 10px;transform: rotate(45deg) translate(15px, 6px);"></div>
            <div style="width: 26px;height: 3px;background: #fff;border-radius: 10px;transform: rotate(-45deg) translate(-5px, 12px);"></div>
        </div>` // 关闭按钮样式
  const closeBtnDom = util.createDom('inphase-close', closeBtnHtml, {}, 'close-wrapper') // 创建按钮标签元素
  root.appendChild(closeBtnDom) // 加入根元素
  const closeWrappers = document.querySelectorAll('.close-wrapper')
  /*
  * 修改按钮位置样式
  * */
  closeWrappers.forEach(closeWrapper => {
    closeWrapper.style.position = 'absolute'
    closeWrapper.style.top = '5px'
    closeWrapper.style.right = '5px'
    closeWrapper.style.display = 'none'
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
    root.removeEventListener('mouseenter')
    root.removeEventListener('mouseleave')
    closeBtnDom.removeEventListener('click')
  })
}
Player.install('closeVideo', closeVideo)
