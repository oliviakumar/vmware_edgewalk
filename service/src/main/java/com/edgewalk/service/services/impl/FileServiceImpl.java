package com.edgewalk.service.services.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.repository.ResponseRepository;
import com.edgewalk.service.services.FileService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class FileServiceImpl implements FileService {

	private final static Logger LOG = LoggerFactory.getLogger(FileServiceImpl.class);

	private final static Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "attempted");

	@Autowired private ResponseRepository responseRepository;

	@Override
	public Response processResponse(Response response) {
		LOG.info("Received a response");
		response.setAttempted(new Timestamp(System.currentTimeMillis()));
		return responseRepository.save(response);
	}

	@Override
	public Response getRecentResponse() {
		Response response = null;

		List<Response> responses = responseRepository.findAll(DEFAULT_SORT);
		if (responses != null && !responses.isEmpty()) {
			response = responses.get(0);
		}

		return response;
	}

	@Override
	public List<Response> getResponseFromFilter(ResponseFilter filter) {
		LOG.info("Retrieving responses from filter");

		List<Response> responses = responseRepository.findAllBetween(filter.getStartDate(), filter.getEndDate(), DEFAULT_SORT);
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
			if (filter.isAccepted() != null) {
				accepted = r.isAccepted() == filter.isAccepted();
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

	@Override
	public List<Response> retrieveAll() {
		LOG.info("Loading all responses");
		List<Response> responses = responseRepository.findAll();
		if (responses == null) {
			responses = new ArrayList<>();
		}
		return responses;
	}

	@Override
	public void clear() {
		LOG.info("Deleting all database entries");
		responseRepository.deleteAll();
	}
}
