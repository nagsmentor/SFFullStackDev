public with sharing class OpenAIClientSample {
    // --- DTOs for Chat Completions minimal parse ---
    public class ChatMessage { public String role; public String content; }
    public class Choice { public Integer index; public ChatMessage message; public String finish_reason; }
    public class ChatResponse { public List<Choice> choices; }

    /**
     * Calls OpenAI Chat Completions via Named Credential 'OpenAI'
     * @param prompt The user prompt to send
     * @return Plain text content from the first choice, or null
     */
    public static String complete(String prompt) {
        HttpRequest req = new HttpRequest();
        req.setMethod('POST');
        // Named Credential base + path
        req.setEndpoint('callout:OpenAI/v1/chat/completions');
        req.setHeader('Content-Type', 'application/json');

        // Request body (keep small for our 2–3 lines use case)
        Map<String, Object> body = new Map<String, Object>{
            'model' => 'gpt-4o-mini',
            'messages' => new List<Object>{
                new Map<String, Object>{ 'role' => 'system', 'content' => 'You write very short, factual snippets.' },
                new Map<String, Object>{ 'role' => 'user',   'content' => prompt }
            },
            'temperature' => 0.7,
            'max_tokens'  => 150
        };
        req.setBody(JSON.serialize(body));

        Http http = new Http();
        HTTPResponse res = http.send(req);
        if (res.getStatusCode() < 200 || res.getStatusCode() >= 300) {
            throw new CalloutException('OpenAI call failed: ' + res.getStatusCode() + ' ' + res.getStatus());
        }

        ChatResponse parsed = (ChatResponse) JSON.deserialize(res.getBody(), ChatResponse.class);
        String text = (parsed != null && parsed.choices != null && !parsed.choices.isEmpty())
            ? parsed.choices[0].message.content
            : null;

        // Trim to fit Account.Description (long text area, 32k max)
        if (text != null && text.length() > 32000) text = text.substring(0, 32000);
        return text;
    }

    public class CalloutException extends Exception {}
}
