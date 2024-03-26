package org.walletwatch.object;

public class EmailRequest {
    private String to;
    private String from;
    private String subject;
    private String htmlBody;
    private String textBody;

    public String getTo() {
        return to;
    }

    public EmailRequest(String to, String from, String subject, String htmlBody, String textBody) {
        this.to = to;
        this.from = from;
        this.subject = subject;
        this.htmlBody = htmlBody;
        this.textBody = textBody;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getHtmlBody() {
        return htmlBody;
    }

    public void setHtmlBody(String htmlBody) {
        this.htmlBody = htmlBody;
    }

    public String getTextBody() {
        return textBody;
    }

    public void setTextBody(String textBody) {
        this.textBody = textBody;
    }
}
