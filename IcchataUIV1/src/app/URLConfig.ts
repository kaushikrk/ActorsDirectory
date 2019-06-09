export class  URLConfig {
    
    
    
    private static devHostName="http://localhost:8080/icchata";
    private static prodHostName="https://icchata.azurewebsites.net/icchata";
    public static  getActors= URLConfig.getHostName()+"/user/list";
    public static  getProfile= URLConfig.getHostName()+"/user/profile";
    public static  searchActors= URLConfig.getHostName()+"/user/search";
    public static  postActor=URLConfig.getHostName()+"/user/register";
    public static  googleReferral=URLConfig.getHostName()+"/user/google/referral";
    public static  updateActor=URLConfig.getHostName()+"/user/updateProfile";
    public static  postPhotos=URLConfig.getHostName()+"/user/upload";
    public static  postComments=URLConfig.getHostName()+"/user/comments";
    public static  getComments=URLConfig.getHostName()+"/user/comments";
    public static  loginUrl=URLConfig.getHostName()+"/oauth/token";
    public static  listMovies=URLConfig.getHostName()+"/movie/list";
    public static  listPlays=URLConfig.getHostName()+"/play/list";
    public static  listEvents=URLConfig.getHostName()+"/events/list";
    public static  movieDetail=URLConfig.getHostName()+"/movie/detail/";
    public static  saveReview =URLConfig.getHostName()+"/movie/review"
    public static  saveRating =URLConfig.getHostName()+"/movie/rate"
    public static  getRating =URLConfig.getHostName()+"/movie";
    public static  getAuditions=URLConfig.getHostName()+"/audition/list";
    public static  saveAuditions=URLConfig.getHostName()+"/audition/create";
    public static auditionCall=URLConfig.getHostName()+"/user/audition/invite";

    static getHostName(){
      return this.prodHostName;
    }
    static getCommentsURL(actorId:any) : string{
      return this.getComments+"/"+actorId;
    }
}



