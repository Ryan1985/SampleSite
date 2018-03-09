$(document).ready(function () {

    var docHeight = window.innerHeight - $('.navbar').height() - $('footer').height() - 80;
    $('#allmap').height(docHeight);


    var sContent =
        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>华谊集团</h4>" +
        "<img style='float:right;margin:4px' id='imgDemo' src='../Files/timg.jpg' width='139' height='104' title='上海华谊'/>" +
        "<a href='http://www.huayitz.com/'>点击跳转</a>" +
        "</div>";


    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象


    // 百度地图API功能
    var map = new BMap.Map("allmap",{ enableMapClick: false });    // 创建Map实例
    var point = new BMap.Point(121.44855, 31.239549);
    map.centerAndZoom(point, 18);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]
    }));
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的

    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    marker.addEventListener("click", getAttr);
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    function getAttr() {
        //var p = marker.getPosition();       //获取marker的位置
        //alert("marker的位置是" + p.lng + "," + p.lat);
        marker.setAnimation(); //跳动的动画
        this.openInfoWindow(infoWindow);
        //图片加载完毕重绘infowindow
        document.getElementById('imgDemo').onload = function () {
            infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
    }





});
