package com.edgewalk.service.controller;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.EdgeService;
import com.edgewalk.service.services.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/edge")
@RestController
public class EdgeController {
	// autowiring for file service
	@Autowired private EdgeService edgeService;
	@Autowired private FileService fileService;


	@PostMapping("/api")
	public Response receive(@RequestBody Response response) {
		return edgeService.processResponse(response);
	}

	@PostMapping("/image")
	// receives edgex id and multipart file
	public Response receiveImage(@PathVariable String path, @RequestParam("file") MultipartFile file) {
		// TODO fileService.
		// return edgeService.processResponse(response);
		/* can return reponse or boolean for successful reception, etc or void" */
		return null;
	}

	@PostMapping("/clear")
	public void clear() {
		edgeService.clear();
	}
}
