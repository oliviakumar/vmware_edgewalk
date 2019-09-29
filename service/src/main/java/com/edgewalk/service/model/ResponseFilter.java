package com.edgewalk.service.model;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ResponseFilter {

	public static final String DATE_FORMAT = "mm/dd/YYYY";

	private String identity = "";
	private String location = "";
	private String type = "";
	private Boolean accepted = null;
	@JsonFormat(pattern = DATE_FORMAT)
	private Date startDate;
	@JsonFormat(pattern = DATE_FORMAT)
	private Date endDate;

	public ResponseFilter() {
		this.endDate = new Date(System.currentTimeMillis());
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, -1);
		this.startDate = new Date(cal.getTimeInMillis());
	}

	public String getIdentity() {
		return this.identity;
	}

	public void setIdentity(String identity) {
		this.identity = identity;
	}

	public Boolean isAccepted() {
		return this.accepted;
	}

	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}

	public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public void setStartDateString(String startDate) throws ParseException {
		this.startDate = setDateString(startDate);
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public void setEndDateString(String endDate) throws ParseException {
		this.endDate = setDateString(endDate);
	}

	private Date setDateString(String date) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT);
		return new Date(format.parse(date).getTime());
	}
}
