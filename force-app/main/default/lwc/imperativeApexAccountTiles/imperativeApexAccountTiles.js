import { LightningElement } from 'lwc';
import getAccountsImperative from '@salesforce/apex/AccountController.getAccountsImperative';

export default class ImperativeApexAccountTiles extends LightningElement {

    accounts;
    error;

    showAccounts(){
        getAccountsImperative()
            .then(result => {
                this.accounts = result;
                this.error=undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            });

    }

}