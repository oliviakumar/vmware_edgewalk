package com.edgewalk.service.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.FileService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
// import org.apache.commons.io.IOUtils

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RequestMapping("/files")
@RestController
public class FileController {

	private final static Logger LOG = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileService fileService;

	private byte[] buffer;

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
	
	@GetMapping("/liv-get-photo")
	public Path getPhoto() throws IOException {
		// ResponseEntity<Resource> response;
		// try {
		// 	response = new ResponseEntity<>(fileService.loadAsResource("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg"), new HttpHeaders(), HttpStatus.OK);
		// } catch (IOException e) {
		// 	// LOG.error("Error retrieving file {}", id, e);
		// 	response = new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
		// }
		// return response;
		return fileService.load("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
	// public Resource getPhoto() throws IOException {
		// return fileService.loadAsResource("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
	}

	@GetMapping("/liv-get-photo2")
	public List<Response> getPhoto2() throws IOException {
		List<Response> list = new ArrayList<>();
		// InputStream in = getClass()
		// .getResourceAsStream("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
		// IOUtils.readFully(in, buffer);
		// list.add()
		return list;
		// return fileService.load("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
	}

/*
	@GetMapping("/liv-get-photo")
	public @ResponseBody byte[] getPhoto() throws IOException {
		InputStream in = getClass()
		.getResourceAsStream("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
		return IOUtils.toByteArray(in);
		// return fileService.load("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
	}
*/
	/*
	public @ResponseBody byte[] getImageWithMediaType() throws IOException {
		InputStream in = getClass()
		.getResourceAsStream("/com/baeldung/produceimage/image.jpg");
		return IOUtils.toByteArray(in);
	}
	*/
}