public with sharing class OpportunityTriggerHandler {
    public static void beforeUpdateClosedWon(List<Opportunity> newOpps, Map<Id, opportunity> oldOppMap) {

        for(Opportunity opp : newopps){

            Opportunity oldopp = oldOppMap.get(opp.id);            
        

                if(oldopp.StageName != 'Closed Won' && opp.StageName == 'Closed Won'){

                    String note = 'Opportunity was Closed On ' + String.valueOF(Date.Today());
                    if(opp.Description == null){
                        opp.Description = note;
                    }
                    else{
                        opp.Description =  opp.Description +' ' + note;
                    }

                }
        

        }

    }


    public static void afterEvents(Boolean isIns, Boolean isUnDel, Boolean isDel, Boolean isUpd, List<Opportunity> newopps, List<Opportunity> oldopps, Map<Id, opportunity> oldOppMap){
        If((isIns|| isUnDel)){
                Set<Id> accIds = new Set<Id>();
                //Find Account Ids that are affected by the creation of the Opportunity
                for(Opportunity opp : newopps){
                    accIds.add(opp.AccountId);
                }
            //Call method to count and update
                AccountOpportunityCount.updAccwithoppCount(accIds);
            }


            If(isDel){
                Set<Id> accIds = new Set<Id>();
                
                //Find Account Ids that are affected by the deletion of the Opportunity
                for(Opportunity opp : oldopps){
                    accIds.add(opp.AccountId);
                }
                //Call method to count and update
                AccountOpportunityCount.updAccwithoppCount(accIds);
            }

            If(isUpd){
                Set<Id> accIds = new Set<Id>();
                //Find Account Ids that are affected by the update to the Opportunity. Which means ot os both the prevAccount and the currentAccount
                for(Opportunity opp : newopps){
                    Opportunity oldopp = oldOppMap.get(opp.Id);
                    If(opp.AccountId != oldopp.AccountId) {
                            accIds.add(opp.Accountid);
                            accIds.add(oldopp.AccountId);
                    }

                }
                //Call method to count and update
                AccountOpportunityCount.updAccwithoppCount(accIds);

            }
    }
}