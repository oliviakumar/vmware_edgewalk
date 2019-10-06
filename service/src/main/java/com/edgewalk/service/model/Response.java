package com.edgewalk.service.model;

import java.sql.Timestamp;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class Response {

	@Id
	private ObjectId id = null;
	private String identity = "";
	private boolean accepted = false;
	private String location = "";
	private String type = ""; // I for incoming, O for outgoing
	private Timestamp attempted = null;

	public ObjectId getId() {
		return this.id;
	}

	public void setId(ObjectId id) {
		this.id = id;
	}

	public String getIdentity() {
		return this.identity;
	}

	public void setIdentity(String identity) {
		this.identity = capitalCase(identity);
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
		this.location = capitalCase(location);
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

	private String capitalCase(String str) {
		StringBuilder sb = new StringBuilder();
		String[] strs = str.split(" ");
		for (String s : strs) {
			sb.append(s.substring(0, 1).toUpperCase() + s.substring(1) + " ");
		}
		return sb.toString().trim();
	}
}
