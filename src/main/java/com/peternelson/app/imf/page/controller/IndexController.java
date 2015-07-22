package com.peternelson.app.imf.page.controller;

import com.peternelson.app.imf.bean.UserSession;
import com.peternelson.app.imf.constants.AppConstants;
import com.peternelson.app.imf.util.RuntimeEnvironmentUtil;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
@Controller
public class IndexController {

    private static final Logger _log = LoggerFactory.getLogger(IndexController.class);

    @Resource(name="appProperties")
    private Properties appProperties;

    @Resource(name="userSession")
    private UserSession userSession;

    @Resource(name="messageSource")
    private MessageSource messages;

    @Autowired
    ServletContext servletContext;

    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public ModelAndView defaultView(Model model, HttpServletRequest request, HttpServletResponse response, HttpSession session){

        setDefaultPageValues(model, request);
        model.addAttribute("title", AppConstants.PAGE_TITLE);
        ModelAndView modelAndView = new ModelAndView("pages/index");

        return modelAndView;
    }

    private void setDefaultPageValues(Model model,HttpServletRequest request){
        String contextPath = request.getContextPath();
        String applicationVersion = appProperties.getProperty("app.version");
        String runtimeEnvironment = RuntimeEnvironmentUtil.getRuntimeEnvironment();
        if("PROD".equals(runtimeEnvironment)){
            contextPath = "/JD82MV93HDU85HUSUIR7RG";
        }else{
            dynamicallyIncludeAllJavascriptFiles(contextPath,model);
            dynamicallyIncludeAllStylesheetFiles(contextPath, model);
        }
        model.addAttribute("contextPath",contextPath);
        model.addAttribute("runtimeEnvironment",runtimeEnvironment);
        model.addAttribute("curYear", Calendar.getInstance().get(Calendar.YEAR));
        model.addAttribute("applicationVersion", applicationVersion);
        model.addAttribute("unhandledException", messages.getMessage("general.unhandledException", null, Locale.ENGLISH));
    }

    private void dynamicallyIncludeAllJavascriptFiles(String contextPath, Model model){
        StringBuilder javascriptIncludes = new StringBuilder();

        Collection<File> files = FileUtils.listFiles(new File(servletContext.getRealPath("app")), new String[]{"js"}, true);
        Iterator<File> fileIterator = files.iterator();
        while(fileIterator.hasNext()){
            File file = fileIterator.next();
            try {
                String filePath = file.getCanonicalPath();
                filePath = filePath.replace("\\","/");
                filePath = filePath.split("/app/")[1];
                javascriptIncludes.append("<script type='text/javascript' src='" + contextPath + "/app/" + filePath + "'></script>");
            } catch (IOException e) {
                _log.error(e.getLocalizedMessage(),e);
            }
        }
        model.addAttribute("projectJavascript",javascriptIncludes.toString());
    }

    private void dynamicallyIncludeAllStylesheetFiles(String contextPath,Model model){
        StringBuilder javascriptIncludes = new StringBuilder();

        Collection<File> files = FileUtils.listFiles(new File(servletContext.getRealPath("assets/css")),new String[]{"css"},true);
        Iterator<File> fileIterator = files.iterator();
        while(fileIterator.hasNext()){
            File file = fileIterator.next();
            try {
                String filePath = file.getCanonicalPath();
                filePath = filePath.replace("\\","/");
                filePath = filePath.split("/assets/")[1];
                javascriptIncludes.append("<link type='text/css' rel='stylesheet' href='" + contextPath + "/assets/" + filePath + "'/>");
            } catch (IOException e) {
                _log.error(e.getLocalizedMessage(),e);
            }
        }
        model.addAttribute("projectStylesheets",javascriptIncludes.toString());
    }
}