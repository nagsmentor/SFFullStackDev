import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import { updateRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ClientSearchDatatable extends LightningElement {

    @track accounts = [];
    @track error;
    searchTerm = '';
    @track filteredAccounts = [];
    debounceTimer;
    isLoading = false;

    fields = [
        {label: 'Name', fieldName: 'Name', type:'text',editable:true},
        {label: 'Site', fieldName: 'Site', type:'text',editable:true},
        {label: 'Active', fieldName: 'Active__c', type:'text',editable:true},
        {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type:'currency',editable:true}
    ]

    @wire(getAccounts)
    wiredAccounts({data,error}){
        if(data){
            this.accounts = data.map(a=>({ ...a}));
            this.filteredAccounts = data.map(a=>({ ...a}));
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

async handleSave(event) {
  this.isLoading = true;
  const updates = event.detail.draftValues; // [{ Id, ...changedFields }]

  try {
    await Promise.all(updates.map(dv => updateRecord({ fields: { ...dv } })));

    // Index updates by Id for fast lookup
    /* Map<Id, Account> updatesById = new Map<Id, Account>();
    for (Account acc : updates){
        updatesById.put(acc.id, acc);
    }*/
    const updatesById = new Map(updates.map(dv => [dv.Id, dv]));

    // Create a brand-new array with merged objects (no mutation)
    this.accounts = this.accounts.map(acc => {
      const dv = updatesById.get(acc.Id);
      return dv ? { ...acc, ...dv } : acc;
    });

    // Re-apply filter without mutating originals
    const q = (this.searchTerm || '').toLowerCase();
    const norm = v => String(v ?? '').toLowerCase();
    this.filteredAccounts = q
      ? this.accounts.filter(r =>
          norm(r.Name).includes(q) ||
          norm(r.Site).includes(q) ||
          norm(r.Active__c).includes(q)
        )
      : [...this.accounts];

    this.dispatchEvent(
      new ShowToastEvent({ title: 'Success', message: 'Account(s) saved', variant: 'success' })
    );
    this.draftValues = [];
  } catch (err) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Error saving',
        message: err?.body?.message || err?.message || 'Unknown error',
        variant: 'error'
      })
    );
    // Optional: console.error(JSON.stringify(err));
  } finally {
    this.isLoading = false;
  }
}


}