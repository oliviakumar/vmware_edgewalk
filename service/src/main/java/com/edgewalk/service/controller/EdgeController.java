package com.edgewalk.service.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.EdgeService;
import com.edgewalk.service.services.FileService;

@RequestMapping("/edge")
@RestController
public class EdgeController {

	private final static Logger LOG = LoggerFactory.getLogger(EdgeController.class);

	@Autowired private EdgeService edgeService;
	@Autowired private FileService fileService;

	@PostMapping("/api")
	public Response receive(@RequestBody Response response) {
		return edgeService.processResponse(response);
	}

	@PostMapping("/image")
	public boolean receiveImage(@RequestParam("file") MultipartFile file, @RequestParam("edgexId") String edgexId) {
		boolean result;
		try {
			result = fileService.store(file, edgexId);
		} catch (IOException e) {
			LOG.error("Error receiving image", e);
			result = false;
		}
		return result;
	}

	@PostMapping("/clear")
	public void clear() {
		edgeService.clear();
	}
}
