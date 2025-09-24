@IsTest
private class CreateCaseInterfaceTest {
    @IsTest
    static void createCase_ById_Works() {
        Account a = new Account(Name='Acme Test', AccountNumber='ACCT-123', Active__c = 'Yes', Site = 'India', AnnualRevenue = 10000);
        insert a;

        // Build request
        CreateCaseInterface.CreateCaseRequest body = new CreateCaseInterface.CreateCaseRequest();
        body.accname = a.Name;
        body.subject   = 'Login issue';
        body.origin    = 'Web';

        RestRequest req = new RestRequest();
        req.httpMethod = 'POST';
        req.requestUri = '/services/apexrest/casecreate';
        req.addHeader('Content-Type','application/json');
        req.requestBody = Blob.valueOf(JSON.serialize(body));

        RestResponse res = new RestResponse();
        RestContext.request  = req;
        RestContext.response = res;

        Test.startTest();
        CreateCaseInterface.createcase();
        Test.stopTest();

        System.assertEquals(200, res.statusCode, 'Should be created');

        CreateCaseInterface.CreatecaseResponse out =
            (CreateCaseInterface.CreatecaseResponse) JSON.deserialize(res.responseBody.toString(), CreateCaseInterface.CreatecaseResponse.class);

        System.assertNotEquals(null, out.caseNumber, 'Case Id should be returned');
        System.assertEquals(a.Id, out.accountId, 'Account Id should match');

        // Verify case persisted
        Case c = [SELECT Id, AccountId, Subject FROM Case WHERE Id = :out.caseNumber];
        System.assertEquals(a.Id, c.AccountId);
        System.assertEquals('Login issue', c.Subject);
    }


    @IsTest
    static void createCase_MissingSubject_400() {
        Account a = new Account(Name='SoloCo', Active__c = 'Yes', Site = 'India', AnnualRevenue = 10000);
        insert a;

        CreateCaseInterface.CreateCaseRequest body = new CreateCaseInterface.CreateCaseRequest();
        body.accname = a.Name; // ok
        // subject missing

        RestRequest req = new RestRequest();
        req.httpMethod = 'POST';
        req.requestUri = '/services/apexrest/casecreate';
        req.addHeader('Content-Type','application/json');
        req.requestBody = Blob.valueOf(JSON.serialize(body));

        RestResponse res = new RestResponse();
        RestContext.request  = req;
        RestContext.response = res;

        Test.startTest();
        CreateCaseInterface.createcase();
        Test.stopTest();

        System.assertEquals(400, res.statusCode);
        System.assert(res.responseBody.toString().contains('Subject AND AccountName are required'));
    }
}