public class DemoInsertList {
    
    public static void insertList(){
        
        List<Account> accList = new List<Account>();
        
        Account acc1 = new Account();
        acc1.name = 'Account 1';
        acc1.Website = 'www.acc2.com';
        acc1.BillingCountry = 'India';
		accList.add(acc1);
        
        Account acc2 = new Account(Name = 'Account2',Website = 'www.acc2.com',BillingCountry = 'India');
        accList.add(acc2);
        
        accList.add(new Account(Name = 'Account3',Website = 'www.acc3.com',BillingCountry = 'China'));
        
        System.Debug(accList);
        
        insert accList;
        
        System.Debug(accList);
        
        for (Account acc : accList)
            System.Debug(acc.Id);
        
        
        
        
        
        
        
        
    }

}