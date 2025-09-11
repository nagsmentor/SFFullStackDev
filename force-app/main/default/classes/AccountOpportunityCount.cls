public with sharing class AccountOpportunityCount {
    public static void updAccwithoppCount(Set<id> accountIds){
         //Finding the Number of Opportunities already available for the Account
        
            Map<Id, Integer> accoppCount = new Map<Id, Integer>();
            List<AggregateResult> lstAR = new List<AggregateResult>();
            lstAR = [SELECT AccountId accid, Count(Id) oppcnt from opportunity where AccountId in :accountIds Group by AccountId];
            for(AggregateResult ar : lstAR){
                accoppCount.put((Id)ar.get('accid'), (Integer)ar.get('oppcnt'));
            }

            //Update Account with the Opp Count value
            Integer c;
            List<Account> accUpd = new List<Account>();
            for(Id acId : accountIds){
                 /*   if(accoppCount.containsKey(acId)){
                        c = accoppCount.get(acId);
                    }
                    else{
                        c=0;
                    } */
                    c = accoppCount.containsKey(acId) ?  accoppCount.get(acId) : 0;       // Ternary
                    
                    accUpd.add(new Account(Id = acId, Opportunity_Count__c=c));
            }

            update accUpd;
        }    
}