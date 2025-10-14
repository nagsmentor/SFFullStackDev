import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import {NavigationMixin} from 'lightning/navigation'
//Get the fields Names

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import AR_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import IND_FIELD from '@salesforce/schema/Account.Industry';

const FIELDS = [NAME_FIELD,PHONE_FIELD,AR_FIELD,IND_FIELD];

export default class LdsAccountViewer extends NavigationMixin(LightningElement) {

    @api recordId;

    @wire(getRecord, {recordId: '$recordId', fields: FIELDS}) //SELECT [FIELDS] from Account where id = $recordId
    record;
    
    get name(){
        return getFieldValue(this.record.data,NAME_FIELD) || '';
    }

    get phone(){

        return getFieldValue(this.record.data,PHONE_FIELD) || '';
    }

    get annualrevenue(){

        return getFieldValue(this.record.data,AR_FIELD) || '';
    }

    get industry(){

        return getFieldValue(this.record.data,IND_FIELD) || '';
    }

    get hasRecord(){
        return this.record && this.record.data;
    }

    async openrecord(){
        if(!this.recordId) {return;}
        const url = await this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: { recordId: this.recordId,
                objectApiName: 'Account',
                actionName:'view' }
            });
        console.log('Record URL:', url);
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes:{
                recordId: this.recordId,
                objectApiName: 'Account',
                actionName:'view'
            }
        });
    }

}