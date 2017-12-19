(function(){
	//暴露变量
	window.Carousel=Carousel;
	//轮播图类
	function Carousel(JSON){
		this.$dom=$('#'+JSON.id);
		this.$imagesUl=null;
		this.$imagesUlLis=null;
		this.$circleOl=null;
		this.$circleOlLis=null;
		this.width=JSON.width;
		this.height=JSON.height;
		this.interval=JSON.interval;
		this.$leftBtn=null;
		this.$rightBtn=null;
		this.$animateTime=JSON.animateTime;
		//信号量
		this.idx=0;
		//获取图片数量
		this.pictureLength=JSON.imagesurl.length;
		//获取图片地址
		this.imagesURLArray=JSON.imagesurl;
		//初始化
		this.init();
		//监听
		this.bindEvent();
	}
	Carousel.prototype.init=function(){
		//创建dom上树
		this.$imagesUl=$("<ul></ul>");
		this.$dom.append(this.$imagesUl);
		//创建li节点
		for(var i=0;i<this.pictureLength;i++){
			$('<li><img src="'+ this.imagesURLArray[i] + '"/></li>').appendTo(this.$imagesUl);
		}
		//获得引用
		this.$imagesUlLis=this.$imagesUl.find('li');
		//布局
		this.$dom.css({"width":this.width,"height":this.height,"position":"relative","overflow":"hidden"})
		//将图放置到右侧“藏”起来
		this.$imagesUlLis.css({"position":"absolute","left":this.width,"top":0});
		//将第一张拉回来
		this.$imagesUlLis.eq(0).css("left",0);
		
		//创建按钮
		this.$leftBtn=$("<a href='javascript:;' class='leftBtn'></a>");
		this.$rightBtn=$("<a href='javascript:;' class='rightBtn'></a>")
		this.$leftBtn.appendTo(this.$dom);
		this.$rightBtn.appendTo(this.$dom);
		
		//小圆点
		this.$circleOl=$("<ol class='circles'></ol>");
		this.$circleOl.appendTo(this.$dom);
		//创建li节点
		for(var i=0;i<this.pictureLength;i++){
			$('<li></li>').appendTo(this.$circleOl);
		}
		this.$circleOlLis= this.$circleOl.find('li');
		this.$circleOlLis.eq(0).addClass('cur');
		this.autoPlay();
	}
	
	Carousel.prototype.bindEvent=function(){
		var self=this
		this.$rightBtn.click(function(){
			if(self.$imagesUlLis.is(":animated")){
				return;
			}
			self.showNext();
		})
		this.$leftBtn.click(function(){
			if(self.$imagesUlLis.is(":animated")){
				return;
			}
			self.showPrev();
		})
		this.$circleOlLis.click(function(){
			self.show($(this).index());
		})
		//鼠标悬停停止定时器
		this.$dom.mouseenter(function(){
			clearInterval(self.timer);
		})
		this.$dom.mouseleave(function(){
			self.autoPlay();
		})
	}
	//展示下一张
	Carousel.prototype.showNext=function(){
		var self=this;
		self.$imagesUlLis.eq(self.idx).animate({"left":'-'+self.width},self.$animateTime);
		self.idx++;
		if(self.idx>self.pictureLength-1){
			self.idx=0;
		}
		self.$imagesUlLis.eq(self.idx).css("left",self.width).animate({"left":0},self.$animateTime);
		self.changeCircleCur();
	}
	//展示上一张
	Carousel.prototype.showPrev=function(){
		var self=this;
		self.$imagesUlLis.eq(self.idx).animate({"left":self.width},self.$animateTime);
		self.idx--;
		if(self.idx<0){
			self.idx=self.pictureLength-1;
		}
		self.$imagesUlLis.eq(self.idx).css("left",'-'+self.width).animate({"left":0},self.$animateTime);
		self.changeCircleCur();
	}
	Carousel.prototype.show=function(number){
		var self=this;
		var oldNumber=self.idx;
		self.idx=number;
		
		//判断
		if(self.idx>oldNumber){
			self.$imagesUlLis.eq(oldNumber).animate({"left":'-'+self.width},self.$animateTime);
			self.$imagesUlLis.eq(self.idx).css("left",self.width).animate({"left":0},self.$animateTime);
		}else if(self.idx<oldNumber){
			self.$imagesUlLis.eq(oldNumber).animate({"left":self.width},self.$animateTime);
			self.$imagesUlLis.eq(self.idx).css("left",'-'+self.width).animate({"left":0},self.$animateTime);
		}
		self.changeCircleCur();
	}
	//改变小圆点的cur
	Carousel.prototype.changeCircleCur=function(){
		this.$circleOlLis.eq(this.idx).addClass('cur').siblings().removeClass('cur');
	}
	
	//自动轮播
	Carousel.prototype.autoPlay=function(){
		var self=this;
		this.timer=setInterval(function(){
			self.showNext();
		},this.interval)
	}
})();
