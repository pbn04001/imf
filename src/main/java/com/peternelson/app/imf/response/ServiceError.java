package com.peternelson.app.imf.response;

import com.peternelson.app.imf.enums.ErrorSeverity;

public class ServiceError {
	
	private ErrorSeverity severity;
	private String message;
	
	public ServiceError() {
		super();
	}
	
	public ServiceError(ErrorSeverity severity, String message) {
		super();
		this.severity = severity;
		this.message = message;
	}
	
	public ErrorSeverity getSeverity() {
		return severity;
	}
	public void setSeverity(ErrorSeverity severity) {
		this.severity = severity;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
