public with sharing class CaseTriggerHandler {
    public static void afterInsertCase(List<Case> newCases) {
        for (Case c : newCases){

        if(c.Origin == 'Phone'){
            c.Priority = 'High';
            }
        else if(c.Origin == 'Email'){
            c.Priority = 'Medium';}
        else if(c.Priority == null){
            c.Priority = 'Low'; }
    }    

    }
}