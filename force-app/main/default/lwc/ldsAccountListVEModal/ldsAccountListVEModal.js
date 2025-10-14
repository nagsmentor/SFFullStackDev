import { LightningElement, track, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {NavigationMixin} from 'lightning/navigation';
import LdsAccountUpdateModal from 'c/ldsAccountUpdateModal';

export default class ldsAccountListVEModal extends NavigationMixin(LightningElement) {

    @track accounts;
    @track error;
    selectedRowId;
    wiredlistResult;
    
    fields = [
        {label: 'Name', fieldName: 'Name', type:'text'},
        {label: 'Active', fieldName: 'Active__c', type:'text'},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type:'number'},
        {label: 'Account Site', fieldName: 'Site', type:'text'},
        {
            type: 'action',
            typeAttributes: {
                rowActions: [
                    {label: 'Display', name:'display'},
                    {label: 'Edit', name:'edit'}
                ]
            }

        }
    ];

    @wire(getListUi, {
        objectApiName: ACCOUNT_OBJECT,
        listViewApiName: 'Active_Accounts'
    })

    
    listViewHandler(listResult){
        this.wiredlistResult = listResult;
        const {data, error} = listResult;
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

    async handleRowAction(event){
        const evtName = event.detail.action.name;
        const row = event.detail.row;
        if(evtName == 'display'){
            this[NavigationMixin.Navigate](
            {
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    actionName: 'view'
                }
            }
        );
        }
        else if(evtName == 'edit'){
            const result = await LdsAccountUpdateModal.open(
                {
                    size: 'medium',
                    description: 'Edit Account in Modal',
                    recordId: row.Id

                }
            );

            if(result == 'updated'){
                await refreshApex(this.wiredlistResult);
                this.dispatchEvent(new ShowToastEvent(
                    {
                        title: 'Account Updated Modal',
                        message: 'Changes Saved',
                        variant: 'success'
                    }
                ));
            }
        }
        

    }

}