package com.edgewalk.service.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.services.EdgeService;

@CrossOrigin(origins = "*")
@RestController
public class ResponseController {

	@Autowired
	private EdgeService edgeService;

	@Value("${second.delay}")
	private int delay;

	@GetMapping("/recent")
	public Response recent() {
		return edgeService.getRecentResponse();
	}

	@GetMapping("/within-delay")
	public Response recentWithinDelay() {
		Response response = recent();
		long time = System.currentTimeMillis();
		int range = 1000 * delay;
		long newTime = time - range;
		Timestamp lim = new Timestamp(newTime);
		if (response != null && response.getAttempted().before(lim)) {
			response = null;
		}
		return response;
	}

	@GetMapping("/all")
	public List<Response> all() {
		return edgeService.retrieveAll();
	}

	@GetMapping("/default-filtered")
	public List<Response> defaultFilter() {
		return filter(new ResponseFilter());
	}

	@PostMapping("/filter")
	public List<Response> filter(@RequestBody ResponseFilter filter) {
		return edgeService.getResponseFromFilter(filter);
	}

	@GetMapping("/{id}")
	public Response getResponse(@PathVariable String id) {
		return edgeService.getResponseById(id);
	}
}
