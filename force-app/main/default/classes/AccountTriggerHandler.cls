public with sharing class AccountTriggerHandler {
    public static void beforeAccInsert(List<Account> newAccounts) {

        for(Account a : newAccounts){
            
            If (a.AnnualRevenue == 0 || a.AnnualRevenue == null){
                a.AnnualRevenue.addError('Annual Revenue cannot be 0 or blank');            
            }
            
            if(a.Site == null){
                a.Site.addError('Account Site cannot be blank');
            }
        }

    }

    public static void beforeAccDelete(List<Account> oldAccounts){
        List<id> accids = new List<id>();
        
        for(Account acc: oldAccounts){
            accids.add(acc.id);
        }

        List<Contact> conList = [Select Id, AccountId from Contact where Accountid IN :accids];

        Set<Id> dndAccIds = new Set<Id>();

        for(Contact con: conList){
            dndAccIds.add(con.AccountId);            
        }

        for(Account a :oldAccounts){
            If(dndAccIds.contains(a.id)){
                a.addError('Account cannot be deleted from new code as it has contacts Associated');
            }
        }
    }
}