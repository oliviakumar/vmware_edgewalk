package com.edgewalk.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.EdgeService;

@RequestMapping("/edge")
@Controller
public class EdgeController {

	@Autowired private EdgeService edgeService;

	@PostMapping("/api")
	public Response receive(@RequestBody Response response) {
		return edgeService.processResponse(response);
	}
}
