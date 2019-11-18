package com.edgewalk.service.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.edgewalk.service.repository.ResponseRepository;
import com.edgewalk.service.model.Response;

@Component
public class FileConfig implements CommandLineRunner {

	ResponseRepository repository;

	@Autowired
	public FileConfig(ResponseRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Response("Olivia", "I", "front door", true));
	}

	@Value("${image.filepath}")
	private String imagePath;

	public Path getImagePath() {
		return Paths.get(imagePath);
	}
}
