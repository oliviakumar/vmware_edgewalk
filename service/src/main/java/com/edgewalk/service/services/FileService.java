package com.edgewalk.service.services;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import com.edgewalk.service.model.Response;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	// Response processResponse(Response response);
	// Response getRecentResponse();
	// List<Response> getResponseFromFilter(ResponseFilter filter);
	List<Response> retrieveAll();

	void init();

   	boolean store(MultipartFile file, String edgexId) throws IOException;

	Stream<Path> loadAll() throws IOException;

	Path load(String filename);

	Resource loadAsResource(String filename) throws IOException;

	void deleteAll();
}
