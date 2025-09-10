public class DemoUpsert {
    
    public static void upsertDemo(){
        
        Account acc = new Account(SAP_Account_Number__c = 'Cust001', Name = 'Upserted from Apex Update', BillingCountry = 'India');
        upsert acc SAP_Account_Number__c;
    }

}