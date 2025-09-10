public class InsertDemo {
    
    public static void insertDMLDemo(){
        
        Account acc =New Account();
        
        acc.Name = 'Account from Apex with Contact';
        acc.Website = 'www.accfapx.com';
        acc.BillingCountry = 'India';
       
        insert(acc);
        
        System.debug('Account Inserted Id: ' + acc.Id);
        
        Contact con = new Contact();
        
        con.Firstname = 'John';
        con.LastName = 'Smith';
        con.AccountId = acc.id;
        insert con;
        
        
    }

}