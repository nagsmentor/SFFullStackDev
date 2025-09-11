trigger ContactTrigger on Contact (after update) {

    if(Trigger.isAfter && Trigger.isUpdate){

         if(PreventAccConRecursion.conTriggerPrevent) return;
        Contact oldCon;
        List<Account> updAcc = new List<Account>();
        PreventAccConRecursion.conTriggerPrevent = true;
        for(Contact con: Tribber.New){
            oldCon = trigger.oldMap.get(con.id);

            if(OldCon.Phone != con.Phone && con.AccountId){
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

}