package com.englidy.process;

import lombok.Data;

@Data
public class ProcessRequest {
    private String mode;    // "translate" | "keyword"
    private String input;   // user input (Korean)
    private String question;
}
