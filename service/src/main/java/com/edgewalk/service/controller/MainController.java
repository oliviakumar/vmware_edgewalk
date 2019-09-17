package com.edgewalk.service.controller;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.EdgeService;

@RestController
public class MainController {

	@Autowired
	private EdgeService edgeService;

	@Value("${second.delay}")
	int delay;

	@GetMapping("/")
	public String main() {

		return "main";
	}

	@GetMapping("/content")
	public String content(ModelMap model) {

		Response response = edgeService.getRecentResponse();
		// if we have a response and the response is within our delay
		if (response != null
				&& response.getAttempted().after(new Timestamp(System.currentTimeMillis() - (1000 * delay)))) {
			model.addAttribute("response", response);
		}

		return "content";
	}
}
