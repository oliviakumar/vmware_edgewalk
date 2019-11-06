package com.edgewalk.service.services;

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

    void store(MultipartFile file, String edgexId);

    Stream<Path> loadAll();

    Path load(String filename);

	Resource loadAsResource(String filename);

	// serve()?
}
