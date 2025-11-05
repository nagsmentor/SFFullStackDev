import { LightningElement, track } from 'lwc';
import searchAcc from '@salesforce/apex/AccountSearchController.searchAcc';

export default class ServerSearchDatatable extends LightningElement {

    @track accounts;
    @track error;
    searchTerm = '';
    isLoading = false;
    debounceTimer;

    fields = [
        {label:'Name', fieldName:'Name', type:'text'},
        {label:'Site', fieldName:'Site', type:'text'},
        {label:'Active', fieldName:'Active__c', type:'text'},
        {label:'Annual Revenue', fieldName:'AnnualRevenue', type:'currency'}
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




}