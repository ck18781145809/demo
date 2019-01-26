class Allroad {
	
	constructor(  ) {
		
		this.obj = {
			ani: {
				startPic: 701,
				picNumber: 50,
				animation: [
					{
						duration: 0.5,
						delay: 0,
						frames: {
							start: 0,
							end: 49
						}
					},
					{
						duration: 0.5,
						delay: 0,
						from: {
							alpha: 0
						},
						to: {
							alpha: 1
						}
					},
					{
						duration: 0.5,
						delay: 0.5,
						frames: {
							start: 49,
							end: 0
						}
					},
					{
						duration: 0.5,
						delay: 0.5,
						from: {
							alpha: 1
						},
						to: {
							alpha: 0
						}
					},
				]
			},
			girl: {
				startPic: 160,
				picNumber: 63,
				animation: [
					{
						duration: 1,
						delay: 0,
						frames: {
							start: 0,
							end: 62
						}
					},
					{
					  delay: 0,
					  duration: 0.2,
					  from: { y: -window.innerHeight, alpha: 0 },
					  to: { y: window.innerHeight * 0.5, alpha: 1 }
					}, 
					{
					  delay: 0.2,
					  duration: 1,
					  from: { alpha: 1 },
					  to: { alpha: 1 }
					}, 
					{
					  delay: 0.7,
					  duration: 0.3,
					  from: { y: window.innerHeight * 0.5 },
					  to: { y: window.innerHeight * 1.2 }
					}
				]
			}
		}
		
	}
	
	init( PIXI, TweenlineMax, TimelineMax ) {
		
		this.pixiInit( PIXI );
		
	}
	
	pixiInit( ) {
		
		let app = new PIXI.Application();
		
		$( document.body ).append( app.view );
		
		this.pixiRendererHandler( app );
		
		this.pixiApp = app;
		
		this.pixiSpriteInit( app );
		
		this.pixiTextInit( app )
		
		this.initTouch();
		
		// this.pixiGirlInit();
	}
	
	/**
	 * 设置pixi舞台
	 * @param app PIXI实例
	 */
	pixiRendererHandler( app ) {
		
		app.renderer.autoResize = true;
		app.renderer.backgroundColor = 0x061639;
		app.renderer.view.style.position = "fixed";
		app.renderer.view.style.display = "block";
		app.renderer.autoResize = true;
		app.renderer.resize(window.innerWidth, window.innerHeight);
		
	}
	
	/**
	 * 初始化精灵
	 * @param app PIXI实例
	 */
	pixiSpriteInit( app ) {
		
		let that = this;
		
		let imagesArr = this.pixiImagesHandler();
		
		app.loader.add( [ ...imagesArr.aniArr, ...imagesArr.girlArr, ...imagesArr.itemArr ] ).load( function() {
			
			let ani = that.spriteCreator( app, imagesArr.aniArr[0], window.innerWidth, window.innerWidth * 1376 / 750, 0.5, 0.5, window.innerWidth / 2, window.innerHeight / 2, 1 );
			let girl = that.spriteCreator( app, imagesArr.girlArr[0], window.innerWidth * 0.936, window.innerWidth * 0.936 * 1376 / 750, 0.5, 0.5, window.innerWidth / 2, -200, 0 );
			// let girl = that.spriteCreator( app, imagesArr.girlArr[0], window.innerWidth, window.innerWidth * 1376 / 750, 0.5, 0.5, window.innerWidth / 2, window.innerHeight / 2, 0 );
			
			imagesArr.itemArr.forEach( function( img, index ) {
				
				let item = that.spriteCreator( app, img, 300, 300, 0.5, 0.5, ( index + 1 ) % 2 === 0 ? window.innerWidth : 0, window.innerHeight + 300, 1 );
				
				let key = 'item' + index;
				let delay = 0.2 + ( ( index + 1 ) / 7 * 0.2)
				let x = ( index + 1 ) % 2 === 0 ? window.innerWidth * 0.65 : window.innerWidth * 0.35
				
				that.obj[ `item${index}` ] = {
					startPic: ( index + 1 ),
					picNumber: 1,
					animation: [
						{
							duration: 0.2,
							delay: delay,
							to: { x, y: -window.innerHeight * 0.2, width: 0, height: 0 }
						},
						{
							duration: 0.5 + Math.random(),
							delay: 0,
							to: { yoyo: true, repeat: -1, rotation: 0.5 }
						}
					]
				}
				
				that[`item${index}`] = item;
				
			} )
			
			that.ani = ani;
			that.girl = girl;
			
			that.animateHandler( app );
			
		} )
		
	}
	
	/**
	 * 初始化文本
	 * @param app PIXI实例
	 */
	pixiTextInit( app ) {
		
		let style = new PIXI.TextStyle({
		  fontSize: 36,
		  fill: "white",
		});
		
		let message = new PIXI.Text("爱你哟！少年", style);
		message.anchor.set( 0.5, 0.5 )
		message.position.set( window.innerWidth / 2, window.innerHeight / 2 );
		message.alpha = 0;
		
		app.stage.addChild(message);
		
		this.message = message;
		
		this.obj.message = {
			animation: [
				{
					delay: 0.9,
					duration: 0.1,
					to: { alpha: 1 }
				}
			]
		}
		
		
	}
	
	/**
	 * 把所有要加载进pixi的图片路径整合到一个数组中
	 */
	pixiImagesHandler() {
		
		//  旋涡图片
		let aniArr = [];
		
		for ( let i = 701; i < 751; i++ ) {
			
			aniArr.push( `images/ani/${i}.png` );
			
		}
		
		this.aniArr = aniArr;
		
		//  女孩图片
		let girlArr = [];
		
		for ( let i = 160; i < 223; i++ ) {
			
			girlArr.push( `images/girl/${i}.png` );
			
		}
		
		//  物品图片
		
		let itemArr = [];
		
		for ( let i = 1; i < 8; i++ ) {
			
			itemArr.push( `images/items/${i}.png` );
			
		}
		
		return { aniArr, girlArr, itemArr }
		
	}
	
	/**
	 * 生成精灵
	 * @param app PIXI实例
	 * @param t 精灵初始化图片
	 * @param w 精灵宽
	 * @param h 精灵高
	 * @param ax 精灵锚点x
	 * @param ay 精灵锚点y
	 * @param px 精灵定位x
	 * @param py 精灵定位y
	 */
	spriteCreator( app, t, w, h, ax, ay, px, py, a ) {
		
		let texture = app.loader.resources[t].texture;
		
		let sprite = new PIXI.Sprite( texture );
		
		sprite.width =  w;
		
		sprite.height = h;
		
		sprite.anchor.set( ax, ay );
		
		sprite.position.set( px, py );
		
		sprite.alpha = a;
		
		app.stage.addChild( sprite );
		
		return sprite;
		
	}
	
	/**
	 * 动画执行
	 * @param app PIXI实例
	 */
	animateHandler( app ) {
		
		let that = this,
			tl = new TimelineMax( { paused: true } );
			
		Object.keys(this.obj).forEach( function( item ) {
			
			let currentSprite = that.obj[item],
				currentObjKey = item;
				
			currentSprite.animation.forEach( function( item ) {
				
				let delay = item.delay || 0;
				
				if( item.frames ) {
					
					if( item.frames.start < item.frames.end ) {
						
						$( document.body ).on( 'progress', function( e, v ) {
							
							let progress = v;
							
							if( progress >= delay && progress <= item.duration + delay + 0.01 ) {
								
								let count = Math.floor( ( progress - item.delay ) / ( item.duration / ( item.frames.end - item.frames.start + 1 ) ) );
								
								let i = currentSprite.startPic + ( count < (item.frames.end - item.frames.start) ? count : item.frames.end - item.frames.start );
								
								that[currentObjKey].texture = PIXI.utils.TextureCache[ `images/${currentObjKey}/${i}.png` ]
							}
						} )
					
					} else if( item.frames.start > item.frames.end ) {
						
						$( document.body ).on( 'progress', function( e, v ) {
							
							let progress = v;
							
							if( progress >= delay && progress <= item.duration + delay ) {
								
								let i =  ( currentSprite.startPic + currentSprite.picNumber - 1 ) - Math.floor( ( progress - item.delay ) / ( item.duration / ( item.frames.start - item.frames.end ) ) );
								
								that[currentObjKey].texture = PIXI.utils.TextureCache[ `images/${currentObjKey}/${i}.png` ]
							}
						} )
						
					}
					
				} else if( item.from && item.to ){
					
					let tm = TweenMax.fromTo( that[currentObjKey], item.duration, item.from, item.to )
					
					tl.add( tm, delay );
					
					$( document.body ).on( 'progress', function( e, v ) {
						
						let progress = v;
						
						tl.seek( progress );
									
					} )
					
				} else if( item.to ) {
					
					let tm = TweenMax.to( that[currentObjKey], item.duration, item.to )
					
					tl.add( tm, delay );
					
					$( document.body ).on( 'progress', function( e, v ) {
						
						let progress = v;
						
						tl.seek( progress );
									
					} )
					
				}
				
			} )
			
		} )
		
	}
	
	initTouch() {
		
		let that = this;
		
		let alloyTouch = new AlloyTouch({ 
			touch: 'body',
			min: -1000,
            max: 0,
			initialValue: 0,
            change:function(value){ 
				
				value = -value / 1000;
				value = value < 0 ? 0 : Math.abs( value ); //  abs()消除-0的状态
				value = value > 1 ? 1 : value;
				
				$(document.body).trigger( 'progress', value )
				
			},
		})
		
	}
	
}