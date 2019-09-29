package com.edgewalk.service.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.edgewalk.service.model.Response;

@Repository
public interface ResponseRepository extends MongoRepository<Response, String> {

	@Query("{ attempted : { $ge : ?1 } , attempted : { $le : ?2 } }")
	List<Response> findAllWhereAttemptedBetween(Date startDate, Date endDate);
}
