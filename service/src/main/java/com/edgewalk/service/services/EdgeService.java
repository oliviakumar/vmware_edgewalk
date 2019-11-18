package com.edgewalk.service.services;

import java.util.List;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;

public interface EdgeService {

	Response processResponse(Response response);

	Response getRecentResponse();

	List<Response> getResponseFromFilter(ResponseFilter filter);

	List<Response> retrieveAll();

	List<String> liv();

	void clear();

	Response getResponseById(String id);

	Response getIdentityLiv(String indentity);
}
