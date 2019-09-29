package com.edgewalk.service.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.edgewalk.service.model.Response;

@Repository
public interface ResponseRepository extends MongoRepository<Response, String> {

	List<Response> findAllWhereAttempedBetween(Date startDate, Date endDate);
}
