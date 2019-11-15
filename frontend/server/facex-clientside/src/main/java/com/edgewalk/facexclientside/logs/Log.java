package com.edgewalk.facexclientside.logs;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Log {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Log() {}

    public Log(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", identity='" + name + '\'' +
                '}';
    }
}