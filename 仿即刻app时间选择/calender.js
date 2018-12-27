function Calender( ele ) {
	
	this.triggerElement = document.querySelector( ele ); //  触发Calender的input元素
	
}

/**
 * 插件初始化
 * @param date: String 初始化时间，不填为当前时间
 */
Calender.prototype.init = function( date ) {
	
	let initDate = date ? new Date( date ) : new Date();
	
	this.initDate = initDate; //  保留初始时间数据，选择取消时方便恢复
	
	this.createElement();
	
	this.currentValueAssign( initDate );
	
	this.dateHandler( initDate );
	
	this.yearHandler( initDate.getFullYear() );
	
	this.eventHandler();
	
};

/**
 * 在页面创建Calender结构
 */
Calender.prototype.createElement = function( ) {

	let div_calender = document.createElement( 'div' );
		div_calender.className = 'calender';
	
		let div_calender_header = document.createElement( 'div' );
			div_calender_header.classList.add( 'calender-header' );
			
			let calender_header_show_year = document.createElement( 'p' );
				calender_header_show_year.className = 'calender-show-year calender-current-year year-box';
		
			let calender_header_show_date = document.createElement( 'p' );
				calender_header_show_date.className = 'calender-show-day date-box';
		
				let calender_header_show_date_month = document.createElement( 'span' );
					calender_header_show_date_month.className = 'calender-current-month';
		
				let calender_header_show_date_day = document.createElement( 'span' );
					calender_header_show_date_day.className = 'calender-current-date';
		
				calender_header_show_date.appendChild( calender_header_show_date_month );
				calender_header_show_date.appendChild( calender_header_show_date_day );
				
		
			div_calender_header.appendChild( calender_header_show_year );
			div_calender_header.appendChild( calender_header_show_date );
			
			
		let div_calender_body = document.createElement( 'div' );
			div_calender_body.className = 'calender-body';
		
			let div_calender_body_date = document.createElement( 'div' );
				div_calender_body_date.className = 'calender-date';
				
				let div_calender_body_date_bar = document.createElement( 'div' );
					div_calender_body_date_bar.className = 'calender-date-bar';
		
					let div_calender_body_date_bar_prev = document.createElement( 'span' );
						div_calender_body_date_bar_prev.className = 'prev-month';
						
					let div_calender_body_date_bar_div = document.createElement( 'div' );
					
						let div_calender_body_date_bar_div_year = document.createElement( 'span' );
							div_calender_body_date_bar_div_year.className = 'calender-current-year';
							
						let div_calender_body_date_bar_div_month = document.createElement( 'span' );
							div_calender_body_date_bar_div_month.className = 'calender-current-month';
		
						div_calender_body_date_bar_div.appendChild( div_calender_body_date_bar_div_year );
						div_calender_body_date_bar_div.appendChild( div_calender_body_date_bar_div_month );
					
					let div_calender_body_date_bar_next = document.createElement( 'span' );
						div_calender_body_date_bar_next.className = 'next-month';
		
					div_calender_body_date_bar.appendChild( div_calender_body_date_bar_prev );
					div_calender_body_date_bar.appendChild( div_calender_body_date_bar_div );
					div_calender_body_date_bar.appendChild( div_calender_body_date_bar_next );
					
				let div_calender_body_date_content = document.createElement( 'div' );
					div_calender_body_date_content.className = 'calender-content';
		
					let div_calender_body_date_content_head = document.createElement( 'div' );
						div_calender_body_date_content_head.className = 'calender-date-head';
						
						let div_calender_body_date_content_head_weeks = document.createElement( 'ul' );
							div_calender_body_date_content_head_weeks.className = 'calender-weeks clear';
		
						div_calender_body_date_content_head.appendChild( div_calender_body_date_content_head_weeks );
		
					let div_calender_body_date_content_body = document.createElement( 'div' );
						div_calender_body_date_content_body.className = 'calender-date-body clear';
					
					div_calender_body_date_content.appendChild( div_calender_body_date_content_head );
					div_calender_body_date_content.appendChild( div_calender_body_date_content_body );
				
		
				div_calender_body_date.appendChild( div_calender_body_date_bar );
				div_calender_body_date.appendChild( div_calender_body_date_content );
				
			let div_calender_body_year = document.createElement( 'div' );
				div_calender_body_year.className = 'calender-year calender-hide clear';
		
				let div_calender_body_year_bar = document.createElement( 'div' );
					div_calender_body_year_bar.className = 'calender-date-bar';
				
					let div_calender_body_year_bar_prev = document.createElement( 'span' );
						div_calender_body_year_bar_prev.className = 'prev-year-group';
	
					let div_calender_body_year_bar_div = document.createElement( 'div' );
				
						let div_calender_body_year_bar_div_year = document.createElement( 'span' );
							div_calender_body_year_bar_div_year.className = 'calender-current-year';
				
						div_calender_body_year_bar_div.appendChild( div_calender_body_year_bar_div_year );
				
					let div_calender_body_year_bar_next = document.createElement( 'span' );
						div_calender_body_year_bar_next.className = 'next-year-group';
				
					div_calender_body_year_bar.appendChild( div_calender_body_year_bar_prev );
					div_calender_body_year_bar.appendChild( div_calender_body_year_bar_div );
					div_calender_body_year_bar.appendChild( div_calender_body_year_bar_next );
		
				let div_calender_body_year_content = document.createElement( 'div' );
					div_calender_body_year_content.className = 'calender-content clear';
		
			div_calender_body_year.appendChild( div_calender_body_year_bar );
			div_calender_body_year.appendChild( div_calender_body_year_content );
		
		
			div_calender_body.appendChild( div_calender_body_date );
			div_calender_body.appendChild( div_calender_body_year );
		
			
		let div_calender_footer = document.createElement( 'div' );
			div_calender_footer.className = 'calender-footer';
		
			let div_calender_footer_cancel = document.createElement( 'span' );
				div_calender_footer_cancel.innerHTML = '取消';
		
			let div_calender_footer_confirm = document.createElement( 'span' );
				div_calender_footer_confirm.innerHTML = '确定';
		
			div_calender_footer.appendChild( div_calender_footer_cancel );
			div_calender_footer.appendChild( div_calender_footer_confirm );
		
		div_calender.appendChild( div_calender_header );
		div_calender.appendChild( div_calender_body );
		div_calender.appendChild( div_calender_footer );
	
	document.body.appendChild( div_calender );
	
	this._calender = div_calender;
	this._yearZone = div_calender_body_year;
	this._dateZone = div_calender_body_date;
	this._yearRenderZone = div_calender_body_year_content;
	this._dateRenderZone = div_calender_body_date_content_body;
	this._weeksRenderZone = div_calender_body_date_content_head_weeks;
	this._prevMonthBtn    = div_calender_body_date_bar_prev;
	this._nextMonthBtn    = div_calender_body_date_bar_next;
	this._prevYearGroupBtn = div_calender_body_year_bar_prev;
	this._nextYearGroupBtn = div_calender_body_year_bar_next;
	this._yearZoneBtn = calender_header_show_year;
	this._dateZoneBtn = calender_header_show_date;
	this._yearShowZone = [ calender_header_show_year, div_calender_body_date_bar_div_year, div_calender_body_year_bar_div_year ];
	this._monthShowZone = [ calender_header_show_date_month, div_calender_body_date_bar_div_month ];
	this._dateShowZone = [ calender_header_show_date_day ];
	this._cancelBtn = div_calender_footer_cancel;
	this._confirmBtn = div_calender_footer_confirm;
	
};

