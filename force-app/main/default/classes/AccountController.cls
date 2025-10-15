public with sharing class AccountController {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, AnnualRevenue,Site, Active__c from Account];
    }
     @AuraEnabled
    public static List<Account> getAccountsImperative() {
        return [SELECT Id, Name, AnnualRevenue,Site, Active__c from Account];
    }
     @AuraEnabled
    public static List<Contact> getContactbyAccount(Id accid) {
        return [SELECT Id, FirstName, LastName, Email from Contact where AccountId = :accId];
    }
    
}