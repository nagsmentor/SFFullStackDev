import { LightningElement, track } from 'lwc';
import searchAcc from '@salesforce/apex/AccountSearchController.searchAcc';
import updateAccount from '@salesforce/apex/AccountSearchController.updateAccount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ServerSearchEditDatatable extends LightningElement {

    @track accounts;
    @track error;
    searchTerm = '';
    isLoading = false;
    debounceTimer;
    draftValues = [];

    fields = [
        {label:'Name', fieldName:'Name', type:'text', editable:true},
        {label:'Site', fieldName:'Site', type:'text', editable:true},
        {label:'Active', fieldName:'Active__c', type:'text'},
        {label:'Annual Revenue', fieldName:'AnnualRevenue', type:'currency', editable:true}
    ];

    connectedCallback(){
        console.log('Inside Connected Callback');
        this.fetchData();
    }

    handleSearchChange(e){
        this.searchTerm = e.target.value || '';

        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.fetchData();
        },300);
    }

    //ImperativeApex Call

     async fetchData(){
        this.isLoading = true;
        try{
            const rows =  await searchAcc({/*Name of the ApexMethod Param*/ searchTerm: this.searchTerm /*Var passed from JS*/});
            this.error = undefined;
            this.accounts = rows || [];
            console.log('Accounts ' + this.accounts);
        } 
        catch(e)
        {
            this.error = (e && e.body && e.message) ? e.body.message : 'An error Occured';
            this.accounts = [];
        }
        finally
        {
            this.isLoading = false;
        }
    }

    async handleSave(e){
        const updacc = e.detail.draftValues;
        console.log('Update Accounts ' + updacc);
        if(!updacc || updacc.length == 0){
            return;
        }
        
        this.isLoading = true;
        try{
            await updateAccount({acc: updacc});
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts have been updated',
                    variant: 'success'
                })
            );

            this.draftValues = [];
            const dt = this.template.querySelector('lightning-datatable');
            if(dt){
                dt.draftValues = [];
            }
            await this.fetchData();

        }
        catch(e)
        {
            const msg = (e && e.body && e.message) ? e.body.message : 'An error Occured';
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Failed',
                    message: msg,
                    variant: 'error'
                })
            );
        }
        finally
        {
            this.isLoading = false;
        }
    }




}