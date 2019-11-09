package com.edgewalk.service.repository;

import java.util.Date;
import java.util.List;

import com.edgewalk.service.model.Response;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponseRepository extends MongoRepository<Response, String> {

	@Query("{ '$and' : [ { 'attempted' : { '$lt' : ?1 } } , { 'attempted' : { '$gte' : ?0 } } ] }")
	List<Response> findAllBetween(Date start, Date end, Sort sort);

	Response findByEdgexId(String edgexId);
}
