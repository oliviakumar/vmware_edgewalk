package com.edgewalk.service.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Path;

import javax.servlet.http.HttpServletResponse;

import com.edgewalk.service.repository.ResponseRepository;
import com.edgewalk.service.services.FileService;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
// import org.apache.commons.io.IOUtils
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@CrossOrigin(origins = { "*" })
@RequestMapping("/files")
@EnableWebMvc
@RestController
public class FileController {

	private final static Logger LOG = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private FileService fileService;
	ResponseRepository responseRepository;

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

	@GetMapping("/files/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws IOException {

        Resource file = fileService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}

	@GetMapping("/liv-get-photo")
	public Path getPhoto0() throws IOException {
		// ResponseEntity<Resource> response;
		// try {
		// response = new
		// ResponseEntity<>(fileService.loadAsResource("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg"),
		// new HttpHeaders(), HttpStatus.OK);
		// } catch (IOException e) {
		// // LOG.error("Error retrieving file {}", id, e);
		// response = new ResponseEntity<>(null, new HttpHeaders(),
		// HttpStatus.INTERNAL_SERVER_ERROR);
		// }
		// return response;
		return fileService.load(
				"/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg/");
		// public Resource getPhoto() throws IOException {
		// return
		// fileService.loadAsResource("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
	}

	@GetMapping("/liv-get-photo2")
	public ResponseEntity<Resource> getPhoto2() throws IOException {
		ResponseEntity<Resource> response;
		try {
			response = new ResponseEntity<>(fileService.loadAsResource("5dcf20d60830d315b04b3d69.jpg"),
					new HttpHeaders(), HttpStatus.OK);
		} catch (IOException e) {
			LOG.error("Error retrieving file {}", "5dcf20d60830d315b04b3d69.jpg", e);
			response = new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return response;
		// ResponseEntity<Resource> response;
		// response = new
		// ResponseEntity<>(fileService.loadAsResource("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg"),
		// new HttpHeaders(), HttpStatus.OK);
		// return response;
		// return
		// fileService.load("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
	}

	@RequestMapping(value = "/edge/image", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	// @GetMapping("/edge/image")
	public @ResponseBody byte[] getPhoto() throws IOException {
		InputStream in = getClass().getResourceAsStream("5dcf20d60830d315b04b3d69.jpg");

		return IOUtils.toByteArray(in);
		// return
		// fileService.load("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");
	}

	@RequestMapping("/photo1")
	public void photo(HttpServletResponse response) throws IOException {
		// ServletContext servletContext = null;
		response.setContentType("image/jpg");
		InputStream in = getClass().getResourceAsStream(
				"/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/service/5dcf20d60830d315b04b3d69.jpg");
		IOUtils.copy(in, response.getOutputStream());
	}

	// @RequestMapping(value = "/5dcf20d60830d315b04b3d69", method = RequestMethod.GET,
	// 	produces = MediaType.IMAGE_JPEG_VALUE)
	//
	// public void getImage(HttpServletResponse response) throws IOException {
	//
	// 	var imgFile = new ClassPathResource("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/service/5dcf20d60830d315b04b3d69.jpg");
	//
	// 	response.setContentType(MediaType.IMAGE_JPEG_VALUE);
	// 	StreamUtils.copy(imgFile.getInputStream(), response.getOutputStream());
	// }
	// @RequestMapping("/photo")
	// public void getPhoto(HttpServletResponse response) throws IOException {
	// 	// // ServletContext servletContext = null;
	// 	// response.setContentType("image/jpg");
	// 	// InputStream in = getClass().getResourceAsStream(
	// 	// 		"/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/service/5dcf20d60830d315b04b3d69.jpg");
	// 	// IOUtils.copy(in, response.getOutputStream());
	// 	response.findByEdgexId(edgexId);
	// 	// if (response == null) {
	// 		// LOG.info("Received file to store but no response under edgexId: {}", edgexId);
	// 	// }
	// 	String id = response.getId().toHexString() + ".jpg";
	// 	Files.copy(file.getInputStream(), this.path.resolve(id),
	// 	StandardCopyOption.REPLACE_EXISTING);

	// }

	// @RequestMapping(value = "/getImage", method = RequestMethod.GET)
	// public void showImage(HttpServletResponse response) throws Exception {

	// 	ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
	// 	BufferedImage buf = new BufferedImage(new File("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/service/5dcf20d60830d315b04b3d69.jpg"));
	// 	try {
	// 		BufferedImage image = "/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/service/5dcf20d60830d315b04b3d69.jpg"; // CALL_OR_CREATE_YOUR_IMAGE_OBJECT;
	// 	ImageIO.write(image, "jpeg", jpegOutputStream);
	// 	} catch (IllegalArgumentException e) {
	// 	response.sendError(HttpServletResponse.SC_NOT_FOUND);
	// 	}

	// 	byte[] imgByte = jpegOutputStream.toByteArray();

	// 	response.setHeader("Cache-Control", "no-store");
	// 	response.setHeader("Pragma", "no-cache");
	// 	response.setDateHeader("Expires", 0);
	// 	response.setContentType("image/jpeg");
	// 	ServletOutputStream responseOutputStream = response.getOutputStream();
	// 	responseOutputStream.write(imgByte);
	// 	responseOutputStream.flush();
	// 	responseOutputStream.close();
	// }

	// @RequestMapping(value = "/image", method = RequestMethod.GET)
	// @ResponseBody
	// public ResponseEntity<InputStreamResource> getImage(@PathVariable Long userId) {
	// 	GridFSDBFile gridFsFile;// = //fileService.loadAsResource("/Users/oliviakumar/Documents/Fall19/SeniorTeam/vmware_edgewalk/model-goface/images/Olivia/olivia3.jpg");

	// 	return ResponseEntity.ok()
	// 			.contentLength(gridFsFile.getLength())
	// 			.contentType(MediaType.parseMediaType(gridFsFile.getContentType()))
	// 			.body(new InputStreamResource(gridFsFile.getInputStream()));
	// }
	// @ResponseBody
	// @RequestMapping(value = "/photo2", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	// public byte[] testphoto() throws IOException {
	// 	InputStream in = Servlet.getResourceAsStream("/images/no_image.jpg");
	// 	return IOUtils.toByteArray(in);
	// }
/**/
	/*
	public @ResponseBody byte[] getImageWithMediaType() throws IOException {
		InputStream in = getClass()
		.getResourceAsStream("/com/baeldung/produceimage/image.jpg");
		return IOUtils.toByteArray(in);
	}
	*/
}
