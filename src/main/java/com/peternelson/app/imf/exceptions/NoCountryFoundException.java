package com.peternelson.app.imf.exceptions;

/**
 * Created by Peter Nelson on 7/17/2015.
 */
public class NoCountryFoundException  extends Exception {

    private static final long serialVersionUID = 1L;

    public NoCountryFoundException() {
        super();
    }

    public NoCountryFoundException(String message) {
        super(message);
    }


}
