public class DemoDelete {
    
    public static void deleteDemo(){
        
 /*       List<Account> accList = new List<Account>();
        accList = [select Id, Name from Account where Name = 'Updated from Apex'];*/
        
        List<Account> accList1 = [select Id, Name from Account where Name = 'Updated from Apex'];
        
        
        delete accList1;
        
    }


}