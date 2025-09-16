public with sharing class CreateContactJob implements Queueable  {
    private id accid;
    public CreateContactJob(Id accountId) {
        this.accId = accountId;

    }

    public void execute(QueueableContext qc){
        Contact c = new Contact();
        c.LastName = 'Contact';
        c.FirstName = 'Primary';
        c.AccountId = accId;
        insert c;

        System.enqueueJob(new CreateOppJob(accId));

    }

}