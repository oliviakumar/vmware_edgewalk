package com.edgewalk.service.services.impl;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;

import com.edgewalk.service.config.FileConfig;
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

	private Path path;

	@Autowired
	private FileConfig fileConfig;

	@Autowired
	private ResponseRepository responseRepository;

	@PostConstruct
	private void init() {
		path = fileConfig.getImagePath();
	}

	@Override
	public boolean store(MultipartFile file, String edgexId) throws IOException {
		LOG.info("Received file with edgex id {}", edgexId);
		if (!file.isEmpty()) {
			Response response = responseRepository.findByEdgexId(edgexId);
			if (response == null) {
				LOG.info("Received file to store but no response under edgexId: {}", edgexId);
				return false;
			}
			String id = response.getId().toHexString() + ".jpg";
			Files.copy(file.getInputStream(), this.path.resolve(id),
			StandardCopyOption.REPLACE_EXISTING);

			return true;
		} else {
			LOG.info("No file received");
		}
		return false;
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
	}

	@Override
	public void deleteAll() {
		FileSystemUtils.deleteRecursively(path.toFile());
	}
}
