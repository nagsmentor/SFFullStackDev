import { LightningElement, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class LdsAccountList extends LightningElement {

    @track accounts;
    @track error;
    
    fields = [
        {label: 'Name', fieldName: 'Name', type:'text'},
        {label: 'Active', fieldName: 'Active__c', type:'text'},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type:'number'},
        {label: 'Account Site', fieldName: 'Site', type:'text'}

    ];

    @wire(getListUi, {
        objectApiName: ACCOUNT_OBJECT,
        listViewApiName: 'Active_Accounts'
    })
    listViewHandler({data, error}){
        if(data){
            this.error = undefined;
            this.accounts = data.records.records.map(rec => ({
                Id: rec.id, //not Id or ID, it shouod be id. Take only columns already there in the List View
                Name: rec.fields.Name.value,
                Active__c: rec.fields.Active__c.value,
                AnnualRevenue: rec.fields.AnnualRevenue.value,
                Site: rec.fields.Site.value

            }));
        }
        else if(error){
            this.accounts = undefined;
            this.error = error;
        }
    }
}