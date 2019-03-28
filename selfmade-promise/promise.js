class Promise {
	
	/**
	 * 构造函数
	 * @param executor: Function 根据规范，Promise声明的时候要传入带有resolve和reject两个参数的方法executor，这个方法会直接执行，所以写在constructor里面
	 */
	constructor( executor ) {
		
		/* Promise存在三个状态（state）pending(等待解决，初始化)、fulfilled（成功，调用resolve）、rejected（失败，调用reject或executor报错） */
		this.state = 'pending';
		
		/* 成功时，Promise不可转为其他状态，且必须有一个不可改变的值（value） */
		this.value = null;
		
		/* 失败时，Promise不可转为其他状态，且必须有一个不可改变的原因（reason） */
		this.reason = null;
	
		let resolve = value => {
			
			if( this.state === 'pending' ) {
				
				/* Promise的状态改变为成功（fulfilled） */
				this.state = 'fulfilled';
				
				/* 必须的成功的值（value） */
				this.value = value;
				
			}
			
		};
		
		let reject = reason => {
			
			if( this.state === 'pending' ) {
				
				/* Promise的状态改变为失败（rejected） */
				this.state = 'rejected';
				
				/* 必须的失败的原因（reason） */
				this.reason = reason;
				
			}
			
		};
		
		try {
			executor( resolve, reject );
		} catch( err ) {
			reject( err )
		}
		
	
	}
	
	/**
	 * 根据规范，Promise有一个叫做then的方法
	 * @param onFulfilled: Function 当状态state为成功（fulfilled）的时候执行，需要传入成功的值value
	 * @param onRejected: Function 当状态state为失败（rejected）的时候执行，需要传入失败的原因reason
	 */
	then( onFulfilled, onRejected ) {
		
		/* 状态为fulfilled，执行onFulfilled，传入成功的值 */
		if( this.state === 'fulfilled' ) {
			
			onFulfilled( this.value );
			
		}
		
		if( this.state === 'rejected' ) {
			
			onRejected( this.reason );
			
		}
	
	}
}

let p = new Promise( function( resolve, reject ) {
	
	console.log( 123 );
	resolve();
	
} );