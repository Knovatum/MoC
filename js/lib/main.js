requirejs([
	'text!../../templates/hbanner.html',
	'text!../../templates/hnav.html',
	'text!../../templates/popular.html',
	'text!../../templates/search.html',
	'text!../../templates/profile.html',
	'text!../../templates/account.html',
	'text!../../templates/footer.html'
	], function(
		bannertpl,
		hnavtpl,
		populartpl,
		searchtpl,
		profiletpl,
		accounttpl,
		footertpl
		){
		var loggedinuser;
		// Si no está logueado, lo redirigimos al login
		if (!localStorage.loggedinuser) window.location='index.html';
		// Ponemos el nombre del usuario en el menu
		loggedinuser=JSON.parse(localStorage.loggedinuser);
		$(".codrops-top span.right a").text(loggedinuser.login);
		// Si no es admin, no le permitimos ver el link a la administración
		loggedinuser.isAdmin=(loggedinuser.isAdmin==='true'||loggedinuser.isAdmin===true);
		if (!loggedinuser.isAdmin){
			$(".codrops-top span.right ul li.nav-manage").addClass("hidden");
			$(".codrops-top span.right span.user-ico").addClass("ico-guest");
		} else {
			$(".codrops-top span.right span.user-ico").addClass("ico-admin");
		}
		// Carga de templates
		$(".hbanner").html(bannertpl);
		$(".hnav").html(hnavtpl);
		$(".aside-right").html(populartpl);
		$(".footer").html(footertpl);

		// BINDINGS
		$(document).ready(function(){
			$(".nav-profile").on("click",navProfile);
			$(".nav-account").on("click",navAccount);
			$(".close-session").on("click",closeSession);
			$(".nav-home").on("click",navHome);
			$(".nav-about").on("click",navAbout);
			$(".nav-search").on("click",navSearch);
			$(".nav-loan").on("click",navLoan);
			$(".nav-news").on("click",navNews);
			$(".close, .mask").on("click", closeModal);
		});
		function navProfile(){
			clearMainGUI();
		}
		function navAccount(){
			clearMainGUI();
			$(".account").html(accounttpl);
			$.getScript('js/lib/account.js');
		}
		function closeSession(){
			localStorage.removeItem("loggedinuser");
			window.location='index.html';
		}
		function navHome(){
			clearMainGUI();
			$(".hbanner").html(bannertpl);
		}
		function navAbout(){
			clearMainGUI();
		}
		function navSearch(){
			clearMainGUI();
			$(".search").html(searchtpl);
			$.getScript('js/lib/search.js');
			//$("head").append('<script src="js/lib/search.js"></script>');
		}
		function navLoan(){
			clearMainGUI();
		}
		function navNews(){
			clearMainGUI();
		}
		function clearMainGUI(){
			$(".hbanner").html("");
			$(".search").html("");
			$(".account").html("");
			$(".borrow").html("");
		}
		// Function for close the Modal
		function closeModal(){
		  $(".mask").removeClass("active");
		  $(".cmodal").remove();
		}
		$(document).keyup(function(e) {
		  if (e.keyCode == 27) {
		    closeModal();
		  }
		});
});