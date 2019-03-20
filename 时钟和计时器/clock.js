/**
 * Clock主体
 * @param ele : String 目标DOM
 * @param opt : Object 设置
 * @constructor
 */
function Clock( ele ) {
	
	this.parentEle = ele;
	this.clockItems = [];
	
}

Clock.prototype.init = function( opt ) {
	
	this.opt = opt || {};
	this.createElement( );

};

/**
 * 创建整个时钟的结构
 */
Clock.prototype.createElement = function( ) {
	
	let that = this;
	let textArr;
	
	if( this.opt.timer ) {
		textArr = ( this.opt.timer.number + '' ).split( '' );
	} else {
		textArr = this.dateHandler( new Date() );
	}
	
	this.currentTextArr = textArr; //  记录当前时间节点
	
	console.log( that.opt.duration ? that.opt.duration : 1000 );
	
	textArr.forEach( function( item ) {
		
		let clock = new ClockItem( that.parentEle, item, that.opt.duration || 1000, that.opt.timer?'timer':'clock', that.opt.animateDuration || that.opt.duration );
			clock.init();
			
			that.clockItems.push( clock );
		
	} )

};

/**
 *
 * @param date : Date 待处理的时间
 * @returns {[*,*]} 将时间分解成的单个字符
 */
Clock.prototype.dateHandler = function( date ) {
	
	
	let hoursArr = ( date.getHours() + '' ).padStart( 2, '0' ).split( '' );
	let minutesArr = ( date.getMinutes() + '' ).padStart( 2, '0' ).split( '' );
	
	return [ ...hoursArr, ...minutesArr ];
	
};

/**
 * 小恶魔，启动
 */
Clock.prototype.running = function( ) {
	
	let that = this;
	
	if( this.opt.timer ) {
		
		let duration = this.opt.duration || 1000;
		let timerCount = this.opt.timer.number;
		let timerCountLen = ( timerCount + '' ).length;
		
		timerGo();
		
		function timerGo( ) {
			
			setTimeout( function( ) {
				
				let text = ( --timerCount + '').padStart( timerCountLen, '0' );
				
				let textArr = text.split( '' );
				
				that.clockItems.forEach( function( item, index ) {
					
					item.move( textArr[index] );
					
				} );
				
				that.currentTextArr = textArr + '';
				
				if( timerCount === 0 ) { return; }
				
				timerGo();
				
			}, duration );
			
		}
		
		return false;
		
	}
	
	clockGo();
	
	function clockGo(  ) {
		
		setTimeout( function( ) {
			
			let textArr = that.dateHandler( new Date() );
			
			let status = that.textArrCompare( that.currentTextArr, textArr );
			
			if( status === false ) {
				
				that.clockItems.forEach( function( item, index ) {
					
					item.move( textArr[index] );
					
				} );
				
				that.currentTextArr = textArr;
			
			}
			
			clockGo();
			
		}, 5000 );
		
	}
	
};

/**
 * 比较两个textArr数组是否一样
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */
Clock.prototype.textArrCompare = function( arr1, arr2 ) {
	
	let status = true;
	
	arr1.forEach( function( item, index ) {
		
		if( item !== arr2[index] ) {
			status = false;
		}
		
	} );
	
	return status;
	
};


/**
 * 单个字符块构造函数
 * @param ele : Node 父元素
 * @param current : String 当前显示的数字
 * @param duration : Number 切换数字时间
 * @param type : String 动画类型（倒计时，时钟）
 * @param animateDuration : Number 切换数字动画时间（必须小于或等于duration）
 * @constructor
 */
function ClockItem( ele, current, duration, type, animateDuration ) {
	
	this._parentElement = document.querySelector( ele );
	this._clockCurrent = [];
	this._clockNext = [];
	this.duration = duration;
	this.type = type;
	this.animateDuration = animateDuration;
	this.currentText = current;
	
}

/**
 * 初始化
 */
ClockItem.prototype.init = function( ) {

	this.createItemElement();
	
};

/**
 * 创建DOM
 */
ClockItem.prototype.createItemElement = function( ) {

	let _clockItem = document.createElement( 'li' );
		_clockItem.className = 'clock-item';
	
		let _clockTop = document.createElement( 'div' );
			_clockTop.className = 'clock-top clock-next';
			_clockTop.innerHTML = this.nextText;
			this._clockNext.push( _clockTop );
	
		let _clockMiddle  = document.createElement( 'div' );
			_clockMiddle.className = 'clock-middle';
			this._clockMiddle = _clockMiddle;
	
			let _clockMiddleTop = document.createElement( 'div' );
				_clockMiddleTop.className = 'clock-middle-top';
				
				let _clockMiddleTopSpan = document.createElement( 'span' );
					_clockMiddleTopSpan.className = 'clock-current';
					_clockMiddleTopSpan.innerHTML = this.currentText;
					this._clockCurrent.push( _clockMiddleTopSpan );
					
				_clockMiddleTop.appendChild( _clockMiddleTopSpan );
				
			let _clockMiddleBottom = document.createElement( 'div' );
				_clockMiddleBottom.className = 'clock-middle-bottom';
	
				let _clockMiddleBottomSpan = document.createElement( 'span' );
					_clockMiddleBottomSpan.className = 'clock-next';
					_clockMiddleBottomSpan.innerHTML = this.nextText;
					this._clockNext.push( _clockMiddleBottomSpan );
	
				_clockMiddleBottom.appendChild( _clockMiddleBottomSpan );
	
			_clockMiddle.appendChild( _clockMiddleTop );
			_clockMiddle.appendChild( _clockMiddleBottom );
	
		let _clockBottom = document.createElement( 'div' );
			_clockBottom.className = 'clock-bottom clock-current';
			_clockBottom.innerHTML = this.currentText;
			this._clockCurrent.push( _clockBottom );
			
		_clockItem.appendChild( _clockTop );
		_clockItem.appendChild( _clockMiddle );
		_clockItem.appendChild( _clockBottom );
	
	this._parentElement.appendChild( _clockItem );

};

/**
 * 翻页
 * @param to : String 跳转的字符
 */
ClockItem.prototype.move = function( to ) {
	
	let animateDuration = this.animateDuration;
	let duration;
	
	if( this.type === 'timer' ) {
		duration = ( this.duration - 100 );
	} else {
		duration = this.duration;
	}
	
	if( this.currentText === to ) {
		return;
	}
	
	let that = this;
	
	this._clockNext.forEach( function( item ) {
		
		item.innerHTML = to;
		
	} );
	
	this._clockMiddle.style.animationDuration = `${ animateDuration / 1000 }s`;
	this._clockMiddle.classList.add( 'clock-down' );
	
	this.currentText = to;
	
	setTimeout( function(  ) {
		
		that._clockCurrent.forEach( function( item ) {
			
			item.innerHTML = to;
			
			that._clockMiddle.classList.remove( 'clock-down' );
			
		} );
		
	}, duration )
	
};
