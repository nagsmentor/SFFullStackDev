trigger AccountTrigger on Account (before insert, before delete, before update, after update) {
    
    If(Trigger.IsBefore && Trigger.IsInsert){
        AccountTriggerHandler.beforeAccInsert(Trigger.New);
    }

    If(Trigger.IsBefore && Trigger.isDelete){
       AccountTriggerHandler.beforeAccDelete(Trigger.Old); 
    }

    if(Trigger.isBefore && Trigger.isUpdate){
        
        Set<Id> accIdstocheck = new Set<Id>();
        Set<id> accwithOpenOpps = new Set<Id>(); 
        for(Account acc : Trigger.New){
            Account oldAcc = Trigger.oldMap.get(acc.id); //get oldmap to get the values before change

            if(acc.Industry != oldAcc.Industry){ //check if value has changed
                accIdstocheck.add(acc.id); //acc is valid for checking
            }
        } 

        List<Opportunity> opps = [Select AccountId from Opportunity where AccountId in :accIdstocheck AND isClosed = false];
        for(Opportunity opp : opps){

            accwithOpenOpps.add(opp.AccountId);
        }

        for(Account acc: Trigger.New){
            if(accwithOpenOpps.contains(acc.Id)){
                acc.Industry.addError('Industry Cannot be changed as this Account has open Opportunities');
                
            }
        }
        
    }

    if(Trigger.isAfter && Trigger.isUpdate){

        System.Debug('In After Update');
        if(PreventAccConRecursion.accTriggerPrevent) return;
        Set<id> accphonechanged  = new Set<Id>();
        Map<Id, String> accPhoneMap = new Map<Id, String>();
        List<Contact> contoUpdate = new List<Contact>();
        //Set<id> newaccwebsitechanged  = new Set<Id>();
        PreventAccConRecursion.accTriggerPrevent = true;
        for(Account acc : Trigger.New){
            Account oldAcc = trigger.oldMap.get(acc.Id);

            if(oldAcc.Phone != acc.Phone){
                accphonechanged.add(acc.id);
                accPhoneMap.put(acc.id, acc.Phone);
            }
            

            /*if(oldAcc.Website != acc.website){
                accWebsiteMap.put(acc.id, acc.website);
            } */


        }

        List<Contact> cons = [Select AccountId, Phone from Contact where AccountId IN : accphonechanged];
        // List<Contact> cons = [Select FirstName, LastName, AccountId, Email from Contact where AccountId IN : accWebsiteMap.keyset()];

        System.Debug(cons);

        For (Contact con : cons){
            String ph = accPhoneMap.get(con.AccountId);
            con.Phone = ph;
            contoUpdate.add(con);
            System.Debug(contoUpdate);
        }

        if(contoUpdate.size() > 0){
            //Database saveResults[] sr = Database.insert(contoUpdate, false);
            try{
                update contoUpdate;
            }
            finally{
                PreventAccConRecursion.accTriggerPrevent = false;
            }
            
        }

    } 

}