public class SearchNestedLoop {
    
    public static void AccNamesfromContact(List<Contact> cons){
        
        List<Account> accList = [Select Id, Name from Account];
        
        for (Contact c : cons){
            
            for (Account a : accList){
                
                if (c.accountid == a.id){
                    System.Debug (c.Firstname + ' Account name is: ' + a.Name);
                }
            }
        }
        
    }

}