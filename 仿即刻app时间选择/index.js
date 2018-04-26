/*
 * 仿 即刻APP 时间选择组件
 * 引用layDate组件
 * Created by Chenkuo on 2018\4\19
 */
class datePicker{
	constructor() {
		this.daySelectBox      = document.querySelector( '.datePicker-content-day-select' ), //  日期选择面板
		this.yearSelectBox     = document.querySelector( '.datePicker-content-year-select' ), //  年份选择面板
		this.dayValue          = document.querySelector('.datePicker-show-day'), //  日期显示框
		this.yearValue         = document.querySelector('.datePicker-show-year'), //  年份显示框
		this.datePickerContent = document.querySelector( '.datePicker-content' ), //  显示面板容器
		this.year, //  时间状态
		this.month, //  月份状态
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
				_this.yearValueWrite( value );
				
				_this.createNewDaySelectBox();
				
				_this.reRenderDaySelect( value, _this.month, _this.day )
				
				_this.showDaySelecyBox();
				
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
	 * 初始化
	 * */
	init() {
		/*
		 * 显示内容初始赋值
		 * */
		var initDate = new Date();
		
		this.renderYearSelect();
		this.renderDaySelect( initDate.getFullYear(), ( initDate.getMonth() + 1 ), initDate.getDate() );
		
		/*
		 * 初始赋值
		 * */
		this.year = initDate.getFullYear();
		this.month = initDate.getMonth() + 1;
		this.day = initDate.getDate();
		
		this.dayValueWrite( this.year, this.month, this.day );
		
		/*
		 * 初始化点击事件
		 * */
		this.yearValueClick();
		this.dayValueClick();
	}
}

new datePicker().init();