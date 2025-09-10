trigger CasePriorityTrigger on Case (before insert, after update) {
    // If origin is Phone Priority is high, Origin = Email priority is Medium else Low
    CaseTriggerHandler.afterInsertCase(Trigger.New);

}