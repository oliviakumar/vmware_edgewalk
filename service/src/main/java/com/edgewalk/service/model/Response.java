package com.edgewalk.service.model;

import java.sql.Timestamp;

import org.springframework.data.annotation.Id;

public class Response {

	@Id
	private long id;
	private String identity;
	private boolean accepted;
	private Timestamp attempted;

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getIdentity() {
		return this.identity;
	}

	public void setIdentity(String identity) {
		this.identity = identity;
	}

	public boolean isAccepted() {
		return this.accepted;
	}

	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}

	public Timestamp getAttempted() {
		return this.attempted;
	}

	public void setAttempted(Timestamp attempted) {
		this.attempted = attempted;
	}
}
