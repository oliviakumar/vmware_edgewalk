package com.edgewalk.service.controller;

import java.io.IOException;
import java.util.stream.Collectors;

import com.edgewalk.service.services.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@RequestMapping("/files")
@Controller
public class FileController {

    @Autowired
    private FileService fileService;

    @GetMapping
    public String listUploadedFiles(Model model) throws IOException {

        model.addAttribute("files", fileService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileController.class,
                        "serveFile", path.getFileName().toString()).build().toString())
                .collect(Collectors.toList()));

        return "uploadForm";
    }

    // @GetMapping("/image")
    // @PathVariable String path - our id
    @GetMapping("/{path}")
    @ResponseBody
    // can call from front end and can load image
    public ResponseEntity<Resource> receiveFile(@PathVariable String path) {
        /*
        Resource file = fileService.loadAsResource(path);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; path=\"" + file.getFilename() + "\"").body(file);
        */
        return null;
    }
}