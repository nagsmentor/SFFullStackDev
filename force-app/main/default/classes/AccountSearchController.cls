public with sharing class AccountSearchController {

    @AuraEnabled/*(cacheable = true)*/
    public static List<Account> searchAcc(String searchTerm){
        try {
            if(searchTerm ==''){
                return [Select Id, Name, Site, Active__c, AnnualRevenue from Account];
            }

            String q = '%'+searchTerm+'%';
            return [Select Id, Name, Site, Active__c, AnnualRevenue from Account WHERE NAME LIKE :q OR Site LIKE :q OR Active__c LIKE :q ];


            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled 
    public static void updateAccount(List<Account> acc){
        try {

            if(acc == null || acc.isEmpty()){
                return;
            }

            List<Account> updtacc = new List<Account>();
            for(Account incoming : acc){

                Account upd = new Account(Id = incoming.Id);
                if(incoming.Name != null) upd.Name = incoming.Name;
                if(incoming.Site != null) upd.Site = incoming.Site;
                if(incoming.Active__c != null) upd.Active__c = incoming.Active__c;
                updtacc.add(upd);
                System.Debug(updtacc);
            }
            System.Debug(updtacc);
            update updtacc;//Defensive check Use database.Update
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}