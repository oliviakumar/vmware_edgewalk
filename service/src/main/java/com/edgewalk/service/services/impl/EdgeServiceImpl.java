package com.edgewalk.service.services.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.repository.ResponseRepository;
import com.edgewalk.service.services.EdgeService;

@Service
public class EdgeServiceImpl implements EdgeService {

	@Autowired private ResponseRepository responseRepository;

	@Override
	public Response processResponse(Response response) {
		response.setAttempted(new Timestamp(System.currentTimeMillis()));
		return responseRepository.save(response);
	}

	@Override
	public Response getRecentResponse() {
		Response response = null;

		List<Response> responses = responseRepository.findAll();
		if (responses != null && !responses.isEmpty()) {
			response = responses.get(responses.size() - 1);
		}

		return response;
	}

	@Override
	public List<Response> getResponseFromFilter(ResponseFilter filter) {
		List<Response> responses = responseRepository.findAllWhereAttemptedBetween(filter.getStartDate(), filter.getEndDate());
		if(responses == null) {
			responses = new ArrayList<>();
		}

		responses = responses.stream().filter(r -> {
			boolean identity = true;
			boolean location = true;
			boolean type = true;
			boolean accepted = true;
			if (!filter.getIdentity().equals("")) {
				identity = r.getIdentity().equalsIgnoreCase(filter.getIdentity());
			}
			if (filter.isIdentified() != null) {
				accepted = r.isIdentified() == filter.isIdentified();
			}
			if (!filter.getLocation().equals("")) {
				location = r.getLocation().equalsIgnoreCase(filter.getLocation());
			}
			if (!filter.getType().equals("")) {
				type = r.getType().equalsIgnoreCase(filter.getType());
			}
			return identity && location && type && accepted;
		}).collect(Collectors.toList());

		return responses;
	}
}
