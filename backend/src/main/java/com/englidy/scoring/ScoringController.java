package com.englidy.scoring;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ScoringController {

    private final ScoringService scoringService;

    public ScoringController(ScoringService scoringService) {
        this.scoringService = scoringService;
    }

    @PostMapping("/score")
    public ResponseEntity<ScoringResponse> score(@RequestBody ScoringRequest request) {
        ScoringResponse result = scoringService.score(request);
        return ResponseEntity.ok(result);
    }
}
