package com.edgewalk.service.controller;

import java.io.IOException;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.services.EdgeService;
import com.edgewalk.service.services.FileService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;


@CrossOrigin(origins = { "*" })
@EnableWebMvc
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

    @GetMapping("/files/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = null;
		try {
			file = fileService.loadAsResource(filename);
		} catch (IOException e) {
			e.printStackTrace();
		}
		LOG.error("FILENAME:::: ", file.getFilename());

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

	@PostMapping("/clear")
	public void clear() {
		edgeService.clear();
	}
}
