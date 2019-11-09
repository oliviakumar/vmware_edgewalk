package com.edgewalk.service.services.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import com.edgewalk.service.model.Response;
import com.edgewalk.service.repository.ResponseRepository;
import com.edgewalk.service.services.FileService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

	private final static Logger LOG = LoggerFactory.getLogger(FileServiceImpl.class);

	@Autowired private ResponseRepository responseRepository;
	@Autowired private Path path;



	@Override
	public boolean store(MultipartFile file, String edgexId) throws IOException {
		String filename = file.getOriginalFilename();
		if (!file.isEmpty()) {
			Files.copy(file.getInputStream(), this.path.resolve(filename),
			StandardCopyOption.REPLACE_EXISTING);
			
			return true;
		}
		return false;
		/* ignore if file is empty or return false - no need for exceptions atm */
	}

	@Override
	public Stream<Path> loadAll() throws IOException {
		return Files.walk(this.path, 1)
			.filter(path -> !path.equals(this.path))
			.map(this.path::relativize);

	}

	@Override
	public Path load(String filename) {
		return path.resolve(filename);
	}

	@Override
	public Resource loadAsResource(String filename) throws FileNotFoundException, MalformedURLException {
		Path file = load(filename);
		Resource resource = new UrlResource(file.toUri());
		if (resource.exists() || resource.isReadable()) {
			return resource;
		}
		return null;
		// ("Error. The file " + filename + " was not found.");
	}

	@Override
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(path.toFile());
	}

	@Override
	public List<Response> retrieveAll() {
		LOG.info("Loading all responses");
		List<Response> responses = responseRepository.findAll();
		if (responses == null) {
			responses = new ArrayList<>();
		}
		return responses;
	}
}
