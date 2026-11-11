package com.englidy.process;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ProcessService {

    @Value("${google.api-key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=%s";

    public String process(ProcessRequest request) {
        String prompt = buildPrompt(request);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("contents", List.of(Map.of("role", "user", "parts", List.of(Map.of("text", prompt)))));
        body.put("generationConfig", Map.of("temperature", 0.7, "maxOutputTokens", 1024));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<Map> response = restTemplate.exchange(
                String.format(GEMINI_URL, apiKey),
                HttpMethod.POST,
                new HttpEntity<>(body, headers),
                Map.class
        );

        return extractText(response.getBody());
    }

    private String buildPrompt(ProcessRequest req) {
        if ("translate".equals(req.getMode())) {
            return """
                    The user is preparing for the OPIc English speaking test.
                    They wrote their answer idea in Korean. Translate it into natural, fluent English
                    suitable for a spoken OPIc response (10–15 sentences, paragraph form, first person).
                    Keep the original meaning but make it sound like natural spoken English.
                    Output ONLY the English text, no explanation, no labels.

                    OPIc question: %s
                    Korean input: %s
                    """.formatted(req.getQuestion(), req.getInput());
        } else {
            return """
                    The user is preparing for the OPIc English speaking test.
                    They provided Korean keywords as hints for their answer. Do the following:
                    1. Translate/interpret the Korean keywords into English concepts.
                    2. Build a natural, fluent spoken English response of 10–15 sentences using those concepts.
                    The response should be in first person, paragraph form, as if spoken aloud in an OPIc test.
                    Output ONLY the English response text, no explanation, no labels, no bullet points.

                    OPIc question: %s
                    Korean keywords: %s
                    """.formatted(req.getQuestion(), req.getInput());
        }
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map<?, ?> responseBody) {
        List<?> candidates = (List<?>) responseBody.get("candidates");
        Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
        Map<?, ?> content = (Map<?, ?>) candidate.get("content");
        List<?> parts = (List<?>) content.get("parts");
        return ((String) ((Map<?, ?>) parts.get(0)).get("text")).strip();
    }
}
