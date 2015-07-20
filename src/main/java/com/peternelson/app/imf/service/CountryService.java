package com.peternelson.app.imf.service;

import com.peternelson.app.imf.entity.Country;
import com.peternelson.app.imf.entity.CountrySelect;
import com.peternelson.app.imf.entity.StatisticSelect;
import com.peternelson.app.imf.exceptions.NoCountryFoundException;
import jxl.read.biff.BiffException;

import java.io.IOException;
import java.util.List;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
public interface CountryService {
    List<Country> getAllCountries() throws IOException, BiffException;
    List<CountrySelect> getCountrySelectList() throws IOException, BiffException;
    List<StatisticSelect> getStatisticSelectList() throws IOException, BiffException;
    Country getCountryByISO(String iso) throws NoCountryFoundException, IOException, BiffException;
}
