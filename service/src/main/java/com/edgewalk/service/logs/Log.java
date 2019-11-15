package com.edgewalk.service.logs;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Log {
	// unique id for objects -- specifies primary key of entity (ORM)
	@Id
	// denote acknowledgment of using this db server side strategy
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

	private String summary;
	private String acceptanceCriteria;
	private String status;

	private String filename;
	private String contentType;

	@Lob
    private byte[] data;
    
    public Log() {}

	public Log(String name) {
        this.name = name;
	}

	public Log(String filename, String contentType, byte[] data) {
		this.filename = filename;
		this.contentType = contentType;
		this.data = data;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getAcceptanceCriteria() {
		return acceptanceCriteria;
	}

	public void setAcceptanceCriteria(String acceptanceCriteria) {
		this.acceptanceCriteria = acceptanceCriteria;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFilename() {
        return filename;
    }

    public void setFileName(String filename) {
        this.filename = filename;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
		this.data = data;
    }
    
    @Override
    public String toString() {
        return "Log{" + "id=" + id + ", name='" + name + '\'' + '}';
    }
}
