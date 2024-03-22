package com.walletwatch.dtos;

/**
 * sign up data transfer object
 */
public record SignUpDto (String firstName, String lastName, String phone, String email, String userName, char[] password) { }