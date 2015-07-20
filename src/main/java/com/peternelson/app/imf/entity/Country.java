package com.peternelson.app.imf.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
public class Country {

    private String weoCountryCode = null;
    private String iso = null;
    private String countryName = null;
    private List<CountryStatistic> countryStatistics = new ArrayList<CountryStatistic>();

    private List<StatisitcValue> gdpGrowthVsUnemployment = new ArrayList<StatisitcValue>();

    public String getWeoCountryCode() {
        return weoCountryCode;
    }

    public void setWeoCountryCode(String weoCountryCode) {
        this.weoCountryCode = weoCountryCode;
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

    public List<CountryStatistic> getCountryStatistics() {
        return countryStatistics;
    }

    public void setCountryStatistics(List<CountryStatistic> countryStatistics) {
        this.countryStatistics = countryStatistics;
    }

    public List<StatisitcValue> getGdpGrowthVsUnemployment() {
        return gdpGrowthVsUnemployment;
    }

    public void setGdpGrowthVsUnemployment(List<StatisitcValue> gdpGrowthVsUnemployment) {
        this.gdpGrowthVsUnemployment = gdpGrowthVsUnemployment;
    }
}
