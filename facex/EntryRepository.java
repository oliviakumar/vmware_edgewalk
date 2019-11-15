package com.edgewalk;

import org.springframework.data.jpa.repository.JpaRepository;

// leverages Spring Data to do CRUD ops on this entity
interface EntryRepository extends JpaRepository<Entry, Long> {

}