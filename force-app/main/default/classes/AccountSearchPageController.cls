public with sharing class AccountSearchPageController {
    public class PageResult{
        @AuraEnabled public List<Account> records;
        @AuraEnabled public Integer total;
        @AuraEnabled public Integer pageNumber;
        @AuraEnabled public Integer pageSize; 
    }

    @AuraEnabled
    public static PageResult searchAccountPages(String searchTerm, Integer pageSize, Integer pageNumber){
        String term = (searchTerm == null)? '' : searchTerm.trim();
        Integer size = (pageSize == null /*|| pageSize <= 0 || pageSize >= 100*/)? 5 : pageSize;
        Integer page = (pageNumber == null || pageNumber <= 0) ? 1: pageNumber;
        Integer offsetRows = (page - 1) * size;

        String wcterm = '%'+term+'%'; //LIKE %Acc%

        List<Account> rows;
        Integer totalCount;

        if(term ==''){
            rows = [Select Id, Name, Active__c, Site, AnnualRevenue 
            from Account 
            LIMIT:size OFFSET:offsetRows];
            
            totalCount = [Select count() from Account];
        }
        else{
            rows = [Select Id, Name, Active__c, Site, AnnualRevenue 
            from Account
            Where NAME LIKE: wcterm 
            OR Site LIKE: wcterm
            OR Active__c LIKE: wcterm
           // OR AnnualRevenue = (Integer) term 
            LIMIT:size OFFSET:offsetRows];
            
            totalCount = [Select count() from Account
            Where NAME LIKE: wcterm 
            OR Site LIKE: wcterm
            OR Active__c LIKE: wcterm];
            //OR AnnualRevenue LIKE: wcterm
        }
        PageResult out = new PageResult();
        out.records = rows;
        out.total = totalCount;
        out.pageNumber = page;
        out.pageSize = size;
        return out;
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