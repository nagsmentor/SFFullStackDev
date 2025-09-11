trigger CloseOppTrigger on Opportunity (before update, after insert, after update, after delete, after undelete) {

        If(Trigger.isBefore && Trigger.isUpdate){
            OpportunityTriggerHandler.beforeUpdateClosedWon(Trigger.New, Trigger.oldMap);
        }

        If(Trigger.isAfter){

        
            OpportunityTriggerHandler.afterEvents();
        }

       
            



}