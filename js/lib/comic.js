define("comic",
	function(){
	var id,list;
	if (!localStorage.comics){
		id=0;
	}
	else{
		list=JSON.parse(localStorage.comics);
		id=_.max(list,function(obj){return obj.id}).id+1;
	}
	return function(c){
		c.id=arguments[1]|id;
		return c;
	}
}
);