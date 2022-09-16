/*  
    该文件是移动端rem适配器
*/
function adapter(){
    const dpWidth = document.documentElement.clientWidth
    const rootFontSize = dpWidth / 10
    document.documentElement.style.fontSize = rootFontSize + 'px'
}
adapter()
window.onresize = adapter