export  const UTILS={
    getUserInfo(){
        let userinfo =JSON.parse(localStorage.getItem("userinfo"));
        console.log(userinfo);
        if(!userinfo){
            console.warn("暂无useinfo的对象")
            return ''
        }
        return userinfo;
    },
    getUserDeilte(){
        let userdeilte =JSON.parse(localStorage.getItem("userDeilte"));
        console.log(userdeilte);
        if(!userdeilte){
            console.warn("暂无userdeilte的对象")
            return ''
        }
        return userdeilte;
    }
}