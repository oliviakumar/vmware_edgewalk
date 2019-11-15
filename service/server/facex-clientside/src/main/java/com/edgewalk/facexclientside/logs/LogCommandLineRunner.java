package com.edgewalk.facexclientside;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class LogCommandLineRunner implements CommandLineRunner {

    private final LogRepository repository;

    public LogCommandLineRunner(LogRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Stream.of("Olivia", "Cathy", "Daniel", "Kevin", "Tanja").forEach(name ->
                repository.save(new Log(name))
        );
        repository.findAll().forEach(System.out::println);
    }
}