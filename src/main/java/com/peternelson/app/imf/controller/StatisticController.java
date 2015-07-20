package com.peternelson.app.imf.controller;

import com.peternelson.app.imf.entity.StatisticSelect;
import com.peternelson.app.imf.entity.SummaryStatistic;
import com.peternelson.app.imf.entity.SummaryStatisticRequest;
import com.peternelson.app.imf.enums.ErrorSeverity;
import com.peternelson.app.imf.exceptions.NoCountryFoundException;
import com.peternelson.app.imf.response.ServiceError;
import com.peternelson.app.imf.response.ServiceResponse;
import com.peternelson.app.imf.service.CountryService;
import com.peternelson.app.imf.service.StatisticService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/**
 * Created by Peter Nelson on 7/17/2015.
 */
@Controller
@RequestMapping(value = "/statistic/**")
public class StatisticController {

    private static final Logger _log = LoggerFactory.getLogger(StatisticController.class);

    @Resource(name="statisticService")
    StatisticService statisticService = null;

    @Resource(name="countryService")
    CountryService imfCountryService = null;

    @Resource(name="messageSource")
    private MessageSource messages;

    @RequestMapping(method = RequestMethod.GET, value = "/statisticselectlist")
    public @ResponseBody  ServiceResponse<List<StatisticSelect>> getStatisticSelectList(){
        try {
            List<StatisticSelect> statisticSelectList = imfCountryService.getStatisticSelectList();
            return new ServiceResponse<>(statisticSelectList,true,statisticSelectList.size());
        } catch (Exception e){
            _log.error(e.getLocalizedMessage(),e);
            return new ServiceResponse<>(null,false,0, Arrays.asList(new ServiceError(ErrorSeverity.ERROR, messages.getMessage("statistic.errorReturningStatisticSelectList",null, Locale.ENGLISH))));
        }
    }

    @RequestMapping(method = RequestMethod.POST, value = "/getsummarystatistics")
    public @ResponseBody  ServiceResponse<SummaryStatistic> getSummaryStatistics(
            @RequestBody SummaryStatisticRequest summaryStatisticRequest){
        try {
            return new ServiceResponse<>(statisticService.getSummaryStatistics(summaryStatisticRequest),true,1);
        } catch (NoCountryFoundException e){
            _log.error(e.getLocalizedMessage(),e);
            return new ServiceResponse<>(null,false,0, Arrays.asList(new ServiceError(ErrorSeverity.ERROR, messages.getMessage("general.noCountryFound",new Object[]{summaryStatisticRequest.getIso()}, Locale.ENGLISH))));
        } catch (Exception e){
            _log.error(e.getLocalizedMessage(),e);
            return new ServiceResponse<>(null,false,0, Arrays.asList(new ServiceError(ErrorSeverity.ERROR, messages.getMessage("statistic.errorGettingSummaryStatistics",null, Locale.ENGLISH))));
        }
    }

}
