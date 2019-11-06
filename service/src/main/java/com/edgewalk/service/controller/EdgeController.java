package com.edgewalk.service.controller;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.EdgeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// TODO adding autowiring for file service
// @Autowired
@RequestMapping("/edge")
@RestController
public class EdgeController {

	@Autowired private EdgeService edgeService;

	@PostMapping("/api")
	public Response receive(@RequestBody Response response) {
		return edgeService.processResponse(response);
	}

	// receives edgex id and multipart file
	@GetMapping("/image")
	@ResponseBody
	public Response receive(@PathVariable String path, @RequestParam("file") MultipartFile file) {
		// storageService.store(file);
		// return edgeService.processResponse(response);
		return null;
	}

	@PostMapping("/clear")
	public void clear() {
		edgeService.clear();
	}
}
