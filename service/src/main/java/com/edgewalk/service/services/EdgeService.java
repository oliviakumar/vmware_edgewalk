package com.edgewalk.service.services;

import com.edgewalk.service.model.Response;

public interface EdgeService {

	Response processResponse(Response response);

	Response getRecentResponse();
}
