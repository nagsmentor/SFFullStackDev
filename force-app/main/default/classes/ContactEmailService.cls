public with sharing class ContactEmailService {
    @future
    public static void sendEmail(Id conId)
    {
        try{
            Contact c = [SELECT FirstName, Email from Contact where id = :conId];

            if(c == null){return;} //early return

            String body = 'Hello ' + c.FirstName + '. Welcome to the App from future';

            if(String.isBlank(c.Email)){ return;}
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new String[] {c.Email});
            mail.setSubject('Welcome to the App');
            mail.setPlainTextBody(body);

            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail} );
        }
        catch(Exception e)
        { 
            System.Debug('Error occurred ' + e.getMessage());
        }
        

    }
}