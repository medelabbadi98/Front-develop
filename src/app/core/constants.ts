export class Constants {

    private BaseUrlUserService:String="http://localhost:4848//api/user";
    private BaseUrlUserLogin:String="http://localhost:4848/api";
    private BaseUrlDepence:String="http://localhost:4848/api/Depence";


    constructor(){}

    public static getLoginUserUrl(){
       return new Constants().BaseUrlUserLogin;
    }

    public static getUserUrl(){
     return new Constants().BaseUrlUserService;
   }
    public static getDepenceUrl(){
      return new Constants().BaseUrlDepence;
    }
}
