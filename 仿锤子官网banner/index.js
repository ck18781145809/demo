( function( win, doc ) {
				
	var _bannerWrap = doc.querySelector( '.banner' ), //  banner包围
	    _banner = doc.querySelector( '.banner-content' ); //  banner要旋转的部分
	
	_banner.addEventListener( 'mousemove', function(e) {
		var _mousePosLeft = e.offsetX, //  鼠标当前横坐标
			_mousePosTop  = e.offsetY, //  鼠标当前纵坐标
			_centerV      = ( this.clientWidth / 2 ), //  中心点横坐标
			_centerH      = ( this.clientHeight / 2 ); //  中心点纵坐标
		
		/* 旋转比例 */
		var _propY = ( 1 / _centerV ), // Y轴（横向）转动比例，最大1度
			_propX = ( 2 / _centerH ); // X轴（竖向）转动比例，最大2度
		
		/* 旋转角度 */
		var _degY = ( _mousePosLeft - _centerV ) * _propY; //  Y轴（横向）旋转角度
		var _degX = ( _mousePosTop - _centerH > 0 ) ? - ( _mousePosTop - _centerH ) * _propX : Math.abs( ( _mousePosTop - _centerH ) * _propX ); //  X轴（竖向旋转家角度）
		
		this.style.transform = 'rotateX( ' + _degX + 'deg ) rotateY( ' + _degY + 'deg )';
	} )
	
	_bannerWrap.addEventListener( 'mouseleave', function(e) {
		_banner.style.transform = 'none';
	} )
	
} )( window, document )

/*
 * 旋转角度计算
 * Y轴（横向）：鼠标位置减去中心点位置的符号和旋转角度的符号是相同的
 * X轴（竖向）：鼠标位置减去中心点位置的符号和旋转角度的符号是相反的，所以要变换正负号
 * */