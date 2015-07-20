package com.peternelson.app.imf.service;

import com.peternelson.app.imf.constants.AppConstants;
import com.peternelson.app.imf.entity.*;
import com.peternelson.app.imf.exceptions.NoCountryFoundException;
import jxl.read.biff.BiffException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
@Service("statisticService")
public class StatisticServiceImpl implements StatisticService,Serializable{

    private static final Integer MAX_SUMMARY_STATISTICS = 2;

    @Resource(name="countryService")
    CountryService imfCountryService = null;

    public SummaryStatistic getSummaryStatistics(SummaryStatisticRequest summaryStatisticRequest) throws NoCountryFoundException, IOException, BiffException {
        Country country = imfCountryService.getCountryByISO(summaryStatisticRequest.getIso());
        SummaryStatistic summaryStatistic = new SummaryStatistic();
        summaryStatistic.setLabel("Year");
        summaryStatistic.setCountryName(country.getCountryName());
        summaryStatistic.setCountryISO(country.getIso());
        int statisticFound = 0;
        for(CountryStatistic countryStatistic: country.getCountryStatistics()){
            for(String weoSuubjectCode: summaryStatisticRequest.getWeoSubjectCodes()){
                if(weoSuubjectCode.equals(countryStatistic.getWeoSubjectCode())){
                    summaryStatistic.getCountryStatistics().add(countryStatistic);
                    if(++statisticFound == MAX_SUMMARY_STATISTICS){
                        break;
                    }
                }
            }
            if(statisticFound == MAX_SUMMARY_STATISTICS){
                break;
            }
        }
        return summaryStatistic;
    }

    public void calculateGDPGrowthVsUnemployment(List<Country> countryList){
        for(Country country: countryList){
            CountryStatistic gdpGrowth = null;
            CountryStatistic unemployment = null;
            for(CountryStatistic statistic: country.getCountryStatistics()){
                if("NGDPD".equals(statistic.getWeoSubjectCode().trim())){
                    gdpGrowth = statistic;
                }else if("LUR".equals(statistic.getWeoSubjectCode().trim())){
                    unemployment = statistic;
                }
                if(gdpGrowth != null && unemployment != null) {

                    List<StatisitcValue> gdpGrowthVsUnemployment = new ArrayList<StatisitcValue>();
                    for (int i = 0; i < gdpGrowth.getStatisticValues().size(); i++) {
                        System.out.println(gdpGrowth.getStatisticValues().get(i).getValue());
                        System.out.println(unemployment.getStatisticValues().get(i).getValue());

                    }


                    break;
                }
            }
            break;
        }

    }
}
