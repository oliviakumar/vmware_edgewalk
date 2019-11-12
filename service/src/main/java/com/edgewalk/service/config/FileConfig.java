package com.edgewalk.service.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class FileConfig {

	@Value("${image.filepath}")
	private String imagePath;

	public Path getImagePath() {
		return Paths.get(imagePath);
	}
}
