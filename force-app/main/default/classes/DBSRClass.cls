public class DBSRClass {
    
    public static void insertList(){
        
        List<Account> accList = new List<Account>();
        
        
                Account acc1 = new Account();
                acc1.name = 'Account 1';
                acc1.Website = 'www.acc2.com';
                acc1.BillingCountry = 'India';
        		acc1.Active__c = 'Yes';
                accList.add(acc1);
                
                Account acc2 = new Account(Name = '',Website = 'www.acc2.com',BillingCountry = 'India',Active__c = 'No');
                accList.add(acc2);
        
        		Account acc4 = new Account(Website = 'www.acc2.com',BillingCountry = 'India');
                accList.add(acc4);
                
                accList.add(new Account(Name = 'Account3',Website = 'www.acc3.com',BillingCountry = 'China',Active__c = 'No'));
                
                System.Debug(accList);
                
                Database.SaveResult[] results = DataBase.Insert(accList,false);
        
        		System.Debug(results);
        
                for (Database.SaveResult sr : results){
                    if (sr.isSuccess())
                    {
                        System.Debug('Successfully Inserted Record with Id: ' + sr.getId());
                    }
                    else {
                        for(Database.Error err : sr.Geterrors())
                        {
                            System.Debug ('Error: ' + err.getMessage());
                        }
                    }
                }
        
        		
     
    }

}