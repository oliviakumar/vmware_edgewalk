package com.edgewalk.service.logs;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class LogCommandLineRunner implements CommandLineRunner {

    private final LogRepository repository;

    public LogCommandLineRunner(LogRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Stream.of("Olivia", "Tanja", "Doug", "Olivia",
                "Cathy", "Michael", "Kevin").forEach(name ->
                repository.save(new Log(name))
        );
        repository.findAll().forEach(System.out::println);
    }
}