/**
 * 当前年月日赋值
 * @param date: Date 赋值的日期
 */
Calender.prototype.currentValueAssign = function( date ) {
	
	this.currentYear  = date.getFullYear();
	this.currentMonth = date.getMonth() + 1;
	this.currentDate  = date.getDate();
	
	this.bindValue( date.getFullYear(), date.getMonth() + 1, date.getDate() );
	
};

/**
 * 绑定值到展示区域
 * @param y: String 年
 * @param m: String 月
 * @param d: String 日
 */
Calender.prototype.bindValue = function( y, m, d ) {
	
	this.triggerElement.value = y + '-' + m.toString().padStart( 2 , 0 )  + '-' + d.toString().padStart( 2 , 0 );

	/* 所有显示年份的地方赋值 */
	this._yearShowZone.forEach( function( item ) {
		
		item.innerHTML =  `${y}年`;
		
	} );
	
	/* 所有显示月份的地方赋值 */
	this._monthShowZone.forEach( function( item ) {
		
		item.innerHTML = `${m}月`;
		
	} );
	
	/* 所有显示日期的地方赋值 */
	this._dateShowZone.forEach( function( item ) {
		
		item.innerHTML = `${d}日`;
		
	} )
	
};

/**
 * 日期处理
 * @param date: Date 赋值的日期
 */
