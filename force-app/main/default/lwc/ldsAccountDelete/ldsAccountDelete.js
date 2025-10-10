import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import LightningConfirm from 'lightning/confirm';
import {NavigationMixin} from 'lightning/navigation';

export default class LdsAccountDelete extends NavigationMixin(LightningElement) {
    @api recordId;

    async handledelete(){
        const confirmed = await LightningConfirm.open(
        {
            message:'Are you sure you want to delete?',
            label: 'Confirm Delete Account',
            theme: 'warning'
        }
        );

        if(!confirmed){return;}
        this.isDeleting = true;
        try{
            await deleteRecord(this.recordId);
            this.dispatchEvent(new ShowToastEvent({
                title:'Account Deleted',
                message: 'Account has been deleted',
                variant: 'success'
                })
            )

            this[NavigationMixin.Navigate](
                {
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: 'Account',
                        actionName: 'home'
                    }
                }
            );
        }
        catch(e){
            this.dispatchEvent(new ShowToastEvent({
                title:'Account Delete Failed',
                message: this.errMsg(e),
                variant: 'error'
                })
            )
        }
        finally{
            this.isDeleting = false;
        }

        errMsg(e){
            return(e.body.output.errors[0].message || e.body.message || 'Unknown Error');
        }
        
        
    }
    




}