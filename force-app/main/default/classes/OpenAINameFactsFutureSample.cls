public with sharing class OpenAINameFactsFutureSample {
    /**
     * Future method: safe for triggers; allows callouts.
     * Accepts a collection of Account Ids (future supports collections of primitives).
     */
    @future(callout=true)
    public static void generateFacts(List<Id> accountIds) {
        if (accountIds == null || accountIds.isEmpty()) {return;}

        List<Account> accs = [
            SELECT Id, Name, Description
            FROM Account
            WHERE Id IN :accountIds
        ];

        List<Account> toUpdate = new List<Account>();

        for (Account a : accs) {
            // Build a tiny prompt for 2–3 lines; no PII, plain text.
            String prompt =
                'In 2–3 short lines, share interesting, neutral facts about the name "' +
                a.Name + '". Focus on etymology/meaning/cultural references. '
                + 'Avoid personal data. Output plain text, no bullets.';

            try {
                String text = OpenAIClientSample.complete(prompt);
                if (String.isNotBlank(text)) {
                    Account upd = new Account(Id = a.Id, Description = text);
                    toUpdate.add(upd);
                }
            } catch (Exception e) {
                // Swallow per-record failures to keep others flowing; optionally log elsewhere
                System.debug(LoggingLevel.WARN, 'OpenAI error for Account ' + a.Id + ': ' + e.getMessage());
            }
        }

        if (!toUpdate.isEmpty()) {
            update toUpdate;
        }
    }
}
