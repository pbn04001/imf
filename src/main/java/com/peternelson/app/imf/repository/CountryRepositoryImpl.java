package com.peternelson.app.imf.repository;

import com.googlecode.ehcache.annotations.Cacheable;
import com.peternelson.app.imf.constants.AppConstants;
import com.peternelson.app.imf.entity.Country;
import com.peternelson.app.imf.entity.CountryStatistic;
import com.peternelson.app.imf.entity.StatisitcValue;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CodingErrorAction;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
@Repository("countryRepository")
public class CountryRepositoryImpl implements CountryRepository,Serializable{

    private static Logger _log = LoggerFactory.getLogger(CountryRepositoryImpl.class);

    @Autowired
    ServletContext servletContext;

    @Cacheable(cacheName = "allCountries")
    public List<Country> readIMFCountriesFromFile() throws IOException, BiffException {

        CharsetDecoder utf8Decoder = Charset.forName("UTF-8").newDecoder();
        utf8Decoder.onMalformedInput(CodingErrorAction.IGNORE);
        utf8Decoder.onUnmappableCharacter(CodingErrorAction.IGNORE);

        File inputWorkbook =  new File(servletContext.getRealPath("/WEB-INF/data/WEOOct2014all.xls"));

        Workbook w  = Workbook.getWorkbook(inputWorkbook);
        Sheet sheet = w.getSheet(0);

        List<Country> imfCountries = new ArrayList<Country>();
        NumberFormat format = NumberFormat.getInstance(Locale.ENGLISH);

        Country country = null;
        for(int i = 1; i < sheet.getRows(); i++) {
            String weoCountryCode = sheet.getCell(0, i).getContents();
            if(!StringUtils.isEmpty(weoCountryCode)) {
                if (country == null || !weoCountryCode.equals(country.getWeoCountryCode())){
                    country = new Country();
                    country.setWeoCountryCode(weoCountryCode);
                    country.setIso(sheet.getCell(1, i).getContents());
                    String countryName = sheet.getCell(3, i).getContents();
                    if(countryName != null) {
                        country.setCountryName(utf8Decoder.decode(ByteBuffer.wrap(countryName.getBytes())).toString());
                    }
                    imfCountries.add(country);
                }

                CountryStatistic countryStatistic = new CountryStatistic();
                countryStatistic.setWeoSubjectCode(sheet.getCell(2, i).getContents());
                countryStatistic.setSubjectDescriptor(sheet.getCell(4, i).getContents());
                countryStatistic.setSubjectNotes(sheet.getCell(5, i).getContents());
                countryStatistic.setStatisticUnit(sheet.getCell(6, i).getContents());
                countryStatistic.setStatisticScale(sheet.getCell(7, i).getContents());

                countryStatistic.setCountryNotes(sheet.getCell(8, i).getContents());


                for(int j = 0; j < AppConstants.NUMBER_OF_STATISTIC_YEARS;j++){
                    StatisitcValue statisitcValue = new StatisitcValue();
                    statisitcValue.setYear(AppConstants.STARTING_STATISTIC_YAER + j);
                    String value = sheet.getCell(9 + j, i).getContents();
                    if(!StringUtils.isEmpty(value) && !"n/a".equals(value.trim()) && !"--".equals(value.trim())){
                        try {
                            Number number = number = format.parse(value);
                            statisitcValue.setValue(number.doubleValue());
                        } catch (ParseException e) {
                            _log.error(e.getLocalizedMessage(),e);
                        }
                    }

                    countryStatistic.getStatisticValues().add(statisitcValue);
                }
                String estimatesStartAfater = sheet.getCell(49, i).getContents();
                if(!StringUtils.isEmpty(estimatesStartAfater)){
                    countryStatistic.setEstimatesStartAfter(Integer.parseInt(estimatesStartAfater));
                }

                country.getCountryStatistics().add(countryStatistic);

            }else{
                break;
            }
        }

        return imfCountries;
    }
}
