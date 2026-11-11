package com.englidy.scoring;

import lombok.Data;

@Data
public class ScoringRequest {
    private String question;
    private String answer;
    private String answerMode;
    private String questionType; // survey | unexpected | roleplay
}
