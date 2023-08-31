package com.Group1.PetRadar.utils;

public final class Constants {

    private Constants() {
        // private constructor to prevent instantiation
    }
    
    // example constant variables
    public static final String DUMMY_UUID = "0f14d0ab-9605-4a62-a9e4-5ed26688389b";
    public static final Integer DUMMY_INT = 1000;
    public static final Double DUMMY_DOUBLE = 3.141592653589793;
    public static final Float DUMMY_FLOAT = (float) 3.0;
    public static final int UNEXPECTED_INT = 31;
    public static final String sampleUserId="345";
    public static final int  EXPECTED_INT=21;
    public static final int updatedExpectedValue=401;
    //44.6344
    public static final String DUMMY_LATITUDE="44.6344";

    public static final int expectedStatusCode=202;
    
    // example constant methods
    public static final int add(int a, int b) {
        return a + b;
    }
    
    public static final String formatString(String value) {
        return String.format("Value is: %s", value);
    }
}