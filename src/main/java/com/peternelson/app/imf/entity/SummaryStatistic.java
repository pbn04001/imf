package com.peternelson.app.imf.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Peter Nelson on 7/17/2015.
 */
public class SummaryStatistic {

   private String label = null;
   private String countryName = null;
   private String countryISO = null;
   private List<CountryStatistic> countryStatistics = new ArrayList<CountryStatistic>();

   public String getLabel() {
      return label;
   }

   public void setLabel(String label) {
      this.label = label;
   }

   public List<CountryStatistic> getCountryStatistics() {
      return countryStatistics;
   }

   public void setCountryStatistics(List<CountryStatistic> countryStatistics) {
      this.countryStatistics = countryStatistics;
   }

   public String getCountryName() {
      return countryName;
   }

   public void setCountryName(String countryName) {
      this.countryName = countryName;
   }

   public String getCountryISO() {
      return countryISO;
   }

   public void setCountryISO(String countryISO) {
      this.countryISO = countryISO;
   }
}
