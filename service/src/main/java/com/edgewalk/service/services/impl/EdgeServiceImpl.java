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
		List<Response> responses = responseRepository.findAllWhereAttempedBetween(filter.getStartDate(), filter.getEndDate());
		if(responses == null) {
			responses = new ArrayList<>();
		}

		responses = responses.stream().filter(r -> {
			boolean identity;
			boolean location;
			boolean type;
			boolean accepted;
			if (!filter.getIdentity().equals("")) {
				identity = r.getIdentity().equalsIgnoreCase(filter.getIdentity());
			} else {
				identity = true;
			}

			if (filter.isAccepted() != null) {
				accepted = r.isAccepted() == filter.isAccepted();
			} else {
				accepted = true;
			}

			if (!filter.getLocation().equals("")) {
				location = r.getLocation().equalsIgnoreCase(filter.getLocation());
			} else {
				location = true;
			}

			if (!filter.getType().equals("")) {
				type = r.getType().equalsIgnoreCase(filter.getType());
			} else {
				type = true;
			}
			return identity && location && type && accepted;
		}).collect(Collectors.toList());

		return responses;
	}
}
