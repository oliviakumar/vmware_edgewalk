package com.edgewalk.service.controller;
// /Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/service/src/main/java/com/edgewalk/service/logs/LogRepository.java
// import com.edgewalk.service.logs;

import java.sql.Timestamp;
import java.util.List;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.services.EdgeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
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

	@ResponseBody
	@GetMapping("/edgewalk/liv-entries") // ("/edgewalk/{username}/entries")
	public List<String> liv() { // @PathVariable String username) {
		return edgeService.liv();
		// return filter(new ResponseFilter());
	}

	@ResponseBody
	@GetMapping("/default-filtered")
	public List<Response> defaultFilter() {
		return filter(new ResponseFilter());
	}

	@PostMapping("/filter")
	public List<Response> filter(@RequestBody ResponseFilter filter) {
		return edgeService.getResponseFromFilter(filter);
	}

	@GetMapping("/edgewalk/{username}/entries/{id}")
	public Response getEntry(@PathVariable String username, @PathVariable long id) {
		return edgeService.getIdentityLiv(username);
	}
}


