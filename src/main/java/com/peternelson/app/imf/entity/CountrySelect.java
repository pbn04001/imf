package com.peternelson.app.imf.entity;

/**
 * Created by Peter Nelson on 7/17/2015.
 */
public class CountrySelect {
    private String iso = null;
    private String countryName = null;

    public CountrySelect() {}

    public CountrySelect(String iso, String countryName) {
        this.iso = iso;
        this.countryName = countryName;
    }

    public String getIso() {
        return iso;
    }

    public void setIso(String iso) {
        this.iso = iso;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
}
