public with sharing class ActivateAccountQueue implements Queueable  {
    private Id accId;
    public ActivateAccountQueue(Id accountId) {
        this.accId = accountId;
    }

    public void execute(QueueableContext qc){
        Account a = new Account(id = accId);
        a.Active__c = 'Yes';
        update a;

        System.enqueueJob(new CreateContactJob(accId));

    }


}


