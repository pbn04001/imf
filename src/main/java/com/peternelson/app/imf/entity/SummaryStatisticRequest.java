package com.peternelson.app.imf.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Peter Nelson on 7/17/2015.
 */
public class SummaryStatisticRequest {
    private String iso = null;
    private List<String> weoSubjectCodes = new ArrayList<String>();

    public String getIso() {
        return iso;
    }

    public void setIso(String iso) {
        this.iso = iso;
    }

    public List<String> getWeoSubjectCodes() {
        return weoSubjectCodes;
    }

    public void setWeoSubjectCodes(List<String> weoSubjectCodes) {
        this.weoSubjectCodes = weoSubjectCodes;
    }
}
