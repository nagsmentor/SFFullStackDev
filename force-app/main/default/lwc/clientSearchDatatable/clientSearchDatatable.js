import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class ClientSearchDatatable extends LightningElement {

    @track accounts = [];
    @track error;
    searchTerm = '';
    @track filteredAccounts = [];
    debounceTimer;

    fields = [
        {label: 'Name', fieldName: 'Name', type:'text'},
        {label: 'Site', fieldName: 'Site', type:'text'},
        {label: 'Active', fieldName: 'Active__c', type:'text'},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type:'currency'}
    ]

    @wire(getAccounts)
    wiredAccounts({data,error}){
        if(data){
            this.accounts = data;
            this.filteredAccounts = data;
            this.error = undefined;
        } else if (error){
            this.error = error;
            this.accounts = [];
            this.filteredAccounts = [];
        }
    }

 /*   fruits = ['apples','oranges','grapes'];
    roundfruits = this.fruits;
    roundfruits.add('cherries');
    console.log(fruits);
    output: 'apples','oranges','grapes', 'cherries'

    roundfruits = [...fruits];
    roundfruits.add('cherries');
    console.log(fruits);
    output: 'apples','oranges','grapes'


    console.log(fruits);
    console.log([...fruits, 'grapes']); */

    handleChange(e){
        const val = (e.target.value || '').toLowerCase();
        this.searchTerm = val;
        console.log(val);
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            if(!val){
                this.filteredAccounts = [...this.accounts];
                //this.filteredAccounts = this.accounts; 
                return;
            }
            console.log(val); 
            const notnull = (fldName) => String(fldName ?? '').toLowerCase();
            this.filteredAccounts = this.accounts.filter(r => {
            return (notnull(r.Name).includes(val) ||
                    notnull(r.Site).includes(val) ||
                    notnull(r.Active__c).includes(val)
                )
        }

        );
        console.log('Filtered Accounts: ' + this.filteredAccounts);

        }, 500 );


    }


}