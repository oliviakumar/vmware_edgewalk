package com.edgewalk.service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.edgewalk.service.model.Response;

@Repository
public interface ResponseRepository extends MongoRepository<Response, Long> {

}
