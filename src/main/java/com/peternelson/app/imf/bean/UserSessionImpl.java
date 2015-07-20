package com.peternelson.app.imf.bean;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
@Component("userSession")
@Scope(value="session")
public class UserSessionImpl implements UserSession,Serializable {

    private static final long serialVersionUID = 1L;

}
