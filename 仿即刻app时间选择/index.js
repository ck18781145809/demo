/*
 * 仿 即刻APP 时间选择组件
 * 引用layDate组件
 * Created by Chenkuo on 2018\4\19
 */
class datePicker{
	constructor() {
		this.year; //  时间状态
		this.month; //  月份状态
		this.day; //  日期状态
	}
	
	/*
	 * 点击header的年份
	 * */
	yearValueClick() {
		var _this = this;
		this.yearValue.onclick = function( e ) {
			_this.showYearSelectBox();
		}
	}
	
	/*
	 * 切换到年份选择面板
	 * */
	showYearSelectBox() {
		//  隐藏日期选择框
		this.daySelectBox.classList.add( 'hide' );
		
		//  显示年份选择框
		this.yearSelectBox.classList.remove( 'hide' );
		this.yearSelectBox.classList.add( 'show' );
	}
	
	/*
	 * 点击header的日期
	 * */
	dayValueClick() {
		var _this = this;
		this.dayValue.onclick = function( e ) {
			_this.showDaySelecyBox();
		}
	}
	
	/*
	 * 切换到日期选择面板
	 * */
	showDaySelecyBox() {
		//  隐藏年份选择框
		this.yearSelectBox.classList.add( 'hide' );
		
		//  显示日期选择框
		this.daySelectBox.classList.remove( 'hide' );
		this.daySelectBox.classList.add( 'show' );
	}
	
	/*
	 * 年份显示框赋值
	 * */
	yearValueWrite( year ) {
		this.yearValue.innerText = year;
	}
	
	/*
	 * 月份显示框赋值
	 * */
	dayValueWrite( year, month, day ) {
		this.yearValueWrite( year );
		this.dayValue.innerText = month + "月" + day + '日';
	}
	
	/*
	 * 渲染年份选择面板
	 * */
	renderYearSelect() {
		var _this = this;
		/*
		 * 年份选择初始化
		 * */
		laydate.render({
			elem: '.datePicker-content-year-select',
			type: 'year',
			position: 'static',
			showBottom: false,
			change: function(value, date, endDate){
				_this.year  = date.year;
				_this.yearValueWrite( value );
				_this.createNewDaySelectBox();
				_this.renderDaySelect( value, _this.month, _this.day )
				_this.showDaySelecyBox();
				
				/* 当前时间 */
				// console.log( _this.year, _this.month, _this.day )
			}
		});
	}
	
	/*
	 * 渲染日期选择面板
	 * */
	renderDaySelect( year, month, day ) {
		var _this = this;
		laydate.render({
			elem: '.datePicker-content-day-select',
			position: 'static',
			showBottom: false,
			value: year + '-' + month + '-' + day,
			change: function(value, date, endDate){
				_this.dayValueWrite( date.year, date.month, date.date );
				_this.year  = date.year;
				_this.month = date.month;
				_this.day   = date.date;
				
				/* 当前时间 */
				// console.log( _this.year, _this.month, _this.day )
			}
		});
	}
	
	/*
	 * 重新创建日期选择面板
	 * */
	createNewDaySelectBox() {
		this.datePickerContent.removeChild( this.daySelectBox )
		
		var newDaySelectBox = document.createElement( 'div' );
		newDaySelectBox.className = 'datePicker-content-select datePicker-content-day-select hide';
		
		this.daySelectBox = newDaySelectBox;
		
		this.datePickerContent.appendChild( newDaySelectBox );
	}
	
	/*
	 * 渲染组件HTML
	 * */
	renderHTML() {
		
		let that = this;
	
		let _datePickerHeader = document.createElement( 'div' );
			_datePickerHeader.className = 'datePicker-header';
		let _datePickerShowYear = document.createElement( 'p' );
			_datePickerShowYear.className = 'datePicker-show-year';
		let _datePickerShowDay = document.createElement( 'p' );
			_datePickerShowDay.className = 'datePicker-show-day';
		
		this.dayValue  = _datePickerShowDay;
		this.yearValue = _datePickerShowYear;
		
		_datePickerHeader.appendChild( _datePickerShowYear );
		_datePickerHeader.appendChild( _datePickerShowDay );
		
		
		let _datePickerContent = document.createElement( 'div' );
			_datePickerContent.className = 'datePicker-content';
		let _datePickerContentDaySelect = document.createElement( 'div' );
			_datePickerContentDaySelect.className = 'datePicker-content-select datePicker-content-day-select';
		let _datePickerContentYearSelect = document.createElement( 'div' );
			_datePickerContentYearSelect.className = 'datePicker-content-select datePicker-content-year-select hide';
		
		this.datePickerContent = _datePickerContent;
		this.daySelectBox      = _datePickerContentDaySelect;
		this.yearSelectBox     = _datePickerContentYearSelect;
		
		_datePickerContent.appendChild( _datePickerContentDaySelect );
		_datePickerContent.appendChild( _datePickerContentYearSelect );
		
		
		let _datePickerFooter = document.createElement( 'div' );
			_datePickerFooter.className = 'datePicker-footer';
		let _datePickerFooterCancel = document.createElement( 'a' );
			_datePickerFooterCancel.innerText = '取消';
			_datePickerFooterCancel.onclick = function( ) {
				that.cancelHandler();
			};
		let _datePickerFooterConfirm = document.createElement( 'a' );
			_datePickerFooterConfirm.innerText = '确定';
			_datePickerFooterConfirm.onclick = function(  ) {
				that.confirmHandler();
			};
		
		_datePickerFooter.append( _datePickerFooterCancel );
		_datePickerFooter.append( _datePickerFooterConfirm );
		
		let _datePicker = document.createElement( 'div' );
			_datePicker.className = 'datePicker';
			
		this.datePicker = _datePicker;
		
		_datePicker.appendChild( _datePickerHeader );
		_datePicker.appendChild( _datePickerContent );
		_datePicker.appendChild( _datePickerFooter );
		
		document.body.appendChild( _datePicker );
		
	}
	
	/*
	 * 组件确定点击事件
	 * */
	confirmHandler() {
		
		this.targetElement.value = this.year + '-' + this.month + '-' + this.day;
		this.datePicker.classList.add( 'hide' );
		
	}
	
	/*
	 * 组件确定点击事件
	 * */
	cancelHandler(  ) {
		
		this.datePicker.classList.add( 'hide' );
		
	}
	
	/*
	 * 初始化
	 * */
	init( ele ) {
		
		let that = this;
		
		this.targetElement = document.querySelector( ele );
		this.targetElement.addEventListener( 'click', function(  ) {
			if( that.datePicker ) {
				
				that.datePicker.classList.remove( 'hide' )
				
			} else {
				
				that.renderHTML();
				
				/*
				 * 显示内容初始赋值
				 * */
				let initDate = new Date();
				
				that.renderYearSelect();
				that.renderDaySelect( initDate.getFullYear(), ( initDate.getMonth() + 1 ), initDate.getDate() );
				
				/*
				 * 初始赋值
				 * */
				that.year = initDate.getFullYear();
				that.month = initDate.getMonth() + 1;
				that.day = initDate.getDate();
				
				that.dayValueWrite( that.year, that.month, that.day );
				
				/*
				 * 初始化点击事件
				 * */
				that.yearValueClick();
				that.dayValueClick();
				
			}
		} );
		
	}
}
