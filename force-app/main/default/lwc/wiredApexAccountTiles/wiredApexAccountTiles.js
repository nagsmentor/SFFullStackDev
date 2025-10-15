import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class WiredApexAccountTiles extends LightningElement {

    accounts;
    error;

    @wire(getAccounts)
    wiredAccounts({data, error}){
        if(data){
            this.accounts = data;
            this.error = undefined;
        }
        else if (error){
            this.error = error;
            this.accounts = undefined;
        }
    }

    getTileclass(account){
        if(account.Active__c == 'Yes'){
            return 'tile green-border';
        }
        else if(account.Active__c == 'No'){
            return 'tile red-border';
        }
        else {
            return 'tile grey-border';
        }

    }

}