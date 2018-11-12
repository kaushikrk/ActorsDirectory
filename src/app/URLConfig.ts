export class  URLConfig {
    private static devHostName="http://localhost:1337";
    private static prodHostName="http://actorsdirectory.azurewebsites.net";
    public static  getActors= URLConfig.getHostName()+"/actors";
    public static  postActor=URLConfig.getHostName()+"/actors";
    static getHostName(){
      return this.devHostName;
    }
}