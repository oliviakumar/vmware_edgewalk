package com.edgewalk.service.model;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ResponseCommandLineRunner implements CommandLineRunner {

    private final ResponseRepository repository;

    public ResponseCommandLineRunner(ResponseRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Stream.of("Olivia", "Cathy", "Kevin", "Tanja", "Daniel").forEach(name ->
                repository.save(new Response(name))
        );
        repository.findAll().forEach(System.out::println);
    }
}