package com.peternelson.app.imf.entity;

/**
 * Created by Peter Nelson on 7/17/2015.
 */
public class StatisticSelect {
    private String weoSubjectCode = null;
    private String weoSubjectTitle = null;
    private String units = null;
    private String scale = null;

    public StatisticSelect() {}

    public StatisticSelect(String weoSubjectCode, String weoSubjectTitle, String units, String scale) {
        this.weoSubjectCode = weoSubjectCode;
        this.weoSubjectTitle = weoSubjectTitle;
        this.units = units;
        this.scale = scale;
    }

    public String getWeoSubjectCode() {
        return weoSubjectCode;
    }

    public void setWeoSubjectCode(String weoSubjectCode) {
        this.weoSubjectCode = weoSubjectCode;
    }

    public String getWeoSubjectTitle() {
        return weoSubjectTitle;
    }

    public void setWeoSubjectTitle(String weoSubjectTitle) {
        this.weoSubjectTitle = weoSubjectTitle;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public String getScale() {
        return scale;
    }

    public void setScale(String scale) {
        this.scale = scale;
    }
}
