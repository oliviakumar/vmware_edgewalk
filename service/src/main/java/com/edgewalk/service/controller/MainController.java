package com.edgewalk.service.controller;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.model.ResponseFilter;
import com.edgewalk.service.services.EdgeService;

@Controller
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
	public String content(Model model) {

		Response response = recent();
		// if we have a response and the response is within our delay
		if (response != null
				&& response.getAttempted().after(new Timestamp(System.currentTimeMillis() - (1000 * delay)))) {
			model.addAttribute("response", response);
		} else {
			model.addAttribute("response", null);
		}

		return "content";
	}

	@GetMapping("/entries")
	public String entries(Model model) {

		ResponseFilter filter = new ResponseFilter();
		model.addAttribute("responses", filter(filter));
		model.addAttribute("filter", filter);

		return "entry";
	}

	@PostMapping("/applyFilter")
	public String applyFilter(Model model, @RequestBody ResponseFilter filter) throws ParseException {

		model.addAttribute("responses", filter(filter));
		model.addAttribute("filter", filter);

		return "responseTable";
	}

	@ResponseBody
	@GetMapping("/recent")
	public Response recent() {
		return edgeService.getRecentResponse();
	}

	@ResponseBody
	@GetMapping("/all")
	public List<Response> all() {
		return edgeService.retrieveAll();
	}

	@ResponseBody
	@GetMapping("/default-filtered")
	public List<Response> defaultFilter() {
		return filter(new ResponseFilter());
	}

	@ResponseBody
	@PostMapping("/filter")
	public List<Response> filter(@RequestBody ResponseFilter filter) {
		return edgeService.getResponseFromFilter(filter);
	}
}
