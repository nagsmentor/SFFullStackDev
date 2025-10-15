import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class WiredApexAccountTiles extends LightningElement {

    accounts;
    error;

    @wire(getAccounts)
    wiredAccounts({data, error}){
        if(data){
            this.accounts = data.map(acc => ({
                ...acc,
                tileclass: this.computeTileClass(acc)
            }));
            this.error = undefined;
        }
        else if (error){
            this.error = error;
            this.accounts = undefined;
        }
    }

    computeTileClass(account){
        if(account.Active__c == 'Yes'){
            return 'greentile';
        }
        else if(account.Active__c == 'No'){
            return 'redtile';
        }
        else {
            return 'greytile';
        }

    }

}