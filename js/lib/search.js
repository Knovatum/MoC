requirejs([
	'text!../../templates/singlesearchresult.html',
	'text!../../templates/comic-modal.html',
	'text!../../templates/borrowscreen.html',
	'text!../../templates/borrow-success.html'
	],function(ssresulttpl,comicmodaltpl,borrowscreentpl,borrowsuccesstpl){
	$(document).ready(function() {
		var inputWidth,inputWidthReturn;
		inputWidth = '240px';
		inputWidthReturn = '30px';
		$('.search-input').on("focus",function(){
			//clear the text in the box.
			$('.search-input').val(function() {
				$('.search-input').addClass('open').attr('placeholder', 'Search for...');
			}),
			//animate the box
			$('.search-input').animate({
				width: inputWidth
			},"fast");
		});
		$('.search-input').on("blur",function(){
			$('.search-input').removeClass('open').animate({
				width: inputWidthReturn
				},"fast");
			$('.search-input').attr('placeholder', '').val('');
		});
		$("#searchbar").on("submit",executeSearch);
	});

	function executeSearch(e){
		var result, critera, cList;
		e.preventDefault();
		$(".result-wrapper").html("");
		criteria=$(".search-input").val().trim().toUpperCase();
		cList=JSON.parse(localStorage.comics);
		cList=_.sortBy(cList, 'title')
		result=_.filter(cList,function(c){
			return c.title.toUpperCase().indexOf(criteria)!==-1;
		})
		if (result.length===0) {
			$(".result-wrapper").html("No hay resultados");	
		} else {
			_.each(result,function(r){
				var currentid="cr"+r.id;
				$(".result-wrapper").append(ssresulttpl);
				$(".result-wrapper").children().last().addClass(currentid);
				$(".ss-result."+currentid+" img").attr("src",r.imgUrl);
				$(".ss-result."+currentid+" img").attr("alt",r.title);
				$(".ss-result."+currentid+" #fig-title").html(r.title);
				$(".ss-result."+currentid+" #fig-price").html(r.price);

				$(".ss-result."+currentid+" figure").on("click",{comic:r},showComicInfo);
			})
		}
	}
	function showComicInfo(e){
		var comic = e.data.comic;
		$(".modal").html(comicmodaltpl);
		$(".cmodal .cmodal-fig img").attr("src",comic.imgUrl);
		$(".cmodal .cmodal-info .cmodal-title").text(comic.title);
		$(".cmodal .cmodal-info .cmodal-creator").text(comic.creator);
		$(".cmodal .cmodal-info .cmodal-genre").text(comic.genre);
		$(".cmodal .cmodal-info .cmodal-serie").text(comic.serie);
		$(".cmodal .cmodal-info .cmodal-publisher").text(comic.publisher);
		$(".cmodal .cmodal-info .cmodal-price").text(comic.price);
		if(comic.count>0){
			$(".cmodal .cmodal-fig .cmodal-avail").text("Disponible!").addClass("available");
			$(".cmodal .cmodal-fig .cmodal-borrow").on("click",{c:comic},displayBorrowScreen);
		} else {
			$(".cmodal .cmodal-fig .cmodal-avail").text("Agotado").addClass("unavailable");
			$(".cmodal .cmodal-fig .cmodal-borrow").addClass("hidden");
		}
		
		$(".mask").addClass("active");
	}
	function displayBorrowScreen(e){
		var comic;
		comic=e.data.c;
		$(".hbanner").html("");
		$(".search").html("");
		$(".account").html("");
		$(".borrow").html(borrowscreentpl);
		$(".borrow .borrow-banner img").attr("src",comic.imgUrl);
		$(".borrow .portrait img").attr("src",comic.imgUrl);
		$(".borrow .bbar .btitle").text(comic.title);
		$(".borrow .bbar .bid").text(comic.id);
		$(".borrow .bbar .bcount").text(comic.count);
		$(".borrow .bbar .bprice").text(comic.price);
		$(".borrow .bbar .bvideo").prop("href",comic.videos);
		$(".borrow .bbar .bgame").prop("href",comic.games.url);
		$(".borrow .baction input[type=submit]").on("click",{c:comic},borrowComic);
		$(".mask").removeClass("active");
		$(".cmodal").remove();
	}
	function borrowComic(e){
		var comic,cList,remain,loan,lList;
		comic=e.data.c;
		cList=JSON.parse(localStorage.comics);
		remain=_.find(cList,function(c){return c.id===comic.id}).count--;
		remain--;
		localStorage.setItem("comics",JSON.stringify(cList));
		loan={
			comicid:comic.id,
			userlogin:JSON.parse(localStorage.loggedinuser).login
		}
		if(localStorage.loans){
			lList=JSON.parse(localStorage.loans);
		} else {
			lList=[];
		}
		lList.push(loan);
		localStorage.setItem("loans",JSON.stringify(lList));
		$(".modal").html(borrowsuccesstpl);
		$(".mask").addClass("active");
		$(".borrow .bbar .bcount").text(remain);
		if (remain<=0){
			$(".borrow .baction input[type=submit]").prop( "disabled", true );
			$(".borrow .baction input[type=submit]").addClass("bdisabled");	
		} 
	}
});
