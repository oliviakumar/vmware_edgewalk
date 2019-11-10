package com.edgewalk.service.services;

import java.io.IOException;
import java.nio.file.Path;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

   	boolean store(MultipartFile file, String edgexId) throws IOException;

	Path load(String filename);

	Resource loadAsResource(String filename) throws IOException;

	void deleteAll();
}
