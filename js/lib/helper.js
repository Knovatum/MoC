define([sdf], function(){
	String.prototype.reverse= function(){
	 var s,L;
	 s= ''; 
	 L= this.length;
	 while(L){
	  s+= this[--L];
	 }
	 return s;
	}	
});