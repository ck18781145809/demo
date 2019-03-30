class Promise {
	
	/**
	 * 构造函数
	 * @param executor: Function 根据规范，Promise声明的时候要传入带有resolve和reject两个参数的方法executor，这个方法会直接执行，所以写在constructor里面
	 */
	constructor( executor ) {
		
		/* Promise存在三个状态（state）pending(等待解决，初始化)、fulfilled（成功，调用resolve）、rejected（失败，调用reject或executor报错） */
		this.state = 'pending';
		
		/* 成功时，Promise不可转为其他状态，且必须有一个不可改变的值（value） */
		this.value = undefined;
		
		/* 失败时，Promise不可转为其他状态，且必须有一个不可改变的原因（reason） */
		this.reason = undefined;
		
		/* 存放then方法中的成功回调函数onFulfilled的数组 */
		this.onResolvedCallbacks = [];
		
		/* 存放then方法中的失败回调函数onRejected的数组 */
		this.onRejectedCallbacks= [];
		
		let resolve = value => {
			
			if( this.state === 'pending' ) {
				
				/* Promise的状态改变为成功（fulfilled） */
				this.state = 'fulfilled';
				
				/* 必须的成功的值（value） */
				this.value = value;
				
				/* resolve执行，调用成功数组的函数 */
				this.onResolvedCallbacks.forEach( fn => fn( ) );
				
			}
			
		};
		
		let reject = reason => {
			
			if( this.state === 'pending' ) {
				
				/* Promise的状态改变为失败（rejected） */
				this.state = 'rejected';
				
				/* 必须的失败的原因（reason） */
				this.reason = reason;
				
				/* rejected执行，调用失败数组的函数 */
				this.onRejectedCallbacks.forEach( fn => fn( ) );
				
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
		
		/* 为了then的链式调用，默认在then方法里返回一个新的Promise */
		let promise2 = new Promise( ( resolve, reject ) => {
			
			/* 状态为fulfilled，执行onFulfilled，传入成功的值 */
			if( this.state === 'fulfilled' ) {
				
				/* x为第一个Promise的返回值，要将这个返回值传入到第二个Promise中 */
				let x = onFulfilled( this.value );
				
				/* resolvePromise函数，处理返回值x和默认的promise2的关系 */
				resolvePrimise( promise2, x, resolve, reject )
				
			}
			
			/* 状态为rejected，执行onRejected，传入成功的值 */
			if( this.state === 'rejected' ) {
				
				let x = onRejected(this.reason);
				
				resolvePromise(promise2, x, resolve, reject);
				
			}
			
			/* 状态为pending，此状态是executor里面存在异步操作，而resolve方法是异步操作执行完毕后触发时会出现的状态
			 * 解决思路为：将参数onFulfilled，onRejected分别传入成功回调数组和失败回调数组中，等待上一步的异步操作完成后，遍历相应数组调用方法 */
			if( this.state === 'pending' ) {
				
				// onFulfilled传入到成功数组
				this.onResolvedCallbacks.push( ( ) => {
					
					let x = onFulfilled(this.value);
					
					resolvePromise(promise2, x, resolve, reject);
					
				} );
				// onRejected传入到失败数组
				this.onRejectedCallbacks.push( () => {
					
					let x = onRejected(this.reason);
					
					resolvePromise(promise2, x, resolve, reject);
					
				} );
				
			}
		
		} );
		
		return promise2;
		
	}
	
}

/**
 * 判断第一个Promise的then方法的返回值和promise2有什么关系
 * @param promise2：Promise then方法要返回的新的Promise实例
 * @param x then方法的返回值，可能是普通值，也可能是新的Promise实例
 * @param resolve then方法要返回的新的Promise实例的resolve方法
 * @param reject then方法要返回的新的Promise实例的reject方法
 * @returns { x } 处理后的then方法的返回值
 */
function resolvePromise( promise2, x, resolve, reject ) {

	/* 秘籍规定如果一个Promise的then方法返回自己本身，会造成循环引用 */
	if( x === promise2 ) {
		return reject( new TypeError( 'Chaining cycle detected for promise' ) )
	}
	
	/* 如果x不为空且x是对象或者函数 */
	if( x != null && ( typeof x === 'object' || typeof x === 'function' ) ) {
	
		try{
			
			/* 秘籍规定，声明then = x的then方法 */
			let then = x.then;
			
			// 防止多次调用的状态
			let called;
			
			/* 如果then是函数，就默认为是Promise的实例 */
			if( typeof then === 'function' ) {
				
				then.call( x, y => {
					
					/* resolve方法和reject方法只能调用其中一个 */
					if( called ) return;
					
					called = true;
					
					resolvePromise( promise2, y, resolve, reject );
					
				}, err => {
					
					// 成功和失败只能调用一个
					if ( called ) return;
					
					called = true;
					
					reject( err );// 失败了就失败了
					
				} )
				
			} else {
				resolve( x );
			}
			
		} catch( e ) {
			
			/* 取then的时候出错了属于失败 */
			if ( called ) return;
			
			called = true;
			
			reject( err );
			
		}
		
	}
	/* 如果x为普通值 */
	else {
		
		resolve( x );
		
	}

}

let p = new Promise( function( resolve, reject ) {
	console.log(123);
	setTimeout( function(  ) {
		console.log( 456 );
		resolve();
	}, 1500 );
	
} );

p.then( function( ) {
	console.log( 789 );
	return 890;
} );

p.then( function( value ) {
	console.log( value );
} )