public class DemoUpdate {
    
    public static void updateDemo(){
        
        List<Account> accList = new List<Account>();
        accList = [select Id, Name from Account where Name = 'Account from Apex'];
        
        List<Account> accList1 = [select Id, Name from Account where Name = 'Account from Apex'];
        
        for(Account acc: accList1)
        {
            acc.Name = 'Updated from Apex';
            // update acc;  Bad way
        }
        
        update accList1;
        
    }

}