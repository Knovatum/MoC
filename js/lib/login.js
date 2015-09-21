(function(){
	if(typeof(Storage)!==undefined&&localStorage.loggedinuser){
		window.location="main.html";
	}
	// Bindings
	$(document).ready(function(){
		$("#form-login").on("submit",validateLogin);
	});
	function validateLogin(e){
		var userList,login,pass,validated;
		// prevent de browser from reloading the login screen
		e.preventDefault();
		login=$("#form-login input[name=login]").val();
		pass=$("#form-login input[name=password]").val();
		userList=JSON.parse(localStorage.users);
		validated=_.find(userList, function(user) {
			if ((user.login===login&&user.password===pass)||
				(user.email===login&&user.password===pass)){
				return user;
			}
		});
		if(validated){
			// Se loguea al usuario y redirige al main
			localStorage.setItem("loggedinuser",JSON.stringify(validated));
			window.location="main.html";
		} else {
			$(".login-err-msg").css("display","block");
		}
	}
})();
