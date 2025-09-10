trigger CloseOppTrigger on Opportunity (before update, after insert, after update, after delete, after undelete) {

        If(Trigger.isBefore && Trigger.isUpdate){
            OpportunityTriggerHandler.beforeUpdateClosedWon(Trigger.New, Trigger.oldMap);
        }

        If(Trigger.isAfter && (Trigger.isInsert || Trigger.isUndelete)){
            Set<Id> accIds = new Set<Id>();
            //Find Account Ids that are affected by the creation of the Opportunity
            for(Opportunity opp : Trigger.New){
                accIds.add(opp.AccountId);
            }
           //Call method to count and update
            AccountOpportunityCount.updAccwithoppCount(accIds);
        }


        If(Trigger.isAfter && Trigger.isDelete){
            Set<Id> accIds = new Set<Id>();
            
            //Find Account Ids that are affected by the deletion of the Opportunity
            for(Opportunity opp : Trigger.Old){
                accIds.add(opp.AccountId);
            }
            //Call method to count and update
            AccountOpportunityCount.updAccwithoppCount(accIds);
        }

        If(Trigger.isAfter && Trigger.isUpdate){
            Set<Id> accIds = new Set<Id>();
             //Find Account Ids that are affected by the update to the Opportunity. Which means ot os both the prevAccount and the currentAccount
            for(Opportunity opp : Trigger.New){
                Opportunity oldopp = Trigger.oldMap.get(opp.Id);
                   If(opp.AccountId != oldopp.AccountId) {
                        accIds.add(opp.Accountid);
                        accIds.add(oldopp.AccountId);
                   }

            }
            //Call method to count and update
            AccountOpportunityCount.updAccwithoppCount(accIds);

        }

       
            



}