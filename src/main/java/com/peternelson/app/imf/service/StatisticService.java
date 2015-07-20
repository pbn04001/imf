package com.peternelson.app.imf.service;

import com.peternelson.app.imf.entity.Country;
import com.peternelson.app.imf.entity.SummaryStatistic;
import com.peternelson.app.imf.entity.SummaryStatisticRequest;
import com.peternelson.app.imf.exceptions.NoCountryFoundException;
import jxl.read.biff.BiffException;

import java.io.IOException;
import java.util.List;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
public interface StatisticService {
    void calculateGDPGrowthVsUnemployment(List<Country> countryList);
    SummaryStatistic getSummaryStatistics(SummaryStatisticRequest summaryStatisticRequest) throws NoCountryFoundException, IOException, BiffException;
}
