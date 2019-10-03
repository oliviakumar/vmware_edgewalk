package com.edgewalk.service.model;

import java.sql.Timestamp;

import org.springframework.data.annotation.Id;

public class Response {

	@Id
	private String id = "";
	private String identity = "";
	private boolean accepted = false;
	private String location = "";
	private String type = ""; // I for incoming, O for outgoing
	private Timestamp attempted = null;

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
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

	public Timestamp getAttempted() {
		return this.attempted;
	}

	public void setAttempted(Timestamp attempted) {
		this.attempted = attempted;
	}
}
