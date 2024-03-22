package com.walletwatch.config.object;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Secrets{
    @JsonProperty("rds_url")
    String rdsUrl;
    @JsonProperty("rds_username")
    String rdsUserName;
    @JsonProperty("rds_password")
    String rdsPassword;
    @JsonProperty("spring_mail_protocol")
    String springMailProtocol;
    @JsonProperty("spring_mail_host")
    String springMailHost;
    @JsonProperty("spring_mail_port")
    int springMailPort;
    @JsonProperty("spring_mail_username")
    String springMailUsername;
    @JsonProperty("spring_mail_password")
    String springMailPassword;
    @JsonProperty("spring_mail_properties_mail_smtp_auth")
    boolean springMailPropertiesMailSmtpAuth;
    @JsonProperty("spring_mail_properties_mail_smtp_starttls_enable")
    boolean springMailPropertiesMailSmtpStarttlsEnable;
    @JsonProperty("mail_smtp_starttls_enable")
    boolean mailSmtpStarttlsEnable;
    @JsonProperty("spring_mail_properties_mail_smtp_ssl_enable")
    boolean springMailPropertiesMailSmtpSslEnable;
    @JsonProperty("spring_mail_properties_mail_smtp_starttls_required")
    boolean springMailPropertiesMailSmtpStarttlsRequired;
    @JsonProperty("allowed_origin")
    String allowedOrigin;
    @JsonProperty("system_email")
    String systemEmail;

    public String getRdsUrl() {
        return rdsUrl;
    }

    public String getRdsUserName() {
        return rdsUserName;
    }

    public String getRdsPassword() {
        return rdsPassword;
    }

    public String getSpringMailProtocol() {
        return springMailProtocol;
    }

    public String getSpringMailHost() {
        return springMailHost;
    }

    public int getSpringMailPort() {
        return springMailPort;
    }

    public String getSpringMailUsername() {
        return springMailUsername;
    }

    public String getSpringMailPassword() {
        return springMailPassword;
    }

    public boolean getSpringMailPropertiesMailSmtpAuth() {
        return springMailPropertiesMailSmtpAuth;
    }

    public boolean getSpringMailPropertiesMailSmtpStarttlsEnable() {
        return springMailPropertiesMailSmtpStarttlsEnable;
    }

    public boolean getMailSmtpStarttlsEnable() {
        return mailSmtpStarttlsEnable;
    }

    public boolean getSpringMailPropertiesMailSmtpSslEnable() {
        return springMailPropertiesMailSmtpSslEnable;
    }

    public boolean getSpringMailPropertiesMailSmtpStarttlsRequired() {
        return springMailPropertiesMailSmtpStarttlsRequired;
    }

    public String getAllowedOrigin() {
        return allowedOrigin;
    }

    public String getSystemEmail() {
        return systemEmail;
    }

}