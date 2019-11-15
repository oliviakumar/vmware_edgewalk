package com.edgewalk;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class EntryCommandLineRunner implements CommandLineRunner {

    private final EntryRepository repository;

    public EntryCommandLineRunner(EntryRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Stream.of("Olivia", "Tanja", "Doug", "Olivia",
                "Cathy", "Michael", "Kevin").forEach(name ->
                repository.save(new Entry(name))
        );
        repository.findAll().forEach(System.out::println);
    }
}