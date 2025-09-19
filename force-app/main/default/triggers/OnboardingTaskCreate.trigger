trigger OnboardingTaskCreate on Onboarding_Event__e (after insert) {
    System.Debug('Inside Trigger');
    Set<Id> accIds = new Set<Id>();
    for(Onboarding_Event__e oPE : Trigger.New){
        accIds.add((Id)oPE.AccountId__c);

    } 

    Map<Id, Account> mapAccId = new Map<Id, Account>([Select Id, Name, OwnerId from Account where Id in :accIds]);

    List<Task> lstTask = new List<Task>();

    for (Onboarding_Event__e oPE : Trigger.New){

        Account acc = mapAccId.get((Id)oPE.AccountId__c);
        
        Task t = new Task();
        t.Subject = 'Onboarding Task';
        t.WhatId = acc.Id;
        t.OwnerId = acc.OwnerId;
        t.ActivityDate = Date.Today();
        t.Status = 'Not Started';
        t.Description = oPE.TaskDescription__c;
        lstTask.add(t);


    }
    If(lstTask.size()>0)
    {
        insert(lstTask);

        System.Debug('Tasks Inserted: ' + lstTask);
    }

}