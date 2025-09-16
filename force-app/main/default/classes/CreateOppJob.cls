public with sharing class CreateOppJob implements Queueable {
    private id accid;
    public CreateOppJob(Id accountId) {
        this.accId = accountId;

    }

    public void execute(QueueableContext qc){
        Opportunity opp = new opportunity();
        opp.Name = 'First opportunity';
        opp.StageName = 'Prospecting';
        opp.CloseDate = Date.Today();
        opp.AccountId = accId;

        insert opp;
    }

}