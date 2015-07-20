package com.peternelson.app.imf.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
public class CountryStatistic {
    private String weoSubjectCode = null;
    private String subjectDescriptor = null;
    private String subjectNotes = null;
    private String statisticUnit = null;
    private String statisticScale = null;
    private String countryNotes = null;
    private Integer estimatesStartAfter = null;
    private List<StatisitcValue> statisticValues = new ArrayList<StatisitcValue>();

    public String getWeoSubjectCode() {
        return weoSubjectCode;
    }

    public void setWeoSubjectCode(String weoSubjectCode) {
        this.weoSubjectCode = weoSubjectCode;
    }

    public String getSubjectDescriptor() {
        return subjectDescriptor;
    }

    public void setSubjectDescriptor(String subjectDescriptor) {
        this.subjectDescriptor = subjectDescriptor;
    }

    public String getSubjectNotes() {
        return subjectNotes;
    }

    public void setSubjectNotes(String subjectNotes) {
        this.subjectNotes = subjectNotes;
    }

    public String getStatisticUnit() {
        return statisticUnit;
    }

    public void setStatisticUnit(String statisticUnit) {
        this.statisticUnit = statisticUnit;
    }

    public String getStatisticScale() {
        return statisticScale;
    }

    public void setStatisticScale(String statisticScale) {
        this.statisticScale = statisticScale;
    }

    public String getCountryNotes() {
        return countryNotes;
    }

    public void setCountryNotes(String countryNotes) {
        this.countryNotes = countryNotes;
    }

    public Integer getEstimatesStartAfter() {
        return estimatesStartAfter;
    }

    public void setEstimatesStartAfter(Integer estimatesStartAfter) {
        this.estimatesStartAfter = estimatesStartAfter;
    }

    public List<StatisitcValue> getStatisticValues() {
        return statisticValues;
    }

    public void setStatisticValues(List<StatisitcValue> statisticValues) {
        this.statisticValues = statisticValues;
    }
}
