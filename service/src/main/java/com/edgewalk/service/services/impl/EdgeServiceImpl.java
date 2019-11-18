package com.edgewalk.service.services.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.repository.ResponseRepository;
import com.edgewalk.service.services.EdgeService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class EdgeServiceImpl implements EdgeService {

	private final static Logger LOG = LoggerFactory.getLogger(EdgeServiceImpl.class);

	private final static Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "attempted");

	@Autowired
	private ResponseRepository responseRepository;

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
			boolean device = true;
			boolean edgexId = true;
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
			if (!filter.getDevice().equals("")) {
				device = r.getType().equalsIgnoreCase(filter.getType());
			}
			if (!filter.getEdgexId().equals("")) {
				edgexId = r.getType().equalsIgnoreCase(filter.getType());
			}
			return identity && location && type && accepted && device && edgexId;
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
	public List<String> liv() {
		LOG.info("Loading all responses");
		List<Response> responses = responseRepository.findAll();
		List<String> str_res = new ArrayList<>();
		for (Response r: responses) {
			str_res.add(r.toString());
		}
		if (responses == null) {
			responses = new ArrayList<>();
		}
		str_res.add("test one");
		str_res.add("test two");
		// responses.add(new Response(null, "-", false, "--", "i", null));
		// ResponseFilter e = new ResponseFilter(null, "-", false, "--", "i", null);
		// responses.add(new Response());

		/*
			private ObjectId id = null;
			private String identity = "";
			private boolean accepted = false;
			private String location = "";
			private String type = ""; // I for incoming, O for outgoing
			private Timestamp attempted = null;
		*/
		return str_res;
	}

	@Override
	public void clear() {
		LOG.info("Deleting all database entries");
		responseRepository.deleteAll();
	}

	@Override
	public Response getIdentityLiv(String identity) {
		for (Response entry: responseRepository.findAll()) {
		  if (entry.getIdentity() == identity) {
			return entry;
		  }
		}
		return null;
	}

	@Override
	public Response getResponseById(String id) {
		LOG.debug("Recevied a request for id {}", id);
		Response response = null;
		try {
			response = responseRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			LOG.error("No element found for id {}", id, e);
		}
		return response;
	}
}
