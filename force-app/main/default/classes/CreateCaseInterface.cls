@RestResource(urlMapping='/casecreate')
global with sharing class CreateCaseInterface {
    global class CreateCaseRequest{
        public string accname;
        public string subject;
        public string status = 'Open';
        public string origin = 'Web';
        public string priority;
        public string Description;
    }

    global class CreatecaseResponse{
        public string message;
        public string accountId;
        public string caseNumber;
    }

    @HttpPost
    global static void createcase(){

        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;

        CreateCaseRequest payload;
        try{
             payload = (CreateCaseRequest)JSON.deserialize(req.requestBody.toString(),CreateCaseRequest.class);
        }
        catch(Exception e){
            res.StatusCode = 400;
            res.responseBody = Blob.valueOf('{"message":"Issue when parsing JSON"}');
            return;
        }
        try{
        if(String.isBlank(payload.subject) || String.isBlank(payload.accname)){
            res.StatusCode = 400;
            res.responseBody = Blob.valueOf('{"message":"Subject AND AccountName are required"}');
            return;
        }

        List<Account> foundAcc = [Select Id, Name from Account where Name = :payload.accname LIMIT 1];
       
        If(foundAcc.size() <=0 ){
            res.StatusCode = 400;
            res.responseBody = Blob.valueOf('{"message":"Account Name is not found"}');
            return;
        }
            Case c = new Case();
            c.subject = payload.subject;
            c.priority = payload.priority;
            c.priority = 'Case created from external';
            c.AccountId = foundAcc[0].Id;
            insert c;

            CreatecaseResponse out = new CreatecaseResponse();
            out.message = 'Case has been created successfully';
            out.accountId = c.AccountId;
            out.caseNumber = c.Id;

            res.statusCode = 200;
            res.responseBody = Blob.valueof(JSON.serialize(out));
            res.addHeader('Content-Type','application/json');

        }
        catch(Exception e){
            res.statusCode = 400;
            res.responseBody = res.responseBody = Blob.valueOf('{"message":"Case not created' + escapeJson(e.getMessage()) +'"}');
        }
    }

    private static String escapeJson(String s) {
        return s == null ? '' : s.replace('\\', '\\\\').replace('"','\\"').replace('\n',' ').replace('\r',' ');
    

    //@HttpGet
    //method

        



    }
}