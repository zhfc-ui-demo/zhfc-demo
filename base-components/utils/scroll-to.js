// 缓动函数
function easeInOutQuad(t, b, c, d) {
    t /= d / 2
    if (t < 1) {
        return c / 2 * t * t + b
    }
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
}

/**
 * 平滑滚动
 * @param {HTMLElement} el 滚动元素
 * @param {number} to 滚动位置
 * @param {number} duration 滚动时间
 * @param {Function} callback 回调函数
 */
function scrollTo(el, to, duration, callback) {
    const start = el.scrollTop
    const change = to - start
    const increment = 20
    let currentTime = 0
    duration = duration || 500

    let animateScroll = function () {
        currentTime += increment

        // 滚动元素
        let val = easeInOutQuad(currentTime, start, change, duration)
        el.scrollTop = val

        // 动画未完成继续滚动，完成则回调
        if (currentTime < duration) {
            window.requestAnimationFrame(animateScroll)
        } else {
            if (callback && typeof (callback) === 'function') {
                callback()
            }
        }
    }
    animateScroll()
}

export default scrollTo