Calender.prototype.dateHandler = function( date ) {
	
	if( this._weeksRenderZone.innerHTML.length === 0 ) {
		
		this.weeksRender();
		
	}
	
	this.dateFormat( date );
	
};

/**
 * 渲染星期区域
 */
Calender.prototype.weeksRender = function( ) {
	
	let fra = document.createDocumentFragment();
	
	[ '一', '二', '三', '四','五', '六', '日' ].forEach( function( item ) {
		
		let _li = document.createElement( 'li' );
		_li.className = 'calender-item';
		_li.innerText = item;
		
		fra.appendChild( _li );
		
	} );
	
	this._weeksRenderZone.appendChild( fra );
	
};

/**
 * 当月日期格式化处理
 * @param date: Date 赋值的日期
 * @description: 传给dateRender一个按照日期和礼拜对应的关系的数组，当月前几天为'N'
 */
Calender.prototype.dateFormat = function( date ) {
	
	let dateArr = [];
	
	let totalDays = this.getFullDays( date.getFullYear(), ( date.getMonth() + 1 ) );
	
	let firstDayWeekend = this.getWeekend( date.getFullYear(), ( date.getMonth() + 1 ) );
	
	if( firstDayWeekend === 0 ) {
		firstDayWeekend = 7;
	}
	
	for( let i = 0; i < firstDayWeekend - 1; i++ ) {
		dateArr.push( 'N' );
	}
	
	for( let i = 1; i <= totalDays; i++ ) {
		dateArr.push( i );
	}
	
	this.dateRender( dateArr );
	
};

/**
 * 获取月总天数
 * @param  y: Number 年份
 * @param  m: Number 月份
 * @returns  Number   指定年月份的总天数
 * @description 设置下月天数（date）为0，则返回本月最后一天
 */
Calender.prototype.getFullDays = function( y, m ) {
	
	let date = y + '-' + Number(m) < 11 ? Number(m) + 1 : 1 + '-' + 1;
	
	let d = new Date( date );
	d.setDate( 0 );
	
	return d.getDate();
	
};

/**
 * 渲染目标月份第一天的星期
 * @param  y: Number 年份
 * @param  m: Number 月份
 * @return Number 当月第一天是星期几
 */
Calender.prototype.getWeekend = function( y, m ) {
	
	let date = y + '-' + m + '-' + 1;
	
	let d = new Date( date );
	
	return d.getDay();
	
};

/**
 * 日期渲染处理
 * @param dates: Array 当月按照星期排列的数组
 */
Calender.prototype.dateRender = function( dates ) {
	
	let _this = this;
	
	this._dateRenderZone.innerHTML = '';
	
	let fra = document.createDocumentFragment();
	
	dates.forEach( function( item ) {
		
		let _div = document.createElement( 'div' );
			_div.className = 'calender-item';
			
		if( item === 'N' ) {
			
			_div.innerHTML = '';
			
		} else {
			
			_div.innerText = item;
			_div.addEventListener( 'click', _this.dateItemClick.bind( _this, _this.currentYear, _this.currentMonth, item ) );
			
		}
		
		if( item === _this.currentDate ) {
			
			_div.classList.add( 'active' );
			
		}
		
		fra.appendChild( _div );
		
	} );
	
	this._dateRenderZone.appendChild( fra );
	
};

/**
 * 点击日期按钮
 */
Calender.prototype.dateItemClick = function( y, m ,d ) {
	
	this.currentDate = d;
	
	this.bindValue( y, m, d );
	
	Array.from( this._dateRenderZone.children ).forEach( function( item ) {
		
		if( item.innerHTML === d + '' ) {
			
			item.classList.add( 'active' );
			
		} else {
			
			item.classList.remove( 'active' );
			
		}
		
	} );
	
};

/**
 * 渲染年份
 * @param y：Number 年份
 */
Calender.prototype.yearHandler = function( y ) {
	
	this._yearRenderZone.innerHTML = '';
	
	let fra = document.createDocumentFragment();
	
	for( let i = 0; i < 18; i++ ) {
		
		let _div = document.createElement( 'div' );
			_div.className = 'calender-year-item' + ( y + i === this.currentYear ? ' active' : '' );
			_div.innerHTML = y + i;
			_div.addEventListener( 'click', this.yearItemClick.bind( this, y + i, this.currentMonth, this.currentDate ) );
		
		fra.appendChild( _div );
	}
	
	this._yearRenderZone.appendChild( fra );
	
	this.bindValue( this.currentYear, this.currentMonth, this.currentDate );
	
};

