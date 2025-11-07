import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class EventHandlingParentAccount extends LightningElement {
    selectedAccountId;
    accountOptions = []; //[{label: 'Name', value: 'Id'}];
    selectedEmail;
    selectedContactId;

    @wire(getAccounts)
    wiredAccounts({data, error}){
        if(data){
            this.accountOptions = data.map(a=>({label: a.Name, value: a.Id}));
        }
        else if(error){
            console.error(error);
        }

    }

    handleAccountChange(e){
        this.selectedAccountId = e.detail.value;
        console.log('Selected Id ', this.selectedAccountId);
    }

    handleViewContact(e){
        this.selectedEmail = e?.detail?.email;
        this.selectedContactId = e?.detail?.conId;
    }


}