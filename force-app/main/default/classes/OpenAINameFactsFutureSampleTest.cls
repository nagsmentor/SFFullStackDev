/**
 * This class contains unit tests for validating the behavior of Apex classes
 * and triggers.
 *
 * Unit tests are class methods that verify whether a particular piece
 * of code is working properly. Unit test methods take no arguments,
 * commit no data to the database, and are flagged with the testMethod
 * keyword in the method definition.
 *
 * All test methods in an org are executed whenever Apex code is deployed
 * to a production org to confirm correctness, ensure code
 * coverage, and prevent regressions. All Apex classes are
 * required to have at least 75% code coverage in order to be deployed
 * to a production org. In addition, all triggers must have some code coverage.
 * 
 * The @isTest class annotation indicates this class only contains test
 * methods. Classes defined with the @isTest annotation do not count against
 * the org size limit for all Apex scripts.
 *
 * See the Apex Language Reference for more information about Testing and Code Coverage.
 */
@isTest
private class OpenAINameFactsFutureSampleTest {

    private class SuccessMockRes implements HttpCalloutMock{
        public HttpResponse respond(HttpRequest req){
            httpResponse r = new HttpResponse();
            r.setStatusCode(200);
            r.setBody('{"choices": [{"index": 0,"message": {"role": "assistant","content": "Account Description"},"finish_reason": "stop"}]}');
            return r;
        }
    }

    private class FailedMockRes implements HttpCalloutMock{
        public HttpResponse respond(HttpRequest req){
            httpResponse r = new HttpResponse();
            r.setStatusCode(400);
            r.setBody('{"error":"An error occured"}');
            return r;
        }
    }

    @isTest
    static void mysuccessUnitTest() {
       Test.setMock(HttpCalloutMock.class,new SuccessMockRes());
       Account a = new Account(Name = 'Test Account', Active__c = 'Yes', AnnualRevenue = 10000, Site = 'India');
       insert a;

       Test.startTest();
       OpenAINameFactsFutureSample.generateFacts(new List<Id>{a.id});
       Test.stopTest();

       Account testAcc = [Select Description from Account where Id = :a.id];

       Assert.isTrue(testAcc.Description != null && testAcc.Description.contains('Account Description'),'Description should be populated');

    }

    @isTest
    static void myfailedUnitTest() {
       Test.setMock(HttpCalloutMock.class,new FailedMockRes());
       Account a = new Account(Name = 'Test Account', Active__c = 'Yes', AnnualRevenue = 10000, Site = 'India');
       insert a;

       Test.startTest();
       OpenAINameFactsFutureSample.generateFacts(new List<Id>{a.id});
       Test.stopTest();

       Account testAcc = [Select Description from Account where Id = :a.id];

      //System.assert(testAcc.Description == null || !testAcc.Description.contains('Account Description'));
      Assert.isTrue(testAcc.Description == null,'Description should be populated');
      //Assert.areEquals('', testAcc.Description, 'Description should be null');

    }
}