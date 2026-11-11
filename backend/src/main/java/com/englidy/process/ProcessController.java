package com.englidy.process;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProcessController {

    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }

    @PostMapping("/process")
    public ResponseEntity<ProcessResponse> process(@RequestBody ProcessRequest request) {
        String result = processService.process(request);
        ProcessResponse res = new ProcessResponse();
        res.setResult(result);
        return ResponseEntity.ok(res);
    }
}
