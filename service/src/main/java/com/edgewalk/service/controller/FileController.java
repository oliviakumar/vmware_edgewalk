package com.edgewalk.service.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edgewalk.service.services.FileService;

@RequestMapping("/files")
@RestController
public class FileController {

	private final static Logger LOG = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileService fileService;

	@GetMapping("/{id}")
	public ResponseEntity<Resource> receiveFile(@PathVariable String id) {
		ResponseEntity<Resource> response;
		try {
			response = new ResponseEntity<>(fileService.loadAsResource(id + ".jpg"), new HttpHeaders(), HttpStatus.OK);
		} catch (IOException e) {
			LOG.error("Error retrieving file {}", id, e);
			response = new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
    }
}