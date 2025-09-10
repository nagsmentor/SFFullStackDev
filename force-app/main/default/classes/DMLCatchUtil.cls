public class DMLCatchUtil {
    
    public static void debuglogDML(DMLException e){
        System.Debug('Error Occured ' + e.getMessage());
            for(Integer i =0;i<e.getNumDml();i++){
                
                System.Debug('Failed Index is: ' + e.getDMLIndex(i));
                System.Debug('Status Code is:' + e.getDMLStatusCode(i));
                System.Debug('Error Fields are: ' + e.getDMLFields(i));
                System.Debug('Error Message is: ' + e.getDMLMessage(i));
                
            }
        
    } 

}