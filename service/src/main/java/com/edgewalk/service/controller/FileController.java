package com.edgewalk.service.controller;

import java.io.IOException;
import java.util.stream.Collectors;

import com.edgewalk.service.services.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
public class FileController {

    @Autowired
    private final FileService fileService;

    @Autowired // TODO autowire here? 
    public FileController(FileService storageService) {
        this.fileService = storageService;
    }

    @GetMapping("/")
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", fileService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileController.class,
                        "serveFile", path.getFileName().toString()).build().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    // @GetMapping("/image")
    // @PathVariable String path - our id
    @GetMapping("/files/{path:.+}")
    @ResponseBody
    // public ResponseEntity<Resource> serveFile(@PathVariable String path) {
    public ResponseEntity<Resource> receiveFile(@PathVariable String path) {
        /*
        Resource file = fileService.loadAsResource(path);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; path=\"" + file.getFilename() + "\"").body(file);
        */
        return null;
    }

    @PostMapping("/")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
            RedirectAttributes redirectAttributes) {

                // fileService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "redirect:/";
    }

    // @ExceptionHandler(StorageFileNotFoundException.class)
    // public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
    //     return ResponseEntity.notFound().build();
    // }

}