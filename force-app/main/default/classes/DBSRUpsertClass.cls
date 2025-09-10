public class DBSRUpsertClass {
    
    public static void upsertDemo(){
    
    List<Account> accList = new List<Account>();
    
    accList.add(new Account(Active__c = 'Yes', SAP_Account_Number__c = 'Cust001', Industry = 'Education'));
    accList.add(new Account(Name = 'NewUpsertAccount', Active__c = 'Yes', SAP_Account_Number__c = 'Cust002', Industry = 'Education'));
    
    Database.UpsertResult[] results = DataBase.Upsert(accList,Account.SAP_Account_Number__c,false);
    
    System.Debug(results);
    
    for (Database.UpsertResult sr : results){
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