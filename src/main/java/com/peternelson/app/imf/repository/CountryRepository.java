package com.peternelson.app.imf.repository;

import com.peternelson.app.imf.entity.Country;
import jxl.read.biff.BiffException;

import java.io.IOException;
import java.util.List;

/**
 * Created by Peter Nelson on 7/16/2015.
 */
public interface CountryRepository {
    List<Country> readIMFCountriesFromFile() throws IOException, BiffException;
}
