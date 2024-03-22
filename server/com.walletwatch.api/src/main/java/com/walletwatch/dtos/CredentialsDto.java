package com.walletwatch.dtos;

/**
 * credentials data transfer object
 */
public record CredentialsDto (String login, char[] password) { }