/**
 * 点击年份按钮
 */
Calender.prototype.yearItemClick = function( y, m, d ) {
	
	this.bindValue( y, m, d );
	
	this.changeHandler( y + '-' + m + '-' + d );
	
	this._dateZone.classList.remove( 'calender-hide' );
	this._yearZone.classList.add( 'calender-hide' );
	
	this.yearRerunHandler( y )
	
};

/**
 * 事件处理
 */
Calender.prototype.eventHandler = function( ) {
	
	let _this = this;
	
	/* 上月按钮 */
	this._prevMonthBtn.addEventListener( 'click', function( ) {
		
		_this.currentYear  = _this.currentMonth > 1 ? _this.currentYear : _this.currentYear - 1;
		_this.currentMonth = _this.currentMonth > 1 ? _this.currentMonth - 1 : 12;
		
		_this.changeHandler( _this.currentYear + '-' + _this.currentMonth  + '-' + _this.currentDate );
		
	} );
	
	/* 下月按钮 */
	this._nextMonthBtn.addEventListener( 'click', function( ) {
		
		_this.currentYear  = _this.currentMonth < 12 ? _this.currentYear : _this.currentYear + 1;
		_this.currentMonth = _this.currentMonth < 12 ? _this.currentMonth + 1 : 1;
		
		_this.changeHandler( _this.currentYear + '-' + _this.currentMonth  + '-' + _this.currentDate );
		
	} );
	
	/* 上年按钮 */
	this._prevYearGroupBtn.addEventListener( 'click', function( ) {
		
		_this.currentYear = _this.currentYear - 18;
		
		_this.yearHandler( _this.currentYear );
		
	} );
	
	/* 下年按钮 */
	this._nextYearGroupBtn.addEventListener( 'click', function( ) {
		
		_this.currentYear = _this.currentYear + 18;
		
		_this.yearHandler( _this.currentYear );
		
	} );
	
	/* 切换到年选择面板 */
	this._yearZoneBtn.addEventListener( 'click', function( ) {
		
		_this._yearZone.classList.remove( 'calender-hide' );
		_this._dateZone.classList.add( 'calender-hide' );
		
	} );
	
	/* 切换到日选择面板 */
	this._dateZoneBtn.addEventListener( 'click', function( ) {
		
		_this._dateZone.classList.remove( 'calender-hide' );
		_this._yearZone.classList.add( 'calender-hide' );
		
	} );
	
	/* 点击触发Calender的input框 */
	this.triggerElement.addEventListener( 'click', function( ) {
		
		_this._calender.style.display = 'block';
		
	} );
	
	/* 点击取消按钮 */
	this._cancelBtn.addEventListener( 'click', function( ) {
		
		_this._calender.style.display = 'none';
		
		_this.currentValueAssign( _this.initDate );
		
	} );
	
	/* 点击确定按钮 */
	this._confirmBtn.addEventListener( 'click', function( ) {
		
		_this._calender.style.display = 'none';
		
		_this.initDate = new Date( `${ _this.currentYear }-${ _this.currentMonth }-${ _this.currentDate }` );
		
	} );
	
};

/**
 * 初始化后日期改变处理器
 * @param date: String 改变后的时间
 */
Calender.prototype.changeHandler = function( date ) {
	
	date = new Date( date );
	
	this.currentValueAssign( date );
	
	this.dateHandler( date );
	
	this.yearRerunHandler( date.getFullYear() );
	
};

/**
 * 当前年份重新渲染
 * @param y：Number 年份
 * @description: 年份不超过框内的，切换状态，超过就重新渲染。
 *               重新渲染前18年当前年在最后，渲染后18年当前年在最前面。
 */
Calender.prototype.yearRerunHandler = function( y ) {
	
	let _years = this._yearRenderZone.children;
	
	if( _years[0].innerHTML <= y && _years[17].innerHTML >= y ) {
		
		Array.from( _years ).forEach( function( item ) {
			
			if( item.innerHTML === y + '' ) {
				
				item.classList.add( 'active' );
				
			} else {
				
				item.classList.remove( 'active' );
				
			}
			
		} )
		
	}
	else {
		this.yearHandler( y - 17 );
	}
	
};
