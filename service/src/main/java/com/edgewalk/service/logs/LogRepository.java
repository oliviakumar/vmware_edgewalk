package com.edgewalk.service.logs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// leverages Spring Data to do CRUD ops on this entity
@RepositoryRestResource
interface LogRepository extends JpaRepository<Log, Long> {

}