package com.edgewalk.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.EdgeService;

@RequestMapping("/edge")
@RestController
public class EdgeController {

	@Autowired private EdgeService edgeService;

	@PostMapping("/api")
	public Response receive(@RequestBody Response response) {
		return edgeService.processResponse(response);
	}

	@PostMapping("/clear")
	public void clear() {
		edgeService.clear();
	}
}
