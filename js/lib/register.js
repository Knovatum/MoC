require(['user'],function(user){
	//this.toggleAdmin;
	// Bindings
	$(document).ready(function(){
		$("#form-register input[type=checkbox]").on("click",toggleAdmin);
		$("#form-register").on("submit",validateRegister);
		// Call the closeModal function on the clicks/keyboard
		$(".close, .mask").on("click", function(){
		  closeModal();
		});
	});
	function toggleAdmin(){
		$("#form-register input[type=checkbox]").toggleClass("checked");
	}
	// Function for close the Modal
	function closeModal(){
	  $(".mask").removeClass("active");
	}
	$(document).keyup(function(e) {
	  if (e.keyCode == 27) {
	    closeModal();
	  }
	});
	function validateRegister(e){
		var usr,err;
		// prevent de browser from reloading the login screen
		e.preventDefault();
		usr=_createUser();
		err=[];
		if (usr.login==="") err.push("Debes ingresar un nombre de usuario");
		if (usr.name==="") err.push("Debes ingresar tu nombre");
		if (usr.lastName==="") err.push("Debes ingresar tu apellido");
		if (usr.email==="") err.push("Debes ingresar un email");
		if (usr.password==="") err.push("Debes ingresar una contraseña");
		if (usr.login.indexOf(" ")!==-1) err.push("El nombre de usuario no puede contener espacios");
		if (!usr.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) err.push("Email inválido");
		if ($("#form-register input[name=password]").val().trim()!==$("#form-register input[name=password-repeat]").val().trim())
			err.push("Las contraseñas no coinciden");

		if(err.length===0){
			var b;
			// Agregamos al usuario a la lista ya existente
			b=JSON.parse(localStorage.getItem("users"));
			b.push(usr);
			localStorage.setItem("users",JSON.stringify(b));
			// Se loguea al usuario y redirige al main
			localStorage.setItem("loggedinuser",JSON.stringify(usr));
			window.location="main.html";
		} else {
			var el,para,t;
			$(".modal-msg").remove();
			el=$(".modal");
			_.each(err,function(error){
				para=document.createElement("P");
				t=document.createTextNode(error);
				para.appendChild(t);
				el.append($(para).addClass("modal-msg"));
			})
			$(".mask").addClass("active");
		}
	}
	var _createUser=function(){
		var usr,temp;
		temp={
			login:$("#form-register input[name=login]").val().trim(),
			name:$("#form-register input[name=first-name]").val().trim(),
			lastName:$("#form-register input[name=last-name]").val().trim(),
			email:$("#form-register input[name=email]").val().trim(),
			password:$("#form-register input[name=password]").val().trim(),
			passRepeat:$("#form-register input[name=password-repeat]").val().trim(),
			isAdmin:document.querySelector('input[name=admin].checked') ? true:false	
		}
		
		usr=new user(temp)
		return usr;
	}
});