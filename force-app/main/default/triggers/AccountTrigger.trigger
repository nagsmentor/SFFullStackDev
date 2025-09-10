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
        Set<id> accwebsitechanged  = new Set<Id>();
        Map<Id, String> accWebsiteMap = new Map<Id, String>();
        List<Contact> contoUpdate = new List<Contact>();
        //Set<id> newaccwebsitechanged  = new Set<Id>();
        for(Account acc : Trigger.New){
            Account oldAcc = trigger.oldMap.get(acc.Id);

            if(oldAcc.Website != acc.website){
                accwebsitechanged.add(acc.id);
                accWebsiteMap.put(acc.id, acc.website);
            }

            System.Debug(accwebsitechanged);
            System.Debug(accWebsiteMap);
            

            /*if(oldAcc.Website != acc.website){
                accWebsiteMap.put(acc.id, acc.website);
            } */


        }

        List<Contact> cons = [Select FirstName, LastName, AccountId, Email from Contact where AccountId IN : accwebsitechanged];
        // List<Contact> cons = [Select FirstName, LastName, AccountId, Email from Contact where AccountId IN : accWebsiteMap.keyset()];

        System.Debug(cons);

        For (Contact con : cons){
            String domain = accWebsiteMap.get(con.AccountId);
            con.Email = con.FirstName + con.LastName + '@' + domain;
            contoUpdate.add(con);
            System.Debug(contoUpdate);
        }

        if(contoUpdate.size() > 0){
            //Database saveResults[] sr = Database.insert(contoUpdate, false);
            update contoUpdate;
        }








    }

}