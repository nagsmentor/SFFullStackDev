trigger ContactTrigger on Contact (after update, after insert) {

    if(Trigger.isAfter && Trigger.isUpdate){

         if(PreventAccConRecursion.conTriggerPrevent) return;
        Contact oldCon;
        List<Account> updAcc = new List<Account>();
        PreventAccConRecursion.conTriggerPrevent = true;  
        for(Contact con: Trigger.new){
            oldCon = trigger.oldMap.get(con.id);

            if(OldCon.Phone != con.Phone && con.AccountId != null){
                updAcc.add(new Account(Id = con.AccountId, Phone = con.Phone));

            }

           
        }
        try{
            update updAcc;
        }
        finally{
            PreventAccConRecursion.conTriggerPrevent = false;
        }
        


    }

    
    if(Trigger.isAfter && Trigger.isinsert){
    
        for(Contact con: Trigger.new)
        {
            ContactEmailService.sendEmail(con.id);
        }

    }
    


}