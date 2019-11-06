package com.edgewalk.service.services;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;

import org.springframework.core.io.Resource;

public interface FileService {

	Response processResponse(Response response);

	Response getRecentResponse();

	List<Response> getResponseFromFilter(ResponseFilter filter);

	List<Response> retrieveAll();

    Stream<Path> loadAll();

    Path load(String filename);

	Resource loadAsResource(String filename);

	void clear();
}
