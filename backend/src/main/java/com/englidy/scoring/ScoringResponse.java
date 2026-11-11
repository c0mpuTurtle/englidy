package com.englidy.scoring;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ScoringResponse {
    private int score;
    private String level;
    private List<String> strengths;
    private List<String> improvements;
    private String sampleAnswer;
}
