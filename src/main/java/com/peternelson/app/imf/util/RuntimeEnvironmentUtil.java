package com.peternelson.app.imf.util;

import org.springframework.util.StringUtils;

/**
 * Created by jisapn1 on 7/19/2015.
 */
public class RuntimeEnvironmentUtil {

    private static String runtimeEnvironment = null;

    public static String getRuntimeEnvironment(){
        if(runtimeEnvironment == null){
            runtimeEnvironment = StringUtils.trimAllWhitespace(System.getProperty("runtime.environment"));
        }
        return runtimeEnvironment;
    }
}
