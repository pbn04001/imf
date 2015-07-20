package com.peternelson.app.imf.controller;

import com.peternelson.app.imf.entity.Country;
import com.peternelson.app.imf.entity.CountrySelect;
import com.peternelson.app.imf.enums.ErrorSeverity;
import com.peternelson.app.imf.exceptions.NoCountryFoundException;
import com.peternelson.app.imf.response.ServiceError;
import com.peternelson.app.imf.response.ServiceResponse;
import com.peternelson.app.imf.service.CountryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
@Controller
@RequestMapping(value = "/country/**")
public class CountryController {

    private static final Logger _log = LoggerFactory.getLogger(CountryController.class);

    @Resource(name="countryService")
    CountryService imfCountryService = null;

    @Resource(name="messageSource")
    private MessageSource messages;

    @RequestMapping(method = RequestMethod.GET, value = "/allcountries")
    public @ResponseBody  ServiceResponse<List<Country>> getAllCountries(){
        try {
            List<Country> countries = imfCountryService.getAllCountries();
            return new ServiceResponse<>(countries,true,countries.size());
        } catch (Exception e){
            _log.error(e.getLocalizedMessage(),e);
            return new ServiceResponse<>(null,false,0, Arrays.asList(new ServiceError(ErrorSeverity.ERROR, messages.getMessage("country.errorReturningAllCountries",null, Locale.ENGLISH))));
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/country/iso/{iso}")
    public @ResponseBody  ServiceResponse<Country> getCountryByIso(@PathVariable String iso){
        try {
            return new ServiceResponse<>(imfCountryService.getCountryByISO(iso),true,1);
        } catch (NoCountryFoundException e){
            _log.error(e.getLocalizedMessage(),e);
            return new ServiceResponse<>(null,false,0, Arrays.asList(new ServiceError(ErrorSeverity.ERROR, messages.getMessage("general.noCountryFound",new Object[]{iso}, Locale.ENGLISH))));
        } catch (Exception e){
            _log.error(e.getLocalizedMessage(),e);
            return new ServiceResponse<>(null,false,0, Arrays.asList(new ServiceError(ErrorSeverity.ERROR, messages.getMessage("country.errorReturningCountryByISO",null, Locale.ENGLISH))));
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/countryselectlist")
    public @ResponseBody  ServiceResponse<List<CountrySelect>> getCountrySelectList(){
        try {
            List<CountrySelect> countrySelectList = imfCountryService.getCountrySelectList();
            return new ServiceResponse<>(countrySelectList,true,countrySelectList.size());
        } catch (Exception e){
            _log.error(e.getLocalizedMessage(),e);
            return new ServiceResponse<>(null,false,0, Arrays.asList(new ServiceError(ErrorSeverity.ERROR, messages.getMessage("country.errorReturningCountrySelectList",null, Locale.ENGLISH))));
        }
    }

}
