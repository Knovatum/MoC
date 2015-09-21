requirejs(["user","comic","json!../data/users","json!../data/comics"],
	function(user,comic,userData,comicData){
		var creator,c;
		if(typeof(Storage) === "undefined") {
		    alert("Este navegador no tiene soporte para Web Storage");
		    return;
		}
		creator=function(){
			this.createUsers=function(){
				var tempUsr,usrList;
				usrList=[];
				_.each(userData,function(u){
					tempUsr=new user(u);
					usrList.push(tempUsr);
				})
				localStorage.setItem("users",JSON.stringify(usrList));
			};
			this.createComics=function(){
				var tempComic,comicList;
				comicList=[];
				_.each(comicData,function(c){
					var max;
					if(comicList.length>0) max=_.max(comicList,function(o){return o.id}).id+1;
					tempComic=new comic(c,max);
					comicList.push(tempComic);
				});
				localStorage.setItem("comics",JSON.stringify(comicList));
			};
			this.createLoans=function(){

			};
			return {
				createUsers:this.createUsers,
				createComics:this.createComics,
				createLoans:this.createLoans
			}
		};
		c=new creator();
		if (!localStorage.users) c.createUsers();
		if (!localStorage.comics) c.createComics();
		if (!localStorage.loans) c.createLoans();
});
