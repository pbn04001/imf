package com.peternelson.app.imf.service;

import com.googlecode.ehcache.annotations.Cacheable;
import com.peternelson.app.imf.entity.Country;
import com.peternelson.app.imf.entity.CountrySelect;
import com.peternelson.app.imf.entity.CountryStatistic;
import com.peternelson.app.imf.entity.StatisticSelect;
import com.peternelson.app.imf.exceptions.NoCountryFoundException;
import com.peternelson.app.imf.repository.CountryRepository;
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
@Service("countryService")
public class CountryServiceImpl implements CountryService,Serializable {

    @Resource(name="countryRepository")
    CountryRepository imfDataRepository = null;

    public synchronized List<Country> getAllCountries() throws IOException, BiffException {
        return imfDataRepository.readIMFCountriesFromFile();
    }

    @Cacheable(cacheName = "countryByISO")
    public Country getCountryByISO(String iso) throws NoCountryFoundException, IOException, BiffException {
        for(Country country : getAllCountries()){
            if(iso.equals(country.getIso())){
                return country;
            }
        }
        throw new NoCountryFoundException("No country found for ISO");
    }

    @Cacheable(cacheName = "countrySelectList")
    public List<CountrySelect> getCountrySelectList() throws IOException, BiffException {
        List<Country> allCountries = getAllCountries();
        List<CountrySelect> countrySelect = new ArrayList<CountrySelect>();
        for(Country country : allCountries){
            countrySelect.add(new CountrySelect(country.getIso(), country.getCountryName()));
        }
        return countrySelect;
    }

    @Cacheable(cacheName = "statisticSelectList")
    public List<StatisticSelect> getStatisticSelectList() throws IOException, BiffException {
        List<Country> allCountries = getAllCountries();
        List<StatisticSelect> statisticSelectList = new ArrayList<StatisticSelect>();
        for(CountryStatistic countryStatistic : allCountries.get(0).getCountryStatistics()) {
            String unit = null;
            String scale = null;
            if(countryStatistic.getStatisticUnit() != null){
                unit = countryStatistic.getStatisticUnit().toString();
            }
            if(countryStatistic.getStatisticScale() != null){
                scale = countryStatistic.getStatisticScale().toString();
            }
            statisticSelectList.add(new StatisticSelect(countryStatistic.getWeoSubjectCode(), countryStatistic.getSubjectDescriptor(), unit,scale,countryStatistic.getEstimatesStartAfter()));
        }

        return statisticSelectList;
    }


}
