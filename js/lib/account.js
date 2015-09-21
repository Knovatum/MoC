requirejs([
	"user"
	],function(user){
	$(document).ready(function() {
		fillInfo();
	});
	
	function fillInfo(e){
		var u,bList;
		u=new user(JSON.parse(localStorage.loggedinuser));
		$(".account .acc-fullname").text(u.fullName);
		$(".account .acc-login").text(u.login);
		$(".account .acc-email").text(u.email);
		$(".account .acc-password").text(u.password);
		$(".account .acc-isadmin").text((u.isAdmin?'Sí':'No'));
		bList=_.filter(JSON.parse(localStorage.loans),function(loan){
			return loan.userlogin===u.login;
		});
		_.each(bList,function(loan){
			comic=_.find(JSON.parse(localStorage.comics),function(comic){
				return comic.id===loan.comicid;
			});
			$(".account .borrowed").append('<p>'+comic.title+'</p>');	
		});
		
	}	
});
