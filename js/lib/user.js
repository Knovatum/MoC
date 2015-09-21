define("user",function(){
	var user= function(u) {
		if (!u.isAdmin) {
			u.isAdmin=false;
		} else {
			u.isAdmin=(u.isAdmin==='true'||u.isAdmin===true);
		}
		this._getFullName=function(){
			return u.name+" "+u.lastName;
		}
		u.fullName=this._getFullName();
		return u;	
	}
	return user;
});