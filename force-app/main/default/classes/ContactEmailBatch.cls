global class ContactEmailBatch implements Database.Batchable<SObject>{
    global DataBase.QueryLocator start(Database.BatchableContext bc){
        String query = 'SELECT id, FirstName, LastName,Email from Contact where Email !=null AND CreatedDate = YESTERDAY';
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext bc, List<Contact> scope){
        
        List<Messaging.SingleEmailMessage> lstEmails = new List<Messaging.SingleEmailMessage>(); 
        String body = '';
        for(Contact c : scope){
            body = 'Hello ' + c.FirstName + '. Welcome to the App from future';
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new String[] {c.Email});
            mail.setSubject('Welcome from Batch');
            mail.setPlainTextBody(body);
            lstEmails.add(mail);

            if(lstEmails.size() == 10){
                Messaging.sendEmail(lstEmails);
                lstEmails.clear();
            }
        }

        if(lstEmails.size() > 0){
            Messaging.sendEmail(lstEmails);
        }

    }

    global void finish(Database.BatchableContext bc){

        System.Debug('The batch has been completed');

    }

}