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
}