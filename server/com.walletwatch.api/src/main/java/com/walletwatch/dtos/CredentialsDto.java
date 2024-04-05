package com.walletwatch.dtos;

/**
 * credentials data transfer object
 */
public record CredentialsDto (String userName, char[] password) { }