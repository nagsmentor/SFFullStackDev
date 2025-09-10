public class DemoMerge {
    
    public static void mergeDemo(){
        
        List<Contact> listCon = [select id, Firstname,LastName,AccountId, Phone from Contact where LastName = 'Smith' and Firstname = 'John'];
        
        merge listCon[0] listCon[1];
        System.Debug(listCon[0]);
                                 
        
        
    }

}