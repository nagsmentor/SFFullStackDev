import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue} from 'lightning/uiRecordApi';
import { updateRecord} from 'lightning/uiRecordApi';
import {getRecordNotifyChange} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import {NavigationMixin} from 'lightning/navigation'
//Get the fields Names

import ID_FIELD from '@salesforce/schema/Account.Id';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ACTIVE_FIELD from '@salesforce/schema/Account.Active__c';
import AR_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import SITE_FIELD from '@salesforce/schema/Account.Site';

const FIELDS = [NAME_FIELD,ACTIVE_FIELD,AR_FIELD,SITE_FIELD];

export default class LdsAccountViewer extends NavigationMixin(LightningElement) {

    @api recordId;
    name='';
    active='';
    ar='';
    site='';


    @wire(getRecord, {recordId: '$recordId', fields: FIELDS}) //SELECT [FIELDS] from Account where id = $recordId
    record({data, error}){
        if(data){
            this.name = getFieldValue(data,NAME_FIELD) || '';
            this.active = getFieldValue(data,ACTIVE_FIELD) || '';
            this.ar = getFieldValue(data,AR_FIELD) || '';
            this.site = getFieldValue(data,SITE_FIELD) || '';
        }
        else if(error){
            this.dispatchEvent(new ShowToastEvent({
            title:'Account Get Failed',
            message: 'Account Get Failed',
            variant: 'error'
        }));
        }   

    }
    
    onname = (e) => (this.name = e.target.value?.trim());
    onsite = (e) => (this.site = e.target.value?.trim());
    onactive = (e) => (this.active = e.target.value?.trim());
    onar = (e) => (this.ar = e.target.value?.trim());
    
    async updaterec(){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[ACTIVE_FIELD.fieldApiName] = this.active;
        fields[AR_FIELD.fieldApiName] = this.ar;
        fields[SITE_FIELD.fieldApiName] = this.site;

        await updateRecord({fields});
        await getRecordNotifyChange([{recordId: this.recordId}]);

        this.dispatchEvent(new ShowToastEvent({
        title:'Account Updated',
        message: 'Account has been updated',
        variant: 'success'
    })
    )

    }

    

}