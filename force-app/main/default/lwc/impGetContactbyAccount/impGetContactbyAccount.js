import { LightningElement, api } from 'lwc';
import getContactbyAccount from '@salesforce/apex/AccountController.getContactbyAccount'

export default class ImpGetContactbyAccount extends LightningElement {
    @api recordId;
    contacts;
    error;

    showContacts(){
        getContactbyAccount({accid : this.recordId})
        .then(result => {
            this.contacts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.contacts = undefined;
        })

    }
}