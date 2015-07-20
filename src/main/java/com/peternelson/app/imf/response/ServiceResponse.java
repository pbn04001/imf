package com.peternelson.app.imf.response;

import java.util.ArrayList;
import java.util.List;

public class ServiceResponse<T>{ 

    private T data; 
    private Boolean success;
    private Integer total;
    private List<ServiceError> errors = new ArrayList<ServiceError>();
    
    public ServiceResponse() { 
            errors = new ArrayList<ServiceError>();
    } 

    public ServiceResponse(T data, boolean success, int total) { 
            this.data = data; 
            this.success = success; 
            this.total = total; 
    } 
    
    public ServiceResponse(T data, boolean success, int total, List<ServiceError> errors) {
            this.data = data; 
            this.success = success; 
            this.total = total; 
            this.errors = errors; 
    } 
    
    public T getData() { 
            return data; 
    } 

    public void setData(T data) { 
            this.data = data; 
    } 

    public Boolean isSuccess() {
            return success; 
    } 

    public void setSuccess(Boolean success) {
            this.success = success; 
    } 

    public Integer getTotal() {
            return total; 
    } 

    public void setTotal(Integer total) {
            this.total = total; 
    } 

    public List<ServiceError> getErrors() {
            return errors; 
    } 

    public void setErrors(List<ServiceError> errors) {
            this.errors = errors; 
    } 

} 
